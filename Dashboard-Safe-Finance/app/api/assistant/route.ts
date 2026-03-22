import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { transactions, accounts, budgets, savings_goals } from "@/lib/schema"
import { eq, desc, gte, and } from "drizzle-orm"
import { subDays } from "date-fns"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, userId } = body

    if (!userId || !message) {
      return NextResponse.json({ error: "Dados insuficientes" }, { status: 400 })
    }

    // Buscar dados do usuário para contexto
    const userAccounts = await db.select().from(accounts).where(eq(accounts.user_id, userId))
    const accountIds = userAccounts.map((acc) => acc.id)

    // Buscar transações recentes (últimos 30 dias)
    const recentTransactions =
      accountIds.length > 0
        ? await db
            .select()
            .from(transactions)
            .where(and(eq(transactions.account_id, accountIds[0]), gte(transactions.date, subDays(new Date(), 30))))
            .orderBy(desc(transactions.date))
            .limit(10)
        : []

    // Buscar orçamentos
    const userBudgets = await db.select().from(budgets).where(eq(budgets.user_id, userId))

    // Buscar metas
    const userGoals = await db.select().from(savings_goals).where(eq(savings_goals.user_id, userId))

    // Análise básica dos dados
    const totalBalance = userAccounts.reduce((sum, acc) => sum + Number(acc.balance), 0)
    const monthlyIncome = recentTransactions
      .filter((t) => Number(t.amount) > 0)
      .reduce((sum, t) => sum + Number(t.amount), 0)
    const monthlyExpenses = recentTransactions
      .filter((t) => Number(t.amount) < 0)
      .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0)

    // Gerar resposta baseada na mensagem
    let response = ""

    const messageLower = message.toLowerCase()

    if (messageLower.includes("saldo") || messageLower.includes("dinheiro")) {
      response = `Seu saldo total atual é de R$ ${totalBalance.toFixed(2)}. `
      if (totalBalance > 0) {
        response += "Você está com uma situação financeira positiva! 💰"
      } else {
        response += "Recomendo revisar seus gastos para melhorar sua situação financeira. 📊"
      }
    } else if (messageLower.includes("gasto") || messageLower.includes("despesa")) {
      response = `Nos últimos 30 dias, você gastou R$ ${monthlyExpenses.toFixed(2)}. `
      if (monthlyExpenses > monthlyIncome) {
        response += "Seus gastos estão acima da receita. Considere criar um orçamento mais rigoroso. ⚠️"
      } else {
        response += "Seus gastos estão controlados! Continue assim. ✅"
      }
    } else if (messageLower.includes("receita") || messageLower.includes("renda")) {
      response = `Sua receita dos últimos 30 dias foi de R$ ${monthlyIncome.toFixed(2)}. `
      if (monthlyIncome > monthlyExpenses) {
        response += "Excelente! Você tem uma margem positiva para investimentos. 📈"
      }
    } else if (messageLower.includes("meta") || messageLower.includes("objetivo")) {
      if (userGoals.length > 0) {
        const activeGoals = userGoals.length
        const totalTarget = userGoals.reduce((sum, goal) => sum + Number(goal.target_amount), 0)
        response = `Você tem ${activeGoals} meta(s) ativa(s) com valor total de R$ ${totalTarget.toFixed(2)}. `
        response += "Continue focado em seus objetivos! 🎯"
      } else {
        response = "Você ainda não tem metas definidas. Que tal criar algumas para organizar melhor suas finanças? 🎯"
      }
    } else if (messageLower.includes("orçamento") || messageLower.includes("budget")) {
      if (userBudgets.length > 0) {
        response = `Você tem ${userBudgets.length} orçamento(s) configurado(s). `
        response += "Acompanhe regularmente para manter suas finanças organizadas! 📋"
      } else {
        response = "Recomendo criar orçamentos por categoria para ter melhor controle dos gastos. 📋"
      }
    } else if (messageLower.includes("dica") || messageLower.includes("conselho")) {
      const tips = [
        "💡 Registre todas as transações para ter controle total das finanças.",
        "💡 Defina metas de economia mensais, mesmo que pequenas.",
        "💡 Revise seus gastos semanalmente para identificar padrões.",
        "💡 Mantenha uma reserva de emergência equivalente a 3-6 meses de gastos.",
        "💡 Categorize suas despesas para identificar onde pode economizar.",
      ]
      response = tips[Math.floor(Math.random() * tips.length)]
    } else {
      // Resposta genérica com resumo financeiro
      response = `Olá! Aqui está um resumo da sua situação financeira:

💰 Saldo Total: R$ ${totalBalance.toFixed(2)}
📈 Receita (30 dias): R$ ${monthlyIncome.toFixed(2)}
📉 Gastos (30 dias): R$ ${monthlyExpenses.toFixed(2)}
🎯 Metas Ativas: ${userGoals.length}
📋 Orçamentos: ${userBudgets.length}

Como posso ajudar você hoje?`
    }

    return NextResponse.json({
      response,
      suggestions: [
        "Como está meu saldo?",
        "Quanto gastei este mês?",
        "Minhas metas estão no caminho certo?",
        "Preciso de dicas financeiras",
      ],
    })
  } catch (error) {
    console.error("Erro no assistente:", error)
    return NextResponse.json({ error: "Erro interno do assistente" }, { status: 500 })
  }
}
