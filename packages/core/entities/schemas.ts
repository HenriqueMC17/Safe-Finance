import { z } from "zod";

export const UserSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const AccountSchema = z.object({
  id: z.number().int().optional(),
  user_id: z.number().int(),
  name: z.string().min(1, "Nome da conta é obrigatório"),
  type: z.string(),
  balance: z.string().or(z.number()),
  currency: z.string().default("BRL"),
});

export const TransactionSchema = z.object({
  id: z.number().int().optional(),
  account_id: z.number().int(),
  description: z.string().min(1, "Descrição é obrigatória"),
  amount: z.string().or(z.number()),
  type: z.enum(["income", "expense"]),
  category: z.string().optional(),
  date: z.date().or(z.string()),
});

export type User = z.infer<typeof UserSchema>;
export type Account = z.infer<typeof AccountSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
