"use client"

import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Users, CreditCard, TrendingUp, Briefcase, ShieldCheck } from "lucide-react"
import { useState, useEffect, useRef, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/contexts/locale-context"

const metrics = [
  {
    title: "Receita Total",
    value: 1234567,
    icon: DollarSign,
    change: "+12,3%",
    description: "Ganhos gerais neste trimestre",
  },
  {
    title: "Usuários Ativos",
    value: 45678,
    icon: Users,
    change: "+5,7%",
    description: "Usuários engajados nos últimos 30 dias",
  },
  {
    title: "Novas Contas",
    value: 1234,
    icon: CreditCard,
    change: "+3,2%",
    description: "Novos cadastros este mês",
  },
  {
    title: "Taxa de Crescimento",
    value: 8.9,
    icon: TrendingUp,
    change: "+1,5%",
    description: "Expansão ano a ano",
  },
  {
    title: "Clientes Corporativos",
    value: 89,
    icon: Briefcase,
    change: "+10,1%",
    description: "Contas empresariais adquiridas",
  },
  {
    title: "Índice de Segurança",
    value: 98.7,
    icon: ShieldCheck,
    change: "+0,5%",
    description: "Pontuação geral de integridade do sistema",
  },
]

export function MetricsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const { formatCurrency } = useLocale?.() || {
    formatCurrency: (value) => {
      if (typeof value === "number" && !isNaN(value)) {
        return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
      }
      return `R$ ${value}`
    },
  }

  const cardWidth = 100 / 3.5 // Mostrar 3.5 cards

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % metrics.length)
    }
  }

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentIndex((prevIndex) => (prevIndex - 1 + metrics.length) % metrics.length)
    }
  }

  useEffect(() => {
    if (carouselRef.current) {
      const transitionEndHandler = () => {
        setIsAnimating(false)
        if (currentIndex === metrics.length - 1) {
          carouselRef.current!.style.transition = "none"
          setCurrentIndex(0)
          setTimeout(() => {
            carouselRef.current!.style.transition = "transform 0.3s ease-in-out"
          }, 50)
        } else if (currentIndex === 0) {
          carouselRef.current!.style.transition = "none"
          setCurrentIndex(metrics.length - 1)
          setTimeout(() => {
            carouselRef.current!.style.transition = "transform 0.3s ease-in-out"
          }, 50)
        }
      }

      carouselRef.current.addEventListener("transitionend", transitionEndHandler)

      return () => {
        carouselRef.current?.removeEventListener("transitionend", transitionEndHandler)
      }
    }
  }, [currentIndex])

  const formattedMetrics = useMemo(() => {
    return metrics.map((metric) => ({
      ...metric,
      formattedValue:
        metric.title.includes("Taxa") || metric.title.includes("Índice")
          ? `${metric.value}%`
          : isNaN(Number(metric.value))
            ? metric.value
            : formatCurrency(metric.value),
    }))
  }, [formatCurrency])

  const renderMetrics = () => {
    const items = [...formattedMetrics, ...formattedMetrics, ...formattedMetrics]
    return items.map((metric, index) => (
      <div key={index} className="flex-shrink-0" style={{ width: `${cardWidth}%` }}>
        <Card className="h-full mx-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <metric.icon className="h-8 w-8 text-primary" />
              <span
                className={`text-sm font-semibold ${metric.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
              >
                {metric.change}
              </span>
            </div>
            <h3 className="text-lg font-bold mb-2">{metric.title}</h3>
            <p className="text-2xl font-extrabold mb-4">{metric.formattedValue}</p>
            <p className="text-sm text-muted-foreground">{metric.description}</p>
          </CardContent>
        </Card>
      </div>
    ))
  }

  return (
    <div className="w-full relative">
      <div className="flex justify-between items-center">
        <Button variant="outline" size="icon" onClick={prevSlide} className="z-10">
          &lt;
        </Button>
        <div className="flex-grow overflow-hidden">
          <div
            ref={carouselRef}
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * cardWidth}%)`,
              width: `${metrics.length * 3 * cardWidth}%`,
            }}
          >
            {renderMetrics()}
          </div>
        </div>
        <Button variant="outline" size="icon" onClick={nextSlide} className="z-10">
          &gt;
        </Button>
      </div>
    </div>
  )
}
