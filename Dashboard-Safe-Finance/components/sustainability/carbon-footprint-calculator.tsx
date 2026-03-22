"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Car,
  Bus,
  Plane,
  Zap,
  Flame,
  UtensilsCrossed,
  Leaf,
  ShoppingBag,
  Smartphone,
  Calculator,
  TrendingDown,
  TrendingUp,
  Target,
  Lightbulb,
  CheckCircle,
} from "lucide-react"
import { toast } from "sonner"
import { CARBON_FACTORS } from "@/constants/level-system"

interface CarbonData {
  transport: {
    carKm: number
    publicTransportKm: number
    flightKm: number
  }
  energy: {
    electricityKwh: number
    gasM3: number
  }
  food: {
    meatMeals: number
    vegetarianMeals: number
    localFood: boolean
  }
  shopping: {
    newClothes: number
    electronics: number
    recycledItems: number
  }
}

interface CalculationResult {
  transport: number
  energy: number
  food: number
  shopping: number
  total: number
  comparison: {
    lastMonth: number
    average: number
    target: number
  }
  suggestions: string[]
}

export function CarbonFootprintCalculator() {
  const [carbonData, setCarbonData] = useState<CarbonData>({
    transport: { carKm: 0, publicTransportKm: 0, flightKm: 0 },
    energy: { electricityKwh: 0, gasM3: 0 },
    food: { meatMeals: 0, vegetarianMeals: 0, localFood: false },
    shopping: { newClothes: 0, electronics: 0, recycledItems: 0 },
  })

  const [result, setResult] = useState<CalculationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("transport")

  const handleInputChange = (category: keyof CarbonData, field: string, value: number | boolean) => {
    setCarbonData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }))
  }

  const calculateFootprint = async () => {
    try {
      setLoading(true)

      // Calculate emissions using carbon factors
      const transportEmissions =
        carbonData.transport.carKm * CARBON_FACTORS.transport.car +
        carbonData.transport.publicTransportKm * CARBON_FACTORS.transport.publicTransport +
        carbonData.transport.flightKm * CARBON_FACTORS.transport.flight

      const energyEmissions =
        carbonData.energy.electricityKwh * CARBON_FACTORS.energy.electricity +
        carbonData.energy.gasM3 * CARBON_FACTORS.energy.gas

      const foodEmissions =
        carbonData.food.meatMeals * CARBON_FACTORS.food.meatMeal +
        carbonData.food.vegetarianMeals * CARBON_FACTORS.food.vegetarianMeal
      const adjustedFoodEmissions = carbonData.food.localFood
        ? foodEmissions * CARBON_FACTORS.food.localFoodDiscount
        : foodEmissions

      const shoppingEmissions = Math.max(
        0,
        carbonData.shopping.newClothes * CARBON_FACTORS.shopping.newClothes +
          carbonData.shopping.electronics * CARBON_FACTORS.shopping.electronics -
          carbonData.shopping.recycledItems *
            CARBON_FACTORS.shopping.newClothes *
            CARBON_FACTORS.shopping.recycledDiscount,
      )

      const total = transportEmissions + energyEmissions + adjustedFoodEmissions + shoppingEmissions

      // Generate suggestions
      const suggestions = []
      if (transportEmissions > total * 0.4) {
        suggestions.push("🚌 Considere usar mais transporte público ou bicicleta")
      }
      if (energyEmissions > total * 0.3) {
        suggestions.push("💡 Invista em equipamentos mais eficientes energeticamente")
      }
      if (adjustedFoodEmissions > total * 0.3) {
        suggestions.push("🥬 Reduza o consumo de carne e prefira alimentos locais")
      }
      if (shoppingEmissions > total * 0.2) {
        suggestions.push("♻️ Compre produtos usados ou recondicionados quando possível")
      }
      if (total < 1000) {
        suggestions.push("🎯 Parabéns! Você está abaixo da meta mensal!")
      }

      const mockResult: CalculationResult = {
        transport: transportEmissions,
        energy: energyEmissions,
        food: adjustedFoodEmissions,
        shopping: shoppingEmissions,
        total,
        comparison: {
          lastMonth: 950,
          average: 1100,
          target: 1000,
        },
        suggestions,
      }

      setResult(mockResult)
      toast.success("Pegada de carbono calculada com sucesso!")
    } catch (error) {
      console.error("Erro ao calcular:", error)
      toast.error("Erro ao calcular pegada de carbono")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setCarbonData({
      transport: { carKm: 0, publicTransportKm: 0, flightKm: 0 },
      energy: { electricityKwh: 0, gasM3: 0 },
      food: { meatMeals: 0, vegetarianMeals: 0, localFood: false },
      shopping: { newClothes: 0, electronics: 0, recycledItems: 0 },
    })
    setResult(null)
  }

  const getComparisonIcon = (current: number, comparison: number) => {
    if (current < comparison) return <TrendingDown className="h-4 w-4 text-green-600" />
    if (current > comparison) return <TrendingUp className="h-4 w-4 text-red-600" />
    return <Target className="h-4 w-4 text-gray-600" />
  }

  const getComparisonText = (current: number, comparison: number) => {
    const diff = ((current - comparison) / comparison) * 100
    if (Math.abs(diff) < 1) return "Igual ao período anterior"
    return diff > 0 ? `+${diff.toFixed(1)}% vs período anterior` : `${diff.toFixed(1)}% vs período anterior`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-green-800">Calculadora de Pegada de Carbono</h2>
          <p className="text-muted-foreground">Calcule suas emissões mensais de CO₂</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={resetForm}>
            Limpar
          </Button>
          <Button onClick={calculateFootprint} disabled={loading} className="bg-green-600 hover:bg-green-700">
            <Calculator className="h-4 w-4 mr-2" />
            {loading ? "Calculando..." : "Calcular"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="h-5 w-5 mr-2 text-green-600" />
              Dados do Mês
            </CardTitle>
            <CardDescription>Insira seus dados de consumo mensal</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="transport">
                  <Car className="h-4 w-4 mr-1" />
                  Transporte
                </TabsTrigger>
                <TabsTrigger value="energy">
                  <Zap className="h-4 w-4 mr-1" />
                  Energia
                </TabsTrigger>
                <TabsTrigger value="food">
                  <UtensilsCrossed className="h-4 w-4 mr-1" />
                  Alimentação
                </TabsTrigger>
                <TabsTrigger value="shopping">
                  <ShoppingBag className="h-4 w-4 mr-1" />
                  Compras
                </TabsTrigger>
              </TabsList>

              <TabsContent value="transport" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="carKm" className="flex items-center">
                      <Car className="h-4 w-4 mr-2" />
                      Quilômetros de carro
                    </Label>
                    <Input
                      id="carKm"
                      type="number"
                      value={carbonData.transport.carKm}
                      onChange={(e) => handleInputChange("transport", "carKm", Number(e.target.value))}
                      placeholder="Ex: 500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="publicTransportKm" className="flex items-center">
                      <Bus className="h-4 w-4 mr-2" />
                      Quilômetros de transporte público
                    </Label>
                    <Input
                      id="publicTransportKm"
                      type="number"
                      value={carbonData.transport.publicTransportKm}
                      onChange={(e) => handleInputChange("transport", "publicTransportKm", Number(e.target.value))}
                      placeholder="Ex: 200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="flightKm" className="flex items-center">
                      <Plane className="h-4 w-4 mr-2" />
                      Quilômetros de voo
                    </Label>
                    <Input
                      id="flightKm"
                      type="number"
                      value={carbonData.transport.flightKm}
                      onChange={(e) => handleInputChange("transport", "flightKm", Number(e.target.value))}
                      placeholder="Ex: 0"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="energy" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="electricityKwh" className="flex items-center">
                      <Zap className="h-4 w-4 mr-2" />
                      Consumo de eletricidade (kWh)
                    </Label>
                    <Input
                      id="electricityKwh"
                      type="number"
                      value={carbonData.energy.electricityKwh}
                      onChange={(e) => handleInputChange("energy", "electricityKwh", Number(e.target.value))}
                      placeholder="Ex: 300"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gasM3" className="flex items-center">
                      <Flame className="h-4 w-4 mr-2" />
                      Consumo de gás (m³)
                    </Label>
                    <Input
                      id="gasM3"
                      type="number"
                      value={carbonData.energy.gasM3}
                      onChange={(e) => handleInputChange("energy", "gasM3", Number(e.target.value))}
                      placeholder="Ex: 15"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="food" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="meatMeals" className="flex items-center">
                      <UtensilsCrossed className="h-4 w-4 mr-2" />
                      Refeições com carne
                    </Label>
                    <Input
                      id="meatMeals"
                      type="number"
                      value={carbonData.food.meatMeals}
                      onChange={(e) => handleInputChange("food", "meatMeals", Number(e.target.value))}
                      placeholder="Ex: 20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vegetarianMeals" className="flex items-center">
                      <Leaf className="h-4 w-4 mr-2" />
                      Refeições vegetarianas
                    </Label>
                    <Input
                      id="vegetarianMeals"
                      type="number"
                      value={carbonData.food.vegetarianMeals}
                      onChange={(e) => handleInputChange("food", "vegetarianMeals", Number(e.target.value))}
                      placeholder="Ex: 10"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="localFood"
                      checked={carbonData.food.localFood}
                      onCheckedChange={(checked) => handleInputChange("food", "localFood", checked)}
                    />
                    <Label htmlFor="localFood" className="flex items-center">
                      <Leaf className="h-4 w-4 mr-2 text-green-600" />
                      Prefiro alimentos locais/orgânicos
                    </Label>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="shopping" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="newClothes" className="flex items-center">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Peças de roupa novas
                    </Label>
                    <Input
                      id="newClothes"
                      type="number"
                      value={carbonData.shopping.newClothes}
                      onChange={(e) => handleInputChange("shopping", "newClothes", Number(e.target.value))}
                      placeholder="Ex: 3"
                    />
                  </div>
                  <div>
                    <Label htmlFor="electronics" className="flex items-center">
                      <Smartphone className="h-4 w-4 mr-2" />
                      Eletrônicos novos
                    </Label>
                    <Input
                      id="electronics"
                      type="number"
                      value={carbonData.shopping.electronics}
                      onChange={(e) => handleInputChange("shopping", "electronics", Number(e.target.value))}
                      placeholder="Ex: 1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="recycledItems" className="flex items-center">
                      <Leaf className="h-4 w-4 mr-2 text-green-600" />
                      Itens usados/reciclados
                    </Label>
                    <Input
                      id="recycledItems"
                      type="number"
                      value={carbonData.shopping.recycledItems}
                      onChange={(e) => handleInputChange("shopping", "recycledItems", Number(e.target.value))}
                      placeholder="Ex: 2"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          {result ? (
            <>
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-800">
                    <Target className="h-5 w-5 mr-2" />
                    Sua Pegada de Carbono
                  </CardTitle>
                  <CardDescription className="text-green-700">Emissões totais este mês</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-800 mb-2">{result.total.toFixed(1)} kg CO₂</div>
                    <div className="flex items-center justify-center space-x-2">
                      {getComparisonIcon(result.total, result.comparison.target)}
                      <span className="text-sm text-green-700">
                        {getComparisonText(result.total, result.comparison.target)}
                      </span>
                    </div>
                    <Progress value={Math.min((result.total / result.comparison.target) * 100, 100)} className="mt-3" />
                    <p className="text-xs text-green-600 mt-1">Meta mensal: {result.comparison.target}kg CO₂</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Detalhamento por Categoria</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Car className="h-4 w-4 mr-2 text-blue-600" />
                        <span className="text-sm">Transporte</span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">{result.transport.toFixed(1)} kg</span>
                        <div className="text-xs text-muted-foreground">
                          {((result.transport / result.total) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    <Progress value={(result.transport / result.total) * 100} className="h-2" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 mr-2 text-yellow-600" />
                        <span className="text-sm">Energia</span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">{result.energy.toFixed(1)} kg</span>
                        <div className="text-xs text-muted-foreground">
                          {((result.energy / result.total) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    <Progress value={(result.energy / result.total) * 100} className="h-2" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <UtensilsCrossed className="h-4 w-4 mr-2 text-green-600" />
                        <span className="text-sm">Alimentação</span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">{result.food.toFixed(1)} kg</span>
                        <div className="text-xs text-muted-foreground">
                          {((result.food / result.total) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    <Progress value={(result.food / result.total) * 100} className="h-2" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ShoppingBag className="h-4 w-4 mr-2 text-purple-600" />
                        <span className="text-sm">Compras</span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">{result.shopping.toFixed(1)} kg</span>
                        <div className="text-xs text-muted-foreground">
                          {((result.shopping / result.total) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    <Progress value={(result.shopping / result.total) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {result.suggestions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
                      Sugestões para Reduzir
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {result.suggestions.map((suggestion, index) => (
                        <Alert key={index} className="border-green-200 bg-green-50">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <AlertDescription className="text-green-800">{suggestion}</AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calculator className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Pronto para Calcular</h3>
                <p className="text-sm text-gray-500 text-center mb-4">
                  Preencha os dados nas abas ao lado e clique em "Calcular" para ver sua pegada de carbono
                </p>
                <Button onClick={calculateFootprint} className="bg-green-600 hover:bg-green-700">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calcular Agora
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Historical Data */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Comparação Histórica</CardTitle>
            <CardDescription>Compare com períodos anteriores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  {getComparisonIcon(result.total, result.comparison.lastMonth)}
                  <span className="ml-2 font-medium">Mês Anterior</span>
                </div>
                <div className="text-2xl font-bold">{result.comparison.lastMonth}kg</div>
                <p className="text-xs text-muted-foreground">
                  {getComparisonText(result.total, result.comparison.lastMonth)}
                </p>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  {getComparisonIcon(result.total, result.comparison.average)}
                  <span className="ml-2 font-medium">Sua Média</span>
                </div>
                <div className="text-2xl font-bold">{result.comparison.average}kg</div>
                <p className="text-xs text-muted-foreground">
                  {getComparisonText(result.total, result.comparison.average)}
                </p>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Target className="h-4 w-4 mr-2 text-green-600" />
                  <span className="ml-2 font-medium">Meta Mensal</span>
                </div>
                <div className="text-2xl font-bold text-green-600">{result.comparison.target}kg</div>
                <p className="text-xs text-green-600">
                  {result.total <= result.comparison.target ? "Meta atingida! 🎯" : "Continue tentando! 💪"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
