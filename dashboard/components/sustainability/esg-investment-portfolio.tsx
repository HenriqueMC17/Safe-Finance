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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  Plus,
  Edit,
  Trash2,
  Target,
  Leaf,
  DollarSign,
  BarChart3,
  PieChart,
  Star,
  Award,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts"
import { toast } from "sonner"

interface ESGInvestment {
  id: string
  name: string
  symbol: string
  amount: number
  currentValue: number
  esgScore: number
  environmentalScore: number
  socialScore: number
  governanceScore: number
  category: string
  purchaseDate: string
  returnPercentage: number
  returnAmount: number
}

interface PortfolioInsights {
  totalInvested: number
  currentValue: number
  totalReturn: number
  returnPercentage: number
  avgESGScore: number
  categoryDistribution: Array<{
    category: string
    value: number
    color: string
  }>
  topPerformer: ESGInvestment | null
  sustainabilityRating: string
  monthlyPerformance: Array<{
    month: string
    value: number
    benchmark: number
  }>
}

const ESG_CATEGORIES = [
  { value: "renewable_energy", label: "Energia Renovável", color: "#22c55e" },
  { value: "sustainable_agriculture", label: "Agricultura Sustentável", color: "#16a34a" },
  { value: "clean_technology", label: "Tecnologia Limpa", color: "#15803d" },
  { value: "green_bonds", label: "Títulos Verdes", color: "#166534" },
  { value: "water_management", label: "Gestão de Água", color: "#0ea5e9" },
  { value: "waste_management", label: "Gestão de Resíduos", color: "#8b5cf6" },
]

const COLORS = ["#22c55e", "#16a34a", "#15803d", "#166534", "#0ea5e9", "#8b5cf6"]

