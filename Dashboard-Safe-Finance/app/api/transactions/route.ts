import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { transactions, accounts } from "@/lib/schema"
import { eq, desc, between, sql as sqlBuilder, and } from "drizzle-orm"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const accountId = searchParams.get("accountId")
    const userId = searchParams.get("userId")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    const category = searchParams.get("category")
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : 20

    const conditions = []

    // Filtrar por conta específica
    if (accountId) {
      conditions.push(eq(transactions.account_id, Number.parseInt(accountId)))
    }

    // Filtrar por intervalo de datas
    if (startDate && endDate) {
      conditions.push(between(transactions.date, new Date(startDate), new Date(endDate)))
    }

    // Filtrar por categoria
    if (category) {
      conditions.push(eq(transactions.category, category))
    }

    let query = db.select().from(transactions).limit(limit)

    if (userId && !accountId) {
      query = db
        .select()
        .from(transactions)
        .innerJoin(accounts, eq(transactions.account_id, accounts.id))
        .where(
          and(
            eq(accounts.user_id, Number.parseInt(userId)),
            ...conditions
          )
        )
        .orderBy(desc(transactions.date))
        .limit(limit) as any;
    } else {
      query = query.where(and(...conditions)).orderBy(desc(transactions.date)) as any;
    }

    const result = await query

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
