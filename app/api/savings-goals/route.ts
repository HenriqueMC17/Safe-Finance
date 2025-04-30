import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { savings_goals } from "@/lib/schema"
import { eq } from "drizzle-orm"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "userId é obrigatório" }, { status: 400 })
    }

    const goals = await db
      .select()
      .from(savings_goals)
      .where(eq(savings_goals.user_id, Number.parseInt(userId)))
      .orderBy(savings_goals.target_date)

    return NextResponse.json({ goals })
  } catch (error) {
    console.error("Erro ao buscar metas de economia:", error)
    return NextResponse.json({ error: "Erro ao buscar metas de economia" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { user_id, name, target_amount, current_amount, target_date } = body

    if (!user_id || !name || !target_amount || !target_date) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 })
    }

    const result = await db
      .insert(savings_goals)
      .values({
        user_id,
        name,
        target_amount,
        current_amount: current_amount || 0,
        target_date: new Date(target_date),
      })
      .returning()

    return NextResponse.json({ goal: result[0] })
  } catch (error) {
    console.error("Erro ao criar meta de economia:", error)
    return NextResponse.json({ error: "Erro ao criar meta de economia" }, { status: 500 })
  }
}
