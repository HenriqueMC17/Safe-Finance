import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    userId: v.id("users"),
    status: v.optional(v.string()),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query("invoices").withIndex("by_user", (q) => q.eq("user_id", args.userId))

    const invoices = await q.collect()
    let filtered = invoices
    if (args.status && args.status !== "all") {
      filtered = invoices.filter((inv) => inv.status === args.status)
    }

    if (args.startDate) {
      filtered = filtered.filter((inv) => inv.issue_date >= args.startDate!)
    }
    if (args.endDate) {
      filtered = filtered.filter((inv) => inv.issue_date <= args.endDate!)
    }

    // Order por due_date
    filtered.sort((a, b) => new Date(b.due_date).getTime() - new Date(a.due_date).getTime())

    return filtered
  },
});

export const add = mutation({
  args: {
    userId: v.id("users"),
    client: v.string(),
    amount: v.float64(),
    issueDate: v.string(),
    dueDate: v.string()
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("invoices", {
      user_id: args.userId,
      client: args.client,
      amount: args.amount,
      issue_date: args.issueDate,
      due_date: args.dueDate,
      status: "pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }
});

export const updateStatus = mutation({
  args: {
    invoiceId: v.id("invoices"),
    status: v.string()
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.invoiceId, {
      status: args.status,
      updated_at: new Date().toISOString()
    });
  }
});

export const remove = mutation({
  args: {
    invoiceId: v.id("invoices")
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.invoiceId);
  }
});
