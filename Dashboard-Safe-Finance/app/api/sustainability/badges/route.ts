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

    // Get user badges
    const userBadges = await sql(
      `
      SELECT b.*, ub.earned_at
      FROM user_badges ub
      JOIN green_badges b ON ub.badge_id = b.id
      WHERE ub.user_id = $1
      ORDER BY ub.earned_at DESC
    `,
      [userId],
    )

    // Get available badges (not earned)
    const availableBadges = await sql(
      `
      SELECT b.*
      FROM green_badges b
      WHERE b.is_active = true
      AND b.id NOT IN (
        SELECT badge_id FROM user_badges WHERE user_id = $1
      )
      ORDER BY b.points ASC
    `,
      [userId],
    )

    return NextResponse.json({
      userBadges,
      availableBadges,
    })
  } catch (error) {
    console.error("Error fetching badges:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, badgeId } = body

    if (!userId || !badgeId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await sql(
      `
      INSERT INTO user_badges (user_id, badge_id)
      VALUES ($1, $2)
      ON CONFLICT (user_id, badge_id) DO NOTHING
      RETURNING *
    `,
      [userId, badgeId],
    )

    // Get badge points and add to user
    const badge = await sql(`SELECT points FROM green_badges WHERE id = $1`, [badgeId])

    if (badge.length > 0) {
      await sql(
        `
        INSERT INTO green_points (user_id, points, source, description)
        VALUES ($1, $2, 'badge_earned', $3)
      `,
        [userId, badge[0].points, `Badge conquistado: ${badgeId}`],
      )
    }

    return NextResponse.json({ data: result[0] })
  } catch (error) {
    console.error("Error earning badge:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
