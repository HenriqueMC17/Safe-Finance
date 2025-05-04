import { pgTable, serial, text, varchar, timestamp, integer, numeric, date } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

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

// Nova tabela para orçamentos
export const budgets = pgTable("budgets", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  category: varchar("category").notNull(),
  amount: numeric("amount").notNull(),
  period: varchar("period").notNull(), // 'monthly', 'quarterly', 'annual'
  start_date: date("start_date").notNull(),
  end_date: date("end_date"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
})

// Nova tabela para previsões financeiras
export const financial_forecasts = pgTable("financial_forecasts", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  forecast_type: varchar("forecast_type").notNull(), // 'income', 'expense', 'balance'
  amount: numeric("amount").notNull(),
  confidence: numeric("confidence"), // 0-100%
  forecast_date: date("forecast_date").notNull(),
  created_at: timestamp("created_at").defaultNow(),
})

// Definir relações para consultas mais eficientes
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  savingsGoals: many(savings_goals),
  invoices: many(invoices),
  payments: many(payments),
  financialInsights: many(financial_insights),
  budgets: many(budgets),
  financialForecasts: many(financial_forecasts),
}))

export const accountsRelations = relations(accounts, ({ one, many }) => ({
  user: one(users, {
    fields: [accounts.user_id],
    references: [users.id],
  }),
  transactions: many(transactions),
}))

export const transactionsRelations = relations(transactions, ({ one }) => ({
  account: one(accounts, {
    fields: [transactions.account_id],
    references: [accounts.id],
  }),
}))

export const savingsGoalsRelations = relations(savings_goals, ({ one }) => ({
  user: one(users, {
    fields: [savings_goals.user_id],
    references: [users.id],
  }),
}))

export const invoicesRelations = relations(invoices, ({ one, many }) => ({
  user: one(users, {
    fields: [invoices.user_id],
    references: [users.id],
  }),
  payments: many(payments),
}))

export const paymentsRelations = relations(payments, ({ one }) => ({
  user: one(users, {
    fields: [payments.user_id],
    references: [users.id],
  }),
  invoice: one(invoices, {
    fields: [payments.invoice_id],
    references: [invoices.id],
  }),
}))

export const financialInsightsRelations = relations(financial_insights, ({ one }) => ({
  user: one(users, {
    fields: [financial_insights.user_id],
    references: [users.id],
  }),
}))

export const budgetsRelations = relations(budgets, ({ one }) => ({
  user: one(users, {
    fields: [budgets.user_id],
    references: [users.id],
  }),
}))

export const financialForecastsRelations = relations(financial_forecasts, ({ one }) => ({
  user: one(users, {
    fields: [financial_forecasts.user_id],
    references: [users.id],
  }),
}))
