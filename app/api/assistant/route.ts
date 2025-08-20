import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { accounts, transactions, savings_goals, invoices, financial_insights } from "@/lib/schema"
import { eq, desc, and, gte } from "drizzle-orm"

interface FinancialData {
  accounts: any[]
  transactions: any[]
  savingsGoals: any[]
  invoices: any[]
  totalBalance: number
  monthlyIncome: number
  monthlyExpenses: number
}

async function getUserFinancialData(userId: number): Promise<FinancialData> {
  // Buscar contas do usuário
  const userAccounts = await db.select().from(accounts).where(eq(accounts.user_id, userId))

  // Buscar transações dos últimos 3 meses
  const threeMonthsAgo = new Date()
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)

  const accountIds = userAccounts.map((acc) => acc.id)
  const recentTransactions =
    accountIds.length > 0
      ? await db
          .select()
          .from(transactions)
          .where(and(eq(transactions.account_id, accountIds[0]), gte(transactions.date, threeMonthsAgo)))
          .orderBy(desc(transactions.date))
      : []

  // Buscar metas de economia
  const userSavingsGoals = await db.select().from(savings_goals).where(eq(savings_goals.user_id, userId))

  // Buscar faturas
  const userInvoices = await db.select().from(invoices).where(eq(invoices.user_id, userId))

  // Calcular métricas
  const totalBalance = userAccounts.reduce((sum, acc) => sum + Number(acc.balance), 0)
  const monthlyIncome =
    recentTransactions.filter((t) => Number(t.amount) > 0).reduce((sum, t) => sum + Number(t.amount), 0) / 3
  const monthlyExpenses =
    recentTransactions.filter((t) => Number(t.amount) < 0).reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0) / 3

  return {
    accounts: userAccounts,
    transactions: recentTransactions,
    savingsGoals: userSavingsGoals,
    invoices: userInvoices,
    totalBalance,
    monthlyIncome,
    monthlyExpenses,
  }
}

