"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, DollarSign, ArrowRight } from "lucide-react"
import { useLocale } from "@/contexts/locale-context"
import { memo } from "react"

const metrics = [
  {
    id: 1,
    title: "Crescimento de Receita",
    subtitle: "Meta de receita mensal",
    icon: TrendingUp,
    status: "No Caminho",
    progress: 75,
    target: 100000,
    current: 75000,
    unit: "R$",
  },
  {
    id: 2,
    title: "Aquisição de Clientes",
    subtitle: "Novos clientes neste trimestre",
    icon: Users,
    status: "Atrasado",
    progress: 60,
    target: 1000,
    current: 600,
    unit: "",
  },
  {
    id: 3,
    title: "Valor Médio de Pedido",
    subtitle: "Meta de VMP para Q3",
    icon: DollarSign,
    status: "Adiantado",
    progress: 110,
    target: 150,
    current: 165,
    unit: "R$",
  },
]

const statusColors = {
  "No Caminho": "bg-primary/20 text-primary",
  Atrasado: "bg-red-500/20 text-red-500",
  Adiantado: "bg-primary/20 text-primary",
}

export const BusinessMetrics = memo(function BusinessMetrics() {
  const { formatCurrency } = useLocale()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Métricas de Negócio</h2>
        <Button variant="outline" size="sm">
          Ver Detalhes <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className={`px-2 py-1 rounded-full ${statusColors[metric.status]}`}>{metric.status}</span>
                  <span className="text-muted-foreground">
                    {metric.unit}
                    {formatCurrency(metric.current).replace(/[R$]/g, "")} / {metric.unit}
                    {formatCurrency(metric.target).replace(/[R$]/g, "")}
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div
                    className="bg-primary h-1.5 rounded-full"
                    style={{ width: `${Math.min(metric.progress, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">{formatCurrency(metric.target)}</span>
                  <span className="text-muted-foreground">{metric.progress}% completo</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
})
