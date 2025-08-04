import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { financial_insights, accounts, transactions, savings_goals, invoices } from "@/lib/schema"
import { eq, desc } from "drizzle-orm"

// Financial analysis functions
function analyzeSpendingPatterns(transactions: any[]) {
  const expenses = transactions.filter((t) => t.amount < 0)
  const categories: Record<string, number> = {}

  expenses.forEach((t) => {
    const category = t.category || "Outros"
    categories[category] = (categories[category] || 0) + Math.abs(t.amount)
  })

  const sortedCategories = Object.entries(categories)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)

  return {
    topCategories: sortedCategories,
    totalExpenses: expenses.reduce((sum, t) => sum + Math.abs(t.amount), 0),
    averageTransaction:
      expenses.length > 0 ? expenses.reduce((sum, t) => sum + Math.abs(t.amount), 0) / expenses.length : 0,
  }
}

function generateFinancialAdvice(data: any) {
  const { accounts, transactions, savingsGoals, invoices } = data
  const analysis = analyzeSpendingPatterns(transactions)

  let advice = "## Análise Financeira Personalizada\n\n"

  // Análise de saldo
  const totalBalance = accounts.reduce((sum: number, acc: any) => sum + acc.balance, 0)
  if (totalBalance > 0) {
    advice += `✅ **Situação Positiva**: Você possui um saldo total de R$ ${totalBalance.toFixed(2)}.\n\n`
  } else {
    advice += `⚠️ **Atenção**: Seu saldo está negativo em R$ ${Math.abs(totalBalance).toFixed(2)}. Considere revisar seus gastos.\n\n`
  }

  // Análise de gastos
  if (analysis.topCategories.length > 0) {
    advice += "### 📊 Principais Categorias de Gastos:\n"
    analysis.topCategories.forEach(([category, amount], index) => {
      advice += `${index + 1}. **${category}**: R$ ${amount.toFixed(2)}\n`
    })
    advice += "\n"
  }

  // Recomendações baseadas em metas
  if (savingsGoals.length > 0) {
    advice += "### 🎯 Suas Metas de Economia:\n"
    savingsGoals.forEach((goal: any) => {
      const progress = (goal.current_amount / goal.target_amount) * 100
      advice += `- **${goal.name}**: ${progress.toFixed(1)}% concluída (R$ ${goal.current_amount.toFixed(2)} de R$ ${goal.target_amount.toFixed(2)})\n`
    })
    advice += "\n"
  }

  // Alertas sobre faturas
  if (invoices.length > 0) {
    const overdueInvoices = invoices.filter((inv: any) => new Date(inv.due_date) < new Date() && inv.status !== "paid")
    if (overdueInvoices.length > 0) {
      advice += `🚨 **Atenção**: Você possui ${overdueInvoices.length} fatura(s) em atraso.\n\n`
    }
  }

  // Recomendações gerais
  advice += "### 💡 Recomendações:\n"
  if (analysis.averageTransaction > 100) {
    advice += "- Considere revisar transações de alto valor para identificar oportunidades de economia\n"
  }
  if (totalBalance > analysis.totalExpenses * 3) {
    advice += "- Você tem uma boa reserva! Considere investir parte do dinheiro\n"
  }
  if (savingsGoals.length === 0) {
    advice += "- Defina metas de economia para melhor controle financeiro\n"
  }

  return advice
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, question } = body

    if (!userId || !question) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 })
    }

    // Buscar dados financeiros do usuário
    const userAccounts = await db.select().from(accounts).where(eq(accounts.user_id, userId))

    const accountIds = userAccounts.map((account) => account.id)
    const userTransactions =
      accountIds.length > 0
        ? await db
            .select()
            .from(transactions)
            .where(eq(transactions.account_id, accountIds[0]))
            .orderBy(desc(transactions.date))
            .limit(50)
        : []

    const userSavingsGoals = await db.select().from(savings_goals).where(eq(savings_goals.user_id, userId))

    const userInvoices = await db
      .select()
      .from(invoices)
      .where(eq(invoices.user_id, userId))
      .orderBy(invoices.due_date)
      .limit(10)

    const context = {
      accounts: userAccounts,
      transactions: userTransactions,
      savingsGoals: userSavingsGoals,
      invoices: userInvoices,
    }

    // Gerar resposta baseada na pergunta
    let answer = ""
    const questionLower = question.toLowerCase()

    if (questionLower.includes("saldo") || questionLower.includes("dinheiro")) {
      const totalBalance = userAccounts.reduce((sum, acc) => sum + acc.balance, 0)
      answer = `Seu saldo total atual é de R$ ${totalBalance.toFixed(2)}. `
      if (totalBalance > 0) {
        answer += "Você está em uma situação financeira positiva! 💚"
      } else {
        answer += "Recomendo revisar seus gastos para equilibrar as finanças. 📊"
      }
    } else if (questionLower.includes("gasto") || questionLower.includes("despesa")) {
      const analysis = analyzeSpendingPatterns(userTransactions)
      answer = `Seus gastos totais recentes somam R$ ${analysis.totalExpenses.toFixed(2)}. `
      if (analysis.topCategories.length > 0) {
        answer += `Sua principal categoria de gastos é "${analysis.topCategories[0][0]}" com R$ ${analysis.topCategories[0][1].toFixed(2)}.`
      }
    } else if (questionLower.includes("meta") || questionLower.includes("economia")) {
      if (userSavingsGoals.length > 0) {
        answer = `Você possui ${userSavingsGoals.length} meta(s) de economia ativa(s). `
        const totalSaved = userSavingsGoals.reduce((sum, goal) => sum + goal.current_amount, 0)
        const totalTarget = userSavingsGoals.reduce((sum, goal) => sum + goal.target_amount, 0)
        const progress = (totalSaved / totalTarget) * 100
        answer += `Progresso geral: ${progress.toFixed(1)}% (R$ ${totalSaved.toFixed(2)} de R$ ${totalTarget.toFixed(2)}).`
      } else {
        answer =
          "Você ainda não possui metas de economia definidas. Recomendo criar algumas para melhor controle financeiro! 🎯"
      }
    } else {
      // Análise geral
      answer = generateFinancialAdvice(context)
    }

    // Salvar o insight no banco de dados
    await db.insert(financial_insights).values({
      user_id: userId,
      title: question,
      content: answer,
      category: "assistant",
    })

    return NextResponse.json({ answer })
  } catch (error) {
    console.error("Erro no assistente financeiro:", error)
    return NextResponse.json({ error: "Erro ao processar sua pergunta" }, { status: 500 })
  }
}
