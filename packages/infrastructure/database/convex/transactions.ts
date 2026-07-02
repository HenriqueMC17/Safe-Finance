import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    userId: v.id("users"),
    category: v.optional(v.string()),
    type: v.optional(v.string()),
    limit: v.optional(v.number()),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let all = await ctx.db
      .query("transactions")
      .withIndex("by_user", (q) => q.eq("user_id", args.userId))
      .order("desc")
      .collect();

    if (args.category && args.category !== "all") {
      all = all.filter((t) => t.category === args.category);
    }
    if (args.type && args.type !== "all") {
      all = all.filter((t) => t.type === args.type);
    }
    if (args.limit) {
      all = all.slice(0, args.limit);
    }
    if (args.startDate) {
      all = all.filter((t) => t.date >= args.startDate!);
    }
    if (args.endDate) {
      all = all.filter((t) => t.date <= args.endDate!);
    }

    // Fetch account names
    const result = await Promise.all(
      all.map(async (tx) => {
        const account = tx.account_id ? await ctx.db.get(tx.account_id) : null;
        return { ...tx, accountName: account?.name };
      })
    );

    return result;
  },
});

export const add = mutation({
  args: {
    userId: v.id("users"),
    accountId: v.optional(v.id("accounts")),
    description: v.string(),
    amount: v.float64(),
    type: v.string(),
    category: v.optional(v.string()),
    date: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const txId = await ctx.db.insert("transactions", {
      user_id: args.userId,
      account_id: args.accountId,
      description: args.description,
      amount: args.amount,
      type: args.type,
      category: args.category || "Geral",
      date: args.date || new Date().toISOString(),
      created_at: new Date().toISOString(),
    });

    // Update account balance if provided
    if (args.accountId) {
      const account = await ctx.db.get(args.accountId);
      if (account) {
        const balanceChange = args.type === "credit" ? args.amount : -args.amount;
        await ctx.db.patch(args.accountId, {
          balance: account.balance + balanceChange,
          updated_at: new Date().toISOString(),
        });
      }
    }

    return txId;
  },
});

