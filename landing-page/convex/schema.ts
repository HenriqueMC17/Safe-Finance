import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  leads: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    source: v.optional(v.string()),
    created_at: v.number(),
  }).index("by_email", ["email"]),
  
  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.string(),
    created_at: v.number(),
  }),
});
