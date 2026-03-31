"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Award,
  Star,
  Trophy,
  Target,
  Leaf,
  Zap,
  Users,
  BookOpen,
  Heart,
  Shield,
  Crown,
  Lock,
  CheckCircle,
} from "lucide-react"

interface BadgeData {
  id: string
  name: string
  description: string
  icon: string
  category: "carbon" | "investment" | "education" | "community" | "achievement"
  requirement: string
  points: number
  rarity: "common" | "rare" | "epic" | "legendary"
  isActive: boolean
  earned?: boolean
  earnedAt?: string
  progress?: number
  progressTarget?: number
}

interface BadgeStats {
  totalBadges: number
  earnedBadges: number
  completionRate: number
  totalPoints: number
  categoriesCompleted: number
  recentBadges: BadgeData[]
  nextToUnlock: BadgeData[]
}

const CATEGORY_INFO = {
  carbon: { label: "Carbono", icon: Leaf, color: "green" },
  investment: { label: "Investimentos", icon: Target, color: "blue" },
  education: { label: "Educação", icon: BookOpen, color: "purple" },
  community: { label: "Comunidade", icon: Users, color: "orange" },
  achievement: { label: "Conquistas", icon: Trophy, color: "yellow" },
}

const RARITY_INFO = {
  common: { label: "Comum", color: "bg-gray-100 text-gray-700 border-gray-300" },
  rare: { label: "Raro", color: "bg-blue-100 text-blue-700 border-blue-300" },
  epic: { label: "Épico", color: "bg-purple-100 text-purple-700 border-purple-300" },
  legendary: { label: "Lendário", color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
}

const BADGE_ICONS: Record<string, any> = {
  leaf: Leaf,
  star: Star,
  trophy: Trophy,
  target: Target,
  zap: Zap,
  users: Users,
  book: BookOpen,
  heart: Heart,
  shield: Shield,
  crown: Crown,
  award: Award,
}

export function SustainabilityBadges() {
  const [badges, setBadges] = useState<BadgeData[]>([])
  const [stats, setStats] = useState<BadgeStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  useEffect(() => {
    fetchBadges()
  }, [])

  const fetchBadges = async () => {
    try {
      setLoading(true)
      // Mock data for demonstration
      const mockBadges: BadgeData[] = [
        {
          id: "1",
          name: "Primeiro Passo Verde",
          description: "Complete sua primeira calculadora de pegada de carbono",
          icon: "leaf",
          category: "carbon",
          requirement: "Calcular pegada de carbono 1 vez",
          points: 50,
          rarity: "common",
          isActive: true,
          earned: true,
          earnedAt: "2024-01-15T10:00:00Z",
        },
        {
          id: "2",
          name: "Guardião do Carbono",
          description: "Reduza suas emissões por 3 meses consecutivos",
          icon: "shield",
          category: "carbon",
          requirement: "3 meses de redução consecutiva",
          points: 200,
          rarity: "rare",
          isActive: true,
          earned: true,
          earnedAt: "2024-01-20T14:30:00Z",
        },
        {
          id: "3",
          name: "Mestre da Sustentabilidade",
          description: "Atinja emissões zero por um mês inteiro",
          icon: "crown",
          category: "carbon",
          requirement: "0kg CO₂ em um mês",
          points: 500,
          rarity: "legendary",
          isActive: true,
          earned: false,
          progress: 750,
          progressTarget: 1000,
        },
        {
          id: "4",
          name: "Investidor Verde",
          description: "Faça seu primeiro investimento ESG",
          icon: "target",
          category: "investment",
          requirement: "1 investimento ESG",
          points: 100,
          rarity: "common",
          isActive: true,
          earned: true,
          earnedAt: "2024-01-18T09:00:00Z",
        },
        {
          id: "5",
          name: "Portfólio Sustentável",
          description: "Mantenha score ESG médio acima de 80",
          icon: "star",
          category: "investment",
          requirement: "Score ESG > 80",
          points: 250,
          rarity: "epic",
          isActive: true,
          earned: true,
          earnedAt: "2024-01-22T11:00:00Z",
        },
        {
          id: "6",
          name: "Estudante Ambiental",
          description: "Complete 3 cursos de educação ambiental",
          icon: "book",
          category: "education",
          requirement: "3 cursos completados",
          points: 150,
          rarity: "rare",
          isActive: true,
          earned: false,
          progress: 2,
          progressTarget: 3,
        },
        {
          id: "7",
          name: "Especialista Verde",
          description: "Complete 10 cursos de sustentabilidade",
          icon: "book",
          category: "education",
          requirement: "10 cursos completados",
          points: 400,
          rarity: "epic",
          isActive: true,
          earned: false,
          progress: 4,
          progressTarget: 10,
        },
        {
          id: "8",
          name: "Líder Comunitário",
          description: "Convide 5 amigos para a plataforma",
          icon: "users",
          category: "community",
          requirement: "5 indicações",
          points: 200,
          rarity: "rare",
          isActive: true,
          earned: false,
          progress: 2,
          progressTarget: 5,
        },
        {
          id: "9",
          name: "Coração Verde",
          description: "Faça sua primeira doação ambiental",
          icon: "heart",
          category: "community",
          requirement: "1 doação",
          points: 100,
          rarity: "common",
          isActive: true,
          earned: true,
          earnedAt: "2024-01-25T16:00:00Z",
        },
        {
          id: "10",
          name: "Desafiador",
          description: "Complete 5 desafios sustentáveis",
          icon: "trophy",
          category: "achievement",
          requirement: "5 desafios completados",
          points: 150,
          rarity: "rare",
          isActive: true,
          earned: false,
          progress: 3,
          progressTarget: 5,
        },
      ]

      const earnedBadges = mockBadges.filter((b) => b.earned)

      const mockStats: BadgeStats = {
        totalBadges: mockBadges.length,
        earnedBadges: earnedBadges.length,
        completionRate: (earnedBadges.length / mockBadges.length) * 100,
        totalPoints: earnedBadges.reduce((sum, b) => sum + b.points, 0),
        categoriesCompleted: new Set(earnedBadges.map((b) => b.category)).size,
        recentBadges: earnedBadges.slice(0, 5),
        nextToUnlock: mockBadges
          .filter((b) => !b.earned && b.progress)
          .sort((a, b) => b.progress! / b.progressTarget! - a.progress! / a.progressTarget!)
          .slice(0, 3),
      }

      setBadges(mockBadges)
      setStats(mockStats)
    } catch (error) {
      console.error("Erro ao carregar badges:", error)
    } finally {
      setLoading(false)
    }
  }

  const getBadgeIcon = (iconName: string) => {
    return BADGE_ICONS[iconName] || Award
  }

  const filteredBadges = selectedCategory === "all" ? badges : badges.filter((b) => b.category === selectedCategory)

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
          <h1 className="text-3xl font-bold text-green-800">Badges e Conquistas</h1>
          <p className="text-muted-foreground">Desbloqueie conquistas por suas ações sustentáveis</p>
        </div>
        {stats && (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-lg px-4 py-2">
            <Trophy className="h-4 w-4 mr-2" />
            {stats.earnedBadges}/{stats.totalBadges} Badges
          </Badge>
        )}
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Badges Conquistados</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{stats.earnedBadges}</div>
              <p className="text-xs text-green-600">{stats.completionRate.toFixed(1)}% de conclusão</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Pontos de Badges</CardTitle>
              <Star className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">{stats.totalPoints}</div>
              <p className="text-xs text-blue-600">pontos de conquistas</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Categorias</CardTitle>
              <Target className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">
                {stats.categoriesCompleted}/{Object.keys(CATEGORY_INFO).length}
              </div>
              <p className="text-xs text-purple-600">categorias completadas</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-800">Próximos</CardTitle>
              <Zap className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800">{stats.nextToUnlock.length}</div>
              <p className="text-xs text-orange-600">badges próximos</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedCategory === "all" ? "default" : "outline"}
          className="cursor-pointer px-4 py-2"
          onClick={() => setSelectedCategory("all")}
        >
          Todos ({badges.length})
        </Badge>
        {Object.entries(CATEGORY_INFO).map(([key, info]) => {
          const count = badges.filter((b) => b.category === key).length
          const Icon = info.icon
          return (
            <Badge
              key={key}
              variant={selectedCategory === key ? "default" : "outline"}
              className="cursor-pointer px-4 py-2"
              onClick={() => setSelectedCategory(key)}
            >
              <Icon className="h-3 w-3 mr-1" />
              {info.label} ({count})
            </Badge>
          )
        })}
      </div>

      {/* Badges Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredBadges.map((badge) => {
          const categoryInfo = CATEGORY_INFO[badge.category]
          const rarityInfo = RARITY_INFO[badge.rarity]
          const Icon = getBadgeIcon(badge.icon)
          const CategoryIcon = categoryInfo.icon

          return (
            <Card
              key={badge.id}
              className={`relative overflow-hidden transition-all hover:shadow-lg ${
                badge.earned ? "border-green-200" : "border-gray-200 opacity-75"
              }`}
            >
              {/* Rarity Border */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${rarityInfo.color.split(" ")[0]}`} />

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`p-3 rounded-lg ${badge.earned ? `bg-${categoryInfo.color}-100` : "bg-gray-100"}`}>
                      <Icon
                        className={`h-8 w-8 ${badge.earned ? `text-${categoryInfo.color}-600` : "text-gray-400"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center">
                        {badge.name}
                        {badge.earned && <CheckCircle className="h-4 w-4 ml-2 text-green-600" />}
                        {!badge.earned && <Lock className="h-4 w-4 ml-2 text-gray-400" />}
                      </CardTitle>
                      <CardDescription>{badge.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Progress */}
                {!badge.earned && badge.progress !== undefined && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progresso</span>
                      <span className="font-medium">
                        {badge.progress}/{badge.progressTarget}
                      </span>
                    </div>
                    <Progress value={(badge.progress / badge.progressTarget!) * 100} className="h-2" />
                  </div>
                )}

                {/* Earned Date */}
                {badge.earned && badge.earnedAt && (
                  <div className="flex items-center text-sm text-green-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Conquistado em {new Date(badge.earnedAt).toLocaleDateString("pt-BR")}
                  </div>
                )}

                {/* Details */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={rarityInfo.color}>
                      {rarityInfo.label}
                    </Badge>
                    <Badge variant="outline" className={`bg-${categoryInfo.color}-50 text-${categoryInfo.color}-700`}>
                      <CategoryIcon className="h-3 w-3 mr-1" />
                      {categoryInfo.label}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                    <Star className="h-3 w-3 mr-1" />
                    {badge.points} pts
                  </Badge>
                </div>

                {/* Requirement */}
                <div className="text-xs text-muted-foreground italic">{badge.requirement}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Next to Unlock */}
      {stats && stats.nextToUnlock.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-orange-600" />
              Próximos a Desbloquear
            </CardTitle>
            <CardDescription>Você está quase lá!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {stats.nextToUnlock.map((badge) => {
                const Icon = getBadgeIcon(badge.icon)
                const progressPercent = (badge.progress! / badge.progressTarget!) * 100

                return (
                  <Card key={badge.id} className="border-orange-200 bg-orange-50">
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <Icon className="h-6 w-6 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{badge.name}</p>
                          <p className="text-xs text-muted-foreground">{badge.requirement}</p>
                        </div>
                      </div>
                      <Progress value={progressPercent} className="h-2 mb-2" />
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">
                          {badge.progress}/{badge.progressTarget}
                        </span>
                        <span className="font-medium text-orange-600">{progressPercent.toFixed(0)}%</span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
