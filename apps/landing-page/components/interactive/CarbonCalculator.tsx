"use client"

import type React from "react"

import { useState, useCallback, useMemo } from "react"
import { motion } from "framer-motion"
import { Calculator, Leaf, Car, Utensils, ShoppingBag, Plane, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"

interface ExpenseCategory {
  key: keyof typeof defaultExpenses
  name: string
  icon: React.ReactNode
  factor: number
  color: string
}

interface Recommendation {
  category: string
  suggestion: string
  savings: string
}

interface CalculationResults {
  totalCO2: number
  breakdown: Record<string, number>
  recommendations: Recommendation[]
}

const defaultExpenses = {
  transport: 500,
  energy: 300,
  food: 800,
  shopping: 600,
  travel: 200,
} as const

export default function CarbonCalculator() {
  const [expenses, setExpenses] = useState(defaultExpenses)
  const [results, setResults] = useState<CalculationResults>({
    totalCO2: 0,
    breakdown: {},
    recommendations: [],
  })

  const categories: ExpenseCategory[] = useMemo(
    () => [
      {
        key: "transport",
        name: "Transporte",
        icon: <Car className="size-5" />,
        factor: 0.21, // kg CO2 por real gasto
        color: "bg-red-500",
      },
      {
        key: "energy",
        name: "Energia",
        icon: <Zap className="size-5" />,
        factor: 0.45,
        color: "bg-yellow-500",
      },
      {
        key: "food",
        name: "Alimentação",
        icon: <Utensils className="size-5" />,
        factor: 0.18,
        color: "bg-green-500",
      },
      {
        key: "shopping",
        name: "Compras",
        icon: <ShoppingBag className="size-5" />,
        factor: 0.32,
        color: "bg-blue-500",
      },
      {
        key: "travel",
        name: "Viagens",
        icon: <Plane className="size-5" />,
        factor: 0.89,
        color: "bg-purple-500",
      },
    ],
    [],
  )

  const generateRecommendations = useCallback((breakdown: Record<string, number>): Recommendation[] => {
    const recommendations: Recommendation[] = []

    if (breakdown.transport > 100) {
      recommendations.push({
        category: "Transporte",
        suggestion: "Use transporte público ou bicicleta",
        savings: "Economize até R$ 200/mês e reduza 42kg CO2",
      })
    }

    if (breakdown.energy > 120) {
      recommendations.push({
        category: "Energia",
        suggestion: "Invista em energia solar ou equipamentos eficientes",
        savings: "Economize até R$ 150/mês e reduza 67kg CO2",
      })
    }

    if (breakdown.food > 140) {
      recommendations.push({
        category: "Alimentação",
        suggestion: "Reduza consumo de carne e compre produtos locais",
        savings: "Economize até R$ 100/mês e reduza 25kg CO2",
      })
    }

    return recommendations
  }, [])

  const calculateCO2 = useCallback(() => {
    let total = 0
    const breakdown: Record<string, number> = {}

    categories.forEach((category) => {
      const co2 = expenses[category.key] * category.factor
      breakdown[category.key] = co2
      total += co2
    })

    const recommendations = generateRecommendations(breakdown)

    setResults({
      totalCO2: total,
      breakdown,
      recommendations,
    })
  }, [categories, expenses, generateRecommendations])

  const handleExpenseChange = useCallback((key: keyof typeof expenses, value: number[]) => {
    setExpenses((prev) => ({ ...prev, [key]: value[0] }))
  }, [])

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="size-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calculator className="size-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Calculadora de Pegada de Carbono</h2>
        <p className="text-muted-foreground">Descubra o impacto ambiental dos seus gastos mensais</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Seus Gastos Mensais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {categories.map((category) => (
              <div key={category.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    {category.icon}
                    {category.name}
                  </Label>
                  <span className="font-semibold">R$ {expenses[category.key]}</span>
                </div>
                <Slider
                  value={[expenses[category.key]]}
                  onValueChange={(value: number[]) => handleExpenseChange(category.key, value)}
                  max={2000}
                  min={0}
                  step={50}
                  className="w-full"
                />
              </div>
            ))}

            <Button onClick={calculateCO2} className="w-full bg-green-500 hover:bg-green-600">
              <Calculator className="mr-2 size-4" />
              Calcular Pegada de Carbono
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="size-5 text-green-500" />
              Resultado do Cálculo
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results.totalCO2 > 0 ? (
              <div className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg">
                  <h3 className="text-2xl font-bold mb-2">{results.totalCO2.toFixed(1)} kg CO2/mês</h3>
                  <p className="text-sm opacity-90">Sua pegada de carbono mensal</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Distribuição por Categoria</h4>
                  {categories.map((category) => {
                    const co2 = results.breakdown[category.key] || 0
                    const percentage = results.totalCO2 > 0 ? (co2 / results.totalCO2) * 100 : 0

                    return (
                      <div key={category.key} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-2">
                            {category.icon}
                            {category.name}
                          </span>
                          <span>{co2.toFixed(1)} kg CO2</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    )
                  })}
                </div>

                {results.recommendations.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold">Recomendações</h4>
                    {results.recommendations.map((rec, i) => (
                      <div key={i} className="p-3 bg-muted/30 rounded-lg">
                        <p className="font-medium text-sm">{rec.category}</p>
                        <p className="text-sm text-muted-foreground">{rec.suggestion}</p>
                        <p className="text-xs text-green-600 font-medium">{rec.savings}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calculator className="size-12 mx-auto mb-4 opacity-50" />
                <p>Preencha seus gastos e clique em "Calcular" para ver o resultado</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
