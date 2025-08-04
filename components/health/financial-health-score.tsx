"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, TrendingUp, Shield, PiggyBank, Target, Zap, Trophy, AlertTriangle, CheckCircle } from "lucide-react"

interface HealthMetric {
  id: string
  name: string
  score: number
  maxScore: number
  icon: React.ReactNode
  description: string
  suggestions: string[]
}

interface HealthLevel {
  name: string
  minScore: number
  maxScore: number
  color: string
  icon: React.ReactNode
  badge: string
}

const healthLevels: HealthLevel[] = [
  {
    name: "Iniciante",
    minScore: 0,
    maxScore: 200,
    color: "text-red-600",
    icon: <AlertTriangle className="h-5 w-5" />,
    badge: "bg-red-100 text-red-800",
  },
  {
    name: "Aprendiz",
    minScore: 201,
    maxScore: 400,
    color: "text-orange-600",
    icon: <Zap className="h-5 w-5" />,
    badge: "bg-orange-100 text-orange-800",
  },
  {
    name: "Competente",
    minScore: 401,
    maxScore: 600,
    color: "text-yellow-600",
    icon: <Target className="h-5 w-5" />,
    badge: "bg-yellow-100 text-yellow-800",
  },
  {
    name: "Avançado",
    minScore: 601,
    maxScore: 800,
    color: "text-blue-600",
    icon: <TrendingUp className="h-5 w-5" />,
    badge: "bg-blue-100 text-blue-800",
  },
  {
    name: "Mestre",
    minScore: 801,
    maxScore: 1000,
    color: "text-green-600",
    icon: <Trophy className="h-5 w-5" />,
    badge: "bg-green-100 text-green-800",
  },
]

export function FinancialHealthScore() {
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([
    {
      id: "emergency-fund",
      name: "Reserva de Emergência",
      score: 120,
      maxScore: 200,
      icon: <Shield className="h-4 w-4" />,
      description: "Sua reserva para imprevistos",
      suggestions: [
        "Aumente sua reserva para 6 meses de gastos",
        "Mantenha em conta de fácil acesso",
        "Considere investimentos de baixo risco",
      ],
    },
    {
      id: "debt-control",
      name: "Controle de Dívidas",
      score: 150,
      maxScore: 200,
      icon: <AlertTriangle className="h-4 w-4" />,
      description: "Gestão das suas dívidas",
      suggestions: [
        "Quite primeiro as dívidas com juros mais altos",
        "Negocie melhores condições",
        "Evite novas dívidas desnecessárias",
      ],
    },
    {
      id: "savings-rate",
      name: "Taxa de Poupança",
      score: 100,
      maxScore: 200,
      icon: <PiggyBank className="h-4 w-4" />,
      description: "Percentual da renda que você poupa",
      suggestions: [
        "Tente poupar pelo menos 20% da renda",
        "Automatize suas poupanças",
        "Revise gastos desnecessários",
      ],
    },
    {
      id: "investment-diversity",
      name: "Diversificação",
      score: 80,
      maxScore: 200,
      icon: <TrendingUp className="h-4 w-4" />,
      description: "Diversificação dos seus investimentos",
      suggestions: [
        "Diversifique entre diferentes tipos de ativos",
        "Considere investimentos internacionais",
        "Rebalanceie periodicamente",
      ],
    },
    {
      id: "financial-goals",
      name: "Metas Financeiras",
      score: 90,
      maxScore: 200,
      icon: <Target className="h-4 w-4" />,
      description: "Progresso em direção às suas metas",
      suggestions: [
        "Defina metas específicas e mensuráveis",
        "Estabeleça prazos realistas",
        "Monitore o progresso regularmente",
      ],
    },
  ])

  const totalScore = healthMetrics.reduce((sum, metric) => sum + metric.score, 0)
  const maxTotalScore = healthMetrics.reduce((sum, metric) => sum + metric.maxScore, 0)
  const healthPercentage = (totalScore / maxTotalScore) * 100

  const currentLevel =
    healthLevels.find((level) => totalScore >= level.minScore && totalScore <= level.maxScore) || healthLevels[0]

  const nextLevel = healthLevels.find((level) => level.minScore > totalScore)
  const pointsToNextLevel = nextLevel ? nextLevel.minScore - totalScore : 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Saúde Financeira
          </CardTitle>
          <Badge className={currentLevel.badge}>
            {currentLevel.icon}
            <span className="ml-1">{currentLevel.name}</span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="text-center">
          <div className="text-3xl font-bold mb-2 text-primary">{totalScore}</div>
          <div className="text-sm text-muted-foreground mb-4">de {maxTotalScore} pontos</div>
          <Progress value={healthPercentage} className="h-3" />

          {nextLevel && (
            <div className="mt-2 text-xs text-muted-foreground">
              {pointsToNextLevel} pontos para {nextLevel.name}
            </div>
          )}
        </div>

        {/* Individual Metrics */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Métricas Detalhadas</h4>
          {healthMetrics.map((metric) => (
            <div key={metric.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {metric.icon}
                  <span className="text-sm font-medium">{metric.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {metric.score}/{metric.maxScore}
                </span>
              </div>
              <Progress value={(metric.score / metric.maxScore) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">{metric.description}</p>
            </div>
          ))}
        </div>

        {/* Suggestions */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            Sugestões de Melhoria
          </h4>

          {/* Show suggestions for the lowest scoring metric */}
          {(() => {
            const lowestMetric = healthMetrics.reduce((prev, current) =>
              prev.score / prev.maxScore < current.score / current.maxScore ? prev : current,
            )

            return (
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Foco: {lowestMetric.name}</div>
                <ul className="space-y-1">
                  {lowestMetric.suggestions.slice(0, 2).map((suggestion, index) => (
                    <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-primary">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })()}
        </div>

        <Button variant="outline" className="w-full bg-transparent" size="sm">
          Ver Relatório Completo
        </Button>
      </CardContent>
    </Card>
  )
}
