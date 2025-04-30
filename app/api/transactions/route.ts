import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { transactions } from "@/lib/schema"
import { eq } from "drizzle-orm"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const accountId = searchParams.get("accountId")

    let query = db.select().from(transactions)

    if (accountId) {
      query = query.where(eq(transactions.account_id, Number.parseInt(accountId)))
    }

    const result = await query.orderBy(transactions.date)

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

    const result = await db
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

    return NextResponse.json({ transaction: result[0] })
  } catch (error) {
    console.error("Erro ao criar transação:", error)
    return NextResponse.json({ error: "Erro ao criar transação" }, { status: 500 })
  }
}
