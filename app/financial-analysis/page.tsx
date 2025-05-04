"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { SpendingByCategory } from "@/components/analytics/spending-by-category"
import { MonthlyBalance } from "@/components/analytics/monthly-balance"
import { TransactionTrends } from "@/components/analytics/transaction-trends"
import { TopExpenses } from "@/components/analytics/top-expenses"
import { IncomeVsExpenses } from "@/components/analytics/income-vs-expenses"
import { ReportGenerator } from "@/components/analytics/report-generator"
import { addDays, format } from "date-fns"
import type { DateRange } from "react-day-picker"

export default function FinancialAnalysisPage() {
  // Normalmente, você obteria o ID do usuário da sessão
  // Para este exemplo, usaremos um ID fixo
  const userId = 1
  const [isLoading, setIsLoading] = useState(true)
  const [analyticsData, setAnalyticsData] = useState<any>({
    spendingByCategory: [],
    monthlyBalance: [],
    transactionTrends: [],
    topExpenses: [],
    incomeVsExpenses: { income: 0, expenses: 0 },
  })

  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -180), // Últimos 6 meses
    to: new Date(),
  })

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true)
      try {
        const startDate = date?.from ? format(date.from, "yyyy-MM-dd") : undefined
        const endDate = date?.to ? format(date.to, "yyyy-MM-dd") : undefined

        const response = await fetch(
          `/api/analytics?userId=${userId}${startDate ? `&startDate=${startDate}` : ""}${endDate ? `&endDate=${endDate}` : ""}`,
        )

        if (!response.ok) {
          throw new Error("Erro ao buscar análises")
        }

        const data = await response.json()
        setAnalyticsData(data)
      } catch (error) {
        console.error("Erro:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()
  }, [userId, date])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Análise Financeira</h1>
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <IncomeVsExpenses data={analyticsData.incomeVsExpenses} isLoading={isLoading} />
        <SpendingByCategory data={analyticsData.spendingByCategory} isLoading={isLoading} />
      </div>

      <Tabs defaultValue="monthly" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="monthly">Saldo Mensal</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
          <TabsTrigger value="expenses">Maiores Despesas</TabsTrigger>
        </TabsList>
        <TabsContent value="monthly">
          <MonthlyBalance data={analyticsData.monthlyBalance} isLoading={isLoading} />
        </TabsContent>
        <TabsContent value="trends">
          <TransactionTrends data={analyticsData.transactionTrends} isLoading={isLoading} />
        </TabsContent>
        <TabsContent value="expenses">
          <TopExpenses data={analyticsData.topExpenses} isLoading={isLoading} />
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recomendações Financeiras</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                </div>
              ) : (
                <>
                  {analyticsData.incomeVsExpenses.expenses > analyticsData.incomeVsExpenses.income && (
                    <div className="p-4 border-l-4 border-red-500 bg-red-50 dark:bg-red-950/20">
                      <h3 className="font-medium">Alerta de Gastos</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Suas despesas estão superando suas receitas. Considere revisar seu orçamento e reduzir gastos
                        não essenciais.
                      </p>
                    </div>
                  )}

                  {analyticsData.spendingByCategory.length > 0 && (
                    <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
                      <h3 className="font-medium">Análise de Categorias</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Sua maior categoria de gastos é {analyticsData.spendingByCategory[0]?.category || "Outros"}.
                        Considere estabelecer um orçamento específico para esta categoria.
                      </p>
                    </div>
                  )}

                  {analyticsData.incomeVsExpenses.income > analyticsData.incomeVsExpenses.expenses && (
                    <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20">
                      <h3 className="font-medium">Oportunidade de Investimento</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Você tem um saldo positivo. Considere investir o excedente para fazer seu dinheiro trabalhar
                        para você.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <ReportGenerator userId={userId} />
      </div>
    </div>
  )
}
