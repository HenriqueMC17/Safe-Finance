import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { accounts } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { executeQuery } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const period = searchParams.get("period") || "monthly"

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
      return NextResponse.json([])
    }

    let timeFormat
    let intervalValue
    let limitValue

    switch (period) {
      case "monthly":
        timeFormat = "YYYY-MM"
        intervalValue = "1 month"
        limitValue = 12
        break
      case "quarterly":
        timeFormat = "YYYY-Q"
        intervalValue = "3 months"
        limitValue = 8
        break
      case "yearly":
        timeFormat = "YYYY"
        intervalValue = "1 year"
        limitValue = 5
        break
      default:
        timeFormat = "YYYY-MM"
        intervalValue = "1 month"
        limitValue = 12
    }

    // Obter dados de tendência
    const trendData = await executeQuery(
      `
      WITH time_series AS (
        SELECT 
          generate_series(
            date_trunc('month', CURRENT_DATE - interval '${limitValue - 1} ${intervalValue}'),
            date_trunc('month', CURRENT_DATE),
            interval '${intervalValue}'
          ) as date
      ),
      monthly_data AS (
        SELECT 
          date_trunc('month', ts.date) as date,
          COALESCE(SUM(CASE WHEN t.type = 'credit' THEN t.amount ELSE 0 END), 0) as income,
          COALESCE(SUM(CASE WHEN t.type = 'debit' THEN t.amount ELSE 0 END), 0) as expenses,
          COALESCE(SUM(CASE WHEN t.type = 'credit' THEN t.amount ELSE -t.amount END), 0) as balance
        FROM time_series ts
        LEFT JOIN transactions t ON 
          date_trunc('month', t.date) = date_trunc('month', ts.date) AND
          t.account_id IN (${accountIds.join(",")})
        GROUP BY date_trunc('month', ts.date)
        ORDER BY date_trunc('month', ts.date)
      ),
      trend_data AS (
        SELECT 
          date,
          income,
          expenses,
          balance,
          LAG(income, 1) OVER (ORDER BY date) as prev_income,
          LAG(expenses, 1) OVER (ORDER BY date) as prev_expenses,
          LAG(balance, 1) OVER (ORDER BY date) as prev_balance
        FROM monthly_data
      )
      SELECT 
        TO_CHAR(date, '${timeFormat}') as date,
        income,
        expenses,
        balance,
        CASE 
          WHEN prev_income IS NULL OR prev_income = 0 THEN 0
          ELSE ((income - prev_income) / prev_income) * 100
        END as trend
      FROM trend_data
      ORDER BY date
    `,
    )

    return NextResponse.json(trendData)
  } catch (error) {
    console.error("Erro ao buscar dados de tendências:", error)
    return NextResponse.json({ error: "Erro ao buscar dados de tendências" }, { status: 500 })
  }
}
