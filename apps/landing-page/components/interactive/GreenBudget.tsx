"use client"

import { useState, useCallback, useMemo } from "react"
import { motion } from "framer-motion"
import { Target, Award, Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Goal {
  id: number
  title: string
  target: number
  current: number
  unit: string
  category: string
  deadline: string
  color: string
}

interface SustainableCategory {
  name: string
  budget: number
  spent: number
  savings: number
  co2Reduction: number
}

interface NewGoal {
  title: string
  target: string
  unit: string
  category: string
  deadline: string
}

const initialGoals: Goal[] = [
  {
    id: 1,
    title: "Reduzir Pegada de Carbono",
    target: 50,
    current: 32,
    unit: "kg CO2",
    category: "Ambiental",
    deadline: "2024-12-31",
    color: "bg-green-500",
  },
  {
    id: 2,
    title: "Investimentos ESG",
    target: 5000,
    current: 3200,
    unit: "R$",
    category: "Investimentos",
    deadline: "2024-06-30",
    color: "bg-blue-500",
  },
  {
    id: 3,
    title: "Compras Sustentáveis",
    target: 80,
    current: 65,
    unit: "%",
    category: "Consumo",
    deadline: "2024-03-31",
    color: "bg-purple-500",
  },
]

const initialCategories: SustainableCategory[] = [
  {
    name: "Energia Renovável",
    budget: 200,
    spent: 150,
    savings: 50,
    co2Reduction: 25,
  },
  {
    name: "Transporte Sustentável",
    budget: 300,
    spent: 180,
    savings: 120,
    co2Reduction: 40,
  },
  {
    name: "Alimentação Orgânica",
    budget: 400,
    spent: 380,
    savings: 20,
    co2Reduction: 15,
  },
  {
    name: "Produtos Eco-friendly",
    budget: 250,
    spent: 200,
    savings: 50,
    co2Reduction: 20,
  },
]

const unitOptions = ["R$", "kg CO2", "%", "kWh"]
const categoryOptions = ["Ambiental", "Investimentos", "Consumo", "Energia"]

export default function GreenBudget() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals)
  const [newGoal, setNewGoal] = useState<NewGoal>({
    title: "",
    target: "",
    unit: "R$",
    category: "Ambiental",
    deadline: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const sustainableCategories = useMemo(() => initialCategories, [])

  const addGoal = useCallback(() => {
    if (newGoal.title && newGoal.target && newGoal.deadline) {
      const goal: Goal = {
        id: Date.now(),
        ...newGoal,
        target: Number.parseFloat(newGoal.target),
        current: 0,
        color: "bg-green-500",
      }
      setGoals((prev) => [...prev, goal])
      setNewGoal({
        title: "",
        target: "",
        unit: "R$",
        category: "Ambiental",
        deadline: "",
      })
      setIsDialogOpen(false)
    }
  }, [newGoal])

  const removeGoal = useCallback((id: number) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id))
  }, [])

  const getProgressPercentage = useCallback((current: number, target: number): number => {
    return Math.min((current / target) * 100, 100)
  }, [])

  const getProgressColor = useCallback((percentage: number): string => {
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }, [])

  const formatDate = useCallback((dateString: string): string => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }, [])

  const handleInputChange = useCallback((field: keyof NewGoal, value: string) => {
    setNewGoal((prev) => ({ ...prev, [field]: value }))
  }, [])

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="size-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <Target className="size-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Orçamento Verde</h2>
        <p className="text-muted-foreground">Defina metas sustentáveis e acompanhe seu progresso ambiental</p>
      </motion.div>

      {/* Metas Sustentáveis */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Suas Metas Sustentáveis</h3>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-500 hover:bg-green-600">
                <Plus className="mr-2 size-4" />
                Nova Meta
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Nova Meta Sustentável</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Título da Meta</Label>
                  <Input
                    id="title"
                    value={newGoal.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Ex: Reduzir gastos com combustível"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="target">Meta</Label>
                    <Input
                      id="target"
                      type="number"
                      value={newGoal.target}
                      onChange={(e) => handleInputChange("target", e.target.value)}
                      placeholder="1000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unidade</Label>
                    <Select value={newGoal.unit} onValueChange={(value) => handleInputChange("unit", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {unitOptions.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select value={newGoal.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="deadline">Prazo</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => handleInputChange("deadline", e.target.value)}
                  />
                </div>
                <Button
                  onClick={addGoal}
                  className="w-full"
                  disabled={!newGoal.title || !newGoal.target || !newGoal.deadline}
                >
                  Criar Meta
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {goals.map((goal) => {
            const percentage = getProgressPercentage(goal.current, goal.target)
            const progressColor = getProgressColor(percentage)

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                        <Badge variant="secondary" className="mt-2">
                          {goal.category}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" aria-label="Editar meta">
                          <Edit className="size-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => removeGoal(goal.id)} aria-label="Remover meta">
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {goal.current} / {goal.target} {goal.unit}
                      </div>
                      <div className={`text-sm font-medium ${progressColor}`}>{percentage.toFixed(1)}% concluído</div>
                    </div>

                    <Progress value={percentage} className="h-2" />

                    <div className="text-center text-sm text-muted-foreground">Prazo: {formatDate(goal.deadline)}</div>

                    {percentage >= 100 && (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <Award className="size-4" />
                        <span className="text-sm font-medium">Meta Atingida!</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Orçamento por Categoria Sustentável */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Orçamento por Categoria Sustentável</h3>

        <div className="grid md:grid-cols-2 gap-6">
          {sustainableCategories.map((category, i) => {
            const spentPercentage = (category.spent / category.budget) * 100
            const remaining = category.budget - category.spent

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{category.name}</span>
                      <Badge variant="outline" className="text-green-600">
                        -{category.co2Reduction}kg CO2
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Gasto: R$ {category.spent}</span>
                      <span>Orçamento: R$ {category.budget}</span>
                    </div>

                    <Progress value={spentPercentage} className="h-2" />

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <p className="text-sm text-muted-foreground">Restante</p>
                        <p className="font-semibold text-green-600">R$ {remaining}</p>
                      </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                        <p className="text-sm text-muted-foreground">Economia</p>
                        <p className="font-semibold text-blue-600">R$ {category.savings}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Resumo do Impacto */}
      <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold mb-1">-35%</div>
              <div className="text-sm opacity-90">Redução CO2</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">R$ 240</div>
              <div className="text-sm opacity-90">Economia Mensal</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">85%</div>
              <div className="text-sm opacity-90">Metas Atingidas</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">12</div>
              <div className="text-sm opacity-90">Badges Verdes</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
