"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft, X, User, Target, PiggyBank, BarChart3, CheckCircle } from "lucide-react"

interface OnboardingStep {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  tip: string
}

interface InteractiveOnboardingProps {
  isOpen: boolean
  onClose: () => void
}

export default function InteractiveOnboarding({ isOpen, onClose }: InteractiveOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: "Bem-vindo à Safe Finance!",
      description:
        "Vamos te ajudar a dar os primeiros passos para organizar suas finanças de forma simples e eficiente.",
      icon: <User className="size-6" />,
      tip: "Este tour levará apenas 2 minutos e te mostrará como aproveitar ao máximo nossa plataforma.",
    },
    {
      id: 2,
      title: "Defina seus Objetivos",
      description:
        "Comece definindo suas metas financeiras: reserva de emergência, viagem, casa própria ou qualquer outro sonho.",
      icon: <Target className="size-6" />,
      tip: "Ter objetivos claros é o primeiro passo para o sucesso financeiro. Nossa plataforma te ajuda a acompanhar o progresso.",
    },
    {
      id: 3,
      title: "Registre suas Transações",
      description:
        "Anote todas as suas receitas e despesas. Quanto mais detalhado, melhor será sua análise financeira.",
      icon: <PiggyBank className="size-6" />,
      tip: "Dica: Use categorias para organizar melhor seus gastos. Isso facilita a identificação de onde economizar.",
    },
    {
      id: 4,
      title: "Acompanhe com Gráficos",
      description: "Visualize seus dados através de gráficos intuitivos que mostram para onde vai seu dinheiro.",
      icon: <BarChart3 className="size-6" />,
      tip: "Os gráficos te ajudam a identificar padrões de gastos e oportunidades de economia rapidamente.",
    },
    {
      id: 5,
      title: "Pronto para Começar!",
      description: "Agora você já sabe o básico. Explore a plataforma e descubra todas as funcionalidades disponíveis.",
      icon: <CheckCircle className="size-6" />,
      tip: "Lembre-se: a consistência é a chave. Use a plataforma regularmente para melhores resultados.",
    },
  ]

  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onClose()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-border/40 bg-background shadow-2xl">
          <CardHeader className="relative">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary" className="rounded-full">
                Passo {currentStep + 1} de {steps.length}
              </Badge>
              <Button variant="ghost" size="icon" onClick={handleSkip} className="rounded-full">
                <X className="size-4" />
                <span className="sr-only">Fechar</span>
              </Button>
            </div>
            <Progress value={progress} className="h-2 mb-4" />
            <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-4"
              >
                <div className="size-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                  {steps[currentStep].icon}
                </div>
                <div className="space-y-4">
                  <p className="text-lg">{steps[currentStep].description}</p>
                  <div className="p-4 bg-muted/30 rounded-lg border-l-4 border-primary">
                    <p className="text-sm text-muted-foreground">
                      💡 <strong>Dica:</strong> {steps[currentStep].tip}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between pt-6 border-t border-border/40">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="rounded-full bg-transparent"
              >
                <ChevronLeft className="mr-2 size-4" />
                Anterior
              </Button>

              <div className="flex gap-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`size-2 rounded-full transition-colors ${
                      index <= currentStep ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              <Button onClick={handleNext} className="rounded-full">
                {currentStep === steps.length - 1 ? "Finalizar" : "Próximo"}
                <ChevronRight className="ml-2 size-4" />
              </Button>
            </div>

            <div className="text-center">
              <Button variant="ghost" onClick={handleSkip} className="text-sm text-muted-foreground">
                Pular tour
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
