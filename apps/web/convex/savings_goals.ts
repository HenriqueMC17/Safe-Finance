import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    userId: v.id("users")
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("savings_goals")
      .withIndex("by_user", (q) => q.eq("user_id", args.userId))
      .collect();
  }
});

export const add = mutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
    target_amount: v.float64(),
    current_amount: v.optional(v.float64()),
    target_date: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("savings_goals", {
      user_id: args.userId,
      name: args.name,
      target_amount: args.target_amount,
      current_amount: args.current_amount || 0,
      target_date: args.target_date,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }
});

export const contribute = mutation({
  args: {
    goalId: v.id("savings_goals"),
    amount: v.float64()
  },
  handler: async (ctx, args) => {
    const goal = await ctx.db.get(args.goalId);
    if (!goal) throw new Error("Meta não encontrada");

    return await ctx.db.patch(args.goalId, {
      current_amount: goal.current_amount + args.amount,
      updated_at: new Date().toISOString()
    });
  }
});

export const remove = mutation({
  args: {
    goalId: v.id("savings_goals")
  },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.goalId);
  }
});
