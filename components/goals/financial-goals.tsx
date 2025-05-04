"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, Plus, Pencil, Trash2, Target, AlertCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLocale } from "@/contexts/locale-context"
import { toast } from "@/components/ui/use-toast"

interface Goal {
  id: number
  name: string
  target_amount: number
  current_amount: number
  target_date: string
  description?: string
  category?: string
}

interface FinancialGoalsProps {
  userId: number
}

export function FinancialGoals({ userId }: FinancialGoalsProps) {
  const { formatCurrency } = useLocale()
  const [goals, setGoals] = useState<Goal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentGoal, setCurrentGoal] = useState<Partial<Goal>>({})
  const [targetDate, setTargetDate] = useState<Date>()

  const fetchGoals = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/savings-goals?userId=${userId}`)
      if (!response.ok) {
        throw new Error("Erro ao buscar metas")
      }
      const data = await response.json()
      setGoals(data.goals)
    } catch (error) {
      console.error("Erro:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar suas metas financeiras",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGoals()
  }, [userId])

  const handleCreateOrUpdate = async () => {
    if (!currentGoal.name || !currentGoal.target_amount || !targetDate) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    try {
      const endpoint = "/api/savings-goals"
      const method = isEditing ? "PUT" : "POST"
      const body = {
        ...(isEditing && { id: currentGoal.id }),
        user_id: userId,
        name: currentGoal.name,
        target_amount: currentGoal.target_amount,
        current_amount: currentGoal.current_amount || 0,
        target_date: targetDate.toISOString(),
        description: currentGoal.description,
        category: currentGoal.category,
      }

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        throw new Error(`Erro ao ${isEditing ? "atualizar" : "criar"} meta`)
      }

      toast({
        title: "Sucesso",
        description: `Meta financeira ${isEditing ? "atualizada" : "criada"} com sucesso`,
      })

      setIsDialogOpen(false)
      resetForm()
      fetchGoals()
    } catch (error) {
      console.error("Erro:", error)
      toast({
        title: "Erro",
        description: `Não foi possível ${isEditing ? "atualizar" : "criar"} a meta financeira`,
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta meta?")) {
      return
    }

    try {
      const response = await fetch(`/api/savings-goals?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Erro ao excluir meta")
      }

      toast({
        title: "Sucesso",
        description: "Meta financeira excluída com sucesso",
      })

      fetchGoals()
    } catch (error) {
      console.error("Erro:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir a meta financeira",
        variant: "destructive",
      })
    }
  }

  const handleUpdateProgress = async (id: number, amount: number) => {
    try {
      const goal = goals.find((g) => g.id === id)
      if (!goal) return

      const newAmount = Number(goal.current_amount) + amount

      const response = await fetch(`/api/savings-goals`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          current_amount: newAmount < 0 ? 0 : newAmount,
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao atualizar progresso")
      }

      toast({
        title: "Sucesso",
        description: "Progresso da meta atualizado com sucesso",
      })

      fetchGoals()
    } catch (error) {
      console.error("Erro:", error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o progresso da meta",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (goal: Goal) => {
    setCurrentGoal(goal)
    setTargetDate(new Date(goal.target_date))
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setCurrentGoal({})
    setTargetDate(undefined)
    setIsEditing(false)
  }

  const handleOpenDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "dd/MM/yyyy")
  }

  const calculateDaysRemaining = (targetDate: string) => {
    const target = new Date(targetDate)
    const today = new Date()
    const diffTime = target.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getGoalStatus = (goal: Goal) => {
    const percentage = (Number(goal.current_amount) / Number(goal.target_amount)) * 100
    const daysRemaining = calculateDaysRemaining(goal.target_date)

    if (percentage >= 100) {
      return {
        status: "completed",
        icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
        message: "Meta atingida!",
      }
    } else if (daysRemaining < 0) {
      return { status: "overdue", icon: <AlertCircle className="h-5 w-5 text-red-500" />, message: "Prazo expirado" }
    } else if (daysRemaining <= 30 && percentage < 80) {
      return { status: "at-risk", icon: <AlertCircle className="h-5 w-5 text-amber-500" />, message: "Meta em risco" }
    } else {
      return { status: "on-track", icon: <Target className="h-5 w-5 text-blue-500" />, message: "Em andamento" }
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Metas Financeiras</CardTitle>
          <CardDescription>Defina e acompanhe suas metas de economia</CardDescription>
        </div>
        <Button onClick={handleOpenDialog} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nova Meta
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-24 bg-muted rounded animate-pulse" />
            <div className="h-24 bg-muted rounded animate-pulse" />
          </div>
        ) : goals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Target className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Nenhuma meta definida</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Defina metas financeiras para acompanhar seu progresso
            </p>
            <Button onClick={handleOpenDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Criar Meta
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {goals.map((goal) => {
              const percentage = (Number(goal.current_amount) / Number(goal.target_amount)) * 100
              const daysRemaining = calculateDaysRemaining(goal.target_date)
              const goalStatus = getGoalStatus(goal)

              return (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {goalStatus.icon}
                      <h3 className="font-medium">{goal.name}</h3>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(goal)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(goal.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>
                      {formatCurrency(Number(goal.current_amount))} / {formatCurrency(Number(goal.target_amount))}
                    </span>
                    <span
                      className={cn(
                        daysRemaining < 0
                          ? "text-red-500"
                          : daysRemaining <= 30
                            ? "text-amber-500"
                            : "text-muted-foreground",
                      )}
                    >
                      {daysRemaining < 0
                        ? `${Math.abs(daysRemaining)} dias atrasado`
                        : daysRemaining === 0
                          ? "Vence hoje"
                          : `${daysRemaining} dias restantes`}
                    </span>
                  </div>

                  <Progress
                    value={percentage > 100 ? 100 : percentage}
                    className="h-2"
                    indicatorClassName={cn(
                      percentage >= 100
                        ? "bg-green-500"
                        : daysRemaining < 0
                          ? "bg-red-500"
                          : daysRemaining <= 30 && percentage < 80
                            ? "bg-amber-500"
                            : "bg-primary",
                    )}
                  />

                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{percentage.toFixed(1)}% completo</span>
                    <span>Meta: {formatDate(goal.target_date)}</span>
                  </div>

                  <div className="flex justify-between mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateProgress(goal.id, -100)}
                      disabled={Number(goal.current_amount) <= 0}
                    >
                      -R$100
                    </Button>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" onClick={() => handleUpdateProgress(goal.id, 100)}>
                        +R$100
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleUpdateProgress(goal.id, 500)}>
                        +R$500
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? "Editar Meta" : "Nova Meta Financeira"}</DialogTitle>
              <DialogDescription>
                {isEditing
                  ? "Atualize os detalhes da sua meta financeira"
                  : "Defina uma nova meta financeira para acompanhar seu progresso"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Meta</Label>
                <Input
                  id="name"
                  placeholder="Ex: Viagem, Carro Novo, Reserva de Emergência"
                  value={currentGoal.name || ""}
                  onChange={(e) => setCurrentGoal({ ...currentGoal, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="target_amount">Valor Alvo (R$)</Label>
                  <Input
                    id="target_amount"
                    type="number"
                    placeholder="0,00"
                    value={currentGoal.target_amount || ""}
                    onChange={(e) =>
                      setCurrentGoal({ ...currentGoal, target_amount: Number.parseFloat(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current_amount">Valor Atual (R$)</Label>
                  <Input
                    id="current_amount"
                    type="number"
                    placeholder="0,00"
                    value={currentGoal.current_amount || ""}
                    onChange={(e) =>
                      setCurrentGoal({ ...currentGoal, current_amount: Number.parseFloat(e.target.value) })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Data Alvo</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !targetDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {targetDate ? format(targetDate, "PPP", { locale: ptBR }) : "Selecione uma data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={targetDate}
                      onSelect={setTargetDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição (opcional)</Label>
                <Input
                  id="description"
                  placeholder="Descreva sua meta..."
                  value={currentGoal.description || ""}
                  onChange={(e) => setCurrentGoal({ ...currentGoal, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria (opcional)</Label>
                <Input
                  id="category"
                  placeholder="Ex: Viagem, Investimento, Educação"
                  value={currentGoal.category || ""}
                  onChange={(e) => setCurrentGoal({ ...currentGoal, category: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateOrUpdate}>{isEditing ? "Atualizar" : "Criar"} Meta</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
