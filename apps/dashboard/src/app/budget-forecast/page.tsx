"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { BudgetManager } from "@/features/budget/components/budget-manager"
import { BudgetProgress } from "@/features/budget/components/budget-progress"
import { FinancialForecast } from "@/features/forecasts/components/financial-forecast"

export default function BudgetForecastPage() {
  // Normalmente, você obteria o ID do usuário da sessão
  // Para este exemplo, usaremos um ID fixo
  const userId = "k577xg84pjhwcwaxebmbesj43984s1pa"

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Orçamentos e Previsões</h1>

      <Tabs defaultValue="budgets" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="budgets">Gerenciamento de Orçamentos</TabsTrigger>
          <TabsTrigger value="forecasts">Previsões Financeiras</TabsTrigger>
        </TabsList>
        <TabsContent value="budgets" className="space-y-6 pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <BudgetManager userId={userId} />
            <BudgetProgress userId={userId} />
          </div>
        </TabsContent>
        <TabsContent value="forecasts" className="pt-6">
          <FinancialForecast userId={userId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
