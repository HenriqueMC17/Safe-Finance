import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { accounts } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { executeQuery } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const startDate =
      searchParams.get("startDate") || new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString()
    const endDate = searchParams.get("endDate") || new Date().toISOString()
    const type = searchParams.get("type") || "all"

    if (!userId) {
      return NextResponse.json({ error: "userId é obrigatório" }, { status: 400 })
    }

    // Obter IDs das contas do usuário
    const userAccounts = await db
      .select({ id: accounts.id })
      .from(accounts)
      .where(eq(accounts.user_id, Number.parseInt(userId)))

    const accountIds = userAccounts.map((account) => account.id)

    if (accountIds.length === 0) {
      return NextResponse.json({
        spendingByCategory: [],
        monthlyBalance: [],
        transactionTrends: [],
        topExpenses: [],
        incomeVsExpenses: { income: 0, expenses: 0 },
      })
    }

    // Análise de gastos por categoria
    const spendingByCategory = await executeQuery(
      `
      SELECT 
        COALESCE(category, 'Outros') as category,
        SUM(CASE WHEN type = 'debit' THEN amount ELSE 0 END) as total
      FROM transactions
      WHERE account_id IN (${accountIds.join(",")})
        AND date BETWEEN $1 AND $2
        AND type = 'debit'
      GROUP BY category
      ORDER BY total DESC
    `,
      [startDate, endDate],
    )

    // Análise de saldo mensal
    const monthlyBalance = await executeQuery(
      `
      SELECT 
        TO_CHAR(date_trunc('month', date), 'YYYY-MM') as month,
        SUM(CASE WHEN type = 'credit' THEN amount ELSE 0 END) as income,
        SUM(CASE WHEN type = 'debit' THEN amount ELSE 0 END) as expenses,
        SUM(CASE WHEN type = 'credit' THEN amount ELSE -amount END) as balance
      FROM transactions
      WHERE account_id IN (${accountIds.join(",")})
        AND date BETWEEN $1 AND $2
      GROUP BY date_trunc('month', date)
      ORDER BY date_trunc('month', date)
    `,
      [startDate, endDate],
    )

    // Tendências de transações (últimos 30 dias)
    const transactionTrends = await executeQuery(`
      SELECT 
        TO_CHAR(date, 'YYYY-MM-DD') as date,
        SUM(CASE WHEN type = 'credit' THEN amount ELSE 0 END) as income,
        SUM(CASE WHEN type = 'debit' THEN amount ELSE 0 END) as expenses
      FROM transactions
      WHERE account_id IN (${accountIds.join(",")})
        AND date >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY TO_CHAR(date, 'YYYY-MM-DD')
      ORDER BY date
    `)

    // Top 5 maiores despesas
    const topExpenses = await executeQuery(
      `
      SELECT 
        description,
        amount,
        category,
        date
      FROM transactions
      WHERE account_id IN (${accountIds.join(",")})
        AND type = 'debit'
        AND date BETWEEN $1 AND $2
      ORDER BY amount DESC
      LIMIT 5
    `,
      [startDate, endDate],
    )

    // Receitas vs Despesas (total)
    const incomeVsExpenses = await executeQuery(
      `
      SELECT 
        SUM(CASE WHEN type = 'credit' THEN amount ELSE 0 END) as income,
        SUM(CASE WHEN type = 'debit' THEN amount ELSE 0 END) as expenses
      FROM transactions
      WHERE account_id IN (${accountIds.join(",")})
        AND date BETWEEN $1 AND $2
    `,
      [startDate, endDate],
    )

    return NextResponse.json({
      spendingByCategory,
      monthlyBalance,
      transactionTrends,
      topExpenses,
      incomeVsExpenses: incomeVsExpenses[0],
    })
  } catch (error) {
    console.error("Erro ao buscar análises:", error)
    return NextResponse.json({ error: "Erro ao buscar análises" }, { status: 500 })
  }
}
