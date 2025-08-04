"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, PiggyBank, TrendingUp, Shield, ChevronRight, ChevronLeft, X, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface OnboardingStep {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  points: number
  badge?: string
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    title: "Bem-vindo ao Safe Finance!",
    description:
      "Vamos começar sua jornada financeira. Este tutorial rápido vai te ajudar a aproveitar ao máximo nossa plataforma.",
    icon: <Trophy className="h-8 w-8 text-primary" />,
    points: 10,
    badge: "Iniciante",
  },
  {
    id: 2,
    title: "Defina suas Metas",
    description:
      "Estabeleça objetivos financeiros claros. Metas bem definidas são o primeiro passo para o sucesso financeiro.",
    icon: <Target className="h-8 w-8 text-primary" />,
    points: 15,
    badge: "Planejador",
  },
  {
    id: 3,
    title: "Controle seus Gastos",
    description: "Monitore suas despesas e receitas. O controle é fundamental para uma vida financeira saudável.",
    icon: <PiggyBank className="h-8 w-8 text-primary" />,
    points: 20,
    badge: "Controlador",
  },
  {
    id: 4,
    title: "Analise e Otimize",
    description: "Use nossas ferramentas de análise para identificar padrões e oportunidades de economia.",
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    points: 25,
    badge: "Analista",
  },
  {
    id: 5,
    title: "Mantenha-se Seguro",
    description: "Aprenda sobre segurança financeira e como proteger seu patrimônio com nossas dicas especializadas.",
    icon: <Shield className="h-8 w-8 text-primary" />,
    points: 30,
    badge: "Expert",
  },
]

interface OnboardingWizardProps {
  onComplete: () => void
}

export function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  useEffect(() => {
    // Check if onboarding was already completed
    const hasCompletedOnboarding = localStorage.getItem("onboarding-completed")
    if (!hasCompletedOnboarding) {
      setIsVisible(true)
    }
  }, [])

  const handleNext = () => {
    const step = onboardingSteps[currentStep]

    // Add points and mark step as completed
    if (!completedSteps.includes(step.id)) {
      setTotalPoints((prev) => prev + step.points)
      setCompletedSteps((prev) => [...prev, step.id])
    }

    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleComplete = () => {
    localStorage.setItem("onboarding-completed", "true")
    localStorage.setItem("onboarding-points", totalPoints.toString())
    setIsVisible(false)
    onComplete()
  }

  const handleSkip = () => {
    localStorage.setItem("onboarding-completed", "true")
    setIsVisible(false)
  }

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100
  const currentStepData = onboardingSteps[currentStep]

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader className="relative">
              <Button variant="ghost" size="sm" className="absolute right-2 top-2" onClick={handleSkip}>
                <X className="h-4 w-4" />
              </Button>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-medium">{totalPoints} pontos</span>
                </div>
                <Badge variant="secondary">
                  {currentStep + 1} de {onboardingSteps.length}
                </Badge>
              </div>

              <Progress value={progress} className="mb-4" />

              <div className="flex items-center gap-3">
                {currentStepData.icon}
                <div>
                  <CardTitle className="text-lg">{currentStepData.title}</CardTitle>
                  {currentStepData.badge && (
                    <Badge variant="outline" className="mt-1">
                      {currentStepData.badge}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground mb-6">{currentStepData.description}</p>

              <div className="flex items-center justify-between">
                <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Anterior
                </Button>

                <Button onClick={handleNext}>
                  {currentStep === onboardingSteps.length - 1 ? (
                    "Finalizar"
                  ) : (
                    <>
                      Próximo
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  +{currentStepData.points} pontos ao completar esta etapa
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
