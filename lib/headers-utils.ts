// Utilitário para lidar com headers de forma segura entre App Router e Pages Router

// Verificação se estamos no ambiente do App Router
const isAppRouter = process.env.NEXT_RUNTIME === "nodejs" || process.env.NEXT_RUNTIME === "edge"

// Função segura para obter cookies
export function getCookiesSafe() {
  if (typeof window !== "undefined") {
    // Cliente: não temos acesso aos headers do servidor
    return null
  }

  if (isAppRouter) {
    // Server Component no App Router
    try {
      const { cookies } = require("next/headers")
      return cookies()
    } catch (e) {
      console.error("Failed to import next/headers:", e)
      return null
    }
  } else {
    // Pages Router: não temos acesso ao next/headers
    return null
  }
}

// Função segura para obter headers
export function getHeadersSafe() {
  if (typeof window !== "undefined") {
    // Cliente: não temos acesso aos headers do servidor
    return null
  }

  if (isAppRouter) {
    // Server Component no App Router
    try {
      const { headers } = require("next/headers")
      return headers()
    } catch (e) {
      console.error("Failed to import next/headers:", e)
      return null
    }
  } else {
    // Pages Router: não temos acesso ao next/headers
    return null
  }
}
