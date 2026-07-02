import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {
    userId: v.id("users"),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const budgets = await ctx.db
      .query("budgets")
      .withIndex("by_user", (q) => q.eq("user_id", args.userId))
      .collect();

    let filtered = budgets;
    if (args.startDate) {
      filtered = filtered.filter((b) => b.start_date >= args.startDate!);
    }
    if (args.endDate) {
      filtered = filtered.filter((b) => b.start_date <= args.endDate!);
    }

    // Enhance each budget with the spent amount from transactions
    const extendedBudgets = await Promise.all(
      filtered.map(async (budget) => {
        const transactions = await ctx.db
          .query("transactions")
          .withIndex("by_user", (q) => q.eq("user_id", args.userId))
          .filter((q) => 
            q.and(
              q.eq(q.field("category"), budget.category),
              q.gte(q.field("date"), budget.start_date),
              budget.end_date ? q.lte(q.field("date"), budget.end_date) : true
            )
          )
          .collect();

        const spentAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
        
        return {
          ...budget,
          spent_amount: spentAmount,
        };
      })
    );

    return extendedBudgets;
  },
});

export const create = mutation({
  args: {
    userId: v.id("users"),
    category: v.string(),
    amount: v.number(),
    period: v.string(),
    startDate: v.string(),
    endDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const budgetId = await ctx.db.insert("budgets", {
      user_id: args.userId,
      category: args.category,
      amount: args.amount,
      period: args.period,
      start_date: args.startDate,
      end_date: args.endDate,
    });
    return budgetId;
  },
});

export const update = mutation({
  args: {
    id: v.id("budgets"),
    category: v.optional(v.string()),
    amount: v.optional(v.number()),
    period: v.optional(v.string()),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    // Convert to snake_case to match schema
    const data: any = {};
    if (updates.category !== undefined) data.category = updates.category;
    if (updates.amount !== undefined) data.amount = updates.amount;
    if (updates.period !== undefined) data.period = updates.period;
    if (updates.startDate !== undefined) data.start_date = updates.startDate;
    if (updates.endDate !== undefined) data.end_date = updates.endDate;

    await ctx.db.patch(id, data);
    return id;
  },
});

export const remove = mutation({
  args: {
    id: v.id("budgets"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
