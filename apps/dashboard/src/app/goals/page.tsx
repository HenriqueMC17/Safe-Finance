"use client"

import { useState } from "react"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Progress } from "@/shared/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Target, Plus, Trash2, Edit, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

export default function GoalsPage() {
  const userId = "k577xg84pjhwcwaxebmbesj43984s1pa" as Id<"users">
  
  const goalsRaw = useQuery(api.savings_goals.list, { userId })
  const addGoal = useMutation(api.savings_goals.add)
  const contributeMutation = useMutation(api.savings_goals.contribute)
  const removeGoal = useMutation(api.savings_goals.remove)

  const isLoading = goalsRaw === undefined
  const goals = goalsRaw ?? []

  const [newGoal, setNewGoal] = useState({
    title: "",
    targetAmount: 0,
    currentAmount: 0,
    category: "",
    deadline: "",
    description: "",
  })

  const handleAddGoal = async () => {
    if (!newGoal.title || !newGoal.targetAmount || !newGoal.category || !newGoal.deadline) {
      toast.error("Por favor, preencha todos os campos obrigatórios")
      return
    }

    try {
      await addGoal({
        userId,
        name: newGoal.title,
        target_amount: newGoal.targetAmount,
        current_amount: newGoal.currentAmount,
        target_date: newGoal.deadline,
      })

      setNewGoal({
        title: "",
        targetAmount: 0,
        currentAmount: 0,
        category: "",
        deadline: "",
        description: "",
      })

      toast.success("Meta adicionada com sucesso!")
    } catch (error) {
      console.error("Erro ao adicionar meta:", error)
      toast.error("Erro ao adicionar meta")
    }
  }

  const handleDeleteGoal = async (id: string) => {
    try {
      await removeGoal({ goalId: id as Id<"savings_goals"> })
      toast.success("Meta removida com sucesso!")
    } catch (error) {
      console.error("Erro ao remover meta:", error)
      toast.error("Erro ao remover meta")
    }
  }

  const handleUpdateProgress = async (id: string, amount: number) => {
    try {
      await contributeMutation({
        goalId: id as Id<"savings_goals">,
        amount: amount,
      })
      toast.success("Progresso atualizado com sucesso!")
    } catch (error) {
      console.error("Erro ao atualizar progresso:", error)
      toast.error("Erro ao atualizar progresso")
    }
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
              <Card key={goal._id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        <Target className="h-4 w-4 mr-2 text-primary" />
                        {goal.name}
                      </CardTitle>
                      <CardDescription>Meta Financeira</CardDescription>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteGoal(goal._id)}>
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
                      <span className="font-medium">{calculateProgress(goal.current_amount, goal.target_amount)}%</span>
                    </div>
                    <Progress value={calculateProgress(goal.current_amount, goal.target_amount)} className="h-2" />
                    <div className="flex justify-between text-sm pt-1">
                      <span>{formatCurrency(goal.current_amount)}</span>
                      <span>{formatCurrency(goal.target_amount)}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span>Data limite: </span>
                      <span>
                        {goal.target_date ? new Date(goal.target_date).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }) : "N/A"}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <div className="flex space-x-2 w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleUpdateProgress(goal._id, 100)}
                    >
                      +R$100
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleUpdateProgress(goal._id, 500)}
                    >
                      +R$500
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleUpdateProgress(goal._id, 1000)}
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
