import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { savings_goals } from "@/lib/schema"
import { eq, desc } from "drizzle-orm"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "ID do usuário é obrigatório" }, { status: 400 })
    }

    const userGoals = await db
      .select()
      .from(savings_goals)
      .where(eq(savings_goals.user_id, Number.parseInt(userId)))
      .orderBy(desc(savings_goals.created_at))

    // Calcular estatísticas
    const totalTarget = userGoals.reduce((sum, goal) => sum + Number(goal.target_amount), 0)
    const totalSaved = userGoals.reduce((sum, goal) => sum + Number(goal.current_amount), 0)
    const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0

    // Adicionar progresso individual para cada meta
    const goalsWithProgress = userGoals.map((goal) => {
      const progress =
        Number(goal.target_amount) > 0 ? (Number(goal.current_amount) / Number(goal.target_amount)) * 100 : 0

      const remaining = Number(goal.target_amount) - Number(goal.current_amount)

      let status = "active"
      if (progress >= 100) status = "completed"
      else if (goal.target_date && new Date(goal.target_date) < new Date()) status = "overdue"

      return {
        ...goal,
        progress: Math.round(progress * 100) / 100,
        remaining: Math.max(0, remaining),
        status,
      }
    })

    return NextResponse.json({
      goals: goalsWithProgress,
      statistics: {
        totalGoals: userGoals.length,
        totalTarget,
        totalSaved,
        overallProgress: Math.round(overallProgress * 100) / 100,
        completedGoals: goalsWithProgress.filter((g) => g.status === "completed").length,
      },
    })
  } catch (error) {
    console.error("Erro ao buscar metas:", error)
    return NextResponse.json({ error: "Erro ao buscar metas de economia" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, name, targetAmount, currentAmount = 0, targetDate } = body

    if (!userId || !name || !targetAmount) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 })
    }

    const newGoal = await db
      .insert(savings_goals)
      .values({
        user_id: userId,
        name,
        target_amount: Number(targetAmount),
        current_amount: Number(currentAmount),
        target_date: targetDate ? new Date(targetDate) : null,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning()

    return NextResponse.json({ goal: newGoal[0] })
  } catch (error) {
    console.error("Erro ao criar meta:", error)
    return NextResponse.json({ error: "Erro ao criar meta de economia" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, name, targetAmount, currentAmount, targetDate } = body

    if (!id) {
      return NextResponse.json({ error: "ID da meta é obrigatório" }, { status: 400 })
    }

    const updateData: any = {
      updated_at: new Date(),
    }

    if (name) updateData.name = name
    if (targetAmount !== undefined) updateData.target_amount = Number(targetAmount)
    if (currentAmount !== undefined) updateData.current_amount = Number(currentAmount)
    if (targetDate) updateData.target_date = new Date(targetDate)

    const updatedGoal = await db.update(savings_goals).set(updateData).where(eq(savings_goals.id, id)).returning()

    if (!updatedGoal.length) {
      return NextResponse.json({ error: "Meta não encontrada" }, { status: 404 })
    }

    return NextResponse.json({ goal: updatedGoal[0] })
  } catch (error) {
    console.error("Erro ao atualizar meta:", error)
    return NextResponse.json({ error: "Erro ao atualizar meta" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID da meta é obrigatório" }, { status: 400 })
    }

    const deletedGoal = await db
      .delete(savings_goals)
      .where(eq(savings_goals.id, Number.parseInt(id)))
      .returning()

    if (!deletedGoal.length) {
      return NextResponse.json({ error: "Meta não encontrada" }, { status: 404 })
    }

    return NextResponse.json({ message: "Meta excluída com sucesso" })
  } catch (error) {
    console.error("Erro ao excluir meta:", error)
    return NextResponse.json({ error: "Erro ao excluir meta" }, { status: 500 })
  }
}
