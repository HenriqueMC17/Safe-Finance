"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useLocale } from "@/contexts/locale-context"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface TransactionTrendsProps {
  data: {
    date: string
    income: number
    expenses: number
  }[]
  isLoading: boolean
}

export function TransactionTrends({ data, isLoading }: TransactionTrendsProps) {
  const { formatCurrency } = useLocale()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tendências de Transações (30 dias)</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    )
  }

  // Processar dados para o gráfico
  const chartData = data.map((item) => {
    // Formatar a data para exibição
    const date = new Date(item.date)
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`

    return {
      date: formattedDate,
      income: Number(item.income),
      expenses: Number(item.expenses),
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tendências de Transações (30 dias)</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        {chartData.length === 0 ? (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">Nenhum dado disponível</div>
        ) : (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(value) => `R$${value}`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Line type="monotone" dataKey="income" name="Receitas" stroke="#4ade80" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="expenses" name="Despesas" stroke="#f87171" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
