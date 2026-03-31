"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Leaf,
  TrendingDown,
  TrendingUp,
  Target,
  Award,
  Zap,
  TreePine,
  Globe,
  Heart,
  Star,
  Calendar,
  Users,
  Minus,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { LEVEL_SYSTEM } from "@/constants/level-system"

interface SustainabilityMetrics {
  totalCarbonSaved: number
  greenPointsEarned: number
  badgesEarned: number
  challengesCompleted: number
  esgInvestments: number
  donationsAmount: number
  educationCompleted: number
  level: number
  rank: number
  monthlyEmissions: Array<{
    month: string
    emissions: number
    target: number
  }>
  categoryBreakdown: Array<{
    category: string
    value: number
    color: string
  }>
  recentActivities: Array<{
    type: string
    description: string
    points: number
    date: string
  }>
}

const COLORS = ["#22c55e", "#16a34a", "#15803d", "#166534", "#14532d"]

export function SustainabilityDashboard() {
  const [metrics, setMetrics] = useState<SustainabilityMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState("6m")

  useEffect(() => {
    fetchSustainabilityMetrics()
  }, [selectedPeriod])

  const fetchSustainabilityMetrics = async () => {
    try {
      setLoading(true)
      // Mock data for demonstration
      const mockMetrics: SustainabilityMetrics = {
        totalCarbonSaved: 2.5,
        greenPointsEarned: 1250,
        badgesEarned: 8,
        challengesCompleted: 12,
        esgInvestments: 15000,
        donationsAmount: 500,
        educationCompleted: 6,
        level: 3,
        rank: 47,
        monthlyEmissions: [
          { month: "Jan", emissions: 1200, target: 1000 },
          { month: "Fev", emissions: 1100, target: 1000 },
          { month: "Mar", emissions: 950, target: 1000 },
          { month: "Abr", emissions: 880, target: 1000 },
          { month: "Mai", emissions: 820, target: 1000 },
          { month: "Jun", emissions: 750, target: 1000 },
        ],
        categoryBreakdown: [
          { category: "Transporte", value: 35, color: "#22c55e" },
          { category: "Energia", value: 28, color: "#16a34a" },
          { category: "Alimentação", value: 22, color: "#15803d" },
          { category: "Compras", value: 15, color: "#166534" },
        ],
        recentActivities: [
          {
            type: "carbon_reduction",
            description: "Reduziu 50kg CO₂ usando transporte público",
            points: 500,
            date: "2024-01-15",
          },
          {
            type: "challenge_completion",
            description: 'Completou desafio "Semana Verde"',
            points: 200,
            date: "2024-01-14",
          },
          { type: "esg_investment", description: "Investiu R$ 1.000 em fundo ESG", points: 100, date: "2024-01-12" },
          {
            type: "education",
            description: "Completou curso sobre energia renovável",
            points: 150,
            date: "2024-01-10",
          },
        ],
      }
      setMetrics(mockMetrics)
    } catch (error) {
      console.error("Erro ao carregar métricas:", error)
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

  if (!metrics) return null

  const currentLevel = LEVEL_SYSTEM.levels.find((l) => l.level === metrics.level)
  const nextLevel = LEVEL_SYSTEM.levels.find((l) => l.level === metrics.level + 1)
  const progressToNext = nextLevel
    ? ((metrics.greenPointsEarned - currentLevel!.minPoints) / (nextLevel.minPoints - currentLevel!.minPoints)) * 100
    : 100

  const getTrendIcon = (current: number, previous: number) => {
    if (current < previous) return <TrendingDown className="h-4 w-4 text-green-600" />
    if (current > previous) return <TrendingUp className="h-4 w-4 text-red-600" />
    return <Minus className="h-4 w-4 text-gray-600" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800">Dashboard de Sustentabilidade</h1>
          <p className="text-muted-foreground">Acompanhe seu impacto ambiental e conquistas verdes</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Star className="h-3 w-3 mr-1" />
            {currentLevel?.name}
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Users className="h-3 w-3 mr-1" />#{metrics.rank} no ranking
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">CO₂ Economizado</CardTitle>
            <TreePine className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{metrics.totalCarbonSaved.toFixed(1)} ton</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingDown className="h-3 w-3 mr-1" />
              Equivale a plantar 113 árvores
            </p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Pontos Verdes</CardTitle>
            <Zap className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">{metrics.greenPointsEarned.toLocaleString()}</div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-blue-600">Nível {metrics.level}</p>
              <p className="text-xs text-blue-600">{progressToNext.toFixed(0)}% para próximo</p>
            </div>
            <Progress value={progressToNext} className="mt-1 h-1" />
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Investimentos ESG</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800">R$ {metrics.esgInvestments.toLocaleString()}</div>
            <p className="text-xs text-purple-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% este mês
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Conquistas</CardTitle>
            <Award className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">{metrics.badgesEarned}</div>
            <p className="text-xs text-orange-600">{metrics.challengesCompleted} desafios concluídos</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Details */}
      <Tabs defaultValue="emissions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="emissions">Emissões</TabsTrigger>
          <TabsTrigger value="investments">Investimentos</TabsTrigger>
          <TabsTrigger value="challenges">Desafios</TabsTrigger>
          <TabsTrigger value="impact">Impacto</TabsTrigger>
        </TabsList>

        <TabsContent value="emissions" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-green-600" />
                  Evolução das Emissões
                </CardTitle>
                <CardDescription>Acompanhe sua pegada de carbono ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={metrics.monthlyEmissions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        `${value}kg CO₂`,
                        name === "emissions" ? "Emissões" : "Meta",
                      ]}
                    />
                    <Line type="monotone" dataKey="emissions" stroke="#ef4444" strokeWidth={2} name="emissions" />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#22c55e"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="target"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Leaf className="h-5 w-5 mr-2 text-green-600" />
                  Distribuição por Categoria
                </CardTitle>
                <CardDescription>Onde você mais emite CO₂</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={metrics.categoryBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, value }) => `${category}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {metrics.categoryBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="investments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-green-600" />
                Portfólio ESG
              </CardTitle>
              <CardDescription>Seus investimentos sustentáveis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      R$ {metrics.esgInvestments.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground">Valor Investido</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">+8.5%</div>
                    <p className="text-sm text-muted-foreground">Retorno Anual</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">82</div>
                    <p className="text-sm text-muted-foreground">Score ESG Médio</p>
                  </div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700">
                    Seus investimentos ESG estão 15% acima da média do mercado! 🌱
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-green-600" />
                  Desafios Ativos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Semana sem Carro</p>
                      <p className="text-sm text-muted-foreground">Use apenas transporte público</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">5/7 dias</Badge>
                  </div>
                  <Progress value={71} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Economia de Energia</p>
                      <p className="text-sm text-muted-foreground">Reduza 20% do consumo</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">15% reduzido</Badge>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-600" />
                  Badges Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <TreePine className="h-8 w-8 mx-auto text-green-600 mb-2" />
                    <p className="text-xs font-medium">Guardião Verde</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Zap className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                    <p className="text-xs font-medium">Economizador</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <Target className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                    <p className="text-xs font-medium">Investidor ESG</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <Heart className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                    <p className="text-xs font-medium">Doador Verde</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="impact" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-green-600" />
                  Impacto Ambiental
                </CardTitle>
                <CardDescription>Seu impacto positivo no planeta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <TreePine className="h-8 w-8 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium">Árvores Equivalentes</p>
                        <p className="text-sm text-muted-foreground">CO₂ absorvido</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">113</p>
                      <p className="text-xs text-green-600">árvores</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <Zap className="h-8 w-8 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium">Energia Limpa</p>
                        <p className="text-sm text-muted-foreground">Investimentos</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">R$ 8.5k</p>
                      <p className="text-xs text-blue-600">investidos</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center">
                      <Heart className="h-8 w-8 text-purple-600 mr-3" />
                      <div>
                        <p className="font-medium">Doações Verdes</p>
                        <p className="text-sm text-muted-foreground">Causas ambientais</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-600">R$ {metrics.donationsAmount}</p>
                      <p className="text-xs text-purple-600">doados</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-green-600" />
                  Atividades Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {metrics.recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        +{activity.points} pts
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>Continue sua jornada sustentável</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
              <TreePine className="h-6 w-6 text-green-600" />
              <span className="text-sm">Calcular Pegada</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
              <Target className="h-6 w-6 text-blue-600" />
              <span className="text-sm">Criar Orçamento</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
              <Award className="h-6 w-6 text-purple-600" />
              <span className="text-sm">Ver Desafios</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
              <Heart className="h-6 w-6 text-red-600" />
              <span className="text-sm">Fazer Doação</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
