"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Target,
  Plus,
  Edit,
  Trash2,
  Leaf,
  Zap,
  Car,
  UtensilsCrossed,
  ShoppingBag,
  AlertTriangle,
  CheckCircle,
  DollarSign,
} from "lucide-react"
import { toast } from "sonner"

interface GreenBudget {
  id: string
  name: string
  category: string
  budgetAmount: number
  spentAmount: number
  carbonLimit: number
  carbonUsed: number
  month: number
  year: number
  isActive: boolean
  progress: number
  carbonProgress: number
  remaining: number
  status: "on_track" | "warning" | "over_budget"
}

interface BudgetInsights {
  totalBudget: number
  totalSpent: number
  remainingBudget: number
  spentPercentage: number
  totalCarbonLimit: number
  totalCarbonUsed: number
  carbonSaved: number
  carbonEfficiency: number
  budgetsOnTrack: number
  budgetsOverBudget: number
}

const GREEN_CATEGORIES = [
  { value: "transport", label: "Transporte Sustentável", icon: Car, color: "blue" },
  { value: "energy", label: "Energia Renovável", icon: Zap, color: "yellow" },
  { value: "food", label: "Alimentação Orgânica", icon: UtensilsCrossed, color: "green" },
  { value: "shopping", label: "Produtos Ecológicos", icon: ShoppingBag, color: "purple" },
  { value: "other", label: "Outros", icon: Leaf, color: "gray" },
]

