import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { financial_insights } from "@/lib/schema"
import { eq } from "drizzle-orm"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "userId é obrigatório" }, { status: 400 })
    }

    const insights = await db
      .select()
      .from(financial_insights)
      .where(eq(financial_insights.user_id, Number.parseInt(userId)))
      .orderBy(financial_insights.created_at)

    return NextResponse.json({ insights })
  } catch (error) {
    console.error("Erro ao buscar insights:", error)
    return NextResponse.json({ error: "Erro ao buscar insights" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { user_id, title, content, category } = body

    if (!user_id || !title || !content || !category) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 })
    }

    const result = await db
      .insert(financial_insights)
      .values({
        user_id,
        title,
        content,
        category,
      })
      .returning()

    return NextResponse.json({ insight: result[0] })
  } catch (error) {
    console.error("Erro ao criar insight:", error)
    return NextResponse.json({ error: "Erro ao criar insight" }, { status: 500 })
  }
}
