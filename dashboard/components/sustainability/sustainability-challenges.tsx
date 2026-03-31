"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Calendar, Target, Users, Trophy, Star, Clock, CheckCircle, Play, TrendingUp, Leaf } from "lucide-react"
import { toast } from "sonner"

interface Challenge {
  id: string
  title: string
  description: string
  category: "carbon_reduction" | "green_spending" | "education" | "community"
  targetValue: number
  unit: string
  points: number
  difficulty: "easy" | "medium" | "hard"
  startDate: string
  endDate: string
  isActive: boolean
  participants: number
  userProgress?: number
  userCompleted?: boolean
  userJoined?: boolean
  joinedAt?: string
}

interface UserStats {
  totalChallenges: number
  completedChallenges: number
  activeChallenges: number
  totalPointsEarned: number
  completionRate: number
  currentStreak: number
  longestStreak: number
  rank: number
}

interface LeaderboardEntry {
  rank: number
  name: string
  completedChallenges: number
  totalPoints: number
  avatar?: string
}

const CHALLENGE_CATEGORIES = [
  { value: "carbon_reduction", label: "Redução de Carbono", icon: Leaf, color: "green" },
  { value: "green_spending", label: "Gastos Verdes", icon: Target, color: "blue" },
  { value: "education", label: "Educação", icon: Star, color: "purple" },
  { value: "community", label: "Comunidade", icon: Users, color: "orange" },
]

const DIFFICULTY_COLORS = {
  easy: "bg-green-50 text-green-700 border-green-200",
  medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
  hard: "bg-red-50 text-red-700 border-red-200",
}

