import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { accounts, transactions, savings_goals, budgets } from "@/lib/schema"
import { eq, desc, and, gte, lte } from "drizzle-orm"
import { format, subMonths } from "date-fns"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const period = searchParams.get("period") || "6months"

    if (!userId) {
      return NextResponse.json({ error: "ID do usuário é obrigatório" }, { status: 400 })
    }

    const userIdNum = Number.parseInt(userId)

    // Definir período de análise
    let startDate: Date
    switch (period) {
      case "1month":
        startDate = subMonths(new Date(), 1)
        break
      case "3months":
        startDate = subMonths(new Date(), 3)
        break
      case "1year":
        startDate = subMonths(new Date(), 12)
        break
      default:
        startDate = subMonths(new Date(), 6)
    }

    // Buscar contas do usuário
    const userAccounts = await db.select().from(accounts).where(eq(accounts.user_id, userIdNum))

    const accountIds = userAccounts.map((acc) => acc.id)

    // Buscar transações do período
    const periodTransactions =
      accountIds.length > 0
        ? await db
            .select()
            .from(transactions)
            .where(and(eq(transactions.account_id, accountIds[0]), gte(transactions.date, startDate)))
            .orderBy(desc(transactions.date))
        : []

    // Buscar metas de economia
    const userSavingsGoals = await db.select().from(savings_goals).where(eq(savings_goals.user_id, userIdNum))

    // Buscar orçamentos
    const userBudgets = await db.select().from(budgets).where(eq(budgets.user_id, userIdNum))

    // Calcular métricas principais
    const totalBalance = userAccounts.reduce((sum, acc) => sum + Number(acc.balance), 0)

    const totalIncome = periodTransactions
      .filter((t) => Number(t.amount) > 0)
      .reduce((sum, t) => sum + Number(t.amount), 0)

    const totalExpenses = periodTransactions
      .filter((t) => Number(t.amount) < 0)
      .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0)

    // Análise por categoria
    const expensesByCategory: Record<string, number> = {}
    const incomeByCategory: Record<string, number> = {}

    periodTransactions.forEach((transaction) => {
      const category = transaction.category || "Outros"
      const amount = Number(transaction.amount)

      if (amount < 0) {
        expensesByCategory[category] = (expensesByCategory[category] || 0) + Math.abs(amount)
      } else {
        incomeByCategory[category] = (incomeByCategory[category] || 0) + amount
      }
    })

    // Análise mensal
    const monthlyData: Record<string, { income: number; expenses: number; balance: number }> = {}

    periodTransactions.forEach((transaction) => {
      const month = format(new Date(transaction.date), "yyyy-MM")
      const amount = Number(transaction.amount)

      if (!monthlyData[month]) {
        monthlyData[month] = { income: 0, expenses: 0, balance: 0 }
      }

      if (amount > 0) {
        monthlyData[month].income += amount
      } else {
        monthlyData[month].expenses += Math.abs(amount)
      }
    })

    // Calcular saldo mensal
    Object.keys(monthlyData).forEach((month) => {
      monthlyData[month].balance = monthlyData[month].income - monthlyData[month].expenses
    })

    // Análise de metas
    const goalsAnalysis = userSavingsGoals.map((goal) => {
      const progress =
        Number(goal.target_amount) > 0 ? (Number(goal.current_amount) / Number(goal.target_amount)) * 100 : 0

      return {
        id: goal.id,
        name: goal.name,
        current: Number(goal.current_amount),
        target: Number(goal.target_amount),
        progress: Math.round(progress * 100) / 100,
        remaining: Number(goal.target_amount) - Number(goal.current_amount),
      }
    })

    // Análise de orçamentos
    const budgetAnalysis = userBudgets.map((budget) => {
      const categoryExpenses = expensesByCategory[budget.category] || 0
      const budgetAmount = Number(budget.amount)
      const usage = budgetAmount > 0 ? (categoryExpenses / budgetAmount) * 100 : 0

      return {
        id: budget.id,
        category: budget.category,
        budgeted: budgetAmount,
        spent: categoryExpenses,
        remaining: Math.max(0, budgetAmount - categoryExpenses),
        usage: Math.round(usage * 100) / 100,
        status: usage > 100 ? "exceeded" : usage > 80 ? "warning" : "good",
      }
    })

    // Tendências (comparação com período anterior)
    const previousPeriodStart = subMonths(startDate, 6)
    const previousTransactions =
      accountIds.length > 0
        ? await db
            .select()
            .from(transactions)
            .where(
              and(
                eq(transactions.account_id, accountIds[0]),
                gte(transactions.date, previousPeriodStart),
                lte(transactions.date, startDate),
              ),
            )
        : []

    const previousIncome = previousTransactions
      .filter((t) => Number(t.amount) > 0)
      .reduce((sum, t) => sum + Number(t.amount), 0)

    const previousExpenses = previousTransactions
      .filter((t) => Number(t.amount) < 0)
      .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0)

    const trends = {
      income: previousIncome > 0 ? ((totalIncome - previousIncome) / previousIncome) * 100 : 0,
      expenses: previousExpenses > 0 ? ((totalExpenses - previousExpenses) / previousExpenses) * 100 : 0,
      balance: totalIncome - totalExpenses - (previousIncome - previousExpenses),
    }

    // Insights automáticos
    const insights = []

    if (totalExpenses > totalIncome) {
      insights.push({
        type: "warning",
        title: "Gastos Excedem Receitas",
        description: `Seus gastos (R$ ${totalExpenses.toFixed(2)}) estão R$ ${(totalExpenses - totalIncome).toFixed(2)} acima da receita.`,
      })
    }

    const topExpenseCategory = Object.entries(expensesByCategory).sort(([, a], [, b]) => b - a)[0]

    if (topExpenseCategory && topExpenseCategory[1] > totalIncome * 0.4) {
      insights.push({
        type: "info",
        title: "Categoria de Alto Gasto",
        description: `${topExpenseCategory[0]} representa ${((topExpenseCategory[1] / totalIncome) * 100).toFixed(1)}% da sua receita.`,
      })
    }

    if (totalBalance < totalExpenses * 3) {
      insights.push({
        type: "warning",
        title: "Reserva de Emergência Baixa",
        description: "Recomenda-se ter pelo menos 3-6 meses de gastos como reserva de emergência.",
      })
    }

    return NextResponse.json({
      period,
      summary: {
        totalBalance,
        totalIncome,
        totalExpenses,
        netIncome: totalIncome - totalExpenses,
        accountsCount: userAccounts.length,
        transactionsCount: periodTransactions.length,
      },
      categories: {
        expenses: expensesByCategory,
        income: incomeByCategory,
      },
      monthly: monthlyData,
      goals: goalsAnalysis,
      budgets: budgetAnalysis,
      trends,
      insights,
    })
  } catch (error) {
    console.error("Erro ao gerar analytics:", error)
    return NextResponse.json(
      {
        error: "Erro ao gerar relatório de analytics",
      },
      { status: 500 },
    )
  }
}
