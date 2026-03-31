import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { transactions, accounts } from "@/lib/schema"
import { eq, desc } from "drizzle-orm"
import { subMonths, addMonths, format } from "date-fns"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const months = Number.parseInt(searchParams.get("months") || "6")

    if (!userId) {
      return NextResponse.json({ error: "ID do usuário é obrigatório" }, { status: 400 })
    }

    // Buscar contas do usuário
    const userAccounts = await db
      .select()
      .from(accounts)
      .where(eq(accounts.user_id, Number.parseInt(userId)))
    const accountIds = userAccounts.map((acc) => acc.id)

    if (accountIds.length === 0) {
      return NextResponse.json({
        forecast: [],
        trends: { income: 0, expenses: 0, balance: 0 },
        recommendations: [],
      })
    }

    // Buscar transações dos últimos 12 meses para análise
    const analysisStartDate = subMonths(new Date(), 12)
    const historicalTransactions = await db
      .select()
      .from(transactions)
      .where(eq(transactions.account_id, accountIds[0]))
      .orderBy(desc(transactions.date))

    // Agrupar transações por mês
    const monthlyData: Record<string, { income: number; expenses: number; balance: number }> = {}

    historicalTransactions.forEach((transaction) => {
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

    // Calcular médias para previsão
    const monthlyEntries = Object.values(monthlyData)
    const avgIncome = monthlyEntries.reduce((sum, data) => sum + data.income, 0) / monthlyEntries.length || 0
    const avgExpenses = monthlyEntries.reduce((sum, data) => sum + data.expenses, 0) / monthlyEntries.length || 0
    const avgBalance = avgIncome - avgExpenses

    // Calcular tendências (últimos 3 meses vs 3 meses anteriores)
    const recentMonths = Object.entries(monthlyData)
      .sort(([a], [b]) => b.localeCompare(a))
      .slice(0, 3)
      .map(([, data]) => data)

    const previousMonths = Object.entries(monthlyData)
      .sort(([a], [b]) => b.localeCompare(a))
      .slice(3, 6)
      .map(([, data]) => data)

    const recentAvgIncome = recentMonths.reduce((sum, data) => sum + data.income, 0) / recentMonths.length || 0
    const recentAvgExpenses = recentMonths.reduce((sum, data) => sum + data.expenses, 0) / recentMonths.length || 0
    const previousAvgIncome = previousMonths.reduce((sum, data) => sum + data.income, 0) / previousMonths.length || 0
    const previousAvgExpenses =
      previousMonths.reduce((sum, data) => sum + data.expenses, 0) / previousMonths.length || 0

    const incomeTrend = previousAvgIncome > 0 ? ((recentAvgIncome - previousAvgIncome) / previousAvgIncome) * 100 : 0
    const expensesTrend =
      previousAvgExpenses > 0 ? ((recentAvgExpenses - previousAvgExpenses) / previousAvgExpenses) * 100 : 0

    // Gerar previsões para os próximos meses
    const currentBalance = userAccounts.reduce((sum, acc) => sum + Number(acc.balance), 0)
    const forecast = []
    let projectedBalance = currentBalance

    for (let i = 1; i <= months; i++) {
      const futureDate = addMonths(new Date(), i)

      // Aplicar tendências às médias
      const trendFactor = 1 + i * 0.01 // Pequeno fator de crescimento
      const projectedIncome = avgIncome * trendFactor * (1 + incomeTrend / 100)
      const projectedExpenses = avgExpenses * trendFactor * (1 + expensesTrend / 100)
      const monthlyBalance = projectedIncome - projectedExpenses

      projectedBalance += monthlyBalance

      forecast.push({
        month: format(futureDate, "yyyy-MM"),
        monthName: format(futureDate, "MMM yyyy"),
        projectedIncome: Math.round(projectedIncome),
        projectedExpenses: Math.round(projectedExpenses),
        projectedBalance: Math.round(projectedBalance),
        monthlyBalance: Math.round(monthlyBalance),
      })
    }

    // Gerar recomendações baseadas na análise
    const recommendations = []

    if (avgBalance < 0) {
      recommendations.push({
        type: "warning",
        title: "Saldo Negativo Projetado",
        description: "Suas despesas estão superando a receita. Considere reduzir gastos ou aumentar a renda.",
        priority: "high",
      })
    }

    if (expensesTrend > 10) {
      recommendations.push({
        type: "warning",
        title: "Crescimento de Despesas",
        description: `Suas despesas aumentaram ${expensesTrend.toFixed(1)}% recentemente. Monitore seus gastos.`,
        priority: "medium",
      })
    }

    if (incomeTrend > 5) {
      recommendations.push({
        type: "success",
        title: "Crescimento de Receita",
        description: `Sua receita aumentou ${incomeTrend.toFixed(1)}%! Considere investir o excedente.`,
        priority: "low",
      })
    }

    if (projectedBalance < avgExpenses * 3) {
      recommendations.push({
        type: "info",
        title: "Reserva de Emergência",
        description: "Considere aumentar sua reserva de emergência para 3-6 meses de gastos.",
        priority: "medium",
      })
    }

    return NextResponse.json({
      forecast,
      trends: {
        income: Math.round(incomeTrend * 100) / 100,
        expenses: Math.round(expensesTrend * 100) / 100,
        balance:
          Math.round((recentAvgIncome - recentAvgExpenses - (previousAvgIncome - previousAvgExpenses)) * 100) / 100,
      },
      averages: {
        income: Math.round(avgIncome),
        expenses: Math.round(avgExpenses),
        balance: Math.round(avgBalance),
      },
      recommendations,
    })
  } catch (error) {
    console.error("Erro ao gerar previsões:", error)
    return NextResponse.json({ error: "Erro ao gerar previsões financeiras" }, { status: 500 })
  }
}
