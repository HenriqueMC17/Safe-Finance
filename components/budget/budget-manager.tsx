"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { CalendarIcon, Plus, Pencil, Trash2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { ExportDataButton } from "@/components/export-data-button"
import { exportToPDF } from "@/lib/pdf-export"

interface Budget {
  id: number
  category: string
  amount: number
  period: string
  start_date: string
  end_date?: string
}

interface BudgetManagerProps {
  userId: number
}

export function BudgetManager({ userId }: BudgetManagerProps) {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentBudget, setCurrentBudget] = useState<Partial<Budget>>({})
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const fetchBudgets = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/budgets?userId=${userId}`)
      if (!response.ok) {
        throw new Error("Erro ao buscar orçamentos")
      }
      const data = await response.json()
      setBudgets(data)
    } catch (error) {
      console.error("Erro:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os orçamentos",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBudgets()
  }, [userId])

  const handleCreateOrUpdate = async () => {
    if (!currentBudget.category || !currentBudget.amount || !currentBudget.period || !startDate) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    try {
      const endpoint = "/api/budgets"
      const method = isEditing ? "PUT" : "POST"
      const body = {
        ...(isEditing && { id: currentBudget.id }),
        userId,
        category: currentBudget.category,
        amount: currentBudget.amount,
        period: currentBudget.period,
        startDate: startDate.toISOString(),
        endDate: endDate?.toISOString(),
      }

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        throw new Error(`Erro ao ${isEditing ? "atualizar" : "criar"} orçamento`)
      }

      toast({
        title: "Sucesso",
        description: `Orçamento ${isEditing ? "atualizado" : "criado"} com sucesso`,
      })

      setIsDialogOpen(false)
      resetForm()
      fetchBudgets()
    } catch (error) {
      console.error("Erro:", error)
      toast({
        title: "Erro",
        description: `Não foi possível ${isEditing ? "atualizar" : "criar"} o orçamento`,
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este orçamento?")) {
      return
    }

    try {
      const response = await fetch(`/api/budgets?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Erro ao excluir orçamento")
      }

      toast({
        title: "Sucesso",
        description: "Orçamento excluído com sucesso",
      })

      fetchBudgets()
    } catch (error) {
      console.error("Erro:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir o orçamento",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (budget: Budget) => {
    setCurrentBudget(budget)
    setStartDate(new Date(budget.start_date))
    setEndDate(budget.end_date ? new Date(budget.end_date) : undefined)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setCurrentBudget({})
    setStartDate(undefined)
    setEndDate(undefined)
    setIsEditing(false)
  }

  const handleOpenDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const getPeriodLabel = (period: string) => {
    const periods: Record<string, string> = {
      monthly: "Mensal",
      quarterly: "Trimestral",
      annual: "Anual",
    }
    return periods[period] || period
  }

  // Função para exportar orçamentos para PDF
  const handleExportPDF = async () => {
    const formattedBudgets = budgets.map((budget) => ({
      ...budget,
      period: getPeriodLabel(budget.period),
      amount: formatCurrency(Number(budget.amount)),
    }))

    const headers = {
      category: "Categoria",
      amount: "Valor",
      period: "Período",
      start_date: "Data de Início",
      end_date: "Data de Término",
    }

    await exportToPDF(
      formattedBudgets,
      headers,
      "Relatório de Orçamentos",
      "orcamentos_safe_finance",
      ["start_date", "end_date"],
      "landscape",
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Gerenciamento de Orçamentos</CardTitle>
          <CardDescription>Defina e gerencie seus orçamentos por categoria</CardDescription>
        </div>
        <div className="flex space-x-2">
          <ExportDataButton
            data={budgets}
            headers={{
              category: "Categoria",
              amount: "Valor",
              period: "Período",
              start_date: "Data de Início",
              end_date: "Data de Término",
            }}
            dateFields={["start_date", "end_date"]}
            filename="orcamentos_safe_finance"
            disabled={budgets.length === 0}
            onExportPDF={handleExportPDF}
          />
          <Button onClick={handleOpenDialog} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Novo Orçamento
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-12 bg-muted rounded animate-pulse" />
            <div className="h-12 bg-muted rounded animate-pulse" />
            <div className="h-12 bg-muted rounded animate-pulse" />
          </div>
        ) : budgets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Nenhum orçamento definido</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Defina orçamentos para controlar seus gastos por categoria
            </p>
            <Button onClick={handleOpenDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Criar Orçamento
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {budgets.map((budget) => (
              <div key={budget.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{budget.category}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{formatCurrency(Number(budget.amount))}</span>
                    <span>•</span>
                    <span>{getPeriodLabel(budget.period)}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(budget)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(budget.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? "Editar Orçamento" : "Novo Orçamento"}</DialogTitle>
              <DialogDescription>
                {isEditing
                  ? "Atualize os detalhes do orçamento existente"
                  : "Defina um novo orçamento para controlar seus gastos"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Input
                  id="category"
                  placeholder="Ex: Alimentação, Transporte, Lazer"
                  value={currentBudget.category || ""}
                  onChange={(e) => setCurrentBudget({ ...currentBudget, category: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Valor (R$)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0,00"
                  value={currentBudget.amount || ""}
                  onChange={(e) => setCurrentBudget({ ...currentBudget, amount: Number.parseFloat(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="period">Período</Label>
                <Select
                  value={currentBudget.period || ""}
                  onValueChange={(value) => setCurrentBudget({ ...currentBudget, period: value })}
                >
                  <SelectTrigger id="period">
                    <SelectValue placeholder="Selecione um período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Mensal</SelectItem>
                    <SelectItem value="quarterly">Trimestral</SelectItem>
                    <SelectItem value="annual">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Data de Início</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP", { locale: ptBR }) : "Selecione uma data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Data de Término (opcional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP", { locale: ptBR }) : "Selecione uma data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        disabled={(date) => (startDate ? date < startDate : false)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateOrUpdate}>{isEditing ? "Atualizar" : "Criar"} Orçamento</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
