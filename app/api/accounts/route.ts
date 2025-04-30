import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { accounts } from "@/lib/schema"
import { eq } from "drizzle-orm"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    let query = db.select().from(accounts)

    if (userId) {
      query = query.where(eq(accounts.user_id, Number.parseInt(userId)))
    }

    const result = await query

    return NextResponse.json({ accounts: result })
  } catch (error) {
    console.error("Erro ao buscar contas:", error)
    return NextResponse.json({ error: "Erro ao buscar contas" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { user_id, name, type, balance, currency } = body

    if (!user_id || !name || !type) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 })
    }

    const result = await db
      .insert(accounts)
      .values({
        user_id,
        name,
        type,
        balance: balance || 0,
        currency: currency || "BRL",
      })
      .returning()

    return NextResponse.json({ account: result[0] })
  } catch (error) {
    console.error("Erro ao criar conta:", error)
    return NextResponse.json({ error: "Erro ao criar conta" }, { status: 500 })
  }
}
