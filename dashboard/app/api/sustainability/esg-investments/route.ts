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
      SELECT * FROM esg_investments 
      WHERE user_id = $1
      ORDER BY purchase_date DESC
    `,
      [userId],
    )

    return NextResponse.json({ data: result })
  } catch (error) {
    console.error("Error fetching ESG investments:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      userId,
      name,
      symbol,
      amount,
      currentValue,
      esgScore,
      environmentalScore,
      socialScore,
      governanceScore,
      category,
    } = body

    if (!userId || !name || !symbol || !amount || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await sql(
      `
      INSERT INTO esg_investments (
        user_id, name, symbol, amount, current_value, esg_score,
        environmental_score, social_score, governance_score, category
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `,
      [
        userId,
        name,
        symbol,
        amount,
        currentValue || amount,
        esgScore,
        environmentalScore,
        socialScore,
        governanceScore,
        category,
      ],
    )

    return NextResponse.json({ data: result[0] })
  } catch (error) {
    console.error("Error creating ESG investment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const investmentId = searchParams.get("investmentId")

    if (!investmentId) {
      return NextResponse.json({ error: "Investment ID is required" }, { status: 400 })
    }

    await sql(
      `
      DELETE FROM esg_investments 
      WHERE id = $1
    `,
      [investmentId],
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting ESG investment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
