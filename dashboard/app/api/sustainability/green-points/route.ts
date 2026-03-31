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

    // Get total points
    const totalPoints = await sql(
      `
      SELECT COALESCE(SUM(points), 0) as total
      FROM green_points
      WHERE user_id = $1
    `,
      [userId],
    )

    // Get recent activities
    const recentActivities = await sql(
      `
      SELECT * FROM green_points
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 20
    `,
      [userId],
    )

    // Get points by source
    const pointsBySource = await sql(
      `
      SELECT 
        source,
        SUM(points) as total_points,
        COUNT(*) as count
      FROM green_points
      WHERE user_id = $1
      GROUP BY source
      ORDER BY total_points DESC
    `,
      [userId],
    )

    return NextResponse.json({
      totalPoints: totalPoints[0].total,
      recentActivities,
      pointsBySource,
    })
  } catch (error) {
    console.error("Error fetching green points:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, points, source, description } = body

    if (!userId || !points || !source || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await sql(
      `
      INSERT INTO green_points (user_id, points, source, description)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `,
      [userId, points, source, description],
    )

    return NextResponse.json({ data: result[0] })
  } catch (error) {
    console.error("Error creating green points:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
