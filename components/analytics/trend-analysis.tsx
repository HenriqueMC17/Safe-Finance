"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { useLocale } from "@/contexts/locale-context"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface TrendAnalysisProps {
  userId: number
  period: "monthly" | "quarterly" | "yearly"
}

interface TrendData {
  date: string
  income: number
  expenses: number
  balance: number
  trend: number
}

export function TrendAnalysis({ userId, period }: TrendAnalysisProps) {
  const { formatCurrency } = useLocale()
  const [isLoading, setIsLoading] = useState(true)
  const [trendData, setTrendData] = useState<TrendData[]>([])
  const [trendType, setTrendType] = useState<"income" | "expenses" | "balance">("balance")

  useEffect(() => {
    const fetchTrendData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/analytics/trends?userId=${userId}&period=${period}`)
        if (!response.ok) {
          throw new Error("Erro ao buscar dados de tendências")
        }
        const data = await response.json()
        setTrendData(data)
      } catch (error) {
        console.error("Erro:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrendData()
  }, [userId, period])

  const calculateTrendPercentage = () => {
    if (trendData.length < 2) return { value: 0, direction: "neutral" }

    const currentValue = trendData[trendData.length - 1][trendType]
    const previousValue = trendData[trendData.length - 2][trendType]

    if (previousValue === 0) return { value: 0, direction: "neutral" }

    const percentage = ((currentValue - previousValue) / Math.abs(previousValue)) * 100
    const direction = percentage > 0 ? "up" : percentage < 0 ? "down" : "neutral"

    return { value: Math.abs(percentage), direction }
  }

  const trend = calculateTrendPercentage()

  const getTrendIcon = () => {
    if (trend.direction === "up") {
      return <TrendingUp className={`h-5 w-5 ${trendType === "expenses" ? "text-red-500" : "text-green-500"}`} />
    } else if (trend.direction === "down") {
      return <TrendingDown className={`h-5 w-5 ${trendType === "expenses" ? "text-green-500" : "text-red-500"}`} />
    } else {
      return <Minus className="h-5 w-5 text-gray-500" />
    }
  }

  const getTrendDescription = () => {
    if (trendData.length < 2) return "Dados insuficientes para análise de tendência"

    const descriptions = {
      income: {
        up: "Suas receitas estão aumentando. Continue com o bom trabalho!",
        down: "Suas receitas estão diminuindo. Considere buscar novas fontes de renda.",
        neutral: "Suas receitas estão estáveis.",
      },
      expenses: {
        up: "Seus gastos estão aumentando. Considere revisar seu orçamento.",
        down: "Seus gastos estão diminuindo. Continue economizando!",
        neutral: "Seus gastos estão estáveis.",
      },
      balance: {
        up: "Seu saldo está melhorando. Continue com o bom trabalho!",
        down: "Seu saldo está diminuindo. Considere reduzir gastos ou aumentar receitas.",
        neutral: "Seu saldo está estável.",
      },
    }

    return descriptions[trendType][trend.direction]
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Análise de Tendências</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise de Tendências</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="balance" onValueChange={(value) => setTrendType(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="income">Receitas</TabsTrigger>
            <TabsTrigger value="expenses">Despesas</TabsTrigger>
            <TabsTrigger value="balance">Saldo</TabsTrigger>
          </TabsList>
          <TabsContent value="income" className="space-y-4">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={(value) => `R$${value}`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Line type="monotone" dataKey="income" stroke="#4ade80" name="Receitas" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-2 p-4 border rounded-lg">
              {getTrendIcon()}
              <div>
                <p className="font-medium">
                  {trend.direction !== "neutral" && `${trend.value.toFixed(1)}% `}
                  {trend.direction === "up"
                    ? "de aumento"
                    : trend.direction === "down"
                      ? "de redução"
                      : "sem alteração"}
                </p>
                <p className="text-sm text-muted-foreground">{getTrendDescription()}</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="expenses" className="space-y-4">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={(value) => `R$${value}`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Line type="monotone" dataKey="expenses" stroke="#f87171" name="Despesas" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-2 p-4 border rounded-lg">
              {getTrendIcon()}
              <div>
                <p className="font-medium">
                  {trend.direction !== "neutral" && `${trend.value.toFixed(1)}% `}
                  {trend.direction === "up"
                    ? "de aumento"
                    : trend.direction === "down"
                      ? "de redução"
                      : "sem alteração"}
                </p>
                <p className="text-sm text-muted-foreground">{getTrendDescription()}</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="balance" className="space-y-4">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={(value) => `R$${value}`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Line type="monotone" dataKey="balance" stroke="#60a5fa" name="Saldo" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-2 p-4 border rounded-lg">
              {getTrendIcon()}
              <div>
                <p className="font-medium">
                  {trend.direction !== "neutral" && `${trend.value.toFixed(1)}% `}
                  {trend.direction === "up"
                    ? "de aumento"
                    : trend.direction === "down"
                      ? "de redução"
                      : "sem alteração"}
                </p>
                <p className="text-sm text-muted-foreground">{getTrendDescription()}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
