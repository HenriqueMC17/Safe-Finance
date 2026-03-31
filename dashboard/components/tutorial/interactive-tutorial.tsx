"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, ArrowLeft, Target } from "lucide-react"

interface TutorialStep {
  id: string
  title: string
  description: string
  target: string
  position: "top" | "bottom" | "left" | "right"
  action?: string
}

interface InteractiveTutorialProps {
  steps?: TutorialStep[]
  onComplete?: () => void
  autoStart?: boolean
}

const DEFAULT_STEPS: TutorialStep[] = [
  {
    id: "dashboard",
    title: "Dashboard Principal",
    description: "Aqui você tem uma visão geral de todas as suas finanças",
    target: "[data-tutorial='dashboard']",
    position: "bottom",
  },
  {
    id: "sidebar",
    title: "Menu de Navegação",
    description: "Use o menu lateral para navegar entre as diferentes seções",
    target: "[data-tutorial='sidebar']",
    position: "right",
  },
  {
    id: "accounts",
    title: "Suas Contas",
    description: "Visualize o saldo e movimentações de todas as suas contas",
    target: "[data-tutorial='accounts']",
    position: "top",
  },
  {
    id: "transactions",
    title: "Transações Recentes",
    description: "Acompanhe suas últimas movimentações financeiras",
    target: "[data-tutorial='transactions']",
    position: "top",
  },
  {
    id: "add-transaction",
    title: "Adicionar Transação",
    description: "Clique aqui para registrar uma nova transação",
    target: "[data-tutorial='add-transaction']",
    position: "left",
    action: "click",
  },
]

export function InteractiveTutorial({
  steps = DEFAULT_STEPS,
  onComplete,
  autoStart = false,
}: InteractiveTutorialProps) {
  const [isActive, setIsActive] = useState(autoStart)
  const [currentStep, setCurrentStep] = useState(0)
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const overlayRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive) return

    const findTargetElement = () => {
      const target = document.querySelector(steps[currentStep]?.target)
      if (target instanceof HTMLElement) {
        setTargetElement(target)
        calculateTooltipPosition(target)
      }
    }

    // Tentar encontrar o elemento imediatamente
    findTargetElement()

    // Se não encontrou, tentar novamente após um delay
    const timeout = setTimeout(findTargetElement, 100)

    // Observer para mudanças no DOM
    const observer = new MutationObserver(findTargetElement)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      clearTimeout(timeout)
      observer.disconnect()
    }
  }, [isActive, currentStep, steps])

  const calculateTooltipPosition = (element: HTMLElement) => {
    if (!element || typeof window === "undefined") return

    const rect = element.getBoundingClientRect()
    const step = steps[currentStep]
    let top = 0
    let left = 0

    switch (step?.position) {
      case "top":
        top = rect.top - 10
        left = rect.left + rect.width / 2
        break
      case "bottom":
        top = rect.bottom + 10
        left = rect.left + rect.width / 2
        break
      case "left":
        top = rect.top + rect.height / 2
        left = rect.left - 10
        break
      case "right":
        top = rect.top + rect.height / 2
        left = rect.right + 10
        break
    }

    setTooltipPosition({ top, left })
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      completeTutorial()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completeTutorial = () => {
    setIsActive(false)
    setCurrentStep(0)
    localStorage.setItem("tutorial-completed", "true")
    onComplete?.()
  }

  const skipTutorial = () => {
    setIsActive(false)
    localStorage.setItem("tutorial-skipped", "true")
  }

  const startTutorial = () => {
    setIsActive(true)
    setCurrentStep(0)
  }

  // Verificar se o tutorial já foi completado
  useEffect(() => {
    const completed = localStorage.getItem("tutorial-completed")
    const skipped = localStorage.getItem("tutorial-skipped")

    if (!completed && !skipped && autoStart) {
      // Delay para garantir que os elementos estejam renderizados
      setTimeout(() => setIsActive(true), 1000)
    }
  }, [autoStart])

  if (!isActive) {
    return (
      <Button
        onClick={startTutorial}
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-20 z-40 shadow-lg bg-transparent"
      >
        <Target className="mr-2 h-4 w-4" />
        Tutorial
      </Button>
    )
  }

  const currentStepData = steps[currentStep]

  return (
    <>
      {/* Overlay escuro */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 z-50 pointer-events-none"
        style={{
          background: targetElement
            ? `radial-gradient(circle at ${targetElement.getBoundingClientRect().left + targetElement.getBoundingClientRect().width / 2}px ${targetElement.getBoundingClientRect().top + targetElement.getBoundingClientRect().height / 2}px, transparent 100px, rgba(0,0,0,0.7) 120px)`
            : "rgba(0,0,0,0.7)",
        }}
      />

      {/* Spotlight no elemento alvo */}
      {targetElement && (
        <div
          className="fixed z-50 pointer-events-none border-2 border-primary rounded-lg"
          style={{
            top: targetElement.getBoundingClientRect().top - 4,
            left: targetElement.getBoundingClientRect().left - 4,
            width: targetElement.getBoundingClientRect().width + 8,
            height: targetElement.getBoundingClientRect().height + 8,
            boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.3)",
          }}
        />
      )}

      {/* Tooltip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          ref={tooltipRef}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed z-50 pointer-events-auto"
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            transform: `translate(${
              currentStepData?.position === "left" ? "-100%" : currentStepData?.position === "right" ? "0%" : "-50%"
            }, ${
              currentStepData?.position === "top" ? "-100%" : currentStepData?.position === "bottom" ? "0%" : "-50%"
            })`,
          }}
        >
          <Card className="w-80 shadow-xl">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{currentStepData?.title}</CardTitle>
                <Button variant="ghost" size="sm" onClick={skipTutorial}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>{currentStepData?.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={prevStep} disabled={currentStep === 0}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {currentStep + 1} de {steps.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={skipTutorial}>
                    Pular
                  </Button>
                  <Button onClick={nextStep} size="sm">
                    {currentStep === steps.length - 1 ? "Finalizar" : "Próximo"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default InteractiveTutorial
