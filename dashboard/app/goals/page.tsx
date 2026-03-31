"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, Plus, Trash2, Edit, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

type Goal = {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  category: string
  deadline: string
  description: string
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Fundo de Emergência",
      targetAmount: 10000,
      currentAmount: 5000,
      category: "Economia",
      deadline: "2023-12-31",
      description: "Guardar dinheiro para emergências",
    },
    {
      id: "2",
      title: "Férias",
      targetAmount: 5000,
      currentAmount: 2500,
      category: "Lazer",
      deadline: "2023-10-15",
      description: "Viagem para a praia",
    },
    {
      id: "3",
      title: "Novo Notebook",
      targetAmount: 7000,
      currentAmount: 3500,
      category: "Tecnologia",
      deadline: "2023-11-30",
      description: "Comprar um notebook novo para trabalho",
    },
  ])

  const [newGoal, setNewGoal] = useState<Omit<Goal, "id">>({
    title: "",
    targetAmount: 0,
    currentAmount: 0,
    category: "",
    deadline: "",
    description: "",
  })

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.targetAmount || !newGoal.category || !newGoal.deadline) {
      toast.error("Por favor, preencha todos os campos obrigatórios")
      return
    }

    const goal: Goal = {
      ...newGoal,
      id: Date.now().toString(),
    }

    setGoals([...goals, goal])
    setNewGoal({
      title: "",
      targetAmount: 0,
      currentAmount: 0,
      category: "",
      deadline: "",
      description: "",
    })

    toast.success("Meta adicionada com sucesso!")
  }

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id))
    toast.success("Meta removida com sucesso!")
  }

  const handleUpdateProgress = (id: string, amount: number) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === id) {
          const newAmount = goal.currentAmount + amount
          return {
            ...goal,
            currentAmount: newAmount > goal.targetAmount ? goal.targetAmount : newAmount,
          }
        }
        return goal
      }),
    )
    toast.success("Progresso atualizado com sucesso!")
  }

  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Metas Financeiras</h1>
          <p className="text-muted-foreground">Gerencie suas metas financeiras e acompanhe seu progresso</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nova Meta
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Metas Ativas</TabsTrigger>
          <TabsTrigger value="completed">Concluídas</TabsTrigger>
          <TabsTrigger value="add">Adicionar Meta</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        <Target className="h-4 w-4 mr-2 text-primary" />
                        {goal.title}
                      </CardTitle>
                      <CardDescription>{goal.category}</CardDescription>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteGoal(goal.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso:</span>
                      <span className="font-medium">{calculateProgress(goal.currentAmount, goal.targetAmount)}%</span>
                    </div>
                    <Progress value={calculateProgress(goal.currentAmount, goal.targetAmount)} className="h-2" />
                    <div className="flex justify-between text-sm pt-1">
                      <span>{formatCurrency(goal.currentAmount)}</span>
                      <span>{formatCurrency(goal.targetAmount)}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span>Data limite: </span>
                      <span>
                        {new Date(goal.deadline).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    {goal.description && <p className="text-sm mt-2">{goal.description}</p>}
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <div className="flex space-x-2 w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleUpdateProgress(goal.id, 100)}
                    >
                      +R$100
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleUpdateProgress(goal.id, 500)}
                    >
                      +R$500
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleUpdateProgress(goal.id, 1000)}
                    >
                      +R$1000
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle2 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-medium">Nenhuma meta concluída</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Quando você concluir suas metas, elas aparecerão aqui.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Nova Meta</CardTitle>
              <CardDescription>Crie uma nova meta financeira para acompanhar seu progresso</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Fundo de Emergência"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={newGoal.category}
                    onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Economia">Economia</SelectItem>
                      <SelectItem value="Investimento">Investimento</SelectItem>
                      <SelectItem value="Lazer">Lazer</SelectItem>
                      <SelectItem value="Educação">Educação</SelectItem>
                      <SelectItem value="Saúde">Saúde</SelectItem>
                      <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetAmount">Valor Alvo (R$)</Label>
                  <Input
                    id="targetAmount"
                    type="number"
                    placeholder="0,00"
                    value={newGoal.targetAmount || ""}
                    onChange={(e) => setNewGoal({ ...newGoal, targetAmount: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentAmount">Valor Atual (R$)</Label>
                  <Input
                    id="currentAmount"
                    type="number"
                    placeholder="0,00"
                    value={newGoal.currentAmount || ""}
                    onChange={(e) => setNewGoal({ ...newGoal, currentAmount: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Data Limite</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="description">Descrição (opcional)</Label>
                  <Input
                    id="description"
                    placeholder="Descreva sua meta..."
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddGoal}>Adicionar Meta</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
