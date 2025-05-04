"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  type TooltipProps,
} from "recharts"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { RefreshCw, TrendingUp, TrendingDown, AlertCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface Forecast {
  id: number
  user_id: number
  forecast_type: string
  amount: number
  confidence: number
  forecast_date: string
  created_at: string
}

interface FinancialForecastProps {
  userId: number
}

export function FinancialForecast({ userId }: FinancialForecastProps) {
  const [forecasts, setForecasts] = useState<Forecast[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)

  const fetchForecasts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/forecasts?userId=${userId}`)
      if (!response.ok) {
        throw new Error("Erro ao buscar previsões")
      }
      const data = await response.json()
      setForecasts(data)
    } catch (error) {
      console.error("Erro:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar as previsões financeiras",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchForecasts()
  }, [userId])

  const generateForecasts = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch("/api/forecasts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          months: 6, // Prever para os próximos 6 meses
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao gerar previsões")
      }

      toast({
        title: "Sucesso",
        description: "Previsões financeiras geradas com sucesso",
      })

      fetchForecasts()
    } catch (error) {
      console.error("Erro:", error)
      toast({
        title: "Erro",
        description: "Não foi possível gerar as previsões financeiras",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  // Preparar dados para o gráfico
  const prepareChartData = () => {
    const monthlyData: Record<
      string,
      { month: string; income: number; expense: number; balance: number; confidence: number }
    > = {}

    forecasts.forEach((forecast) => {
      const monthKey = format(new Date(forecast.forecast_date), "yyyy-MM")

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: format(new Date(forecast.forecast_date), "MMM yyyy", { locale: ptBR }),
          income: 0,
          expense: 0,
          balance: 0,
          confidence: forecast.confidence,
        }
      }

      if (forecast.forecast_type === "income") {
        monthlyData[monthKey].income = Number(forecast.amount)
      } else if (forecast.forecast_type === "expense") {
        monthlyData[monthKey].expense = Number(forecast.amount)
      } else if (forecast.forecast_type === "balance") {
        monthlyData[monthKey].balance = Number(forecast.amount)
      }
    })

    return Object.values(monthlyData).sort((a, b) => {
      const dateA = new Date(a.month)
      const dateB = new Date(b.month)
      return dateA.getTime() - dateB.getTime()
    })
  }

  const chartData = prepareChartData()

  // Calcular tendências
  const calculateTrend = (type: "income" | "expense" | "balance") => {
    if (chartData.length < 2) return { trend: 0, isPositive: false }

    const firstValue = chartData[0][type]
    const lastValue = chartData[chartData.length - 1][type]
    const trend = ((lastValue - firstValue) / firstValue) * 100

    return {
      trend,
      isPositive: type === "balance" || type === "income" ? trend > 0 : trend < 0,
    }
  }

  const incomeTrend = calculateTrend("income")
  const expenseTrend = calculateTrend("expense")
  const balanceTrend = calculateTrend("balance")

  // Componente personalizado para o tooltip do gráfico
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md p-3 shadow-md">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value as number)}
            </p>
          ))}
          <p className="text-xs text-muted-foreground mt-1">Confiança: {payload[0]?.payload.confidence}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Previsões Financeiras</CardTitle>
          <CardDescription>Previsões baseadas em IA para os próximos meses</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={generateForecasts} disabled={isGenerating}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} />
          {isGenerating ? "Gerando..." : "Atualizar Previsões"}
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-[300px] w-full" />
          </div>
        ) : forecasts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Nenhuma previsão disponível</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Gere previsões financeiras baseadas em seus dados históricos
            </p>
            <Button onClick={generateForecasts} disabled={isGenerating}>
              <TrendingUp className="mr-2 h-4 w-4" />
              {isGenerating ? "Gerando..." : "Gerar Previsões"}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Tendência de Receitas</p>
                      <h3 className="text-2xl font-bold">{incomeTrend.trend.toFixed(1)}%</h3>
                    </div>
                    <div className={`p-2 rounded-full ${incomeTrend.isPositive ? "bg-green-100" : "bg-red-100"}`}>
                      {incomeTrend.isPositive ? (
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Tendência de Despesas</p>
                      <h3 className="text-2xl font-bold">{expenseTrend.trend.toFixed(1)}%</h3>
                    </div>
                    <div className={`p-2 rounded-full ${expenseTrend.isPositive ? "bg-red-100" : "bg-green-100"}`}>
                      {expenseTrend.isPositive ? (
                        <TrendingUp className="h-5 w-5 text-red-600" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Tendência de Saldo</p>
                      <h3 className="text-2xl font-bold">{balanceTrend.trend.toFixed(1)}%</h3>
                    </div>
                    <div className={`p-2 rounded-full ${balanceTrend.isPositive ? "bg-green-100" : "bg-red-100"}`}>
                      {balanceTrend.isPositive ? (
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">Todas Previsões</TabsTrigger>
                <TabsTrigger value="income-expense">Receitas vs Despesas</TabsTrigger>
                <TabsTrigger value="balance">Saldo Projetado</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="pt-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `R$${value / 1000}k`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line type="monotone" dataKey="income" name="Receitas" stroke="#10b981" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="expense" name="Despesas" stroke="#ef4444" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="balance" name="Saldo" stroke="#3b82f6" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="income-expense" className="pt-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `R$${value / 1000}k`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line type="monotone" dataKey="income" name="Receitas" stroke="#10b981" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="expense" name="Despesas" stroke="#ef4444" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="balance" className="pt-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `R$${value / 1000}k`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line type="monotone" dataKey="balance" name="Saldo" stroke="#3b82f6" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-2">Insights da IA</h3>
              <p className="text-sm text-muted-foreground">
                {balanceTrend.isPositive
                  ? "Suas finanças estão em uma trajetória positiva. Continue com seus hábitos atuais de economia e controle de gastos."
                  : "Suas finanças estão em uma trajetória negativa. Considere revisar seus gastos e aumentar sua receita para melhorar seu saldo futuro."}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {expenseTrend.isPositive
                  ? "Suas despesas estão aumentando. Identifique categorias com maior crescimento e estabeleça limites de orçamento."
                  : "Suas despesas estão diminuindo. Continue monitorando seus gastos para manter esta tendência positiva."}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Confiança média da previsão:{" "}
                {chartData.length > 0
                  ? (chartData.reduce((sum, item) => sum + item.confidence, 0) / chartData.length).toFixed(1)
                  : 0}
                %
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
