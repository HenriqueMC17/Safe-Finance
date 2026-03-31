"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validação básica de email
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Por favor, insira um email válido.")
      return
    }

    setIsSubmitting(true)

    // Simulação de envio
    setTimeout(() => {
      try {
        // Simulação de operação que pode falhar
        if (Math.random() > 0.9) {
          throw new Error("Falha na conexão com o servidor")
        }

        setIsSubmitting(false)
        setIsSubmitted(true)
      } catch (err) {
        setIsSubmitting(false)
        setError(err instanceof Error ? err.message : "Ocorreu um erro ao processar sua solicitação.")
      }
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <div className="bg-muted/30 rounded-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="size-12 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Inscrição confirmada!</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Obrigado por se inscrever em nossa newsletter. Em breve você começará a receber nossas atualizações.
        </p>
      </div>
    )
  }

  return (
    <section className="bg-muted/30 rounded-lg p-8 text-center">
      <h2 className="text-2xl font-semibold mb-4">Inscreva-se em nossa newsletter</h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Receba dicas financeiras, novos artigos e atualizações diretamente em seu email.
      </p>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={error ? "border-red-500" : ""}
          />
          <Button type="submit" className="rounded-full" disabled={isSubmitting}>
            {isSubmitting ? "Inscrevendo..." : "Inscrever-se"}
          </Button>
        </div>
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </form>
    </section>
  )
}