export function SustainabilityChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)
  const [activeTab, setActiveTab] = useState("available")

  useEffect(() => {
    fetchChallenges()
    fetchUserStats()
    fetchLeaderboard()
  }, [])

  const fetchChallenges = async () => {
    try {
      setLoading(true)
      // Mock data for demonstration
      const mockChallenges: Challenge[] = [
        {
          id: "1",
          title: "Semana sem Carro",
          description: "Use apenas transporte público, bicicleta ou caminhada por 7 dias consecutivos",
          category: "carbon_reduction",
          targetValue: 7,
          unit: "dias",
          points: 200,
          difficulty: "medium",
          startDate: "2024-01-01",
          endDate: "2024-01-31",
          isActive: true,
          participants: 1247,
          userProgress: 5,
          userCompleted: false,
          userJoined: true,
          joinedAt: "2024-01-15",
        },
        {
          id: "2",
          title: "Economia de Energia",
          description: "Reduza seu consumo de energia elétrica em 20% comparado ao mês anterior",
          category: "carbon_reduction",
          targetValue: 20,
          unit: "% redução",
          points: 150,
          difficulty: "medium",
          startDate: "2024-01-01",
          endDate: "2024-01-31",
          isActive: true,
          participants: 892,
          userProgress: 15,
          userCompleted: false,
          userJoined: true,
          joinedAt: "2024-01-10",
        },
        {
          id: "3",
          title: "Compras Sustentáveis",
          description: "Gaste pelo menos R$ 300 em produtos ecológicos e sustentáveis",
          category: "green_spending",
          targetValue: 300,
          unit: "reais",
          points: 100,
          difficulty: "easy",
          startDate: "2024-01-01",
          endDate: "2024-01-31",
          isActive: true,
          participants: 654,
          userProgress: 180,
          userCompleted: false,
          userJoined: true,
          joinedAt: "2024-01-08",
        },
        {
          id: "4",
          title: "Mestre da Reciclagem",
          description: "Recicle pelo menos 50 itens diferentes durante o mês",
          category: "community",
          targetValue: 50,
          unit: "itens",
          points: 120,
          difficulty: "easy",
          startDate: "2024-01-01",
          endDate: "2024-01-31",
          isActive: true,
          participants: 423,
          userProgress: 0,
          userCompleted: false,
          userJoined: false,
        },
        {
          id: "5",
          title: "Educação Verde",
          description: "Complete 3 cursos sobre sustentabilidade e meio ambiente",
          category: "education",
          targetValue: 3,
          unit: "cursos",
          points: 180,
          difficulty: "hard",
          startDate: "2024-01-01",
          endDate: "2024-01-31",
          isActive: true,
          participants: 234,
          userProgress: 0,
          userCompleted: false,
          userJoined: false,
        },
      ]

      setChallenges(mockChallenges)
    } catch (error) {
      console.error("Erro ao carregar desafios:", error)
      toast.error("Erro ao carregar desafios")
    } finally {
      setLoading(false)
    }
  }

  const fetchUserStats = async () => {
    try {
      const mockStats: UserStats = {
        totalChallenges: 12,
        completedChallenges: 8,
        activeChallenges: 3,
        totalPointsEarned: 1450,
        completionRate: 66.7,
        currentStreak: 3,
        longestStreak: 5,
        rank: 47,
      }
      setUserStats(mockStats)
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error)
    }
  }

  const fetchLeaderboard = async () => {
    try {
      const mockLeaderboard: LeaderboardEntry[] = [
        { rank: 1, name: "Ana Silva", completedChallenges: 25, totalPoints: 3200 },
        { rank: 2, name: "Carlos Santos", completedChallenges: 23, totalPoints: 2980 },
        { rank: 3, name: "Maria Oliveira", completedChallenges: 22, totalPoints: 2850 },
        { rank: 4, name: "João Costa", completedChallenges: 20, totalPoints: 2650 },
        { rank: 5, name: "Lucia Ferreira", completedChallenges: 19, totalPoints: 2480 },
      ]
      setLeaderboard(mockLeaderboard)
    } catch (error) {
      console.error("Erro ao carregar ranking:", error)
    }
  }

  const handleJoinChallenge = async (challengeId: string) => {
    try {
      setChallenges((prev) =>
        prev.map((challenge) =>
          challenge.id === challengeId
            ? {
                ...challenge,
                userJoined: true,
                userProgress: 0,
                joinedAt: new Date().toISOString(),
                participants: challenge.participants + 1,
              }
            : challenge,
        ),
      )
      toast.success("Desafio aceito com sucesso!")
    } catch (error) {
      console.error("Erro ao participar do desafio:", error)
      toast.error("Erro ao participar do desafio")
    }
  }

  const handleUpdateProgress = async (challengeId: string, progress: number) => {
    try {
      setChallenges((prev) =>
        prev.map((challenge) => {
          if (challenge.id === challengeId) {
            const isCompleted = progress >= challenge.targetValue
            return {
              ...challenge,
              userProgress: progress,
              userCompleted: isCompleted,
            }
          }
          return challenge
        }),
      )

      const challenge = challenges.find((c) => c.id === challengeId)
      if (challenge && progress >= challenge.targetValue) {
        toast.success(`Parabéns! Você completou o desafio "${challenge.title}"!`)
      } else {
        toast.success("Progresso atualizado!")
      }
    } catch (error) {
      console.error("Erro ao atualizar progresso:", error)
      toast.error("Erro ao atualizar progresso")
    }
  }

  const getCategoryInfo = (category: string) => {
    return CHALLENGE_CATEGORIES.find((cat) => cat.value === category) || CHALLENGE_CATEGORIES[0]
  }

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  const getProgressPercentage = (challenge: Challenge) => {
    if (!challenge.userProgress) return 0
    return Math.min((challenge.userProgress / challenge.targetValue) * 100, 100)
  }

  const availableChallenges = challenges.filter((c) => !c.userJoined)
  const userChallenges = challenges.filter((c) => c.userJoined)

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800">Desafios de Sustentabilidade</h1>
          <p className="text-muted-foreground">Participe de desafios e ganhe pontos verdes</p>
        </div>
        {userStats && (
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Trophy className="h-3 w-3 mr-1" />#{userStats.rank} no ranking
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Star className="h-3 w-3 mr-1" />
              {userStats.totalPointsEarned} pontos
            </Badge>
          </div>
        )}
      </div>

      {/* Stats Overview */}
      {userStats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Desafios Completados</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{userStats.completedChallenges}</div>
              <p className="text-xs text-green-600">{userStats.completionRate.toFixed(1)}% de taxa de conclusão</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Desafios Ativos</CardTitle>
              <Play className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">{userStats.activeChallenges}</div>
              <p className="text-xs text-blue-600">em andamento</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Sequência Atual</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">{userStats.currentStreak}</div>
              <p className="text-xs text-purple-600">Recorde: {userStats.longestStreak} desafios</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-800">Pontos Totais</CardTitle>
              <Award className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800">{userStats.totalPointsEarned}</div>
              <p className="text-xs text-orange-600">pontos verdes ganhos</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="available">Disponíveis ({availableChallenges.length})</TabsTrigger>
          <TabsTrigger value="active">Meus Desafios ({userChallenges.length})</TabsTrigger>
          <TabsTrigger value="leaderboard">Ranking</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          {availableChallenges.length === 0 ? (
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Target className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Nenhum Desafio Disponível</h3>
                <p className="text-sm text-gray-500 text-center">
                  Todos os desafios ativos já foram aceitos por você. Novos desafios chegam mensalmente!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {availableChallenges.map((challenge) => {
                const categoryInfo = getCategoryInfo(challenge.category)
                const CategoryIcon = categoryInfo.icon
                const daysRemaining = getDaysRemaining(challenge.endDate)

                return (
                  <Card key={challenge.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg bg-${categoryInfo.color}-50`}>
                            <CategoryIcon className={`h-5 w-5 text-${categoryInfo.color}-600`} />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{challenge.title}</CardTitle>
                            <CardDescription className="mt-1">{challenge.description}</CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline" className={DIFFICULTY_COLORS[challenge.difficulty]}>
                          {challenge.difficulty === "easy"
                            ? "Fácil"
                            : challenge.difficulty === "medium"
                              ? "Médio"
                              : "Difícil"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="flex items-center space-x-2">
                          <Award className="h-4 w-4 text-orange-600" />
                          <span className="text-sm font-medium">{challenge.points} pontos</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">{challenge.participants} participantes</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Target className="h-4 w-4 text-green-600" />
                          <span className="text-sm">
                            Meta: {challenge.targetValue} {challenge.unit}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-red-600" />
                          <span className="text-sm">{daysRemaining} dias restantes</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <Badge
                          variant="outline"
                          className={`bg-${categoryInfo.color}-50 text-${categoryInfo.color}-700`}
                        >
                          {categoryInfo.label}
                        </Badge>
                        <Button
                          onClick={() => handleJoinChallenge(challenge.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Aceitar Desafio
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {userChallenges.length === 0 ? (
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Play className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Nenhum Desafio Ativo</h3>
                <p className="text-sm text-gray-500 text-center mb-4">
                  Aceite alguns desafios disponíveis para começar sua jornada sustentável
                </p>
                <Button onClick={() => setActiveTab("available")} className="bg-green-600 hover:bg-green-700">
                  Ver Desafios Disponíveis
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {userChallenges.map((challenge) => {
                const categoryInfo = getCategoryInfo(challenge.category)
                const CategoryIcon = categoryInfo.icon
                const progressPercentage = getProgressPercentage(challenge)
                const daysRemaining = getDaysRemaining(challenge.endDate)

                return (
                  <Card key={challenge.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg bg-${categoryInfo.color}-50`}>
                            <CategoryIcon className={`h-5 w-5 text-${categoryInfo.color}-600`} />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg flex items-center">
                              {challenge.title}
                              {challenge.userCompleted && <CheckCircle className="h-5 w-5 ml-2 text-green-600" />}
                            </CardTitle>
                            <CardDescription className="mt-1">{challenge.description}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {challenge.userCompleted ? (
                            <Badge className="bg-green-50 text-green-700 border-green-200">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Concluído
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              Em Andamento
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progresso</span>
                          <span className="font-medium">
                            {challenge.userProgress || 0} / {challenge.targetValue} {challenge.unit}
                          </span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{progressPercentage.toFixed(1)}% concluído</span>
                          <span className="text-green-600">{challenge.points} pontos ao completar</span>
                        </div>
                      </div>

                      {/* Info Grid */}
                      <div className="grid gap-3 md:grid-cols-3">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">
                            Iniciado em {new Date(challenge.joinedAt!).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-red-600" />
                          <span className="text-sm">{daysRemaining} dias restantes</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-purple-600" />
                          <span className="text-sm">{challenge.participants} participantes</span>
                        </div>
                      </div>

                      {/* Quick Update */}
                      {!challenge.userCompleted && (
                        <div className="flex space-x-2 pt-2">
                          <input
                            type="number"
                            placeholder={`Progresso atual (${challenge.unit})`}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                            max={challenge.targetValue}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                const target = e.target as HTMLInputElement
                                const progress = Number.parseFloat(target.value) || 0
                                handleUpdateProgress(challenge.id, progress)
                                target.value = ""
                              }
                            }}
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              const input = document.querySelector(
                                `input[placeholder="Progresso atual (${challenge.unit})"]`,
                              ) as HTMLInputElement
                              if (input && input.value) {
                                const progress = Number.parseFloat(input.value) || 0
                                handleUpdateProgress(challenge.id, progress)
                                input.value = ""
                              }
                            }}
                          >
                            Atualizar
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
                Ranking de Sustentabilidade
              </CardTitle>
              <CardDescription>Os maiores defensores do meio ambiente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((entry, index) => (
                  <div
                    key={entry.rank}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      index < 3 ? "bg-gradient-to-r from-yellow-50 to-orange-50" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          entry.rank === 1
                            ? "bg-yellow-500 text-white"
                            : entry.rank === 2
                              ? "bg-gray-400 text-white"
                              : entry.rank === 3
                                ? "bg-orange-500 text-white"
                                : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : entry.rank === 3 ? "🥉" : entry.rank}
                      </div>
                      <div>
                        <p className="font-medium">{entry.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {entry.completedChallenges} desafios completados
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{entry.totalPoints} pts</p>
                      <p className="text-xs text-muted-foreground">pontos verdes</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
