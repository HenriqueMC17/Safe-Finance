import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { financial_forecasts, transactions, accounts } from "@/lib/schema"
import { eq, and, gte, desc } from "drizzle-orm"
import { format, addMonths } from "date-fns"

function calculateMovingAverage(values: number[], periods = 3): number {
  if (values.length === 0) return 0
  const relevantValues = values.slice(-periods)
  return relevantValues.reduce((sum, val) => sum + val, 0) / relevantValues.length
}

function generateForecast(historicalData: any[], months: number) {
  // Agrupar transações por mês
  const monthlyData: Record<string, { income: number; expense: number }> = {}

  historicalData.forEach((transaction) => {
    const month = format(new Date(transaction.date), "yyyy-MM")
    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expense: 0 }
    }

    if (transaction.amount > 0) {
      monthlyData[month].income += transaction.amount
    } else {
      monthlyData[month].expense += Math.abs(transaction.amount)
    }
  })

  // Calcular médias móveis
  const monthlyEntries = Object.entries(monthlyData).sort(([a], [b]) => a.localeCompare(b))
  const incomes = monthlyEntries.map(([, data]) => data.income)
  const expenses = monthlyEntries.map(([, data]) => data.expense)

  const avgIncome = calculateMovingAverage(incomes)
  const avgExpense = calculateMovingAverage(expenses)

  // Gerar previsões para os próximos meses
  const forecasts = []
  const currentDate = new Date()

  for (let i = 1; i <= months; i++) {
    const forecastDate = addMonths(currentDate, i)
    const month = format(forecastDate, "yyyy-MM")

    // Adicionar variação sazonal simples (±10%)
    const seasonalVariation = 0.9 + Math.random() * 0.2
    const projectedIncome = avgIncome * seasonalVariation
    const projectedExpense = avgExpense * seasonalVariation

    forecasts.push({
      month,
      income: Math.round(projectedIncome * 100) / 100,
      expense: Math.round(projectedExpense * 100) / 100,
      balance: Math.round((projectedIncome - projectedExpense) * 100) / 100,
      confidence: Math.max(60, 90 - i * 5), // Confiança diminui com o tempo
    })
  }

  return forecasts
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const forecastType = searchParams.get("type")

    if (!userId) {
      return NextResponse.json({ error: "ID do usuário é obrigatório" }, { status: 400 })
    }

    let query = db
      .select()
      .from(financial_forecasts)
      .where(eq(financial_forecasts.user_id, Number.parseInt(userId)))

    if (forecastType) {
      query = query.where(eq(financial_forecasts.forecast_type, forecastType))
    }

    const forecasts = await query.orderBy(financial_forecasts.forecast_date)
    return NextResponse.json(forecasts)
  } catch (error) {
    console.error("Erro ao buscar previsões:", error)
    return NextResponse.json({ error: "Erro ao buscar previsões" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, months = 3 } = body

    if (!userId) {
      return NextResponse.json({ error: "ID do usuário é obrigatório" }, { status: 400 })
    }

    // Buscar contas do usuário
    const userAccounts = await db.select().from(accounts).where(eq(accounts.user_id, userId))

    if (!userAccounts.length) {
      return NextResponse.json({ error: "Usuário não possui contas" }, { status: 400 })
    }

    // Buscar transações dos últimos 6 meses
    const accountIds = userAccounts.map((account) => account.id)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const recentTransactions = await db
      .select()
      .from(transactions)
      .where(
        and(
          accountIds.length > 0 ? eq(transactions.account_id, accountIds[0]) : undefined,
          gte(transactions.date, sixMonthsAgo),
        ),
      )
      .orderBy(desc(transactions.date))

    // Gerar previsões usando lógica matemática
    const forecasts = generateForecast(recentTransactions, months)

    // Excluir previsões anteriores
    await db.delete(financial_forecasts).where(eq(financial_forecasts.user_id, userId))

    // Salvar novas previsões
    const savedForecasts = []

    for (const forecast of forecasts) {
      const [year, month] = forecast.month.split("-")
      const forecastDate = new Date(Number.parseInt(year), Number.parseInt(month) - 1, 1)

      // Inserir previsão de receita
      const incomeForecast = await db
        .insert(financial_forecasts)
        .values({
          user_id: userId,
          forecast_type: "income",
          amount: forecast.income,
          confidence: forecast.confidence,
          forecast_date: forecastDate,
          created_at: new Date(),
        })
        .returning()

      // Inserir previsão de despesa
      const expenseForecast = await db
        .insert(financial_forecasts)
        .values({
          user_id: userId,
          forecast_type: "expense",
          amount: forecast.expense,
          confidence: forecast.confidence,
          forecast_date: forecastDate,
          created_at: new Date(),
        })
        .returning()

      // Inserir previsão de saldo
      const balanceForecast = await db
        .insert(financial_forecasts)
        .values({
          user_id: userId,
          forecast_type: "balance",
          amount: forecast.balance,
          confidence: forecast.confidence,
          forecast_date: forecastDate,
          created_at: new Date(),
        })
        .returning()

      savedForecasts.push({
        month: forecast.month,
        income: incomeForecast[0],
        expense: expenseForecast[0],
        balance: balanceForecast[0],
        confidence: forecast.confidence,
      })
    }

    return NextResponse.json({
      message: "Previsões geradas com sucesso",
      forecasts: savedForecasts,
    })
  } catch (error) {
    console.error("Erro ao gerar previsões:", error)
    return NextResponse.json({ error: "Erro ao gerar previsões" }, { status: 500 })
  }
}
