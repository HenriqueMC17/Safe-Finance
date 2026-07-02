"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { DatePickerWithRange } from "@/shared/ui/date-range-picker"
import { SpendingByCategory } from "@/features/analytics/components/spending-by-category"
import { MonthlyBalance } from "@/features/analytics/components/monthly-balance"
import { TransactionTrends } from "@/features/analytics/components/transaction-trends"
import { TopExpenses } from "@/features/analytics/components/top-expenses"
import { IncomeVsExpenses } from "@/features/analytics/components/income-vs-expenses"
import { ReportGenerator } from "@/features/analytics/components/report-generator"
import { addDays, format } from "date-fns"
import type { DateRange } from "react-day-picker"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

export default function FinancialAnalysisPage() {
  const userId = "k577xg84pjhwcwaxebmbesj43984s1pa"

  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -180), // Últimos 6 meses
    to: new Date(),
  })

  const analyticsRaw = useQuery(api.analytics.getFinancialSummary, {
    userId: userId as Id<"users">,
    startDate: date?.from ? date.from.toISOString() : undefined,
    endDate: date?.to ? date.to.toISOString() : undefined,
  })

  const isLoading = analyticsRaw === undefined
  const analyticsData = analyticsRaw ?? {
    spendingByCategory: [],
    monthlyBalance: [],
    transactionTrends: [],
    topExpenses: [],
    incomeVsExpenses: { income: 0, expenses: 0 },
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Análise Financeira</h1>
        <DatePickerWithRange date={date} onDateChange={setDate} />
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
