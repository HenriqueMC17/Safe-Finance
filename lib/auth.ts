import { cookies } from "next/headers"
import { db } from "@/lib/db"
import { users } from "@/lib/schema"
import { eq } from "drizzle-orm"

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

    // Criar uma sessão simples
    const session = {
      userId: user.id,
      name: user.name,
      email: user.email,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 horas
    }

    // Em um ambiente real, usaríamos um token JWT ou similar
    cookies().set("session", JSON.stringify(session), {
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
    const sessionCookie = cookies().get("session")

    if (!sessionCookie) {
      return null
    }

    const session = JSON.parse(sessionCookie.value)

    if (session.expiresAt < Date.now()) {
      cookies().delete("session")
      return null
    }

    return {
      id: session.userId,
      name: session.name,
      email: session.email,
    }
  } catch (error) {
    console.error("Erro ao obter usuário atual:", error)
    return null
  }
}

export async function logoutUser() {
  cookies().delete("session")
}
