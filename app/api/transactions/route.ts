import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { transactions, accounts } from "@/lib/schema"
import { eq, desc, between, sql as sqlBuilder } from "drizzle-orm"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const accountId = searchParams.get("accountId")
    const userId = searchParams.get("userId")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    const category = searchParams.get("category")
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : 20

    let query = db.select().from(transactions)

    // Filtrar por conta específica
    if (accountId) {
      query = query.where(eq(transactions.account_id, Number.parseInt(accountId)))
    }

    // Filtrar por usuário (requer join com accounts)
    if (userId && !accountId) {
      query = query
        .innerJoin(accounts, eq(transactions.account_id, accounts.id))
        .where(eq(accounts.user_id, Number.parseInt(userId)))
        .orderBy(desc(transactions.date))
    }

    // Filtrar por intervalo de datas
    if (startDate && endDate) {
      query = query.where(between(transactions.date, new Date(startDate), new Date(endDate)))
    }

    // Filtrar por categoria
    if (category) {
      query = query.where(eq(transactions.category, category))
    }

    const result = await query.limit(limit)

    return NextResponse.json({ transactions: result })
  } catch (error) {
    console.error("Erro ao buscar transações:", error)
    return NextResponse.json({ error: "Erro ao buscar transações" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { account_id, description, amount, type, category, date } = body

    if (!account_id || !description || !amount || !type || !date) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 })
    }

    // Verificar se a conta existe
    const accountExists = await db.select().from(accounts).where(eq(accounts.id, account_id)).limit(1)

    if (accountExists.length === 0) {
      return NextResponse.json({ error: "Conta não encontrada" }, { status: 404 })
    }

    // Iniciar uma transação para garantir consistência
    const result = await db.transaction(async (tx) => {
      // Inserir a transação
      const newTransaction = await tx
        .insert(transactions)
        .values({
          account_id,
          description,
          amount,
          type,
          category,
          date: new Date(date),
        })
        .returning()

      // Atualizar o saldo da conta
      const amountValue = Number.parseFloat(amount.toString())
      const balanceChange = type === "credit" ? amountValue : -amountValue

      await tx
        .update(accounts)
        .set({
          balance: sqlBuilder`${accounts.balance} + ${balanceChange}`,
          updated_at: new Date(),
        })
        .where(eq(accounts.id, account_id))

      return newTransaction
    })

    return NextResponse.json({ transaction: result[0] })
  } catch (error) {
    console.error("Erro ao criar transação:", error)
    return NextResponse.json({ error: "Erro ao criar transação" }, { status: 500 })
  }
}
