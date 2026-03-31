"use client"

import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import { TrendingUp, Info, ExternalLink, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

type RiskLevel = "Baixo" | "Médio" | "Alto"
type InvestmentCategory =
  | "Fundo de Investimento"
  | "Fundo Imobiliário"
  | "ETF"
  | "Ações"
  | "Fundo Multimercado"
  | "Fundo de Ações"

interface Investment {
  id: number
  name: string
  category: InvestmentCategory
  return12m: number
  returnYTD: number
  esgScore: number
  risk: RiskLevel
  minInvestment: number
  description: string
  sectors: string[]
  manager: string
  aum: string
  fee: string
  environmental: number
  social: number
  governance: number
}

const investments: Investment[] = [
  {
    id: 1,
    name: "Fundo Verde Sustentável",
    category: "Fundo de Investimento",
    return12m: 12.5,
    returnYTD: 8.2,
    esgScore: 9.2,
    risk: "Baixo",
    minInvestment: 100,
    description: "Investe em empresas com práticas ambientais exemplares",
    sectors: ["Energia Renovável", "Tecnologia Limpa", "Agricultura Sustentável"],
    manager: "Verde Asset Management",
    aum: "R$ 2.5 bilhões",
    fee: "1.2% a.a.",
    environmental: 9.5,
    social: 8.8,
    governance: 9.3,
  },
  {
    id: 2,
    name: "Energia Renovável FII",
    category: "Fundo Imobiliário",
    return12m: 15.8,
    returnYTD: 11.4,
    esgScore: 9.5,
    risk: "Médio",
    minInvestment: 500,
    description: "Investe em imóveis de energia solar e eólica",
    sectors: ["Energia Solar", "Energia Eólica", "Infraestrutura"],
    manager: "Sustenta Gestora",
    aum: "R$ 1.8 bilhões",
    fee: "0.8% a.a.",
    environmental: 9.8,
    social: 9.0,
    governance: 9.7,
  },
  {
    id: 3,
    name: "Tecnologia Limpa ETF",
    category: "ETF",
    return12m: 18.2,
    returnYTD: 13.7,
    esgScore: 8.9,
    risk: "Alto",
    minInvestment: 200,
    description: "Acompanha índice de empresas de tecnologia sustentável",
    sectors: ["Tecnologia", "Inovação", "Startups Verdes"],
    manager: "EcoTech Investimentos",
    aum: "R$ 950 milhões",
    fee: "0.5% a.a.",
    environmental: 9.2,
    social: 8.5,
    governance: 9.0,
  },
  {
    id: 4,
    name: "Água e Saneamento",
    category: "Ações",
    return12m: 14.3,
    returnYTD: 9.8,
    esgScore: 8.7,
    risk: "Médio",
    minInvestment: 300,
    description: "Empresas do setor de água e saneamento básico",
    sectors: ["Saneamento", "Tratamento de Água", "Infraestrutura"],
    manager: "Aqua Investimentos",
    aum: "R$ 1.2 bilhões",
    fee: "1.5% a.a.",
    environmental: 9.0,
    social: 8.8,
    governance: 8.3,
  },
  {
    id: 5,
    name: "Mobilidade Sustentável",
    category: "Fundo Multimercado",
    return12m: 16.7,
    returnYTD: 12.1,
    esgScore: 9.1,
    risk: "Alto",
    minInvestment: 1000,
    description: "Investe em empresas de transporte sustentável",
    sectors: ["Veículos Elétricos", "Transporte Público", "Logística Verde"],
    manager: "Mobility Capital",
    aum: "R$ 800 milhões",
    fee: "2.0% a.a.",
    environmental: 9.3,
    social: 8.7,
    governance: 9.3,
  },
  {
    id: 6,
    name: "Economia Circular",
    category: "Fundo de Ações",
    return12m: 13.9,
    returnYTD: 10.5,
    esgScore: 8.8,
    risk: "Médio",
    minInvestment: 250,
    description: "Empresas focadas em reciclagem e economia circular",
    sectors: ["Reciclagem", "Gestão de Resíduos", "Materiais Sustentáveis"],
    manager: "Circular Gestora",
    aum: "R$ 650 milhões",
    fee: "1.8% a.a.",
    environmental: 9.1,
    social: 8.3,
    governance: 9.0,
  },
]

const riskLevels: (RiskLevel | "all")[] = ["all", "Baixo", "Médio", "Alto"]
const categories: (InvestmentCategory | "all")[] = ["all", "Fundo de Investimento", "ETF", "Ações"]

export default function ESGInvestments() {
  const [selectedRisk, setSelectedRisk] = useState<RiskLevel | "all">("all")
  const [selectedCategory, setSelectedCategory] = useState<InvestmentCategory | "all">("all")

  const filteredInvestments = useMemo(() => {
    return investments.filter((inv) => {
      const riskMatch = selectedRisk === "all" || inv.risk === selectedRisk
      const categoryMatch = selectedCategory === "all" || inv.category === selectedCategory
      return riskMatch && categoryMatch
    })
  }, [selectedRisk, selectedCategory])

  const getRiskColor = useCallback((risk: RiskLevel): string => {
    switch (risk) {
      case "Baixo":
        return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400"
      case "Médio":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400"
      case "Alto":
        return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-400"
    }
  }, [])

  const getESGColor = useCallback((score: number): string => {
    if (score >= 9) return "text-green-600"
    if (score >= 8) return "text-yellow-600"
    return "text-red-600"
  }, [])

  const formatCurrency = useCallback((value: number): string => {
    return value.toLocaleString("pt-BR")
  }, [])

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="size-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <TrendingUp className="size-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Investimentos ESG</h2>
        <p className="text-muted-foreground">Invista com responsabilidade social e ambiental</p>
      </motion.div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="size-4" />
              <span className="font-medium">Filtros:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {riskLevels.map((risk) => (
                <Button
                  key={risk}
                  variant={selectedRisk === risk ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRisk(risk)}
                >
                  {risk === "all" ? "Todos os Riscos" : `${risk} Risco`}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === "all" ? "Todas Categorias" : category === "Fundo de Investimento" ? "Fundos" : category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Investimentos */}
      <div className="grid gap-6">
        {filteredInvestments.map((investment, i) => (
          <motion.div
            key={investment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="md:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{investment.name}</h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="outline">{investment.category}</Badge>
                          <Badge className={getRiskColor(investment.risk)}>{investment.risk} Risco</Badge>
                        </div>
                        <p className="text-muted-foreground text-sm">{investment.description}</p>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="ghost" aria-label="Ver detalhes">
                            <Info className="size-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{investment.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div>
                              <h4 className="font-semibold mb-2">Informações Gerais</h4>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Gestora:</span>
                                  <p className="font-medium">{investment.manager}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Patrimônio:</span>
                                  <p className="font-medium">{investment.aum}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Taxa de Administração:</span>
                                  <p className="font-medium">{investment.fee}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Investimento Mínimo:</span>
                                  <p className="font-medium">R$ {formatCurrency(investment.minInvestment)}</p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2">Setores de Atuação</h4>
                              <div className="flex flex-wrap gap-2">
                                {investment.sectors.map((sector, i) => (
                                  <Badge key={i} variant="secondary">
                                    {sector}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-4">Score ESG Detalhado</h4>
                              <div className="space-y-3">
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm">Environmental (Ambiental)</span>
                                    <span className="text-sm font-medium">{investment.environmental}</span>
                                  </div>
                                  <Progress value={investment.environmental * 10} className="h-2" />
                                </div>
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm">Social</span>
                                    <span className="text-sm font-medium">{investment.social}</span>
                                  </div>
                                  <Progress value={investment.social * 10} className="h-2" />
                                </div>
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm">Governance (Governança)</span>
                                    <span className="text-sm font-medium">{investment.governance}</span>
                                  </div>
                                  <Progress value={investment.governance * 10} className="h-2" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {investment.sectors.slice(0, 3).map((sector, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {sector}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">+{investment.return12m}%</div>
                      <div className="text-sm text-muted-foreground">Retorno 12 meses</div>
                    </div>

                    <div className="text-center">
                      <div className="text-lg font-semibold">+{investment.returnYTD}%</div>
                      <div className="text-sm text-muted-foreground">Retorno no ano</div>
                    </div>

                    <div className="text-center">
                      <div className={`text-lg font-bold ${getESGColor(investment.esgScore)}`}>
                        {investment.esgScore}
                      </div>
                      <div className="text-sm text-muted-foreground">Score ESG</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="text-lg font-bold">R$ {formatCurrency(investment.minInvestment)}</div>
                      <div className="text-sm text-muted-foreground">Investimento mínimo</div>
                    </div>

                    <Button className="w-full bg-blue-500 hover:bg-blue-600">Investir Agora</Button>

                    <Button variant="outline" className="w-full bg-transparent" size="sm">
                      <ExternalLink className="mr-2 size-4" />
                      Ver Prospecto
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredInvestments.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Nenhum investimento encontrado com os filtros selecionados.</p>
          </CardContent>
        </Card>
      )}

      {/* Resumo da Carteira ESG */}
      <Card className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4">Sua Carteira ESG</h3>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold mb-1">R$ 15.750</div>
              <div className="text-sm opacity-90">Investido em ESG</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">+14.2%</div>
              <div className="text-sm opacity-90">Retorno Médio</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">8.9</div>
              <div className="text-sm opacity-90">Score ESG Médio</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">-180kg</div>
              <div className="text-sm opacity-90">CO2 Evitado/Ano</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
