import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

// Inicializa o cliente SQL do Neon
export const sql = neon(process.env.DATABASE_URL!)

// Inicializa o cliente Drizzle ORM
export const db = drizzle(sql, { schema })

// Função auxiliar para executar consultas SQL diretamente
export async function executeQuery<T = any>(query: string, params: any[] = []): Promise<T[]> {
  try {
    // Neon sql é um template literal tag. Para aceitar string simples precisamos de type casting ou
    // da forma correta sem parâmetros opcionais abertos.
    // Usando cast para any para evitar o TS2345 (Argument of type 'string' is not assignable to parameter of type 'TemplateStringsArray')
    return (await (sql as any)(query, params)) as T[]
  } catch (error) {
    console.error("Erro ao executar consulta SQL:", error)
    throw error
  }
}
