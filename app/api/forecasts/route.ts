import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { financial_forecasts, transactions, accounts } from "@/lib/schema"
import { eq, and, gte } from "drizzle-orm"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { format } from "date-fns"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const forecastType = searchParams.get("type")
    const months = Number.parseInt(searchParams.get("months") || "3")

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

    // Buscar transações dos últimos 6 meses para análise
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
      .orderBy(transactions.date)

    // Agrupar transações por mês e tipo
    const transactionsByMonth: Record<string, { income: number; expense: number }> = {}

    recentTransactions.forEach((transaction) => {
      const month = format(new Date(transaction.date), "yyyy-MM")

      if (!transactionsByMonth[month]) {
        transactionsByMonth[month] = { income: 0, expense: 0 }
      }

      if (transaction.type === "credit") {
        transactionsByMonth[month].income += Number(transaction.amount)
      } else {
        transactionsByMonth[month].expense += Number(transaction.amount)
      }
    })

    // Converter para array para análise
    const monthlyData = Object.entries(transactionsByMonth).map(([month, data]) => ({
      month,
      income: data.income,
      expense: data.expense,
      balance: data.income - data.expense,
    }))

    // Usar IA para gerar previsões
    const { text: forecastData } = await generateText({
      model: groq("llama3-70b-8192"),
      prompt: `
        Analise os dados financeiros mensais abaixo e gere previsões para os próximos ${months} meses.
        Dados históricos: ${JSON.stringify(monthlyData)}
        
        Forneça previsões para receitas, despesas e saldo para cada mês, com um nível de confiança (0-100%).
        Retorne apenas um objeto JSON com o seguinte formato:
        {
          "forecasts": [
            {
              "month": "YYYY-MM",
              "income": number,
              "expense": number,
              "balance": number,
              "confidence": number
            }
          ]
        }
        
        Não inclua explicações, apenas o objeto JSON.
      `,
      system:
        "Você é um analista financeiro especializado em previsões baseadas em dados históricos. Use técnicas estatísticas para gerar previsões precisas.",
    })

    // Processar resposta da IA
    let forecasts
    try {
      // Extrair apenas o JSON da resposta
      const jsonMatch = forecastData.match(/\{[\s\S]*\}/)
      const jsonString = jsonMatch ? jsonMatch[0] : forecastData
      forecasts = JSON.parse(jsonString).forecasts
    } catch (error) {
      console.error("Erro ao processar resposta da IA:", error)
      return NextResponse.json({ error: "Erro ao processar previsões" }, { status: 500 })
    }

    // Salvar previsões no banco de dados
    const savedForecasts = []

    // Excluir previsões anteriores
    await db.delete(financial_forecasts).where(eq(financial_forecasts.user_id, userId))

    // Inserir novas previsões
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
