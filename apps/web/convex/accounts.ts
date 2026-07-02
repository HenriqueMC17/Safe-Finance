import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    userId: v.id("users")
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("accounts")
      .withIndex("by_user", (q) => q.eq("user_id", args.userId))
      .collect();
  }
});

export const getById = query({
  args: {
    accountId: v.id("accounts")
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.accountId);
  }
});

export const add = mutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
    type: v.string(),
    balance: v.float64(),
    currency: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("accounts", {
      user_id: args.userId,
      name: args.name,
      type: args.type,
      balance: args.balance,
      currency: args.currency || "BRL",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }
});

