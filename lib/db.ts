import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

// Inicializa o cliente SQL do Neon
export const sql = neon(process.env.DATABASE_URL!)

// Inicializa o cliente Drizzle ORM
export const db = drizzle(sql)

// Função auxiliar para executar consultas SQL diretamente
export async function executeQuery<T = any>(query: string, params: any[] = []): Promise<T[]> {
  try {
    return (await sql(query, params)) as T[]
  } catch (error) {
    console.error("Erro ao executar consulta SQL:", error)
    throw error
  }
}
