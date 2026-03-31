import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
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
      created_at: Date.now(),
      updated_at: Date.now(),
    });
    return userId;
  },
});
