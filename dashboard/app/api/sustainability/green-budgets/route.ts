import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!) as any

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const result = await sql(
      `
      SELECT * FROM green_budgets 
      WHERE user_id = $1 AND is_active = true
      ORDER BY created_at DESC
    `,
      [userId],
    )

    return NextResponse.json({ data: result })
  } catch (error) {
    console.error("Error fetching green budgets:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, name, category, budgetAmount, carbonLimit, month, year } = body

    if (!userId || !name || !category || !budgetAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const currentDate = new Date()
    const budgetMonth = month || currentDate.getMonth() + 1
    const budgetYear = year || currentDate.getFullYear()

    const result = await sql(
      `
      INSERT INTO green_budgets (
        user_id, name, category, budget_amount, carbon_limit, month, year
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `,
      [userId, name, category, budgetAmount, carbonLimit || 0, budgetMonth, budgetYear],
    )

    return NextResponse.json({ data: result[0] })
  } catch (error) {
    console.error("Error creating green budget:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { budgetId, spentAmount, carbonUsed } = body

    if (!budgetId) {
      return NextResponse.json({ error: "Budget ID is required" }, { status: 400 })
    }

    const result = await sql(
      `
      UPDATE green_budgets 
      SET spent_amount = $1, carbon_used = $2, updated_at = NOW()
      WHERE id = $3
      RETURNING *
    `,
      [spentAmount, carbonUsed, budgetId],
    )

    return NextResponse.json({ data: result[0] })
  } catch (error) {
    console.error("Error updating green budget:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const budgetId = searchParams.get("budgetId")

    if (!budgetId) {
      return NextResponse.json({ error: "Budget ID is required" }, { status: 400 })
    }

    await sql(
      `
      UPDATE green_budgets 
      SET is_active = false, updated_at = NOW()
      WHERE id = $1
    `,
      [budgetId],
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting green budget:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
