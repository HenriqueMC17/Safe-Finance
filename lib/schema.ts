import { pgTable, serial, text, varchar, timestamp, integer, numeric, date } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  password_hash: varchar("password_hash").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
})

export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name").notNull(),
  type: varchar("type").notNull(),
  balance: numeric("balance").notNull().default("0"),
  currency: varchar("currency").notNull().default("BRL"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
})

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  account_id: integer("account_id").references(() => accounts.id, { onDelete: "cascade" }),
  description: varchar("description").notNull(),
  amount: numeric("amount").notNull(),
  type: varchar("type").notNull(),
  category: varchar("category"),
  date: timestamp("date").notNull(),
  created_at: timestamp("created_at").defaultNow(),
})

export const savings_goals = pgTable("savings_goals", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name").notNull(),
  target_amount: numeric("target_amount").notNull(),
  current_amount: numeric("current_amount").notNull().default("0"),
  target_date: date("target_date"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
})

export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  client: varchar("client").notNull(),
  amount: numeric("amount").notNull(),
  issue_date: date("issue_date").notNull(),
  due_date: date("due_date").notNull(),
  status: varchar("status").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
})

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  invoice_id: integer("invoice_id").references(() => invoices.id, { onDelete: "set null" }),
  amount: numeric("amount").notNull(),
  method: varchar("method").notNull(),
  status: varchar("status").notNull(),
  payment_date: timestamp("payment_date").notNull(),
  created_at: timestamp("created_at").defaultNow(),
})

export const financial_insights = pgTable("financial_insights", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title").notNull(),
  content: text("content").notNull(),
  category: varchar("category").notNull(),
  created_at: timestamp("created_at").defaultNow(),
})
