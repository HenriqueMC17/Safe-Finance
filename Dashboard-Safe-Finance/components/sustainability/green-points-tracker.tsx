"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, TrendingUp, Award, Zap, Target, Calendar, BarChart3, Trophy, Flame, type LucideIcon } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { LEVEL_SYSTEM } from "@/constants/level-system"

interface GreenPointsData {
  totalPoints: number
  currentLevel: {
    level: number
    name: string
    minPoints: number
    maxPoints: number
  }
  nextLevel: {
    level: number
    name: string
    minPoints: number
    maxPoints: number
  } | null
  progressToNext: number
  recentActivities: Array<{
    id: string
    points: number
    source: string
    description: string
    created_at: string
  }>
  pointsBySource: Array<{
    source: string
    total_points: number
    count: number
  }>
  monthlyPoints: Array<{
    month: string
    points: number
  }>
  rank: number
  streak: number
}

const SOURCE_LABELS: Record<string, string> = {
  carbon_reduction: "Redução de Carbono",
  green_purchase: "Compra Verde",
  challenge_completion: "Desafio Concluído",
  esg_investment: "Investimento ESG",
  education: "Educação",
  donation: "Doação",
  badge_earned: "Badge Conquistado",
}

const SOURCE_ICONS: Record<string, LucideIcon> = {
  carbon_reduction: Target,
  green_purchase: Zap,
  challenge_completion: Trophy,
  esg_investment: TrendingUp,
  education: Star,
  donation: Award,
  badge_earned: Award,
}

