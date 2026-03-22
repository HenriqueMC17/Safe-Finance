"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { CheckCircle, Clock, Zap, ThumbsUp, Smartphone, CreditCard, Bot, Globe, TrendingUp, Users } from "lucide-react"

interface RoadmapItem {
  id: string
  title: string
  description: string
  status: "planned" | "in-progress" | "completed"
  votes: number
  progress?: number
  icon: React.ReactNode
  category: string
}

export default function PublicRoadmap() {
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([
    {
      id: "1",
      title: "App Mobile Nativo",
      description: "Aplicativo nativo para iOS e Android com sincronização em tempo real",
      status: "in-progress",
      votes: 234,
      progress: 65,
      icon: <Smartphone className="size-5" />,
      category: "Mobile",
    },
    {
      id: "2",
      title: "Integração Bancária",
      description: "Conexão automática com bancos brasileiros via Open Banking",
      status: "planned",
      votes: 189,
      icon: <CreditCard className="size-5" />,
      category: "Integração",
    },
    {
      id: "3",
      title: "Assistente IA Financeiro",
      description: "Chatbot inteligente para dicas personalizadas e análises automáticas",
      status: "planned",
      votes: 156,
      icon: <Bot className="size-5" />,
      category: "IA",
    },
    {
      id: "4",
      title: "Dashboard Avançado",
      description: "Painéis personalizáveis com métricas avançadas e comparativos",
      status: "completed",
      votes: 298,
      icon: <TrendingUp className="size-5" />,
      category: "Interface",
    },
    {
      id: "5",
      title: "Modo Colaborativo",
      description: "Compartilhamento de orçamentos e metas com família ou sócios",
      status: "in-progress",
      votes: 167,
      progress: 30,
      icon: <Users className="size-5" />,
      category: "Social",
    },
    {
      id: "6",
      title: "API Pública",
      description: "API para desenvolvedores integrarem com sistemas externos",
      status: "planned",
      votes: 89,
      icon: <Globe className="size-5" />,
      category: "Desenvolvimento",
    },
  ])

  const handleVote = (itemId: string) => {
    setRoadmapItems((items) => items.map((item) => (item.id === itemId ? { ...item, votes: item.votes + 1 } : item)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "planned":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Concluído"
      case "in-progress":
        return "Em Desenvolvimento"
      case "planned":
        return "Planejado"
      default:
        return "Planejado"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="size-4" />
      case "in-progress":
        return <Zap className="size-4" />
      case "planned":
        return <Clock className="size-4" />
      default:
        return <Clock className="size-4" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
          Roadmap Público
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">O que está por vir</h2>
        <p className="max-w-[600px] text-muted-foreground md:text-lg mx-auto">
          Acompanhe o desenvolvimento de novas funcionalidades e vote nas que mais te interessam.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {roadmapItems
          .sort((a, b) => b.votes - a.votes)
          .map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                        {item.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <Badge variant="outline" className="text-xs mt-1">
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">{item.description}</p>

                  <div className="flex items-center gap-2">
                    <div className={`size-2 rounded-full ${getStatusColor(item.status)}`} />
                    <span className="text-sm font-medium">{getStatusText(item.status)}</span>
                    {getStatusIcon(item.status)}
                  </div>

                  {item.status === "in-progress" && item.progress && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span>{item.progress}%</span>
                      </div>
                      <Progress value={item.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-border/40">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ThumbsUp className="size-4" />
                      <span>{item.votes} votos</span>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleVote(item.id)} className="rounded-full">
                      <ThumbsUp className="size-3 mr-1" />
                      Votar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-4">Tem uma sugestão? Entre em contato conosco!</p>
        <Button variant="outline" className="rounded-full bg-transparent">
          Sugerir Funcionalidade
        </Button>
      </div>
    </motion.div>
  )
}
