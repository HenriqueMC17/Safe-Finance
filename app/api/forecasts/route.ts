import { NextResponse } from "next/server"
import { experimental_generateText as generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { db } from "@/lib/db"
import { financial_insights, accounts, transactions } from "@/lib/schema"
import { eq, desc } from "drizzle-orm"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, months = 6 } = body

    if (!userId) {
      return NextResponse.json({ error: "ID do usuário é obrigatório" }, { status: 400 })
    }

    // Buscar dados históricos do usuário
    const userAccounts = await db.select().from(accounts).where(eq(accounts.user_id, userId))

    const accountIds = userAccounts.map((account) => account.id)
    const historicalTransactions =
      accountIds.length > 0
        ? await db
            .select()
            .from(transactions)
            .where(eq(transactions.account_id, accountIds[0]))
            .orderBy(desc(transactions.date))
            .limit(100)
        : []

    // Calcular métricas históricas
    const totalIncome = historicalTransactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)

    const totalExpenses = historicalTransactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)

    const avgMonthlyIncome = totalIncome / Math.max(1, Math.ceil(historicalTransactions.length / 30))
    const avgMonthlyExpenses = totalExpenses / Math.max(1, Math.ceil(historicalTransactions.length / 30))

    // Gerar previsão com IA
    const { text } = await generateText({
      model: groq("llama3-70b-8192"),
      messages: [
        {
          role: "system",
          content:
            "Você é um analista financeiro especializado em previsões. Analise os dados históricos e forneça previsões realistas e acionáveis.",
        },
        {
          role: "user",
          content: `
            Analise os dados financeiros históricos e gere uma previsão para os próximos ${months} meses:
            
            Dados históricos:
            - Renda média mensal: R$ ${avgMonthlyIncome.toFixed(2)}
            - Gastos médios mensais: R$ ${avgMonthlyExpenses.toFixed(2)}
            - Saldo atual: R$ ${(totalIncome - totalExpenses).toFixed(2)}
            - Transações recentes: ${historicalTransactions.length}
            
            Forneça:
            1. Previsão de receitas para os próximos ${months} meses
            2. Previsão de gastos para os próximos ${months} meses
            3. Saldo projetado mês a mês
            4. Recomendações para otimização financeira
            5. Alertas sobre possíveis problemas
            
            Use formato JSON com as seguintes chaves:
            - monthlyForecasts: array com previsões mensais
            - totalProjectedIncome: total de receitas previstas
            - totalProjectedExpenses: total de gastos previstos
            - finalBalance: saldo final projetado
            - recommendations: array de recomendações
            - alerts: array de alertas
          `,
        },
      ],
    })

    // Tentar parsear como JSON, se falhar, usar como texto
    let forecastData
    try {
      forecastData = JSON.parse(text)
    } catch {
      forecastData = {
        analysis: text,
        monthlyForecasts: [],
        totalProjectedIncome: avgMonthlyIncome * months,
        totalProjectedExpenses: avgMonthlyExpenses * months,
        finalBalance: (avgMonthlyIncome - avgMonthlyExpenses) * months,
        recommendations: ["Análise detalhada disponível no texto acima"],
        alerts: [],
      }
    }

    // Salvar a previsão no banco
    await db.insert(financial_insights).values({
      user_id: userId,
      title: `Previsão Financeira - ${months} meses`,
      content: JSON.stringify(forecastData),
      category: "forecast",
    })

    return NextResponse.json(forecastData)
  } catch (error) {
    console.error("Erro ao gerar previsão:", error)
    return NextResponse.json({ error: "Erro ao gerar previsão financeira" }, { status: 500 })
  }
}
