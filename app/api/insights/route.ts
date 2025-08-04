import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { financial_insights, accounts, transactions, savings_goals } from "@/lib/schema"
import { eq, desc, and, gte } from "drizzle-orm"

function generateInsights(data: any) {
  const { accounts, transactions, savingsGoals } = data

  // Calcular métricas básicas
  const totalBalance = accounts.reduce((sum: number, acc: any) => sum + acc.balance, 0)
  const totalIncome = transactions.filter((t: any) => t.amount > 0).reduce((sum: number, t: any) => sum + t.amount, 0)
  const totalExpenses = transactions
    .filter((t: any) => t.amount < 0)
    .reduce((sum: number, t: any) => sum + Math.abs(t.amount), 0)

  // Análise por categoria
  const expensesByCategory: Record<string, number> = {}
  transactions
    .filter((t: any) => t.amount < 0)
    .forEach((t: any) => {
      const category = t.category || "Outros"
      expensesByCategory[category] = (expensesByCategory[category] || 0) + Math.abs(t.amount)
    })

  const topExpenseCategory = Object.entries(expensesByCategory).sort(([, a], [, b]) => (b as number) - (a as number))[0]

  // Gerar insights textuais
  let insights = "## 📊 Análise Financeira Inteligente\n\n"

  // Situação geral
  if (totalBalance > 0) {
    insights += `✅ **Situação Positiva**: Saldo atual de R$ ${totalBalance.toFixed(2)}\n\n`
  } else {
    insights += `⚠️ **Atenção**: Saldo negativo de R$ ${Math.abs(totalBalance).toFixed(2)}\n\n`
  }

  // Análise de fluxo de caixa
  const netFlow = totalIncome - totalExpenses
  if (netFlow > 0) {
    insights += `💰 **Fluxo Positivo**: Você economizou R$ ${netFlow.toFixed(2)} no período analisado\n\n`
  } else {
    insights += `📉 **Fluxo Negativo**: Gastos excederam receitas em R$ ${Math.abs(netFlow).toFixed(2)}\n\n`
  }

  // Categoria de maior gasto
  if (topExpenseCategory) {
    const [category, amount] = topExpenseCategory
    const percentage = (((amount as number) / totalExpenses) * 100).toFixed(1)
    insights += `🏷️ **Maior Categoria de Gastos**: ${category} (${percentage}% - R$ ${(amount as number).toFixed(2)})\n\n`
  }

  // Análise de metas
  if (savingsGoals.length > 0) {
    const totalSaved = savingsGoals.reduce((sum: number, goal: any) => sum + goal.current_amount, 0)
    const totalTarget = savingsGoals.reduce((sum: number, goal: any) => sum + goal.target_amount, 0)
    const progress = ((totalSaved / totalTarget) * 100).toFixed(1)
    insights += `🎯 **Progresso das Metas**: ${progress}% concluído (R$ ${totalSaved.toFixed(2)} de R$ ${totalTarget.toFixed(2)})\n\n`
  }

  // Recomendações
  insights += "### 💡 Recomendações Personalizadas:\n\n"

  if (totalExpenses > totalIncome) {
    insights += "- 🚨 **Urgente**: Reduza gastos ou aumente receitas para equilibrar o orçamento\n"
  }

  if (topExpenseCategory && (topExpenseCategory[1] as number) > totalIncome * 0.3) {
    insights += `- 📊 **Otimização**: Revise gastos em ${topExpenseCategory[0]} - representa mais de 30% da renda\n`
  }

  if (totalBalance > totalExpenses * 6) {
    insights += "- 💎 **Investimento**: Considere investir parte da reserva para rentabilidade\n"
  }

  if (savingsGoals.length === 0) {
    insights += "- 🎯 **Planejamento**: Defina metas de economia para melhor controle financeiro\n"
  }

  const avgTransactionValue =
    transactions.length > 0
      ? Math.abs(transactions.reduce((sum: number, t: any) => sum + Math.abs(t.amount), 0) / transactions.length)
      : 0

  if (avgTransactionValue > 200) {
    insights += "- 🔍 **Monitoramento**: Transações de alto valor - acompanhe de perto\n"
  }

  return insights
}

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
      .orderBy(desc(financial_insights.created_at))

    return NextResponse.json({ insights })
  } catch (error) {
    console.error("Erro ao buscar insights:", error)
    return NextResponse.json({ error: "Erro ao buscar insights" }, { status: 500 })
  }
}

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

    const data = {
      accounts: userAccounts,
      transactions: recentTransactions,
      savingsGoals: savingsGoals,
    }

    // Gerar insights
    const insightContent = generateInsights(data)

    // Salvar o insight
    const insight = await db
      .insert(financial_insights)
      .values({
        user_id: userId,
        title: "Análise Financeira Inteligente",
        content: insightContent,
        category: "analysis",
      })
      .returning()

    // Calcular métricas para retorno
    const currentBalance = userAccounts.reduce((sum, account) => sum + account.balance, 0)
    const totalIncome = recentTransactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)
    const totalExpenses = recentTransactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0)

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