export function GreenBudgetManager() {
  const [budgets, setBudgets] = useState<GreenBudget[]>([])
  const [insights, setInsights] = useState<BudgetInsights | null>(null)
  const [loading, setLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingBudget, setEditingBudget] = useState<GreenBudget | null>(null)
  const [newBudget, setNewBudget] = useState({
    name: "",
    category: "",
    budgetAmount: "",
    carbonLimit: "",
  })

  useEffect(() => {
    fetchBudgets()
  }, [])

  const fetchBudgets = async () => {
    try {
      setLoading(true)
      // Mock data for demonstration
      const mockBudgets: GreenBudget[] = [
        {
          id: "1",
          name: "Transporte Público",
          category: "transport",
          budgetAmount: 300,
          spentAmount: 180,
          carbonLimit: 50,
          carbonUsed: 25,
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
          isActive: true,
          progress: 60,
          carbonProgress: 50,
          remaining: 120,
          status: "on_track",
        },
        {
          id: "2",
          name: "Energia Solar",
          category: "energy",
          budgetAmount: 500,
          spentAmount: 450,
          carbonLimit: 30,
          carbonUsed: 15,
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
          isActive: true,
          progress: 90,
          carbonProgress: 50,
          remaining: 50,
          status: "warning",
        },
        {
          id: "3",
          name: "Alimentos Orgânicos",
          category: "food",
          budgetAmount: 400,
          spentAmount: 420,
          carbonLimit: 40,
          carbonUsed: 35,
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
          isActive: true,
          progress: 105,
          carbonProgress: 87.5,
          remaining: -20,
          status: "over_budget",
        },
      ]

      const mockInsights: BudgetInsights = {
        totalBudget: 1200,
        totalSpent: 1050,
        remainingBudget: 150,
        spentPercentage: 87.5,
        totalCarbonLimit: 120,
        totalCarbonUsed: 75,
        carbonSaved: 45,
        carbonEfficiency: 62.5,
        budgetsOnTrack: 1,
        budgetsOverBudget: 1,
      }

      setBudgets(mockBudgets)
      setInsights(mockInsights)
    } catch (error) {
      console.error("Erro ao carregar orçamentos:", error)
      toast.error("Erro ao carregar orçamentos verdes")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateBudget = async () => {
    try {
      if (!newBudget.name || !newBudget.category || !newBudget.budgetAmount || !newBudget.carbonLimit) {
        toast.error("Preencha todos os campos obrigatórios")
        return
      }

      const budget: GreenBudget = {
        id: Date.now().toString(),
        name: newBudget.name,
        category: newBudget.category,
        budgetAmount: Number.parseFloat(newBudget.budgetAmount),
        spentAmount: 0,
        carbonLimit: Number.parseFloat(newBudget.carbonLimit),
        carbonUsed: 0,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        isActive: true,
        progress: 0,
        carbonProgress: 0,
        remaining: Number.parseFloat(newBudget.budgetAmount),
        status: "on_track",
      }

      setBudgets((prev) => [...prev, budget])
      setNewBudget({ name: "", category: "", budgetAmount: "", carbonLimit: "" })
      setIsCreateDialogOpen(false)
      toast.success("Orçamento verde criado com sucesso!")
    } catch (error) {
      console.error("Erro ao criar orçamento:", error)
      toast.error("Erro ao criar orçamento verde")
    }
  }

  const handleUpdateBudget = async (budgetId: string, spentAmount: number, carbonUsed: number) => {
    try {
      setBudgets((prev) =>
        prev.map((budget) => {
          if (budget.id === budgetId) {
            const progress = (spentAmount / budget.budgetAmount) * 100
            const carbonProgress = (carbonUsed / budget.carbonLimit) * 100
            const remaining = budget.budgetAmount - spentAmount
            let status: "on_track" | "warning" | "over_budget" = "on_track"

            if (progress > 100) status = "over_budget"
            else if (progress > 80) status = "warning"

            return {
              ...budget,
              spentAmount,
              carbonUsed,
              progress,
              carbonProgress,
              remaining,
              status,
            }
          }
          return budget
        }),
      )
      toast.success("Orçamento atualizado com sucesso!")
    } catch (error) {
      console.error("Erro ao atualizar orçamento:", error)
      toast.error("Erro ao atualizar orçamento")
    }
  }

  const handleDeleteBudget = async (budgetId: string) => {
    try {
      setBudgets((prev) => prev.filter((budget) => budget.id !== budgetId))
      toast.success("Orçamento removido com sucesso!")
    } catch (error) {
      console.error("Erro ao remover orçamento:", error)
      toast.error("Erro ao remover orçamento")
    }
  }

  const getCategoryInfo = (category: string) => {
    return GREEN_CATEGORIES.find((cat) => cat.value === category) || GREEN_CATEGORIES[4]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on_track":
        return "text-green-600 bg-green-50 border-green-200"
      case "warning":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "over_budget":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on_track":
        return <CheckCircle className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "over_budget":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="space-y-0 pb-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-8 bg-muted rounded w-1/2 mt-2"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800">Orçamentos Verdes</h1>
          <p className="text-muted-foreground">Gerencie seus gastos sustentáveis e metas de carbono</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Orçamento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Orçamento Verde</DialogTitle>
              <DialogDescription>Configure um novo orçamento para gastos sustentáveis</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do Orçamento</Label>
                <Input
                  id="name"
                  value={newBudget.name}
                  onChange={(e) => setNewBudget((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Transporte Público"
                />
              </div>
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select
                  value={newBudget.category}
                  onValueChange={(value) => setNewBudget((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {GREEN_CATEGORIES.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex items-center">
                          <category.icon className="h-4 w-4 mr-2" />
                          {category.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="budgetAmount">Valor do Orçamento (R$)</Label>
                <Input
                  id="budgetAmount"
                  type="number"
                  value={newBudget.budgetAmount}
                  onChange={(e) => setNewBudget((prev) => ({ ...prev, budgetAmount: e.target.value }))}
                  placeholder="Ex: 500"
                />
              </div>
              <div>
                <Label htmlFor="carbonLimit">Meta de Carbono (kg CO₂)</Label>
                <Input
                  id="carbonLimit"
                  type="number"
                  value={newBudget.carbonLimit}
                  onChange={(e) => setNewBudget((prev) => ({ ...prev, carbonLimit: e.target.value }))}
                  placeholder="Ex: 50"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateBudget} className="bg-green-600 hover:bg-green-700">
                  Criar Orçamento
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Cards */}
      {insights && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Orçamento Total</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">R$ {insights.totalBudget.toLocaleString()}</div>
              <p className="text-xs text-green-600">
                R$ {insights.totalSpent.toLocaleString()} gastos ({insights.spentPercentage.toFixed(1)}%)
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Carbono Economizado</CardTitle>
              <Leaf className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">{insights.carbonSaved} kg</div>
              <p className="text-xs text-blue-600">{insights.carbonEfficiency.toFixed(1)}% de eficiência</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">No Caminho Certo</CardTitle>
              <CheckCircle className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">{insights.budgetsOnTrack}</div>
              <p className="text-xs text-purple-600">orçamentos dentro da meta</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-800">Acima do Orçamento</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800">{insights.budgetsOverBudget}</div>
              <p className="text-xs text-orange-600">orçamentos excedidos</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Budget List */}
      <div className="grid gap-4">
        {budgets.length === 0 ? (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Target className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">Nenhum Orçamento Verde</h3>
              <p className="text-sm text-gray-500 text-center mb-4">
                Crie seu primeiro orçamento verde para começar a monitorar seus gastos sustentáveis
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Criar Primeiro Orçamento
              </Button>
            </CardContent>
          </Card>
        ) : (
          budgets.map((budget) => {
            const categoryInfo = getCategoryInfo(budget.category)
            const CategoryIcon = categoryInfo.icon

            return (
              <Card key={budget.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-${categoryInfo.color}-50`}>
                        <CategoryIcon className={`h-5 w-5 text-${categoryInfo.color}-600`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{budget.name}</CardTitle>
                        <CardDescription>{categoryInfo.label}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={getStatusColor(budget.status)}>
                        {getStatusIcon(budget.status)}
                        <span className="ml-1">
                          {budget.status === "on_track"
                            ? "No Caminho"
                            : budget.status === "warning"
                              ? "Atenção"
                              : "Excedido"}
                        </span>
                      </Badge>
                      <Button variant="ghost" size="sm" onClick={() => setEditingBudget(budget)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteBudget(budget.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Financial Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Orçamento Financeiro</span>
                      <span className="font-medium">
                        R$ {budget.spentAmount.toLocaleString()} / R$ {budget.budgetAmount.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={Math.min(budget.progress, 100)} className="h-2" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{budget.progress.toFixed(1)}% usado</span>
                      <span className={budget.remaining >= 0 ? "text-green-600" : "text-red-600"}>
                        {budget.remaining >= 0 ? "+" : ""}R$ {budget.remaining.toLocaleString()} restante
                      </span>
                    </div>
                  </div>

                  {/* Carbon Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Meta de Carbono</span>
                      <span className="font-medium">
                        {budget.carbonUsed} / {budget.carbonLimit} kg CO₂
                      </span>
                    </div>
                    <Progress value={Math.min(budget.carbonProgress, 100)} className="h-2" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{budget.carbonProgress.toFixed(1)}% da meta</span>
                      <span className="text-green-600">
                        {budget.carbonLimit - budget.carbonUsed} kg CO₂ economizados
                      </span>
                    </div>
                  </div>

                  {/* Quick Update */}
                  <div className="flex space-x-2 pt-2">
                    <Input
                      type="number"
                      placeholder="Valor gasto"
                      className="flex-1"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          const target = e.target as HTMLInputElement
                          const spentAmount = Number.parseFloat(target.value) || 0
                          const carbonUsed = (spentAmount / budget.budgetAmount) * budget.carbonLimit
                          handleUpdateBudget(budget.id, spentAmount, carbonUsed)
                          target.value = ""
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const input = document.querySelector(`input[placeholder="Valor gasto"]`) as HTMLInputElement
                        if (input && input.value) {
                          const spentAmount = Number.parseFloat(input.value) || 0
                          const carbonUsed = (spentAmount / budget.budgetAmount) * budget.carbonLimit
                          handleUpdateBudget(budget.id, spentAmount, carbonUsed)
                          input.value = ""
                        }
                      }}
                    >
                      Atualizar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Tips and Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Leaf className="h-5 w-5 mr-2 text-green-600" />
            Dicas para Orçamentos Verdes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>Transporte:</strong> Use transporte público, bicicleta ou carona solidária para reduzir custos e
                emissões.
              </AlertDescription>
            </Alert>
            <Alert className="border-blue-200 bg-blue-50">
              <Zap className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Energia:</strong> Invista em equipamentos eficientes e considere energia solar para economia a
                longo prazo.
              </AlertDescription>
            </Alert>
            <Alert className="border-purple-200 bg-purple-50">
              <UtensilsCrossed className="h-4 w-4 text-purple-600" />
              <AlertDescription className="text-purple-800">
                <strong>Alimentação:</strong> Prefira alimentos locais e orgânicos, reduza desperdício e carne vermelha.
              </AlertDescription>
            </Alert>
            <Alert className="border-orange-200 bg-orange-50">
              <ShoppingBag className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Compras:</strong> Priorize produtos usados, duráveis e de marcas com certificação ambiental.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
