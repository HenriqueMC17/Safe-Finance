"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PageLayout from "@/components/layout/page-layout"

const plans = {
  monthly: [
    {
      name: "Básico",
      price: "R$ 29",
      period: "/mês",
      description: "Perfeito para controle financeiro pessoal",
      features: [
        "Cadastro ilimitado de transações",
        "Resumo financeiro básico",
        "Orçamento mensal",
        "Histórico de 1 ano",
        "Exportação em CSV",
        "Suporte por email",
        "1 usuário",
        "App mobile",
      ],
      cta: "Começar Teste Gratuito",
      popular: false,
    },
    {
      name: "Profissional",
      price: "R$ 79",
      period: "/mês",
      description: "Ideal para autônomos e famílias",
      features: [
        "Todas as funcionalidades do Básico",
        "Gráficos e relatórios avançados",
        "Histórico ilimitado",
        "Exportação em múltiplos formatos",
        "Controle de investimentos",
        "Suporte prioritário",
        "Até 5 usuários",
        "Múltiplas contas bancárias",
        "Categorização automática com IA",
        "Alertas personalizados",
      ],
      cta: "Começar Teste Gratuito",
      popular: true,
    },
    {
      name: "Empresarial",
      price: "R$ 199",
      period: "/mês",
      description: "Para pequenas empresas e equipes",
      features: [
        "Todas as funcionalidades do Profissional",
        "Usuários ilimitados",
        "API para integração",
        "Relatórios personalizados",
        "Suporte 24/7",
        "Gerente de conta dedicado",
        "Treinamento da equipe",
        "SLA garantido",
        "Backup prioritário",
        "Conformidade fiscal",
        "Multi-moeda",
        "Auditoria completa",
      ],
      cta: "Falar com Vendas",
      popular: false,
    },
  ],
  annually: [
    {
      name: "Básico",
      price: "R$ 23",
      period: "/mês",
      originalPrice: "R$ 29",
      savings: "Economize 20%",
      description: "Perfeito para controle financeiro pessoal",
      features: [
        "Cadastro ilimitado de transações",
        "Resumo financeiro básico",
        "Orçamento mensal",
        "Histórico de 1 ano",
        "Exportação em CSV",
        "Suporte por email",
        "1 usuário",
        "App mobile",
      ],
      cta: "Começar Teste Gratuito",
      popular: false,
    },
    {
      name: "Profissional",
      price: "R$ 63",
      period: "/mês",
      originalPrice: "R$ 79",
      savings: "Economize 20%",
      description: "Ideal para autônomos e famílias",
      features: [
        "Todas as funcionalidades do Básico",
        "Gráficos e relatórios avançados",
        "Histórico ilimitado",
        "Exportação em múltiplos formatos",
        "Controle de investimentos",
        "Suporte prioritário",
        "Até 5 usuários",
        "Múltiplas contas bancárias",
        "Categorização automática com IA",
        "Alertas personalizados",
      ],
      cta: "Começar Teste Gratuito",
      popular: true,
    },
    {
      name: "Empresarial",
      price: "R$ 159",
      period: "/mês",
      originalPrice: "R$ 199",
      savings: "Economize 20%",
      description: "Para pequenas empresas e equipes",
      features: [
        "Todas as funcionalidades do Profissional",
        "Usuários ilimitados",
        "API para integração",
        "Relatórios personalizados",
        "Suporte 24/7",
        "Gerente de conta dedicado",
        "Treinamento da equipe",
        "SLA garantido",
        "Backup prioritário",
        "Conformidade fiscal",
        "Multi-moeda",
        "Auditoria completa",
      ],
      cta: "Falar com Vendas",
      popular: false,
    },
  ],
}

const faqs = [
  {
    question: "Posso mudar de plano a qualquer momento?",
    answer:
      "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças são aplicadas imediatamente e o valor é calculado proporcionalmente.",
  },
  {
    question: "Como funciona o período de teste?",
    answer:
      "Oferecemos 14 dias de teste gratuito em todos os planos. Não é necessário cartão de crédito para iniciar o teste. Você terá acesso completo a todas as funcionalidades do plano escolhido.",
  },
  {
    question: "Posso cancelar minha assinatura?",
    answer:
      "Sim, você pode cancelar sua assinatura a qualquer momento, sem multas ou taxas adicionais. Após o cancelamento, você terá acesso às funcionalidades até o final do período pago.",
  },
  {
    question: "Há desconto para pagamento anual?",
    answer:
      "Sim! Ao optar pelo pagamento anual, você economiza 20% em relação ao pagamento mensal. Isso equivale a 2 meses grátis por ano.",
  },
  {
    question: "Posso adicionar mais usuários depois?",
    answer:
      "Sim! No plano Profissional você pode adicionar até 5 usuários. No plano Empresarial, não há limite de usuários. Usuários adicionais podem ser adicionados a qualquer momento.",
  },
  {
    question: "Os dados ficam seguros?",
    answer:
      "Absolutamente! Utilizamos criptografia de ponta a ponta (AES-256), autenticação de dois fatores e estamos em total conformidade com a LGPD. Seus dados são armazenados em servidores seguros no Brasil.",
  },
]

