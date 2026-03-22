import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users } from "@/lib/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Email e senha são obrigatórios",
        },
        { status: 400 },
      )
    }

    // Buscar usuário por email
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1)

    if (!user.length) {
      return NextResponse.json(
        {
          error: "Credenciais inválidas",
        },
        { status: 401 },
      )
    }

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, user[0].password_hash)

    if (!isValidPassword) {
      return NextResponse.json(
        {
          error: "Credenciais inválidas",
        },
        { status: 401 },
      )
    }

    // Gerar token JWT
    const token = jwt.sign(
      {
        userId: user[0].id,
        email: user[0].email,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    )

    // Retornar dados do usuário (sem senha)
    const { password_hash, ...userWithoutPassword } = user[0]

    return NextResponse.json({
      user: userWithoutPassword,
      token,
      message: "Login realizado com sucesso",
    })
  } catch (error) {
    console.error("Erro no login:", error)
    return NextResponse.json(
      {
        error: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}

// Rota para registro de usuário
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          error: "Nome, email e senha são obrigatórios",
        },
        { status: 400 },
      )
    }

    // Verificar se usuário já existe
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1)

    if (existingUser.length > 0) {
      return NextResponse.json(
        {
          error: "Email já está em uso",
        },
        { status: 409 },
      )
    }

    // Hash da senha
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Criar usuário
    const newUser = await db
      .insert(users)
      .values({
        name,
        email,
        password_hash: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning()

    // Gerar token JWT
    const token = jwt.sign(
      {
        userId: newUser[0].id,
        email: newUser[0].email,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    )

    // Retornar dados do usuário (sem senha)
    const { password_hash, ...userWithoutPassword } = newUser[0]

    return NextResponse.json({
      user: userWithoutPassword,
      token,
      message: "Usuário criado com sucesso",
    })
  } catch (error) {
    console.error("Erro no registro:", error)
    return NextResponse.json(
      {
        error: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}
