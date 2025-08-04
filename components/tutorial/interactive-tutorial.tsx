"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MousePointer, Eye, CheckCircle, X, Lightbulb } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface TutorialStep {
  id: string
  target: string
  title: string
  content: string
  position: "top" | "bottom" | "left" | "right"
  action?: "click" | "hover" | "scroll"
}

const tutorialSteps: TutorialStep[] = [
  {
    id: "welcome",
    target: "body",
    title: "Bem-vindo ao Safe Finance!",
    content: "Vamos fazer um tour rápido pelas principais funcionalidades. Clique em 'Próximo' para começar.",
    position: "bottom",
  },
  {
    id: "sidebar",
    target: "[data-tutorial='sidebar']",
    title: "Menu de Navegação",
    content:
      "Use este menu para navegar entre as diferentes seções do sistema. Todas as funcionalidades estão organizadas aqui.",
    position: "right",
    action: "hover",
  },
  {
    id: "dashboard-cards",
    target: "[data-tutorial='dashboard-cards']",
    title: "Visão Geral Financeira",
    content: "Estes cartões mostram um resumo das suas finanças: saldo atual, receitas, despesas e economia do mês.",
    position: "bottom",
  },
  {
    id: "add-transaction",
    target: "[data-tutorial='add-transaction']",
    title: "Adicionar Transação",
    content: "Clique aqui para registrar uma nova receita ou despesa. É rápido e fácil!",
    position: "left",
    action: "click",
  },
  {
    id: "assistant",
    target: "[data-tutorial='assistant']",
    title: "Assistente Financeiro IA",
    content: "Seu consultor pessoal! Faça perguntas sobre suas finanças e receba dicas personalizadas.",
    position: "top",
  },
]

interface InteractiveTutorialProps {
  onComplete: () => void
}

export function InteractiveTutorial({ onComplete }: InteractiveTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    // Verificar se o tutorial já foi completado
    const completed = localStorage.getItem("tutorial-completed")
    if (!completed) {
      setIsActive(true)
    }
  }, [])

  useEffect(() => {
    if (!isActive) return

    const step = tutorialSteps[currentStep]
    const element = document.querySelector(step.target) as HTMLElement

    if (element) {
      setTargetElement(element)

      // Scroll para o elemento
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })

      // Destacar elemento
      element.classList.add("tutorial-highlight")

      // Cleanup anterior
      return () => {
        element.classList.remove("tutorial-highlight")
      }
    }
  }, [currentStep, isActive])

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      completeTutorial()
    }
  }

  const handleSkip = () => {
    completeTutorial()
  }

  const completeTutorial = () => {
    localStorage.setItem("tutorial-completed", "true")
    setIsActive(false)
    onComplete()
  }

  if (!isActive || !targetElement) return null

  const step = tutorialSteps[currentStep]
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50"
      >
        {/* Spotlight effect */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${targetElement.offsetLeft + targetElement.offsetWidth / 2}px ${targetElement.offsetTop + targetElement.offsetHeight / 2}px, transparent 100px, rgba(0,0,0,0.8) 200px)`,
          }}
        />

        {/* Tutorial card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute z-10"
          style={{
            top:
              step.position === "bottom"
                ? targetElement.offsetTop + targetElement.offsetHeight + 20
                : step.position === "top"
                  ? targetElement.offsetTop - 200
                  : targetElement.offsetTop,
            left:
              step.position === "right"
                ? targetElement.offsetLeft + targetElement.offsetWidth + 20
                : step.position === "left"
                  ? targetElement.offsetLeft - 320
                  : targetElement.offsetLeft,
          }}
        >
          <Card className="w-80 shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <Lightbulb className="h-4 w-4 text-primary" />
                  </div>
                  <Badge variant="secondary">
                    {currentStep + 1} de {tutorialSteps.length}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" onClick={handleSkip} className="h-6 w-6 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{step.content}</p>

              {step.action && (
                <div className="flex items-center gap-2 mb-4 p-2 bg-muted/50 rounded-lg">
                  {step.action === "click" && <MousePointer className="h-4 w-4" />}
                  {step.action === "hover" && <Eye className="h-4 w-4" />}
                  <span className="text-xs">
                    {step.action === "click" && "Clique no elemento destacado"}
                    {step.action === "hover" && "Passe o mouse sobre o elemento"}
                    {step.action === "scroll" && "Role a página para ver mais"}
                  </span>
                </div>
              )}

              <div className="space-y-3">
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex justify-between">
                  <Button variant="ghost" size="sm" onClick={handleSkip}>
                    Pular Tutorial
                  </Button>

                  <Button size="sm" onClick={handleNext}>
                    {currentStep === tutorialSteps.length - 1 ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Finalizar
                      </>
                    ) : (
                      <>
                        Próximo
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