export default function PlanosPage() {
  return (
    <PageLayout title="Planos">
      <div className="container px-4 md:px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/">
              <ArrowLeft className="mr-2 size-4" />
              Voltar para Home
            </Link>
          </Button>

          <Badge className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
            Planos e Preços
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Escolha o plano ideal para você</h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Planos transparentes e flexíveis para atender suas necessidades. Todos incluem 14 dias de teste gratuito.
          </p>
        </motion.div>

        {/* Pricing Tables */}
        <div className="mb-16">
          <Tabs defaultValue="monthly" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="rounded-full p-1">
                <TabsTrigger value="monthly" className="rounded-full px-8">
                  Mensal
                </TabsTrigger>
                <TabsTrigger value="annually" className="rounded-full px-8">
                  Anual
                  <Badge className="ml-2 bg-green-500 text-white">-20%</Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="monthly">
              <div className="grid gap-8 lg:grid-cols-3">
                {plans.monthly.map((plan, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Card className={`relative h-full ${plan.popular ? "ring-2 ring-primary shadow-lg" : "shadow-md"}`}>
                      {plan.popular && (
                        <div className="absolute -top-4 left-0 right-0 flex justify-center">
                          <Badge className="bg-primary text-primary-foreground px-4 py-1">Mais Popular</Badge>
                        </div>
                      )}

                      <CardHeader className="text-center pb-8 pt-8">
                        <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                        <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-5xl font-bold">{plan.price}</span>
                          <span className="text-muted-foreground">{plan.period}</span>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        <ul className="space-y-3">
                          {plan.features.map((feature, j) => (
                            <li key={j} className="flex items-start gap-3">
                              <Check className="size-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Button
                          className="w-full rounded-full"
                          size="lg"
                          variant={plan.popular ? "default" : "outline"}
                        >
                          {plan.cta}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="annually">
              <div className="grid gap-8 lg:grid-cols-3">
                {plans.annually.map((plan, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Card className={`relative h-full ${plan.popular ? "ring-2 ring-primary shadow-lg" : "shadow-md"}`}>
                      {plan.popular && (
                        <div className="absolute -top-4 left-0 right-0 flex justify-center">
                          <Badge className="bg-primary text-primary-foreground px-4 py-1">Mais Popular</Badge>
                        </div>
                      )}

                      <CardHeader className="text-center pb-8 pt-8">
                        <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                        <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex items-baseline justify-center gap-1">
                            <span className="text-5xl font-bold">{plan.price}</span>
                            <span className="text-muted-foreground">{plan.period}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground line-through">{plan.originalPrice}</span>
                            <Badge variant="secondary" className="text-green-600">
                              {plan.savings}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        <ul className="space-y-3">
                          {plan.features.map((feature, j) => (
                            <li key={j} className="flex items-start gap-3">
                              <Check className="size-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Button
                          className="w-full rounded-full"
                          size="lg"
                          variant={plan.popular ? "default" : "outline"}
                        >
                          {plan.cta}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Compare os planos</h2>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold">Funcionalidade</th>
                      <th className="text-center p-4 font-semibold">Básico</th>
                      <th className="text-center p-4 font-semibold">Profissional</th>
                      <th className="text-center p-4 font-semibold">Empresarial</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: "Transações ilimitadas", basic: true, pro: true, enterprise: true },
                      { feature: "Resumo financeiro", basic: true, pro: true, enterprise: true },
                      { feature: "Orçamento mensal", basic: true, pro: true, enterprise: true },
                      { feature: "Histórico", basic: "1 ano", pro: "Ilimitado", enterprise: "Ilimitado" },
                      { feature: "Exportação", basic: "CSV", pro: "Múltiplos", enterprise: "Múltiplos" },
                      { feature: "Gráficos avançados", basic: false, pro: true, enterprise: true },
                      { feature: "Controle de investimentos", basic: false, pro: true, enterprise: true },
                      { feature: "IA e automação", basic: false, pro: true, enterprise: true },
                      { feature: "Usuários", basic: "1", pro: "5", enterprise: "Ilimitado" },
                      { feature: "API", basic: false, pro: false, enterprise: true },
                      { feature: "Suporte", basic: "Email", pro: "Prioritário", enterprise: "24/7" },
                      { feature: "SLA", basic: false, pro: false, enterprise: true },
                    ].map((row, i) => (
                      <tr key={i} className="border-b last:border-b-0">
                        <td className="p-4">{row.feature}</td>
                        <td className="text-center p-4">
                          {typeof row.basic === "boolean" ? (
                            row.basic ? (
                              <Check className="size-5 text-green-600 mx-auto" />
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )
                          ) : (
                            row.basic
                          )}
                        </td>
                        <td className="text-center p-4">
                          {typeof row.pro === "boolean" ? (
                            row.pro ? (
                              <Check className="size-5 text-green-600 mx-auto" />
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )
                          ) : (
                            row.pro
                          )}
                        </td>
                        <td className="text-center p-4">
                          {typeof row.enterprise === "boolean" ? (
                            row.enterprise ? (
                              <Check className="size-5 text-green-600 mx-auto" />
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )
                          ) : (
                            row.enterprise
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Perguntas Frequentes</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold mb-4">Ainda tem dúvidas?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Nossa equipe está pronta para ajudar você a escolher o melhor plano para suas necessidades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="rounded-full" asChild>
              <Link href="/contato">Falar com Especialista</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full bg-transparent border-white text-white hover:bg-white/10"
              asChild
            >
              <Link href="/agendar-demo">Agendar Demonstração</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  )
}

