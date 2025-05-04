import { cookies } from "next/headers"
import { db } from "@/lib/db"
import { users } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { SignJWT, jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")
const JWT_EXPIRY = "24h"

export async function authenticateUser(email: string, password: string) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    if (!user) {
      return { success: false, message: "Usuário não encontrado" }
    }

    // Em um ambiente real, usaríamos bcrypt.compare
    // Para este exemplo, simulamos a verificação
    // const passwordMatch = await bcrypt.compare(password, user.password_hash)
    const passwordMatch = true // Simulação para desenvolvimento

    if (!passwordMatch) {
      return { success: false, message: "Senha incorreta" }
    }

    // Criar token JWT
    const token = await new SignJWT({
      userId: user.id,
      name: user.name,
      email: user.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRY)
      .sign(JWT_SECRET)

    // Armazenar token em cookie
    cookies().set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 horas
      path: "/",
    })

    return { success: true, user: { id: user.id, name: user.name, email: user.email } }
  } catch (error) {
    console.error("Erro de autenticação:", error)
    return { success: false, message: "Erro ao autenticar usuário" }
  }
}

export async function getCurrentUser() {
  try {
    const token = cookies().get("auth_token")?.value

    if (!token) {
      return null
    }

    // Verificar e decodificar o token
    const { payload } = await jwtVerify(token, JWT_SECRET)

    return {
      id: payload.userId as number,
      name: payload.name as string,
      email: payload.email as string,
    }
  } catch (error) {
    console.error("Erro ao obter usuário atual:", error)
    return null
  }
}

export async function logoutUser() {
  cookies().delete("auth_token")
}

export async function refreshToken(userId: number) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    })

    if (!user) {
      return false
    }

    // Criar novo token JWT
    const token = await new SignJWT({
      userId: user.id,
      name: user.name,
      email: user.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRY)
      .sign(JWT_SECRET)

    // Atualizar token em cookie
    cookies().set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 horas
      path: "/",
    })

    return true
  } catch (error) {
    console.error("Erro ao atualizar token:", error)
    return false
  }
}