export function ESGInvestmentPortfolio() {
  const [investments, setInvestments] = useState<ESGInvestment[]>([])
  const [insights, setInsights] = useState<PortfolioInsights | null>(null)
  const [loading, setLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newInvestment, setNewInvestment] = useState({
    name: "",
    symbol: "",
    amount: "",
    category: "",
  })

  useEffect(() => {
    fetchInvestments()
  }, [])

  const fetchInvestments = async () => {
    try {
      setLoading(true)
      // Mock data for demonstration
      const mockInvestments: ESGInvestment[] = [
        {
          id: "1",
          name: "Fundo Verde Sustentável",
          symbol: "FVSU11",
          amount: 5000,
          currentValue: 5420,
          esgScore: 85,
          environmentalScore: 88,
          socialScore: 82,
          governanceScore: 85,
          category: "renewable_energy",
          purchaseDate: "2024-01-15",
          returnPercentage: 8.4,
          returnAmount: 420,
        },
        {
          id: "2",
          name: "Ações Energia Limpa",
          symbol: "ENEL3",
          amount: 3000,
          currentValue: 3180,
          esgScore: 78,
          environmentalScore: 85,
          socialScore: 72,
          governanceScore: 77,
          category: "clean_technology",
          purchaseDate: "2024-02-10",
          returnPercentage: 6.0,
          returnAmount: 180,
        },
        {
          id: "3",
          name: "Título Verde Banco do Brasil",
          symbol: "BBAS3",
          amount: 7000,
          currentValue: 7350,
          esgScore: 82,
          environmentalScore: 80,
          socialScore: 85,
          governanceScore: 81,
          category: "green_bonds",
          purchaseDate: "2024-03-05",
          returnPercentage: 5.0,
          returnAmount: 350,
        },
      ]

      const totalInvested = mockInvestments.reduce((sum, inv) => sum + inv.amount, 0)
      const currentValue = mockInvestments.reduce((sum, inv) => sum + inv.currentValue, 0)
      const totalReturn = currentValue - totalInvested
      const returnPercentage = (totalReturn / totalInvested) * 100
      const avgESGScore = mockInvestments.reduce((sum, inv) => sum + inv.esgScore, 0) / mockInvestments.length

      const categoryDistribution = ESG_CATEGORIES.map((category) => {
        const categoryInvestments = mockInvestments.filter((inv) => inv.category === category.value)
        const categoryValue = categoryInvestments.reduce((sum, inv) => sum + inv.currentValue, 0)
        return {
          category: category.label,
          value: categoryValue,
          color: category.color,
        }
      }).filter((cat) => cat.value > 0)

      const mockInsights: PortfolioInsights = {
        totalInvested,
        currentValue,
        totalReturn,
        returnPercentage,
        avgESGScore,
        categoryDistribution,
        topPerformer: mockInvestments.length > 0 
          ? mockInvestments.reduce((best, current) =>
              best.returnPercentage > current.returnPercentage ? best : current,
            )
          : null,
        sustainabilityRating: avgESGScore >= 80 ? "Excelente" : avgESGScore >= 70 ? "Bom" : "Regular",
        monthlyPerformance: [
          { month: "Jan", value: 15000, benchmark: 14800 },
          { month: "Fev", value: 15200, benchmark: 15000 },
          { month: "Mar", value: 15450, benchmark: 15100 },
          { month: "Abr", value: 15680, benchmark: 15300 },
          { month: "Mai", value: 15850, benchmark: 15400 },
          { month: "Jun", value: 15950, benchmark: 15500 },
        ],
      }

      setInvestments(mockInvestments)
      setInsights(mockInsights)
    } catch (error) {
      console.error("Erro ao carregar investimentos:", error)
      toast.error("Erro ao carregar portfólio ESG")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateInvestment = async () => {
    try {
      if (!newInvestment.name || !newInvestment.symbol || !newInvestment.amount || !newInvestment.category) {
        toast.error("Preencha todos os campos obrigatórios")
        return
      }

      const amount = Number.parseFloat(newInvestment.amount)
      const currentValue = amount * (0.95 + Math.random() * 0.1) // Simulate market variation

      const investment: ESGInvestment = {
        id: Date.now().toString(),
        name: newInvestment.name,
        symbol: newInvestment.symbol.toUpperCase(),
        amount,
        currentValue,
        esgScore: 70 + Math.random() * 20, // Random ESG score between 70-90
        environmentalScore: 70 + Math.random() * 20,
        socialScore: 70 + Math.random() * 20,
        governanceScore: 70 + Math.random() * 20,
        category: newInvestment.category,
        purchaseDate: new Date().toISOString().split("T")[0],
        returnPercentage: ((currentValue - amount) / amount) * 100,
        returnAmount: currentValue - amount,
      }

      setInvestments((prev) => [...prev, investment])
      setNewInvestment({ name: "", symbol: "", amount: "", category: "" })
      setIsCreateDialogOpen(false)
      toast.success("Investimento ESG adicionado com sucesso!")
    } catch (error) {
      console.error("Erro ao criar investimento:", error)
      toast.error("Erro ao criar investimento ESG")
    }
  }

  const handleDeleteInvestment = async (investmentId: string) => {
    try {
      setInvestments((prev) => prev.filter((inv) => inv.id !== investmentId))
      toast.success("Investimento removido com sucesso!")
    } catch (error) {
      console.error("Erro ao remover investimento:", error)
      toast.error("Erro ao remover investimento")
    }
  }

  const getCategoryInfo = (category: string) => {
    return ESG_CATEGORIES.find((cat) => cat.value === category) || ESG_CATEGORIES[0]
  }

  const getESGRating = (score: number) => {
    if (score >= 85) return { label: "Excelente", color: "text-green-600 bg-green-50" }
    if (score >= 75) return { label: "Bom", color: "text-blue-600 bg-blue-50" }
    if (score >= 65) return { label: "Regular", color: "text-yellow-600 bg-yellow-50" }
    return { label: "Baixo", color: "text-red-600 bg-red-50" }
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
          <h1 className="text-3xl font-bold text-green-800">Portfólio ESG</h1>
          <p className="text-muted-foreground">Gerencie seus investimentos sustentáveis</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Investimento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Investimento ESG</DialogTitle>
              <DialogDescription>Registre um novo investimento sustentável no seu portfólio</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do Investimento</Label>
                <Input
                  id="name"
                  value={newInvestment.name}
                  onChange={(e) => setNewInvestment((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Fundo Verde Sustentável"
                />
              </div>
              <div>
                <Label htmlFor="symbol">Símbolo/Código</Label>
                <Input
                  id="symbol"
                  value={newInvestment.symbol}
                  onChange={(e) => setNewInvestment((prev) => ({ ...prev, symbol: e.target.value }))}
                  placeholder="Ex: FVSU11"
                />
              </div>
              <div>
                <Label htmlFor="amount">Valor Investido (R$)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newInvestment.amount}
                  onChange={(e) => setNewInvestment((prev) => ({ ...prev, amount: e.target.value }))}
                  placeholder="Ex: 5000"
                />
              </div>
              <div>
                <Label htmlFor="category">Categoria ESG</Label>
                <Select
                  value={newInvestment.category}
                  onValueChange={(value: string) => setNewInvestment((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {ESG_CATEGORIES.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateInvestment} className="bg-green-600 hover:bg-green-700">
                  Adicionar Investimento
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
              <CardTitle className="text-sm font-medium text-green-800">Valor Total</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">R$ {insights.currentValue.toLocaleString()}</div>
              <p className="text-xs text-green-600">Investido: R$ {insights.totalInvested.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Retorno Total</CardTitle>
              {insights.returnPercentage >= 0 ? (
                <TrendingUp className="h-4 w-4 text-blue-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${insights.returnPercentage >= 0 ? "text-blue-800" : "text-red-800"}`}
              >
                {insights.returnPercentage >= 0 ? "+" : ""}
                {insights.returnPercentage.toFixed(1)}%
              </div>
              <p className={`text-xs ${insights.returnPercentage >= 0 ? "text-blue-600" : "text-red-600"}`}>
                {insights.returnPercentage >= 0 ? "+" : ""}R$ {insights.totalReturn.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Score ESG Médio</CardTitle>
              <Star className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">{insights.avgESGScore.toFixed(1)}</div>
              <p className="text-xs text-purple-600">Rating: {insights.sustainabilityRating}</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-800">Melhor Ativo</CardTitle>
              <Award className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800">
                {insights.topPerformer ? `+${insights.topPerformer.returnPercentage.toFixed(1)}%` : "N/A"}
              </div>
              <p className="text-xs text-orange-600 truncate">{insights.topPerformer?.symbol || "Nenhum"}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <Tabs defaultValue="portfolio" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="portfolio">Portfólio</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="analysis">Análise ESG</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-4">
          {investments.length === 0 ? (
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Target className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Nenhum Investimento ESG</h3>
                <p className="text-sm text-gray-500 text-center mb-4">
                  Adicione seu primeiro investimento sustentável para começar a monitorar seu portfólio ESG
                </p>
                <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Primeiro Investimento
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {investments.map((investment) => {
                const categoryInfo = getCategoryInfo(investment.category)
                const esgRating = getESGRating(investment.esgScore)

                return (
                  <Card key={investment.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{investment.name}</CardTitle>
                          <CardDescription className="flex items-center space-x-2">
                            <span>{investment.symbol}</span>
                            <Badge variant="outline" className="text-xs">
                              {categoryInfo.label}
                            </Badge>
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={esgRating.color}>ESG: {investment.esgScore.toFixed(0)}</Badge>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteInvestment(investment.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Valor Investido</p>
                          <p className="text-lg font-semibold">R$ {investment.amount.toLocaleString()}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Valor Atual</p>
                          <p className="text-lg font-semibold">R$ {investment.currentValue.toLocaleString()}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Retorno</p>
                          <p
                            className={`text-lg font-semibold ${investment.returnPercentage >= 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {investment.returnPercentage >= 0 ? "+" : ""}
                            {investment.returnPercentage.toFixed(1)}%
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Data de Compra</p>
                          <p className="text-lg font-semibold">
                            {new Date(investment.purchaseDate).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                      </div>

                      {/* ESG Scores */}
                      <div className="mt-4 space-y-3">
                        <h4 className="font-medium">Scores ESG Detalhados</h4>
                        <div className="grid gap-3 md:grid-cols-3">
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Ambiental (E)</span>
                              <span>{investment.environmentalScore.toFixed(0)}</span>
                            </div>
                            <Progress value={investment.environmentalScore} className="h-2" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Social (S)</span>
                              <span>{investment.socialScore.toFixed(0)}</span>
                            </div>
                            <Progress value={investment.socialScore} className="h-2" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Governança (G)</span>
                              <span>{investment.governanceScore.toFixed(0)}</span>
                            </div>
                            <Progress value={investment.governanceScore} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          {insights && (
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
                    Performance vs Benchmark
                  </CardTitle>
                  <CardDescription>Comparação com índices de mercado</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={insights.monthlyPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        content={({ active, payload, label }: any) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-background border rounded-md p-3 shadow-md">
                                <p className="font-medium">{label}</p>
                                {payload.map((entry: any, index: number) => (
                                  <p key={`item-${index}`} style={{ color: entry.color }}>
                                    {entry.name === "value" ? "Seu Portfólio" : "Benchmark"}: R$ {entry.value.toLocaleString()}
                                  </p>
                                ))}
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} name="value" />
                      <Line
                        type="monotone"
                        dataKey="benchmark"
                        stroke="#6b7280"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="benchmark"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2 text-green-600" />
                    Distribuição por Categoria
                  </CardTitle>
                  <CardDescription>Alocação do portfólio por setor ESG</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={insights.categoryDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }: any) => `${name}: R$ ${value.toLocaleString()}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {insights.categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        content={({ active, payload }: any) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-background border rounded-md p-3 shadow-md">
                                <p className="text-sm font-medium">{payload[0].name}</p>
                                <p className="text-sm">Valor: R$ {payload[0].value.toLocaleString()}</p>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Leaf className="h-5 w-5 mr-2 text-green-600" />
                  Análise de Sustentabilidade
                </CardTitle>
                <CardDescription>Avaliação detalhada do seu portfólio ESG</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights && (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Score ESG Geral</span>
                        <span className="font-medium">{insights.avgESGScore.toFixed(1)}/100</span>
                      </div>
                      <Progress value={insights.avgESGScore} className="h-2" />
                      <p className="text-xs text-muted-foreground">Rating: {insights.sustainabilityRating}</p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Recomendações</h4>
                      <div className="space-y-2">
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-sm text-green-800">
                            ✅ Seu portfólio tem um excelente foco em sustentabilidade
                          </p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">
                            💡 Considere diversificar mais em títulos verdes para reduzir risco
                          </p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <p className="text-sm text-purple-800">
                            📈 Investimentos em tecnologia limpa têm potencial de crescimento
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-green-600" />
                  Impacto Ambiental
                </CardTitle>
                <CardDescription>Contribuição para um futuro sustentável</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-800">CO₂ Evitado</p>
                      <p className="text-sm text-green-600">Através dos seus investimentos</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">1.2 ton</p>
                      <p className="text-xs text-green-600">este ano</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-blue-800">Energia Limpa</p>
                      <p className="text-sm text-blue-600">Capacidade financiada</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">850 kW</p>
                      <p className="text-xs text-blue-600">equivalente</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <p className="font-medium text-purple-800">Empregos Verdes</p>
                      <p className="text-sm text-purple-600">Apoiados indiretamente</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-600">12</p>
                      <p className="text-xs text-purple-600">posições</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
