import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { invoices } from "@/lib/schema"
import { eq } from "drizzle-orm"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "userId é obrigatório" }, { status: 400 })
    }

    const result = await db
      .select()
      .from(invoices)
      .where(eq(invoices.user_id, Number.parseInt(userId)))
      .orderBy(invoices.due_date)

    return NextResponse.json({ invoices: result })
  } catch (error) {
    console.error("Erro ao buscar faturas:", error)
    return NextResponse.json({ error: "Erro ao buscar faturas" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { user_id, client, amount, issue_date, due_date, status } = body

    if (!user_id || !client || !amount || !issue_date || !due_date || !status) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 })
    }

    const result = await db
      .insert(invoices)
      .values({
        user_id,
        client,
        amount,
        issue_date: new Date(issue_date),
        due_date: new Date(due_date),
        status,
      })
      .returning()

    return NextResponse.json({ invoice: result[0] })
  } catch (error) {
    console.error("Erro ao criar fatura:", error)
    return NextResponse.json({ error: "Erro ao criar fatura" }, { status: 500 })
  }
}
