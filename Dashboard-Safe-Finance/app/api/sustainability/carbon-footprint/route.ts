import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!) as any

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const month = searchParams.get("month")
    const year = searchParams.get("year")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    let query = `
      SELECT * FROM carbon_footprint 
      WHERE user_id = $1
    `
    const params: any[] = [userId]

    if (month && year) {
      query += ` AND month = $2 AND year = $3`
      params.push(Number.parseInt(month), Number.parseInt(year))
    }

    query += ` ORDER BY year DESC, month DESC LIMIT 12`

    const result = await sql(query, params)

    return NextResponse.json({ data: result })
  } catch (error) {
    console.error("Error fetching carbon footprint:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, month, year, transportEmissions, energyEmissions, foodEmissions, shoppingEmissions } = body

    if (!userId || !month || !year) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const totalEmissions = transportEmissions + energyEmissions + foodEmissions + shoppingEmissions

    const result = await sql(
      `
      INSERT INTO carbon_footprint (
        user_id, month, year, transport_emissions, energy_emissions, 
        food_emissions, shopping_emissions, total_emissions
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (user_id, month, year) 
      DO UPDATE SET 
        transport_emissions = $4,
        energy_emissions = $5,
        food_emissions = $6,
        shopping_emissions = $7,
        total_emissions = $8,
        updated_at = NOW()
      RETURNING *
    `,
      [userId, month, year, transportEmissions, energyEmissions, foodEmissions, shoppingEmissions, totalEmissions],
    )

    return NextResponse.json({ data: result[0] })
  } catch (error) {
    console.error("Error saving carbon footprint:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
