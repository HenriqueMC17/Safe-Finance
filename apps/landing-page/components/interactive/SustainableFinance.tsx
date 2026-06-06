"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Leaf,
  Calculator,
  TrendingUp,
  Award,
  Target,
  BookOpen,
  Recycle,
  Gift,
  Users,
  Brain,
  MessageSquare,
  ChevronRight,
  Zap,
  Globe,
  Heart,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SustainableFinance() {
  const [activeFeature, setActiveFeature] = useState(0)

  const sustainableFeatures = [
    {
      id: 1,
      title: "Calculadora de Pegada de Carbono Financeira",
      description: "Calcule o impacto ambiental dos seus gastos e descubra alternativas mais sustentáveis",
      icon: <Calculator className="size-5" />,
      color: "bg-green-500",
      impact: "Redução média de 25% na pegada de carbono",
      details: [
        "Análise automática de transações por impacto ambiental",
        "Categorização por nível de sustentabilidade",
        "Equivalência em CO2 de diferentes compras",
        "Sugestões de alternativas eco-friendly",
      ],
    },
    {
      id: 2,
      title: "Orçamento Verde",
      description: "Defina metas sustentáveis e acompanhe seu progresso ambiental",
      icon: <Target className="size-5" />,
      color: "bg-emerald-500",
      impact: "Economia de R$ 300/mês em média",
      details: [
        "Categoria específica para gastos sustentáveis",
        "Metas de redução de pegada de carbono",
        "Incentivos para objetivos ambientais",
        "Relatórios de progresso mensal",
      ],
    },
    {
      id: 3,
      title: "Investimentos ESG",
      description: "Invista com responsabilidade social e ambiental",
      icon: <TrendingUp className="size-5" />,
      color: "bg-teal-500",
      impact: "Rentabilidade 15% superior em 5 anos",
      details: [
        "Análise de impacto ambiental dos investimentos",
        "Comparação rentabilidade vs. sustentabilidade",
        "Alertas sobre práticas não sustentáveis",
        "Portfolio de fundos ESG certificados",
      ],
    },
    {
      id: 4,
      title: "Sistema de Pontos Verdes",
      description: "Ganhe pontos por escolhas sustentáveis e desbloqueie recompensas",
      icon: <Award className="size-5" />,
      color: "bg-lime-500",
      impact: "Engajamento 80% maior",
      details: [
        "Pontuação baseada em escolhas sustentáveis",
        "Badges por conquistas ambientais",
        "Ranking entre usuários",
        "Recompensas por metas verdes",
      ],
    },
  ]

  const challenges = [
    {
      title: "Mês sem Carro",
      description: "Use transporte público ou bicicleta",
      participants: 1247,
      savings: "R$ 450",
      co2Saved: "120kg CO2",
      progress: 65,
    },
    {
      title: "Compras Locais",
      description: "Apoie o comércio local da sua região",
      participants: 892,
      savings: "R$ 280",
      co2Saved: "85kg CO2",
      progress: 78,
    },
    {
      title: "Zero Desperdício",
      description: "Elimine gastos desnecessários",
      participants: 2156,
      savings: "R$ 380",
      co2Saved: "95kg CO2",
      progress: 82,
    },
  ]

  const esgInvestments = [
    {
      name: "Fundo Verde Sustentável",
      return: "+12.5%",
      esgScore: 9.2,
      risk: "Baixo",
      minInvestment: "R$ 100",
    },
    {
      name: "Energia Renovável FII",
      return: "+15.8%",
      esgScore: 9.5,
      risk: "Médio",
      minInvestment: "R$ 500",
    },
    {
      name: "Tecnologia Limpa ETF",
      return: "+18.2%",
      esgScore: 8.9,
      risk: "Alto",
      minInvestment: "R$ 200",
    },
  ]

  const partnerCompanies = [
    {
      name: "EcoMarket",
      category: "Supermercado",
      cashback: "5%",
      impact: "Produtos orgânicos",
    },
    {
      name: "GreenTech",
      category: "Tecnologia",
      cashback: "8%",
      impact: "Eletrônicos sustentáveis",
    },
    {
      name: "BikeShare",
      category: "Transporte",
      cashback: "10%",
      impact: "Mobilidade urbana",
    },
    {
      name: "SolarPower",
      category: "Energia",
      cashback: "12%",
      impact: "Energia renovável",
    },
  ]

  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
        >
          <Badge className="rounded-full px-4 py-1.5 text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <Leaf className="size-4 mr-2" />
            Finanças Sustentáveis
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Transforme suas Finanças e o Meio Ambiente</h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Descubra como suas decisões financeiras podem impactar positivamente o planeta. Gerencie seu dinheiro de
            forma consciente e sustentável.
          </p>
        </motion.div>

        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="features">Funcionalidades</TabsTrigger>
            <TabsTrigger value="challenges">Desafios</TabsTrigger>
            <TabsTrigger value="investments">Investimentos ESG</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="impact">Impacto</TabsTrigger>
            <TabsTrigger value="community">Comunidade</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {sustainableFeatures.map((feature, i) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onClick={() => setActiveFeature(i)}
                  className="cursor-pointer"
                >
                  <Card
                    className={`h-full transition-all hover:shadow-lg ${activeFeature === i ? "ring-2 ring-green-500" : ""}`}
                  >
                    <CardHeader>
                      <div
                        className={`size-10 rounded-full ${feature.color} flex items-center justify-center text-white mb-2`}
                      >
                        {feature.icon}
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{feature.description}</p>
                      <Badge variant="secondary" className="text-xs">
                        {feature.impact}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Detalhes da funcionalidade ativa */}
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">{sustainableFeatures[activeFeature].title}</h3>
                      <ul className="space-y-2">
                        {sustainableFeatures[activeFeature].details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Zap className="size-4 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                      <Button variant="secondary" className="mt-6">
                        Experimentar Agora
                        <ChevronRight className="size-4 ml-2" />
                      </Button>
                    </div>
                    <div className="relative flex flex-col items-center justify-center text-center mt-6 md:mt-0">
                      <div className="relative size-40 mx-auto mb-8 flex items-center justify-center group">
                        {/* Glow and orb effects */}
                        <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-all duration-700 ease-cinematic"></div>
                        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 to-white/5 backdrop-blur-md border border-white/20 shadow-[inset_0_0_20px_rgba(255,255,255,0.2)]"></div>
                        
                        {/* Animated rings */}
                        <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite] opacity-50" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="text-white/70" />
                        </svg>
                        <svg className="absolute inset-0 w-full h-full animate-[spin_15s_linear_infinite_reverse] opacity-30" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 10" className="text-white/50" />
                        </svg>

                        <div className="relative z-10 size-16 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-500 ease-cinematic">
                          {sustainableFeatures[activeFeature].icon}
                        </div>
                      </div>
                      
                      <div className="inline-flex flex-col items-center space-y-3 relative z-10">
                        <Badge variant="outline" className="px-3 py-1 bg-white/10 border-white/20 text-white font-mono uppercase tracking-widest text-[10px]">
                          Impacto Mensurável
                        </Badge>
                        <p className="text-2xl md:text-3xl font-light tracking-tight text-white drop-shadow-md px-4">
                          {sustainableFeatures[activeFeature].impact}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Desafios Mensais de Sustentabilidade</h3>
              <p className="text-muted-foreground">
                Participe de desafios e compete com outros usuários por um futuro mais sustentável
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {challenges.map((challenge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="size-5 text-green-500" />
                        {challenge.title}
                      </CardTitle>
                      <p className="text-muted-foreground">{challenge.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} className="h-2" />

                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                          <p className="text-sm text-muted-foreground">Economia</p>
                          <p className="font-semibold text-green-600">{challenge.savings}</p>
                        </div>
                        <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                          <p className="text-sm text-muted-foreground">CO2 Evitado</p>
                          <p className="font-semibold text-blue-600">{challenge.co2Saved}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="size-4" />
                          {challenge.participants} participantes
                        </div>
                        <Button size="sm" className="bg-green-500 hover:bg-green-600">
                          Participar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="investments" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Investimentos ESG Recomendados</h3>
              <p className="text-muted-foreground">
                Invista com responsabilidade e obtenha retornos financeiros e ambientais
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {esgInvestments.map((investment, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{investment.name}</CardTitle>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          ESG {investment.esgScore}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                          <p className="text-sm text-muted-foreground">Retorno</p>
                          <p className="font-bold text-green-600">{investment.return}</p>
                        </div>
                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                          <p className="text-sm text-muted-foreground">Risco</p>
                          <p className="font-semibold">{investment.risk}</p>
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">Investimento Mínimo</p>
                        <p className="text-lg font-bold">{investment.minInvestment}</p>
                      </div>

                      <Button className="w-full bg-green-500 hover:bg-green-600">Investir Agora</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
              <CardContent className="p-6 text-center">
                <h4 className="text-xl font-bold mb-2">Consultoria ESG Gratuita</h4>
                <p className="mb-4">Receba orientação personalizada sobre investimentos sustentáveis</p>
                <Button variant="secondary">Agendar Consultoria</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Marketplace Verde</h3>
              <p className="text-muted-foreground">
                Compre de empresas parceiras sustentáveis e ganhe cashback especial
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {partnerCompanies.map((company, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="size-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-2">
                        <Leaf className="size-6 text-green-600" />
                      </div>
                      <CardTitle className="text-lg">{company.name}</CardTitle>
                      <Badge variant="secondary">{company.category}</Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Cashback</span>
                          <span className="font-bold text-green-600">{company.cashback}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{company.impact}</p>
                        <Button size="sm" className="w-full">
                          Visitar Loja
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Recycle className="size-5 text-green-500" />
                    Produtos Usados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Encontre produtos de segunda mão e contribua para a economia circular
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Economia média</span>
                      <span className="font-semibold">60%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CO2 evitado</span>
                      <span className="font-semibold">2.5kg por compra</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-transparent" variant="outline">
                    Explorar Produtos
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="size-5 text-blue-500" />
                    Programa de Fidelidade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Acumule pontos verdes e troque por recompensas sustentáveis
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Seus pontos</span>
                      <span className="font-semibold">2,450 pts</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Próxima recompensa</span>
                      <span className="font-semibold">550 pts</span>
                    </div>
                  </div>
                  <Progress value={81} className="mt-2 mb-4" />
                  <Button className="w-full bg-transparent" variant="outline">
                    Ver Recompensas
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Seu Impacto Ambiental</h3>
              <p className="text-muted-foreground">
                Acompanhe como suas decisões financeiras estão impactando o planeta
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="size-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="size-8 text-green-600" />
                  </div>
                  <h4 className="font-bold text-2xl text-green-600">-45%</h4>
                  <p className="text-sm text-muted-foreground">Redução de CO2</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="size-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="size-8 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-2xl text-blue-600">R$ 1.250</h4>
                  <p className="text-sm text-muted-foreground">Economia Verde</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="size-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="size-8 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-2xl text-purple-600">8.7</h4>
                  <p className="text-sm text-muted-foreground">Score ESG</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="size-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="size-8 text-orange-600" />
                  </div>
                  <h4 className="font-bold text-2xl text-orange-600">12</h4>
                  <p className="text-sm text-muted-foreground">Badges Verdes</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Evolução Mensal do Impacto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Pegada de Carbono</span>
                      <span className="text-green-600">-12% este mês</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Gastos Sustentáveis</span>
                      <span className="text-blue-600">+25% este mês</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Investimentos ESG</span>
                      <span className="text-purple-600">+18% este mês</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
              <CardContent className="p-6 text-center">
                <h4 className="text-xl font-bold mb-2">Certificação de Sustentabilidade</h4>
                <p className="mb-4">Você está no top 10% dos usuários mais sustentáveis!</p>
                <Button variant="secondary">Baixar Certificado</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Comunidade Sustentável</h3>
              <p className="text-muted-foreground">
                Conecte-se com outros usuários e compartilhe experiências sobre finanças verdes
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="size-5 text-blue-500" />
                    Fórum de Discussões
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="font-semibold text-sm">Como reduzir gastos com energia?</p>
                      <p className="text-xs text-muted-foreground">Por Maria Silva • 23 respostas</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="font-semibold text-sm">Melhores fundos ESG para iniciantes</p>
                      <p className="text-xs text-muted-foreground">Por João Santos • 15 respostas</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="font-semibold text-sm">Dicas de compras sustentáveis</p>
                      <p className="text-xs text-muted-foreground">Por Ana Costa • 8 respostas</p>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-transparent" variant="outline">
                    Ver Todas as Discussões
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="size-5 text-green-500" />
                    Grupos Locais
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="font-semibold text-sm">Sustentabilidade São Paulo</p>
                      <p className="text-xs text-muted-foreground">1,247 membros • Próximo evento: 15/02</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="font-semibold text-sm">Investidores ESG Rio</p>
                      <p className="text-xs text-muted-foreground">892 membros • Próximo evento: 20/02</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="font-semibold text-sm">Economia Circular BH</p>
                      <p className="text-xs text-muted-foreground">634 membros • Próximo evento: 25/02</p>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-transparent" variant="outline">
                    Encontrar Grupos
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="size-5 text-purple-500" />
                  Centro de Educação Ambiental
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/30 rounded-lg text-center">
                    <Calculator className="size-8 text-green-500 mx-auto mb-2" />
                    <h4 className="font-semibold">Calculadoras</h4>
                    <p className="text-xs text-muted-foreground">Ferramentas de impacto</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg text-center">
                    <BookOpen className="size-8 text-blue-500 mx-auto mb-2" />
                    <h4 className="font-semibold">Artigos</h4>
                    <p className="text-xs text-muted-foreground">Conteúdo educativo</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg text-center">
                    <Brain className="size-8 text-purple-500 mx-auto mb-2" />
                    <h4 className="font-semibold">Webinars</h4>
                    <p className="text-xs text-muted-foreground">Eventos ao vivo</p>
                  </div>
                </div>
                <Button className="w-full mt-4">Acessar Centro de Educação</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-16"
        >
          <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Pronto para Revolucionar suas Finanças Sustentáveis?</h3>
              <p className="text-lg mb-6 opacity-90">
                Junte-se a mais de 50.000 usuários que já estão fazendo a diferença para o planeta
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="rounded-full">
                  Começar Jornada Verde
                  <Leaf className="ml-2 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white text-white hover:bg-white/10 bg-transparent"
                >
                  Calcular Meu Impacto
                  <Calculator className="ml-2 size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
