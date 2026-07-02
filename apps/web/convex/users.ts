import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
  },
});

export const addUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password_hash: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert("users", {
      ...args,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    return userId;
  },
});
