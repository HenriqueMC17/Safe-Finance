import { NextResponse } from "next/server"
import { experimental_generateText as generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { db } from "@/lib/db"
import { financial_insights, accounts, transactions, savings_goals, invoices } from "@/lib/schema"
import { eq } from "drizzle-orm"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, question } = body

    if (!userId || !question) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 })
    }

    // Buscar dados financeiros do usuário para contextualizar a IA
    const userAccounts = await db.select().from(accounts).where(eq(accounts.user_id, userId))

    // Buscar transações de todas as contas do usuário
    const accountIds = userAccounts.map((account) => account.id)
    const userTransactions =
      accountIds.length > 0
        ? await db
            .select()
            .from(transactions)
            .where(eq(transactions.account_id, accountIds[0]))
            .orderBy(transactions.date)
            .limit(20)
        : []

    // Buscar metas de economia
    const userSavingsGoals = await db.select().from(savings_goals).where(eq(savings_goals.user_id, userId))

    // Buscar faturas
    const userInvoices = await db
      .select()
      .from(invoices)
      .where(eq(invoices.user_id, userId))
      .orderBy(invoices.due_date)
      .limit(10)

    // Criar contexto para a IA
    const context = {
      accounts: userAccounts,
      transactions: userTransactions,
      savingsGoals: userSavingsGoals,
      invoices: userInvoices,
    }

    // Gerar resposta com Groq usando versão compatível
    const { text } = await generateText({
      model: groq("llama3-70b-8192"),
      messages: [
        {
          role: "system",
          content:
            "Você é um assistente financeiro especializado em análise de dados e recomendações personalizadas. Seja claro, objetivo e forneça insights acionáveis. Sempre use dados reais do usuário para contextualizar suas respostas.",
        },
        {
          role: "user",
          content: `
            Você é um assistente financeiro inteligente. Analise os dados financeiros abaixo e responda à pergunta do usuário.
            
            Dados financeiros:
            ${JSON.stringify(context)}
            
            Pergunta do usuário: ${question}
            
            Forneça uma resposta útil, específica e personalizada baseada nos dados financeiros do usuário.
            Inclua análises e recomendações práticas quando apropriado.
            Use valores em Reais (R$) formatados corretamente.
          `,
        },
      ],
    })

    // Salvar o insight no banco de dados
    await db.insert(financial_insights).values({
      user_id: userId,
      title: question,
      content: text,
      category: "assistant",
    })

    return NextResponse.json({ answer: text })
  } catch (error) {
    console.error("Erro no assistente financeiro:", error)
    return NextResponse.json({ error: "Erro ao processar sua pergunta" }, { status: 500 })
  }
}
