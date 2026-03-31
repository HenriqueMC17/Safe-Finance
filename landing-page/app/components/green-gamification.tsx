"use client"

import type React from "react"

import { useState, useCallback, useMemo } from "react"
import { motion } from "framer-motion"
import { Award, Trophy, Star, Target, Gift, Crown, Leaf, Recycle, Sun, Droplets, Wind, TreePine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type BadgeRarity = "Comum" | "Raro" | "Épico" | "Lendário"
type ChallengeDifficulty = "Fácil" | "Médio" | "Difícil"
type RewardType = "Desconto" | "Serviço" | "Produto" | "Cashback"

interface UserBadge {
  id: number
  name: string
  description: string
  icon: React.ReactNode
  color: string
  earned: boolean
  rarity: BadgeRarity
  points: number
  progress?: number
  target?: number
}

interface Challenge {
  id: number
  title: string
  description: string
  reward: number
  timeLeft: string
  difficulty: ChallengeDifficulty
  participants: number
  completed: boolean
}

interface LeaderboardUser {
  rank: number
  name: string
  points: number
  level: number
  badge: string
  avatar: string
  isUser?: boolean
}

interface Reward {
  id: number
  name: string
  cost: number
  type: RewardType
  available: boolean
  description: string
}

export default function GreenGamification() {
  const [userLevel] = useState(12)
  const [userPoints] = useState(2450)
  const [nextLevelPoints] = useState(3000)

  const badges: UserBadge[] = useMemo(
    () => [
      {
        id: 1,
        name: "Eco Warrior",
        description: "Reduziu 50kg de CO2 em um mês",
        icon: <Leaf className="size-6" />,
        color: "bg-green-500",
        earned: true,
        rarity: "Comum",
        points: 100,
      },
      {
        id: 2,
        name: "Investidor Verde",
        description: "Investiu R$ 5.000 em fundos ESG",
        icon: <TreePine className="size-6" />,
        color: "bg-emerald-500",
        earned: true,
        rarity: "Raro",
        points: 250,
      },
      {
        id: 3,
        name: "Energia Limpa",
        description: "Economizou 200 kWh de energia",
        icon: <Sun className="size-6" />,
        color: "bg-yellow-500",
        earned: true,
        rarity: "Comum",
        points: 150,
      },
      {
        id: 4,
        name: "Reciclador Master",
        description: "Comprou 20 produtos reciclados",
        icon: <Recycle className="size-6" />,
        color: "bg-blue-500",
        earned: false,
        rarity: "Épico",
        points: 500,
        progress: 15,
        target: 20,
      },
      {
        id: 5,
        name: "Guardião da Água",
        description: "Reduziu consumo de água em 30%",
        icon: <Droplets className="size-6" />,
        color: "bg-cyan-500",
        earned: false,
        rarity: "Raro",
        points: 300,
        progress: 22,
        target: 30,
      },
      {
        id: 6,
        name: "Mobilidade Verde",
        description: "Usou transporte sustentável por 30 dias",
        icon: <Wind className="size-6" />,
        color: "bg-teal-500",
        earned: false,
        rarity: "Lendário",
        points: 750,
        progress: 18,
        target: 30,
      },
    ],
    [],
  )

  const leaderboard: LeaderboardUser[] = useMemo(
    () => [
      {
        rank: 1,
        name: "Maria Sustentável",
        points: 4850,
        level: 18,
        badge: "Eco Master",
        avatar: "M",
      },
      {
        rank: 2,
        name: "João Verde",
        points: 4320,
        level: 16,
        badge: "Investidor ESG",
        avatar: "J",
      },
      {
        rank: 3,
        name: "Ana Ecológica",
        points: 3890,
        level: 15,
        badge: "Energia Limpa",
        avatar: "A",
      },
      {
        rank: 4,
        name: "Você",
        points: userPoints,
        level: userLevel,
        badge: "Eco Warrior",
        avatar: "V",
        isUser: true,
      },
      {
        rank: 5,
        name: "Carlos Renovável",
        points: 2180,
        level: 11,
        badge: "Reciclador",
        avatar: "C",
      },
    ],
    [userPoints, userLevel],
  )

  const challenges: Challenge[] = useMemo(
    () => [
      {
        id: 1,
        title: "Semana Sem Carro",
        description: "Use apenas transporte público ou bicicleta",
        reward: 300,
        timeLeft: "3 dias",
        difficulty: "Médio",
        participants: 1247,
        completed: false,
      },
      {
        id: 2,
        title: "Investimento Verde",
        description: "Invista R$ 500 em fundos ESG",
        reward: 500,
        timeLeft: "1 semana",
        difficulty: "Fácil",
        participants: 892,
        completed: false,
      },
      {
        id: 3,
        title: "Zero Desperdício",
        description: "Não desperdice comida por 7 dias",
        reward: 200,
        timeLeft: "5 dias",
        difficulty: "Difícil",
        participants: 2156,
        completed: true,
      },
    ],
    [],
  )

  const rewards: Reward[] = useMemo(
    () => [
      {
        id: 1,
        name: "Desconto 10% EcoMarket",
        cost: 500,
        type: "Desconto",
        available: true,
        description: "10% de desconto em produtos orgânicos",
      },
      {
        id: 2,
        name: "Consultoria ESG Gratuita",
        cost: 1000,
        type: "Serviço",
        available: true,
        description: "1 hora de consultoria em investimentos ESG",
      },
      {
        id: 3,
        name: "Kit Sustentável",
        cost: 750,
        type: "Produto",
        available: true,
        description: "Kit com produtos eco-friendly",
      },
      {
        id: 4,
        name: "Cashback 5% Verde",
        cost: 1500,
        type: "Cashback",
        available: false,
        description: "5% de cashback em compras sustentáveis por 1 mês",
      },
    ],
    [],
  )

  const getRarityColor = useCallback((rarity: BadgeRarity): string => {
    switch (rarity) {
      case "Comum":
        return "text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-400"
      case "Raro":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400"
      case "Épico":
        return "text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-400"
      case "Lendário":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400"
    }
  }, [])

  const getDifficultyColor = useCallback((difficulty: ChallengeDifficulty): string => {
    switch (difficulty) {
      case "Fácil":
        return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400"
      case "Médio":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400"
      case "Difícil":
        return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400"
    }
  }, [])

  const formatNumber = useCallback((num: number): string => {
    return num.toLocaleString("pt-BR")
  }, [])

  const getRankIcon = useCallback((rank: number) => {
    if (rank === 1) return <Crown className="size-6" />
    if (rank === 2) return <Award className="size-6" />
    if (rank === 3) return <Trophy className="size-6" />
    return null
  }, [])

  const getRankColor = useCallback((rank: number): string => {
    if (rank === 1) return "bg-yellow-500"
    if (rank === 2) return "bg-gray-400"
    if (rank === 3) return "bg-amber-600"
    return "bg-blue-500"
  }, [])

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="size-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="size-8 text-yellow-600" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Sistema de Pontos Verdes</h2>
        <p className="text-muted-foreground">
          Ganhe pontos por escolhas sustentáveis e desbloqueie recompensas incríveis
        </p>
      </motion.div>

      {/* Status do Usuário */}
      <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-6 items-center">
            <div className="text-center">
              <div className="size-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Crown className="size-10" />
              </div>
              <div className="text-2xl font-bold">Nível {userLevel}</div>
              <div className="text-sm opacity-90">Eco Warrior</div>
            </div>

            <div className="md:col-span-2">
              <div className="flex justify-between mb-2">
                <span>Progresso para o próximo nível</span>
                <span>
                  {formatNumber(userPoints)}/{formatNumber(nextLevelPoints)} pontos
                </span>
              </div>
              <Progress value={(userPoints / nextLevelPoints) * 100} className="h-3 bg-white/20" />
              <div className="text-sm opacity-90 mt-2">
                Faltam {formatNumber(nextLevelPoints - userPoints)} pontos para o nível {userLevel + 1}
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold">{formatNumber(userPoints)}</div>
              <div className="text-sm opacity-90">Pontos Verdes</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="badges" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="challenges">Desafios</TabsTrigger>
          <TabsTrigger value="leaderboard">Ranking</TabsTrigger>
          <TabsTrigger value="rewards">Recompensas</TabsTrigger>
        </TabsList>

        <TabsContent value="badges" className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">Suas Conquistas</h3>
            <p className="text-muted-foreground">
              Colete badges por ações sustentáveis e mostre seu compromisso com o meio ambiente
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {badges.map((badge, i) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className={`h-full ${badge.earned ? "ring-2 ring-green-500" : "opacity-75"}`}>
                  <CardHeader className="text-center">
                    <div
                      className={`size-16 ${badge.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white ${!badge.earned && "grayscale"}`}
                    >
                      {badge.icon}
                    </div>
                    <CardTitle className="flex items-center justify-center gap-2">
                      {badge.name}
                      {badge.earned && <Star className="size-4 text-yellow-500 fill-yellow-500" />}
                    </CardTitle>
                    <Badge className={getRarityColor(badge.rarity)}>{badge.rarity}</Badge>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <p className="text-muted-foreground text-sm">{badge.description}</p>

                    {badge.earned ? (
                      <div className="space-y-2">
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <Award className="size-3 mr-1" />
                          Conquistado!
                        </Badge>
                        <div className="text-sm font-medium">+{badge.points} pontos</div>
                      </div>
                    ) : badge.progress && badge.target ? (
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">
                          Progresso: {badge.progress}/{badge.target}
                        </div>
                        <Progress value={(badge.progress / badge.target) * 100} className="h-2" />
                        <div className="text-sm font-medium text-green-600">Recompensa: +{badge.points} pontos</div>
                      </div>
                    ) : (
                      <div className="text-sm font-medium text-green-600">Recompensa: +{badge.points} pontos</div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">Desafios Ativos</h3>
            <p className="text-muted-foreground">Complete desafios e ganhe pontos extras para subir no ranking</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {challenges.map((challenge, i) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className={`h-full ${challenge.completed ? "bg-green-50 dark:bg-green-950/20" : ""}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                      <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">{challenge.description}</p>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Participantes:</span>
                      <span className="font-medium">{formatNumber(challenge.participants)}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Tempo restante:</span>
                      <span className="font-medium">{challenge.timeLeft}</span>
                    </div>

                    <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                      <div className="text-lg font-bold text-yellow-600">+{challenge.reward} pontos</div>
                      <div className="text-sm text-muted-foreground">Recompensa</div>
                    </div>

                    {challenge.completed ? (
                      <Button disabled className="w-full">
                        <Award className="mr-2 size-4" />
                        Concluído!
                      </Button>
                    ) : (
                      <Button className="w-full bg-green-500 hover:bg-green-600">
                        <Target className="mr-2 size-4" />
                        Participar
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">Ranking Sustentável</h3>
            <p className="text-muted-foreground">Veja como você se compara com outros usuários eco-conscientes</p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {leaderboard.map((user, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`flex items-center gap-4 p-4 rounded-lg ${
                      user.isUser ? "bg-green-50 dark:bg-green-950/20 ring-2 ring-green-500" : "bg-muted/30"
                    }`}
                  >
                    <div
                      className={`size-12 rounded-full flex items-center justify-center font-bold text-white ${getRankColor(user.rank)}`}
                    >
                      {getRankIcon(user.rank) || user.avatar}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{user.name}</span>
                        {user.isUser && <Badge variant="outline">Você</Badge>}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Nível {user.level} • {user.badge}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-lg">{formatNumber(user.points)}</div>
                      <div className="text-sm text-muted-foreground">pontos</div>
                    </div>

                    <div className="text-2xl font-bold text-muted-foreground">#{user.rank}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">Loja de Recompensas</h3>
            <p className="text-muted-foreground">Troque seus pontos verdes por recompensas sustentáveis</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {rewards.map((reward, i) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className={`h-full ${!reward.available ? "opacity-50" : ""}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{reward.name}</CardTitle>
                      <Badge variant="outline">{reward.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">{reward.description}</p>

                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">{reward.cost} pontos</div>
                      <div className="text-sm text-muted-foreground">Custo</div>
                    </div>

                    <Button className="w-full" disabled={!reward.available || userPoints < reward.cost}>
                      <Gift className="mr-2 size-4" />
                      {userPoints < reward.cost
                        ? "Pontos Insuficientes"
                        : !reward.available
                          ? "Indisponível"
                          : "Resgatar"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardContent className="p-6 text-center">
              <h4 className="text-xl font-bold mb-2">Recompensas Especiais</h4>
              <p className="mb-4 opacity-90">Alcance o nível 20 e desbloqueie recompensas exclusivas!</p>
              <div className="flex justify-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">Nível 15</div>
                  <div className="text-sm opacity-90">Consultoria Premium</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">Nível 20</div>
                  <div className="text-sm opacity-90">Cartão Verde Exclusivo</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">Nível 25</div>
                  <div className="text-sm opacity-90">Viagem Sustentável</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
