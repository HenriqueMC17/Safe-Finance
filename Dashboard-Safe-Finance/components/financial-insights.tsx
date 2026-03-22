"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Lightbulb, TrendingUp, PieChart, AlertTriangle } from "lucide-react"

interface Insight {
  id: number
  title: string
  content: string
  category: string
  created_at: string
}

interface FinancialInsightsProps {
  userId: number
}

export function FinancialInsights({ userId }: FinancialInsightsProps) {
  const [insights, setInsights] = useState<Insight[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInsights = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/insights?userId=${userId}`)

        if (!response.ok) {
          throw new Error("Erro ao buscar insights")
        }

        const data = await response.json()
        setInsights(data.insights)
      } catch (error) {
        console.error("Erro:", error)
        setError("Não foi possível carregar seus insights financeiros.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchInsights()
  }, [userId])

  const getIconForCategory = (category: string) => {
    switch (category) {
      case "spending":
        return <PieChart className="h-5 w-5 text-primary" />
      case "saving":
        return <TrendingUp className="h-5 w-5 text-green-500" />
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      default:
        return <Lightbulb className="h-5 w-5 text-primary" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR").format(date)
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Insights Financeiros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Insights Financeiros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-center text-red-500">{error}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Insights Financeiros</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              Nenhum insight financeiro disponível. Use o assistente para obter recomendações personalizadas.
            </div>
          ) : (
            insights.map((insight) => (
              <Card key={insight.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getIconForCategory(insight.category)}</div>
                    <div className="flex-1">
                      <h3 className="font-medium">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{insight.content}</p>
                      <p className="text-xs text-muted-foreground mt-2">{formatDate(insight.created_at)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
