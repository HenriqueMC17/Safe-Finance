"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ExternalLink, ArrowLeft } from "lucide-react"

export default function DemoRedirect() {
  const [countdown, setCountdown] = useState(3)
  const targetUrl = "https://v0-financial-dashboard-functional-drab-xi.vercel.app/"

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          // Redirecionar automaticamente quando a contagem chegar a zero
          window.location.href = targetUrl
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [targetUrl])

  // Função para redirecionamento manual imediato
  const handleRedirectNow = () => {
    window.location.href = targetUrl
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30 p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="size-16 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground text-2xl font-bold">
            SF
          </div>
        </div>

        {/* Título */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Dashboard Demo</h1>
          <p className="text-muted-foreground">Você será redirecionado para nosso dashboard funcional</p>
        </div>

        {/* Contador */}
        <div className="space-y-4">
          <div className="text-6xl font-bold text-primary">{countdown}</div>
          <p className="text-sm text-muted-foreground">
            Redirecionando em {countdown} segundo{countdown !== 1 ? "s" : ""}...
          </p>
        </div>

        {/* Botões de ação */}
        <div className="space-y-3">
          <Button onClick={handleRedirectNow} className="w-full" size="lg">
            <ExternalLink className="mr-2 size-4" />
            Ir para Dashboard Agora
          </Button>

          <Button variant="outline" asChild className="w-full">
            <Link href="/">
              <ArrowLeft className="mr-2 size-4" />
              Voltar para Home
            </Link>
          </Button>
        </div>

        {/* Informações adicionais */}
        <div className="text-xs text-muted-foreground">
          <p>Se não for redirecionado automaticamente, clique no botão acima</p>
        </div>
      </div>
    </div>
  )
}