export function GreenPointsTracker() {
  const [pointsData, setPointsData] = useState<GreenPointsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPointsData()
  }, [])

  const fetchPointsData = async () => {
    try {
      setLoading(true)
      // Mock data for demonstration
      const mockData: GreenPointsData = {
        totalPoints: 1250,
        currentLevel: {
          level: 3,
          name: "Guardião da Natureza",
          minPoints: 1500,
          maxPoints: 3499,
        },
        nextLevel: {
          level: 4,
          name: "Embaixador Sustentável",
          minPoints: 3500,
          maxPoints: 7499,
        },
        progressToNext: 35.7,
        recentActivities: [
          {
            id: "1",
            points: 500,
            source: "carbon_reduction",
            description: "Reduziu 50kg CO₂ usando transporte público",
            created_at: "2024-01-15T10:30:00Z",
          },
          {
            id: "2",
            points: 200,
            source: "challenge_completion",
            description: 'Completou desafio "Semana Verde"',
            created_at: "2024-01-14T15:45:00Z",
          },
          {
            id: "3",
            points: 100,
            source: "esg_investment",
            description: "Investiu R$ 1.000 em fundo ESG",
            created_at: "2024-01-12T09:20:00Z",
          },
          {
            id: "4",
            points: 150,
            source: "education",
            description: "Completou curso sobre energia renovável",
            created_at: "2024-01-10T14:00:00Z",
          },
          {
            id: "5",
            points: 50,
            source: "green_purchase",
            description: "Comprou produtos sustentáveis",
            created_at: "2024-01-08T11:30:00Z",
          },
        ],
        pointsBySource: [
          { source: "carbon_reduction", total_points: 2500, count: 8 },
          { source: "challenge_completion", total_points: 1800, count: 12 },
          { source: "esg_investment", total_points: 1200, count: 15 },
          { source: "education", total_points: 900, count: 6 },
          { source: "donation", total_points: 500, count: 4 },
          { source: "green_purchase", total_points: 400, count: 10 },
        ],
        monthlyPoints: [
          { month: "Jan", points: 850 },
          { month: "Fev", points: 920 },
          { month: "Mar", points: 1050 },
          { month: "Abr", points: 1180 },
          { month: "Mai", points: 1100 },
          { month: "Jun", points: 1250 },
        ],
        rank: 47,
        streak: 5,
      }

      setPointsData(mockData)
    } catch (error) {
      console.error("Erro ao carregar pontos:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="space-y-0 pb-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-8 bg-muted rounded w-1/2 mt-2"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!pointsData) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800">Pontos Verdes</h1>
          <p className="text-muted-foreground">Acompanhe sua evolução sustentável</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Trophy className="h-3 w-3 mr-1" />#{pointsData.rank} no ranking
          </Badge>
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            <Flame className="h-3 w-3 mr-1" />
            {pointsData.streak} dias
          </Badge>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Pontos Totais</CardTitle>
            <Star className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{pointsData.totalPoints.toLocaleString()}</div>
            <p className="text-xs text-green-600">pontos verdes acumulados</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Nível Atual</CardTitle>
            <Award className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">Nível {pointsData.currentLevel.level}</div>
            <p className="text-xs text-blue-600">{pointsData.currentLevel.name}</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Progresso</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800">{pointsData.progressToNext.toFixed(1)}%</div>
            <p className="text-xs text-purple-600">para próximo nível</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Sequência</CardTitle>
            <Flame className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">{pointsData.streak}</div>
            <p className="text-xs text-orange-600">dias consecutivos</p>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
            Progresso de Nível
          </CardTitle>
          <CardDescription>
            Você está a {pointsData.nextLevel ? pointsData.nextLevel.minPoints - pointsData.totalPoints : 0} pontos do
            próximo nível
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">
                Nível {pointsData.currentLevel.level}: {pointsData.currentLevel.name}
              </span>
              {pointsData.nextLevel && (
                <span className="text-muted-foreground">
                  Nível {pointsData.nextLevel.level}: {pointsData.nextLevel.name}
                </span>
              )}
            </div>
            <Progress value={pointsData.progressToNext} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{pointsData.currentLevel.minPoints} pts</span>
              <span className="font-medium text-green-600">{pointsData.totalPoints} pts</span>
              {pointsData.nextLevel && <span>{pointsData.nextLevel.minPoints} pts</span>}
            </div>
          </div>

          {/* All Levels */}
          <div className="grid gap-2 md:grid-cols-5">
            {LEVEL_SYSTEM.levels.map((level) => (
              <div
                key={level.level}
                className={`p-3 rounded-lg text-center ${
                  pointsData.currentLevel.level === level.level
                    ? "bg-green-100 border-2 border-green-500"
                    : pointsData.currentLevel.level > level.level
                      ? "bg-gray-100"
                      : "bg-white border border-gray-200"
                }`}
              >
                <div className="text-2xl font-bold">{level.level}</div>
                <div className="text-xs font-medium truncate">{level.name}</div>
                <div className="text-xs text-muted-foreground">{level.minPoints}+ pts</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts and Activities */}
      <Tabs defaultValue="evolution" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="evolution">Evolução</TabsTrigger>
          <TabsTrigger value="sources">Fontes</TabsTrigger>
          <TabsTrigger value="activities">Atividades</TabsTrigger>
        </TabsList>

        <TabsContent value="evolution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
                Evolução Mensal
              </CardTitle>
              <CardDescription>Pontos ganhos nos últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={pointsData.monthlyPoints}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    content={({ active, payload, label }: any) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border rounded-md p-3 shadow-md">
                            <p className="font-medium">{label}</p>
                            <p className="text-sm text-green-600">Pontos: {payload[0].value}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Line type="monotone" dataKey="points" stroke="#22c55e" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-green-600" />
                Pontos por Fonte
              </CardTitle>
              <CardDescription>De onde seus pontos vêm</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={pointsData.pointsBySource}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="source" tickFormatter={(value) => SOURCE_LABELS[value] || value} />
                  <YAxis />
                  <Tooltip
                    content={({ active, payload, label }: any) => {
                      if (active && payload && payload.length) {
                        const sourceLabel = SOURCE_LABELS[label] || label
                        return (
                          <div className="bg-background border rounded-md p-3 shadow-md">
                            <p className="font-medium">{sourceLabel}</p>
                            <p className="text-sm text-green-600">Total: {payload[0].value} pontos</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar dataKey="total_points" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-4 space-y-3">
                {pointsData.pointsBySource.map((source) => {
                  const Icon = SOURCE_ICONS[source.source] || Star
                  return (
                    <div key={source.source} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">{SOURCE_LABELS[source.source] || source.source}</p>
                          <p className="text-sm text-muted-foreground">{source.count} atividades</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{source.total_points}</p>
                        <p className="text-xs text-muted-foreground">pontos</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-600" />
                Atividades Recentes
              </CardTitle>
              <CardDescription>Suas últimas conquistas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pointsData.recentActivities.map((activity) => {
                  const Icon = SOURCE_ICONS[activity.source] || Star
                  return (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Icon className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.description}</p>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <span>{SOURCE_LABELS[activity.source] || activity.source}</span>
                            <span>•</span>
                            <span>{new Date(activity.created_at).toLocaleDateString("pt-BR")}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        +{activity.points} pts
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
