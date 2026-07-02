"use client"
import { FinancialAssistant } from "@/features/ai-assistant/components/financial-assistant"
import { FinancialInsights } from "@/features/analytics/components/financial-insights"

export default function AssistantPage() {
  // Normalmente, você obteria o ID do usuário da sessão
  // Para este exemplo, usaremos um ID fixo
  const userId = "k577xg84pjhwcwaxebmbesj43984s1pa"

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Assistente Financeiro</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-1">
          <FinancialAssistant userId={userId} />
        </div>
        <div className="md:col-span-1">
          <FinancialInsights userId={userId} />
        </div>
      </div>
    </div>
  )
}