function generateResponse(question: string, data: FinancialData): string {
  const { totalBalance, monthlyIncome, monthlyExpenses, transactions, savingsGoals, invoices } = data

  const questionLower = question.toLowerCase()

  // Análise de saldo
  if (questionLower.includes("saldo") || questionLower.includes("balance")) {
    if (totalBalance > 0) {
      return `💰 Seu saldo atual é de R$ ${totalBalance.toFixed(2)}. ${totalBalance > monthlyExpenses * 6 ? "Excelente reserva de emergência!" : "Considere aumentar sua reserva de emergência."}`
    } else {
      return `⚠️ Seu saldo está negativo em R$ ${Math.abs(totalBalance).toFixed(2)}. Recomendo revisar seus gastos urgentemente.`
    }
  }

  // Análise de gastos
  if (questionLower.includes("gasto") || questionLower.includes("despesa") || questionLower.includes("expense")) {
    const expensesByCategory: Record<string, number> = {}
    transactions
      .filter((t) => Number(t.amount) < 0)
      .forEach((t) => {
        const category = t.category || "Outros"
        expensesByCategory[category] = (expensesByCategory[category] || 0) + Math.abs(Number(t.amount))
      })

    const topCategory = Object.entries(expensesByCategory).sort(([, a], [, b]) => b - a)[0]

    if (topCategory) {
      return `📊 Seus gastos mensais médios são R$ ${monthlyExpenses.toFixed(2)}. Maior categoria: ${topCategory[0]} (R$ ${topCategory[1].toFixed(2)}). ${monthlyExpenses > monthlyIncome ? "⚠️ Gastos excedem receitas!" : "✅ Gastos controlados."}`
    }

    return `📊 Seus gastos mensais médios são R$ ${monthlyExpenses.toFixed(2)}.`
  }

  // Análise de receitas
  if (questionLower.includes("receita") || questionLower.includes("renda") || questionLower.includes("income")) {
    return `💵 Sua receita mensal média é R$ ${monthlyIncome.toFixed(2)}. ${monthlyIncome > monthlyExpenses ? "✅ Receita superior aos gastos." : "⚠️ Receita insuficiente para cobrir gastos."}`
  }

  // Análise de metas
  if (questionLower.includes("meta") || questionLower.includes("goal") || questionLower.includes("objetivo")) {
    if (savingsGoals.length === 0) {
      return `🎯 Você não possui metas de economia definidas. Recomendo criar metas específicas para melhor controle financeiro.`
    }

    const totalSaved = savingsGoals.reduce((sum, goal) => sum + Number(goal.current_amount), 0)
    const totalTarget = savingsGoals.reduce((sum, goal) => sum + Number(goal.target_amount), 0)
    const progress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0

    return `🎯 Você tem ${savingsGoals.length} meta(s) ativa(s). Progresso geral: ${progress.toFixed(1)}% (R$ ${totalSaved.toFixed(2)} de R$ ${totalTarget.toFixed(2)})`
  }

  // Análise de faturas
  if (questionLower.includes("fatura") || questionLower.includes("conta") || questionLower.includes("invoice")) {
    const overdueInvoices = invoices.filter((inv) => new Date(inv.due_date) < new Date() && inv.status !== "paid")

    if (overdueInvoices.length > 0) {
      const overdueAmount = overdueInvoices.reduce((sum, inv) => sum + Number(inv.amount), 0)
      return `🚨 Você tem ${overdueInvoices.length} fatura(s) em atraso totalizando R$ ${overdueAmount.toFixed(2)}. Priorize o pagamento!`
    }

    return `✅ Todas as suas faturas estão em dia. Continue assim!`
  }

  // Análise geral de saúde financeira
  if (questionLower.includes("saúde") || questionLower.includes("situação") || questionLower.includes("análise")) {
    let score = 0
    let feedback = "📊 **Análise da Sua Saúde Financeira:**\n\n"

    // Saldo positivo (25 pontos)
    if (totalBalance > 0) {
      score += 25
      feedback += "✅ Saldo positivo (+25 pts)\n"
    } else {
      feedback += "❌ Saldo negativo (0 pts)\n"
    }

    // Receita > Gastos (25 pontos)
    if (monthlyIncome > monthlyExpenses) {
      score += 25
      feedback += "✅ Receita superior aos gastos (+25 pts)\n"
    } else {
      feedback += "❌ Gastos excedem receita (0 pts)\n"
    }

    // Reserva de emergência (25 pontos)
    if (totalBalance >= monthlyExpenses * 6) {
      score += 25
      feedback += "✅ Reserva de emergência adequada (+25 pts)\n"
    } else if (totalBalance >= monthlyExpenses * 3) {
      score += 15
      feedback += "⚠️ Reserva de emergência parcial (+15 pts)\n"
    } else {
      feedback += "❌ Reserva de emergência insuficiente (0 pts)\n"
    }

    // Metas definidas (25 pontos)
    if (savingsGoals.length >= 3) {
      score += 25
      feedback += "✅ Múltiplas metas definidas (+25 pts)\n"
    } else if (savingsGoals.length > 0) {
      score += 15
      feedback += "⚠️ Algumas metas definidas (+15 pts)\n"
    } else {
      feedback += "❌ Nenhuma meta definida (0 pts)\n"
    }

    feedback += `\n**Pontuação Final: ${score}/100**\n\n`

    if (score >= 80) {
      feedback += "🏆 **Excelente!** Sua saúde financeira está ótima!"
    } else if (score >= 60) {
      feedback += "👍 **Boa!** Alguns ajustes podem melhorar sua situação."
    } else if (score >= 40) {
      feedback += "⚠️ **Atenção!** Precisa de melhorias significativas."
    } else {
      feedback += "🚨 **Crítico!** Situação financeira requer ação imediata."
    }

    return feedback
  }

  // Resposta padrão
  return `🤖 Olá! Sou seu assistente financeiro. Posso ajudar com análises de saldo, gastos, receitas, metas e saúde financeira geral. 

**Dados atuais:**
- Saldo: R$ ${totalBalance.toFixed(2)}
- Receita mensal: R$ ${monthlyIncome.toFixed(2)}
- Gastos mensais: R$ ${monthlyExpenses.toFixed(2)}
- Metas ativas: ${savingsGoals.length}

Faça uma pergunta específica para uma análise detalhada!`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, userId } = body

    if (!message || !userId) {
      return NextResponse.json(
        {
          error: "Mensagem e ID do usuário são obrigatórios",
        },
        { status: 400 },
      )
    }

    // Buscar dados financeiros do usuário
    const financialData = await getUserFinancialData(userId)

    // Gerar resposta baseada na pergunta e dados
    const response = generateResponse(message, financialData)

    // Salvar a interação como insight
    await db.insert(financial_insights).values({
      user_id: userId,
      title: `Consulta: ${message.substring(0, 50)}...`,
      content: response,
      category: "assistant",
    })

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Erro no assistente financeiro:", error)
    return NextResponse.json(
      {
        error: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json(
        {
          error: "ID do usuário é obrigatório",
        },
        { status: 400 },
      )
    }

    // Buscar histórico de conversas
    const conversations = await db
      .select()
      .from(financial_insights)
      .where(and(eq(financial_insights.user_id, Number.parseInt(userId)), eq(financial_insights.category, "assistant")))
      .orderBy(desc(financial_insights.created_at))
      .limit(10)

    return NextResponse.json({ conversations })
  } catch (error) {
    console.error("Erro ao buscar conversas:", error)
    return NextResponse.json(
      {
        error: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}
