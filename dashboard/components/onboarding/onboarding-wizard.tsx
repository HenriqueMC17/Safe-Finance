"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import {
  Trophy,
  Target,
  Wallet,
  PieChart,
  TrendingUp,
  Award,
  Star,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react"

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  points: number
  badge?: string
  completed: boolean
}

interface UserProgress {
  currentStep: number
  totalPoints: number
  badges: string[]
  completedSteps: string[]
  level: number
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Bem-vindo ao Safe Finance",
    description: "Conheça sua nova ferramenta de gestão financeira pessoal",
    icon: Trophy,
    points: 50,
    badge: "Iniciante",
    completed: false,
  },
  {
    id: "profile",
    title: "Configure seu Perfil",
    description: "Personalize suas informações e preferências",
    icon: Target,
    points: 100,
    completed: false,
  },
  {
    id: "accounts",
    title: "Adicione suas Contas",
    description: "Conecte suas contas bancárias e cartões",
    icon: Wallet,
    points: 150,
    badge: "Organizador",
    completed: false,
  },
  {
    id: "categories",
    title: "Organize por Categorias",
    description: "Aprenda a categorizar suas transações",
    icon: PieChart,
    points: 100,
    completed: false,
  },
  {
    id: "goals",
    title: "Defina suas Metas",
    description: "Estabeleça objetivos financeiros claros",
    icon: TrendingUp,
    points: 200,
    badge: "Planejador",
    completed: false,
  },
]

const LEVELS = [
  { min: 0, max: 199, name: "Iniciante", color: "bg-gray-500" },
  { min: 200, max: 499, name: "Aprendiz", color: "bg-blue-500" },
  { min: 500, max: 999, name: "Experiente", color: "bg-green-500" },
  { min: 1000, max: 1999, name: "Especialista", color: "bg-purple-500" },
  { min: 2000, max: Number.POSITIVE_INFINITY, name: "Mestre", color: "bg-yellow-500" },
]

export function OnboardingWizard() {
  const [progress, setProgress] = useState<UserProgress>({
    currentStep: 0,
    totalPoints: 0,
    badges: [],
    completedSteps: [],
    level: 1,
  })

  const [showWizard, setShowWizard] = useState(false)
  const [steps, setSteps] = useState(ONBOARDING_STEPS)

  useEffect(() => {
    // Carregar progresso do localStorage
    const savedProgress = localStorage.getItem("onboarding-progress")
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress)
      setProgress(parsed)

      // Atualizar steps com progresso
      const updatedSteps = ONBOARDING_STEPS.map((step) => ({
        ...step,
        completed: parsed.completedSteps.includes(step.id),
      }))
      setSteps(updatedSteps)
    } else {
      setShowWizard(true)
    }
  }, [])

  const saveProgress = (newProgress: UserProgress) => {
    localStorage.setItem("onboarding-progress", JSON.stringify(newProgress))
    setProgress(newProgress)
  }

  const getCurrentLevel = (points: number) => {
    return LEVELS.find((level) => points >= level.min && points <= level.max) || LEVELS[0]
  }

  const completeStep = (stepId: string) => {
    const step = steps.find((s) => s.id === stepId)
    if (!step || step.completed) return

    const newCompletedSteps = [...progress.completedSteps, stepId]
    const newPoints = progress.totalPoints + step.points
    const newBadges =
      step.badge && !progress.badges.includes(step.badge) ? [...progress.badges, step.badge] : progress.badges

    const currentLevel = getCurrentLevel(newPoints)

    const newProgress: UserProgress = {
      ...progress,
      completedSteps: newCompletedSteps,
      totalPoints: newPoints,
      badges: newBadges,
      level: LEVELS.indexOf(currentLevel) + 1,
    }

    // Atualizar steps
    const updatedSteps = steps.map((s) => (s.id === stepId ? { ...s, completed: true } : s))
    setSteps(updatedSteps)

    saveProgress(newProgress)

    // Emitir evento customizado para notificar outros componentes
    window.dispatchEvent(
      new CustomEvent("onboardingStepCompleted", {
        detail: { stepId, points: step.points, badge: step.badge },
      }),
    )
  }

  const nextStep = () => {
    if (progress.currentStep < steps.length - 1) {
      const newProgress = { ...progress, currentStep: progress.currentStep + 1 }
      saveProgress(newProgress)
    }
  }

  const prevStep = () => {
    if (progress.currentStep > 0) {
      const newProgress = { ...progress, currentStep: progress.currentStep - 1 }
      saveProgress(newProgress)
    }
  }

  const finishOnboarding = () => {
    setShowWizard(false)
    localStorage.setItem("onboarding-completed", "true")

    // Emitir evento de conclusão
    window.dispatchEvent(
      new CustomEvent("onboardingCompleted", {
        detail: { totalPoints: progress.totalPoints, badges: progress.badges },
      }),
    )
  }

  const currentStep = steps[progress.currentStep]
  const completionPercentage = (progress.completedSteps.length / steps.length) * 100
  const currentLevel = getCurrentLevel(progress.totalPoints)

  if (!showWizard) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <Button onClick={() => setShowWizard(true)} variant="outline" size="sm" className="shadow-lg">
          <Trophy className="mr-2 h-4 w-4" />
          Tutorial
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={progress.currentStep}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="w-full max-w-2xl"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${currentLevel.color}`}>
                    <currentStep.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{currentStep.title}</CardTitle>
                    <CardDescription>{currentStep.description}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowWizard(false)}>
                  ✕
                </Button>
              </div>

              {/* Progresso Geral */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso Geral</span>
                  <span>{Math.round(completionPercentage)}%</span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
              </div>

              {/* Status do Usuário */}
              <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">
                    Nível {progress.level} - {currentLevel.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{progress.totalPoints} pontos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">{progress.badges.length} badges</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Conteúdo da Etapa Atual */}
              <div className="text-center py-8">
                <div className="mb-4">
                  <currentStep.icon className="h-16 w-16 mx-auto text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{currentStep.title}</h3>
                <p className="text-muted-foreground mb-4">{currentStep.description}</p>

                {!currentStep.completed && (
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Trophy className="h-4 w-4" />
                    <span>+{currentStep.points} pontos</span>
                    {currentStep.badge && (
                      <>
                        <Award className="h-4 w-4" />
                        <span>Badge: {currentStep.badge}</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Badges Conquistadas */}
              {progress.badges.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Badges Conquistadas</h4>
                  <div className="flex flex-wrap gap-2">
                    {progress.badges.map((badge, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Navegação */}
              <div className="flex justify-between items-center pt-4 border-t">
                <Button variant="outline" onClick={prevStep} disabled={progress.currentStep === 0}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Anterior
                </Button>

                <span className="text-sm text-muted-foreground">
                  {progress.currentStep + 1} de {steps.length}
                </span>

                {progress.currentStep === steps.length - 1 ? (
                  <Button onClick={finishOnboarding}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Finalizar
                  </Button>
                ) : (
                  <Button onClick={nextStep}>
                    Próximo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Ação da Etapa */}
              {!currentStep.completed && (
                <div className="text-center">
                  <Button onClick={() => completeStep(currentStep.id)} variant="default" size="lg">
                    Completar Etapa
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default OnboardingWizard
