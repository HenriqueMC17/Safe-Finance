import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { budgets } from "@/lib/schema"
import { eq, and, gte, lte } from "drizzle-orm"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    if (!userId) {
      return NextResponse.json({ error: "ID do usuário é obrigatório" }, { status: 400 })
    }

    let query = db
      .select()
      .from(budgets)
      .where(eq(budgets.user_id, Number.parseInt(userId)))

    if (startDate && endDate) {
      query = query.where(
        and(
          gte(budgets.start_date, new Date(startDate)),
          lte(budgets.end_date || new Date("9999-12-31"), new Date(endDate)),
        ),
      )
    }

    const userBudgets = await query.orderBy(budgets.category)
    return NextResponse.json(userBudgets)
  } catch (error) {
    console.error("Erro ao buscar orçamentos:", error)
    return NextResponse.json({ error: "Erro ao buscar orçamentos" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, category, amount, period, startDate, endDate } = body

    if (!userId || !category || !amount || !period || !startDate) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 })
    }

    const newBudget = await db
      .insert(budgets)
      .values({
        user_id: userId,
        category,
        amount,
        period,
        start_date: new Date(startDate),
        end_date: endDate ? new Date(endDate) : null,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning()

    return NextResponse.json(newBudget[0])
  } catch (error) {
    console.error("Erro ao criar orçamento:", error)
    return NextResponse.json({ error: "Erro ao criar orçamento" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, category, amount, period, startDate, endDate } = body

    if (!id) {
      return NextResponse.json({ error: "ID do orçamento é obrigatório" }, { status: 400 })
    }

    const updateData: any = {
      updated_at: new Date(),
    }

    if (category) updateData.category = category
    if (amount) updateData.amount = amount
    if (period) updateData.period = period
    if (startDate) updateData.start_date = new Date(startDate)
    if (endDate) updateData.end_date = new Date(endDate)

    const updatedBudget = await db.update(budgets).set(updateData).where(eq(budgets.id, id)).returning()

    if (!updatedBudget.length) {
      return NextResponse.json({ error: "Orçamento não encontrado" }, { status: 404 })
    }

    return NextResponse.json(updatedBudget[0])
  } catch (error) {
    console.error("Erro ao atualizar orçamento:", error)
    return NextResponse.json({ error: "Erro ao atualizar orçamento" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID do orçamento é obrigatório" }, { status: 400 })
    }

    const deletedBudget = await db
      .delete(budgets)
      .where(eq(budgets.id, Number.parseInt(id)))
      .returning()

    if (!deletedBudget.length) {
      return NextResponse.json({ error: "Orçamento não encontrado" }, { status: 404 })
    }

    return NextResponse.json({ message: "Orçamento excluído com sucesso" })
  } catch (error) {
    console.error("Erro ao excluir orçamento:", error)
    return NextResponse.json({ error: "Erro ao excluir orçamento" }, { status: 500 })
  }
}
