"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useLocale } from "@/contexts/locale-context"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface MonthlyBalanceProps {
  data: {
    month: string
    income: number
    expenses: number
    balance: number
  }[]
  isLoading: boolean
}

export function MonthlyBalance({ data, isLoading }: MonthlyBalanceProps) {
  const { formatCurrency } = useLocale()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Saldo Mensal</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    )
  }

  // Processar dados para o gráfico
  const chartData = data.map((item) => {
    // Formatar o mês para exibição
    const [year, month] = item.month.split("-")
    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    const formattedMonth = `${monthNames[Number.parseInt(month) - 1]}/${year.slice(2)}`

    return {
      month: formattedMonth,
      income: Number(item.income),
      expenses: Number(item.expenses),
      balance: Number(item.balance),
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saldo Mensal</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        {chartData.length === 0 ? (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">Nenhum dado disponível</div>
        ) : (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `R$${value}`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Bar dataKey="income" name="Receitas" fill="#4ade80" />
                <Bar dataKey="expenses" name="Despesas" fill="#f87171" />
                <Bar dataKey="balance" name="Saldo" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
