import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("financial_forecasts")
      .withIndex("by_user", (q) => q.eq("user_id", args.userId))
      .order("desc")
      .collect();
  },
});

export const createBatch = mutation({
  args: {
    userId: v.id("users"),
    forecasts: v.array(
      v.object({
        forecast_type: v.string(),
        amount: v.number(),
        confidence: v.number(),
        forecast_date: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const insertPromises = args.forecasts.map((f) =>
      ctx.db.insert("financial_forecasts", {
        user_id: args.userId,
        forecast_type: f.forecast_type,
        amount: f.amount,
        confidence: f.confidence,
        forecast_date: f.forecast_date,
        created_at: new Date().toISOString(),
      })
    );
    return await Promise.all(insertPromises);
  },
});
