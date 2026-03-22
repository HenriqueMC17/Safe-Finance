import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { transactions, accounts, budgets, savings_goals } from "@/lib/schema"
import { eq, desc, gte, and } from "drizzle-orm"
import { subDays, subMonths, startOfMonth, endOfMonth } from "date-fns"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "ID do usuário é obrigatório" }, { status: 400 })
    }

    const userIdNum = Number.parseInt(userId)

    // Buscar dados do usuário
    const userAccounts = await db.select().from(accounts).where(eq(accounts.user_id, userIdNum))
    const accountIds = userAccounts.map((acc) => acc.id)

    if (accountIds.length === 0) {
      return NextResponse.json({
        insights: [],
        score: 0,
        recommendations: [],
      })
    }

    // Buscar transações dos últimos 90 dias
    const last90Days = subDays(new Date(), 90)
    const recentTransactions = await db
      .select()
      .from(transactions)
      .where(and(eq(transactions.account_id, accountIds[0]), gte(transactions.date, last90Days)))
      .orderBy(desc(transactions.date))

    // Buscar transações do mês atual
    const currentMonthStart = startOfMonth(new Date())
    const currentMonthEnd = endOfMonth(new Date())
    const currentMonthTransactions = recentTransactions.filter((t) => {
      const transactionDate = new Date(t.date)
      return transactionDate >= currentMonthStart && transactionDate <= currentMonthEnd
    })

    // Buscar orçamentos e metas
    const userBudgets = await db.select().from(budgets).where(eq(budgets.user_id, userIdNum))
    const userGoals = await db.select().from(savings_goals).where(eq(savings_goals.user_id, userIdNum))

    // Análises financeiras
    const totalBalance = userAccounts.reduce((sum, acc) => sum + Number(acc.balance), 0)

    const monthlyIncome = currentMonthTransactions
      .filter((t) => Number(t.amount) > 0)
      .reduce((sum, t) => sum + Number(t.amount), 0)

    const monthlyExpenses = currentMonthTransactions
      .filter((t) => Number(t.amount) < 0)
      .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0)

    // Análise por categoria
    const expensesByCategory: Record<string, number> = {}
    currentMonthTransactions
      .filter((t) => Number(t.amount) < 0)
      .forEach((t) => {
        const category = t.category || "Outros"
        expensesByCategory[category] = (expensesByCategory[category] || 0) + Math.abs(Number(t.amount))
      })

    // Gerar insights
    const insights = []

    // 1. Análise de saldo
    if (totalBalance > monthlyExpenses * 6) {
      insights.push({
        type: "success",
        title: "Reserva de Emergência Sólida",
        description: `Você tem uma reserva equivalente a ${Math.round(totalBalance / monthlyExpenses)} meses de gastos.`,
        impact: "high",
        category: "savings",
      })
    } else if (totalBalance < monthlyExpenses * 3) {
      insights.push({
        type: "warning",
        title: "Reserva de Emergência Baixa",
        description: "Recomenda-se ter pelo menos 3-6 meses de gastos como reserva.",
        impact: "high",
        category: "savings",
      })
    }

    // 2. Análise de gastos vs receita
    const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100 : 0

    if (savingsRate > 20) {
      insights.push({
        type: "success",
        title: "Excelente Taxa de Poupança",
        description: `Você está poupando ${savingsRate.toFixed(1)}% da sua renda mensal.`,
        impact: "medium",
        category: "savings",
      })
    } else if (savingsRate < 10) {
      insights.push({
        type: "warning",
        title: "Taxa de Poupança Baixa",
        description: `Você está poupando apenas ${savingsRate.toFixed(1)}% da renda. Tente aumentar para pelo menos 20%.`,
        impact: "medium",
        category: "savings",
      })
    }

    // 3. Análise de categorias de gastos
    const topExpenseCategory = Object.entries(expensesByCategory).sort(([, a], [, b]) => b - a)[0]

    if (topExpenseCategory && topExpenseCategory[1] > monthlyIncome * 0.4) {
      insights.push({
        type: "info",
        title: "Categoria de Alto Gasto",
        description: `${topExpenseCategory[0]} representa ${((topExpenseCategory[1] / monthlyIncome) * 100).toFixed(1)}% da sua renda.`,
        impact: "medium",
        category: "spending",
      })
    }

    // 4. Análise de orçamentos
    const budgetAnalysis = userBudgets.map((budget) => {
      const categoryExpenses = expensesByCategory[budget.category] || 0
      const usage = Number(budget.amount) > 0 ? (categoryExpenses / Number(budget.amount)) * 100 : 0
      return { ...budget, usage, spent: categoryExpenses }
    })

    const exceededBudgets = budgetAnalysis.filter((b) => b.usage > 100)
    if (exceededBudgets.length > 0) {
      insights.push({
        type: "warning",
        title: "Orçamentos Excedidos",
        description: `${exceededBudgets.length} orçamento(s) foram ultrapassados este mês.`,
        impact: "high",
        category: "budgeting",
      })
    }

    // 5. Análise de metas
    const goalsProgress = userGoals.map((goal) => {
      const progress =
        Number(goal.target_amount) > 0 ? (Number(goal.current_amount) / Number(goal.target_amount)) * 100 : 0
      return { ...goal, progress }
    })

    const completedGoals = goalsProgress.filter((g) => g.progress >= 100)
    if (completedGoals.length > 0) {
      insights.push({
        type: "success",
        title: "Metas Alcançadas",
        description: `Parabéns! Você completou ${completedGoals.length} meta(s).`,
        impact: "high",
        category: "goals",
      })
    }

    // 6. Análise de tendências (comparar com mês anterior)
    const lastMonthStart = startOfMonth(subMonths(new Date(), 1))
    const lastMonthEnd = endOfMonth(subMonths(new Date(), 1))
    const lastMonthTransactions = recentTransactions.filter((t) => {
      const transactionDate = new Date(t.date)
      return transactionDate >= lastMonthStart && transactionDate <= lastMonthEnd
    })

    const lastMonthExpenses = lastMonthTransactions
      .filter((t) => Number(t.amount) < 0)
      .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0)

    if (lastMonthExpenses > 0) {
      const expenseChange = ((monthlyExpenses - lastMonthExpenses) / lastMonthExpenses) * 100

      if (expenseChange > 20) {
        insights.push({
          type: "warning",
          title: "Aumento Significativo de Gastos",
          description: `Seus gastos aumentaram ${expenseChange.toFixed(1)}% em relação ao mês passado.`,
          impact: "medium",
          category: "spending",
        })
      } else if (expenseChange < -10) {
        insights.push({
          type: "success",
          title: "Redução de Gastos",
          description: `Você reduziu seus gastos em ${Math.abs(expenseChange).toFixed(1)}% este mês!`,
          impact: "medium",
          category: "spending",
        })
      }
    }

    // Calcular score de saúde financeira (0-100)
    let score = 0

    // Reserva de emergência (30 pontos)
    if (totalBalance >= monthlyExpenses * 6) score += 30
    else if (totalBalance >= monthlyExpenses * 3) score += 20
    else if (totalBalance >= monthlyExpenses) score += 10

    // Taxa de poupança (25 pontos)
    if (savingsRate >= 20) score += 25
    else if (savingsRate >= 10) score += 15
    else if (savingsRate > 0) score += 10

    // Controle de orçamento (20 pontos)
    const budgetCompliance =
      budgetAnalysis.length > 0 ? budgetAnalysis.filter((b) => b.usage <= 100).length / budgetAnalysis.length : 0.5
    score += Math.round(budgetCompliance * 20)

    // Progresso em metas (15 pontos)
    const avgGoalProgress =
      goalsProgress.length > 0
        ? goalsProgress.reduce((sum, g) => sum + Math.min(g.progress, 100), 0) / goalsProgress.length
        : 50
    score += Math.round((avgGoalProgress / 100) * 15)

    // Diversificação de receitas (10 pontos)
    const incomeTransactions = currentMonthTransactions.filter((t) => Number(t.amount) > 0)
    const incomeCategories = new Set(incomeTransactions.map((t) => t.category || "Outros")).size
    if (incomeCategories > 1) score += 10
    else if (incomeCategories === 1) score += 5

    // Gerar recomendações
    const recommendations = []

    if (score < 50) {
      recommendations.push({
        priority: "high",
        title: "Melhore sua Saúde Financeira",
        description: "Foque em construir uma reserva de emergência e controlar gastos.",
        actions: ["Criar orçamento mensal", "Reduzir gastos desnecessários", "Aumentar receita"],
      })
    }

    if (savingsRate < 10) {
      recommendations.push({
        priority: "high",
        title: "Aumente sua Taxa de Poupança",
        description: "Tente poupar pelo menos 20% da sua renda mensal.",
        actions: ["Automatizar transferências para poupança", "Revisar gastos mensais", "Buscar fontes de renda extra"],
      })
    }

    if (exceededBudgets.length > 0) {
      recommendations.push({
        priority: "medium",
        title: "Ajuste seus Orçamentos",
        description: "Alguns orçamentos foram ultrapassados. Revise e ajuste conforme necessário.",
        actions: ["Analisar gastos por categoria", "Redefinir limites de orçamento", "Criar alertas de gastos"],
      })
    }

    return NextResponse.json({
      insights,
      score: Math.min(score, 100),
      categories: {
        savings: insights.filter((i) => i.category === "savings").length,
        spending: insights.filter((i) => i.category === "spending").length,
        budgeting: insights.filter((i) => i.category === "budgeting").length,
        goals: insights.filter((i) => i.category === "goals").length,
      },
      recommendations,
      summary: {
        totalBalance,
        monthlyIncome,
        monthlyExpenses,
        savingsRate: Math.round(savingsRate * 100) / 100,
        budgetsCount: userBudgets.length,
        goalsCount: userGoals.length,
      },
    })
  } catch (error) {
    console.error("Erro ao gerar insights:", error)
    return NextResponse.json({ error: "Erro ao gerar insights financeiros" }, { status: 500 })
  }
}
