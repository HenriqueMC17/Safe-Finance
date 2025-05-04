import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { budgets, transactions, users } from "@/lib/schema"
import { eq, and, gte, lte } from "drizzle-orm"
import { sendBudgetAlert } from "@/lib/email-service"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const checkAll = searchParams.get("checkAll") === "true"

    // Se checkAll for true, verificamos todos os usuários
    let userIds: number[] = []

    if (checkAll) {
      const allUsers = await db.select({ id: users.id }).from(users)
      userIds = allUsers.map((user) => user.id)
    } else if (userId) {
      userIds = [Number.parseInt(userId)]
    } else {
      return NextResponse.json({ error: "userId é obrigatório quando checkAll não é true" }, { status: 400 })
    }

    const alerts = []

    for (const id of userIds) {
      // Buscar todos os orçamentos ativos do usuário
      const userBudgets = await db
        .select()
        .from(budgets)
        .where(
          and(
            eq(budgets.user_id, id),
            lte(budgets.start_date, new Date()),
            gte(budgets.end_date || new Date("9999-12-31"), new Date()),
          ),
        )

      // Buscar o usuário para obter o email
      const user = await db.select().from(users).where(eq(users.id, id)).limit(1)

      if (!user.length) continue

      for (const budget of userBudgets) {
        // Calcular o período do orçamento
        const startDate = new Date(budget.start_date)
        const endDate = budget.end_date ? new Date(budget.end_date) : new Date()

        // Buscar transações na categoria do orçamento dentro do período
        const categoryTransactions = await db.query.transactions.findMany({
          where: and(
            eq(transactions.category, budget.category),
            gte(transactions.date, startDate),
            lte(transactions.date, endDate),
            eq(transactions.type, "debit"),
          ),
        })

        // Calcular o total gasto
        const totalSpent = categoryTransactions.reduce((sum, tx) => sum + Number(tx.amount), 0)

        // Calcular a porcentagem do orçamento utilizada
        const percentage = (totalSpent / Number(budget.amount)) * 100

        // Verificar se atingiu o limite para enviar alerta (80% ou 100%)
        if (percentage >= 80) {
          // Enviar email de alerta
          const emailResult = await sendBudgetAlert(
            user[0].email,
            user[0].name,
            budget.category,
            percentage,
            totalSpent,
            Number(budget.amount),
          )

          alerts.push({
            userId: id,
            budgetId: budget.id,
            category: budget.category,
            percentage,
            emailSent: emailResult.success,
          })
        }
      }
    }

    return NextResponse.json({ alerts })
  } catch (error) {
    console.error("Erro ao verificar alertas de orçamento:", error)
    return NextResponse.json({ error: "Erro ao verificar alertas de orçamento" }, { status: 500 })
  }
}
