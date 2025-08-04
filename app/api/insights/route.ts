import { NextResponse } from "next/server"
import { experimental_generateText as generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { db } from "@/lib/db"
import { financial_insights, accounts, transactions, savings_goals } from "@/lib/schema"
import { eq, desc, and, gte } from "drizzle-orm"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId } = body

    if (!userId) {
      return NextResponse.json({ error: "ID do usuário é obrigatório" }, { status: 400 })
    }

    // Buscar dados do usuário
    const userAccounts = await db.select().from(accounts).where(eq(accounts.user_id, userId))

    const accountIds = userAccounts.map((account) => account.id)

    // Buscar transações dos últimos 3 meses
    const threeMonthsAgo = new Date()
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)

    const recentTransactions =
      accountIds.length > 0
        ? await db
            .select()
            .from(transactions)
            .where(and(eq(transactions.account_id, accountIds[0]), gte(transactions.date, threeMonthsAgo)))
            .orderBy(desc(transactions.date))
        : []

    // Buscar metas de economia
    const savingsGoals = await db.select().from(savings_goals).where(eq(savings_goals.user_id, userId))

    // Calcular métricas
    const totalIncome = recentTransactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)

    const totalExpenses = recentTransactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0)

    const currentBalance = userAccounts.reduce((sum, account) => sum + account.balance, 0)

    // Categorizar gastos
    const expensesByCategory = recentTransactions
      .filter((t) => t.amount < 0)
      .reduce(
        (acc, t) => {
          const category = t.category || "Outros"
          acc[category] = (acc[category] || 0) + Math.abs(t.amount)
          return acc
        },
        {} as Record<string, number>,
      )

    // Gerar insights com IA
    const { text } = await generateText({
      model: groq("llama3-70b-8192"),
      messages: [
        {
          role: "system",
          content:
            "Você é um consultor financeiro experiente. Analise os dados e forneça insights valiosos e acionáveis para melhorar a saúde financeira do usuário.",
        },
        {
          role: "user",
          content: `
            Analise a situação financeira atual e forneça insights personalizados:
            
            Dados financeiros (últimos 3 meses):
            - Saldo atual: R$ ${currentBalance.toFixed(2)}
            - Total de receitas: R$ ${totalIncome.toFixed(2)}
            - Total de gastos: R$ ${totalExpenses.toFixed(2)}
            - Saldo líquido: R$ ${(totalIncome - totalExpenses).toFixed(2)}
            - Gastos por categoria: ${JSON.stringify(expensesByCategory)}
            - Metas de economia: ${savingsGoals.length} metas ativas
            - Número de transações: ${recentTransactions.length}
            
            Forneça insights sobre:
            1. Padrões de gastos identificados
            2. Oportunidades de economia
            3. Saúde financeira geral
            4. Recomendações específicas
            5. Alertas importantes
            
            Seja específico e use os dados reais fornecidos.
          `,
        },
      ],
    })

    // Salvar o insight
    const insight = await db
      .insert(financial_insights)
      .values({
        user_id: userId,
        title: "Análise Financeira Inteligente",
        content: text,
        category: "analysis",
      })
      .returning()

    return NextResponse.json({
      insight: insight[0],
      metrics: {
        currentBalance,
        totalIncome,
        totalExpenses,
        netIncome: totalIncome - totalExpenses,
        expensesByCategory,
        savingsGoalsCount: savingsGoals.length,
        transactionCount: recentTransactions.length,
      },
    })
  } catch (error) {
    console.error("Erro ao gerar insights:", error)
    return NextResponse.json({ error: "Erro ao gerar insights financeiros" }, { status: 500 })
  }
}
