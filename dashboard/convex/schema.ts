import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    password_hash: v.string(),
    created_at: v.optional(v.number()),
    updated_at: v.optional(v.number()),
  }).index("by_email", ["email"]),
  
  accounts: defineTable({
    user_id: v.id("users"),
    name: v.string(),
    type: v.string(),
    balance: v.float64(),
    currency: v.string(),
    created_at: v.optional(v.number()),
    updated_at: v.optional(v.number()),
  }).index("by_user", ["user_id"]),
  
  transactions: defineTable({
    account_id: v.id("accounts"),
    description: v.string(),
    amount: v.float64(),
    type: v.string(), // 'income' | 'expense'
    category: v.optional(v.string()),
    date: v.number(),
    created_at: v.optional(v.number()),
  }).index("by_account", ["account_id"]),
  
  savings_goals: defineTable({
    user_id: v.id("users"),
    name: v.string(),
    target_amount: v.float64(),
    current_amount: v.float64(),
    target_date: v.optional(v.string()),
    created_at: v.optional(v.number()),
    updated_at: v.optional(v.number()),
  }).index("by_user", ["user_id"]),
  
  invoices: defineTable({
    user_id: v.id("users"),
    client: v.string(),
    amount: v.float64(),
    issue_date: v.string(),
    due_date: v.string(),
    status: v.string(), // 'pending' | 'paid' | 'overdue'
    created_at: v.optional(v.number()),
    updated_at: v.optional(v.number()),
  }).index("by_user", ["user_id"]),
  
  financial_insights: defineTable({
    user_id: v.id("users"),
    title: v.string(),
    content: v.string(),
    category: v.string(),
    created_at: v.optional(v.number()),
  }).index("by_user", ["user_id"]),
  
  budgets: defineTable({
    user_id: v.id("users"),
    category: v.string(),
    amount: v.float64(),
    period: v.string(),
    start_date: v.string(),
    end_date: v.optional(v.string()),
    created_at: v.optional(v.number()),
    updated_at: v.optional(v.number()),
  }).index("by_user", ["user_id"]),
});
