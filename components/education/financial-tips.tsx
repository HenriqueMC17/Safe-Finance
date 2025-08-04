"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, X, Clock, TrendingUp, Shield, PiggyBank, Target, BookOpen } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

interface FinancialTip {
  id: string
  title: string
  content: string
  category: "economia" | "investimento" | "planejamento" | "seguranca" | "basico"
  points: number
  readTime: number
  pages: string[]
}

const financialTips: FinancialTip[] = [
  {
    id: "tip-1",
    title: "Regra dos 50-30-20",
    content:
      "Divida sua renda em: 50% necessidades, 30% desejos, 20% poupança e investimentos. Esta regra simples ajuda a manter o equilíbrio financeiro.",
    category: "planejamento",
    points: 5,
    readTime: 2,
    pages: ["/dashboard", "/"],
  },
  {
    id: "tip-2",
    title: "Reserva de Emergência",
    content:
      "Mantenha de 3 a 6 meses de gastos essenciais em uma reserva de emergência. Isso te protege de imprevistos financeiros.",
    category: "seguranca",
    points: 10,
    readTime: 3,
    pages: ["/dashboard", "/savings-goals"],
  },
  {
    id: "tip-3",
    title: "Controle de Gastos",
    content:
      "Registre todas suas despesas por pelo menos um mês. Você ficará surpreso com onde seu dinheiro realmente vai.",
    category: "basico",
    points: 5,
    readTime: 2,
    pages: ["/transactions", "/analytics"],
  },
  {
    id: "tip-4",
    title: "Investimento Gradual",
    content:
      "Comece investindo pequenas quantias regularmente. O importante é criar o hábito e aprender com a experiência.",
    category: "investimento",
    points: 8,
    readTime: 3,
    pages: ["/dashboard", "/analytics"],
  },
  {
    id: "tip-5",
    title: "Compare Preços",
    content:
      "Antes de compras importantes, pesquise preços em pelo menos 3 lugares diferentes. Isso pode gerar economias significativas.",
    category: "economia",
    points: 3,
    readTime: 1,
    pages: ["/transactions"],
  },
]

const categoryIcons = {
  economia: <PiggyBank className="h-4 w-4" />,
  investimento: <TrendingUp className="h-4 w-4" />,
  planejamento: <Target className="h-4 w-4" />,
  seguranca: <Shield className="h-4 w-4" />,
  basico: <BookOpen className="h-4 w-4" />,
}

const categoryColors = {
  economia: "bg-green-100 text-green-800",
  investimento: "bg-blue-100 text-blue-800",
  planejamento: "bg-purple-100 text-purple-800",
  seguranca: "bg-red-100 text-red-800",
  basico: "bg-gray-100 text-gray-800",
}

export function FinancialTips() {
  const [currentTip, setCurrentTip] = useState<FinancialTip | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [viewedTips, setViewedTips] = useState<string[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    // Load viewed tips from localStorage
    const saved = localStorage.getItem("viewed-tips")
    if (saved) {
      setViewedTips(JSON.parse(saved))
    }

    const savedPoints = localStorage.getItem("education-points")
    if (savedPoints) {
      setTotalPoints(Number.parseInt(savedPoints))
    }
  }, [])

  useEffect(() => {
    // Show tip based on current page
    const availableTips = financialTips.filter((tip) => tip.pages.includes(pathname) && !viewedTips.includes(tip.id))

    if (availableTips.length > 0) {
      // Show a random tip after a delay
      const timer = setTimeout(() => {
        const randomTip = availableTips[Math.floor(Math.random() * availableTips.length)]
        setCurrentTip(randomTip)
        setIsVisible(true)
      }, 5000) // Show after 5 seconds

      return () => clearTimeout(timer)
    }
  }, [pathname, viewedTips])

  const handleClose = () => {
    setIsVisible(false)
    setCurrentTip(null)
  }

  const handleMarkAsRead = () => {
    if (currentTip) {
      const newViewedTips = [...viewedTips, currentTip.id]
      const newPoints = totalPoints + currentTip.points

      setViewedTips(newViewedTips)
      setTotalPoints(newPoints)

      localStorage.setItem("viewed-tips", JSON.stringify(newViewedTips))
      localStorage.setItem("education-points", newPoints.toString())
    }
    handleClose()
  }

  if (!isVisible || !currentTip) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 right-4 z-40 w-80"
      >
        <Card className="border-l-4 border-l-primary shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                <CardTitle className="text-sm">Dica Financeira</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Badge className={categoryColors[currentTip.category]}>
                {categoryIcons[currentTip.category]}
                <span className="ml-1 capitalize">{currentTip.category}</span>
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {currentTip.readTime} min
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <h4 className="font-medium mb-2">{currentTip.title}</h4>
            <p className="text-sm text-muted-foreground mb-4">{currentTip.content}</p>

            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">+{currentTip.points} pontos educacionais</div>
              <Button size="sm" onClick={handleMarkAsRead}>
                Entendi!
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
