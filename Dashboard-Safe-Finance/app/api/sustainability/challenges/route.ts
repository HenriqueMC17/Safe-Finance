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

    // Get available challenges
    const challenges = await sql(
      `
      SELECT c.*, 
        CASE WHEN uc.user_id IS NOT NULL THEN true ELSE false END as user_joined,
        uc.current_progress,
        uc.is_completed as user_completed,
        uc.joined_at
      FROM sustainability_challenges c
      LEFT JOIN user_challenges uc ON c.id = uc.challenge_id AND uc.user_id = $1
      WHERE c.is_active = true AND c.end_date >= NOW()
      ORDER BY c.created_at DESC
    `,
      [userId],
    )

    return NextResponse.json({ data: challenges })
  } catch (error) {
    console.error("Error fetching challenges:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, challengeId } = body

    if (!userId || !challengeId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await sql(
      `
      INSERT INTO user_challenges (user_id, challenge_id)
      VALUES ($1, $2)
      ON CONFLICT (user_id, challenge_id) DO NOTHING
      RETURNING *
    `,
      [userId, challengeId],
    )

    return NextResponse.json({ data: result[0] })
  } catch (error) {
    console.error("Error joining challenge:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { userId, challengeId, progress } = body

    if (!userId || !challengeId || progress === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get challenge to check target
    const challenge = await sql(`SELECT target_value FROM sustainability_challenges WHERE id = $1`, [challengeId])

    if (challenge.length === 0) {
      return NextResponse.json({ error: "Challenge not found" }, { status: 404 })
    }

    const isCompleted = progress >= challenge[0].target_value

    const result = await sql(
      `
      UPDATE user_challenges 
      SET current_progress = $1, 
          is_completed = $2,
          completed_at = CASE WHEN $2 = true THEN NOW() ELSE completed_at END
      WHERE user_id = $3 AND challenge_id = $4
      RETURNING *
    `,
      [progress, isCompleted, userId, challengeId],
    )

    return NextResponse.json({ data: result[0] })
  } catch (error) {
    console.error("Error updating challenge progress:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
