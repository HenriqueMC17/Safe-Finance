"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Wallet,
  DollarSign,
  Calendar,
  History,
  PieChart,
  Bell,
  FileText,
  Lock,
  TrendingUp,
  BarChart3,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import PageLayout from "@/app/components/page-layout"

const features = [
  {
    title: "Cadastro de Transações",
    description:
      "Registre todas as suas transações financeiras de forma simples e rápida. Categorize entradas e saídas, adicione descrições detalhadas e mantenha seu histórico sempre atualizado.",
    icon: <Wallet className="size-6" />,
    benefits: [
      "Interface intuitiva para registro rápido",
      "Categorização automática inteligente",
      "Anexo de comprovantes e notas fiscais",
      "Sincronização em tempo real",
    ],
  },
  {
    title: "Resumo Financeiro",
    description:
      "Visualize um panorama completo da sua saúde financeira com dashboards interativos e métricas essenciais para tomada de decisão.",
    icon: <DollarSign className="size-6" />,
    benefits: [
      "Dashboard personalizável",
      "Métricas em tempo real",
      "Comparativos mensais automáticos",
      "Alertas de anomalias financeiras",
    ],
  },
  {
    title: "Orçamento Mensal",
    description:
      "Defina metas financeiras realistas e acompanhe seu progresso com alertas inteligentes que ajudam você a manter o controle dos gastos.",
    icon: <Calendar className="size-6" />,
    benefits: [
      "Criação de orçamentos por categoria",
      "Alertas de limite por email e push",
      "Sugestões baseadas em IA",
      "Análise de tendências de gastos",
    ],
  },
  {
    title: "Histórico de Transações",
    description:
      "Acesse todo o seu histórico financeiro com filtros avançados, pesquisa inteligente e opções completas de edição e exclusão.",
    icon: <History className="size-6" />,
    benefits: [
      "Busca avançada por múltiplos critérios",
      "Filtros por data, categoria e valor",
      "Exportação de períodos específicos",
      "Auditoria completa de alterações",
    ],
  },
  {
    title: "Gráficos e Relatórios",
    description:
      "Visualize seus dados financeiros através de gráficos interativos e relatórios detalhados que facilitam a análise e planejamento.",
    icon: <PieChart className="size-6" />,
    benefits: [
      "Múltiplos tipos de visualização",
      "Análise comparativa de períodos",
      "Projeções futuras baseadas em histórico",
      "Relatórios personalizáveis",
    ],
  },
  {
    title: "Alertas e Notificações",
    description:
      "Mantenha-se informado sobre sua situação financeira com alertas personalizados e notificações inteligentes.",
    icon: <Bell className="size-6" />,
    benefits: [
      "Notificações em múltiplos canais",
      "Alertas de vencimento de contas",
      "Avisos de gastos incomuns",
      "Lembretes de metas financeiras",
    ],
  },
  {
    title: "Exportação de Dados",
    description:
      "Exporte seus dados em diversos formatos para facilitar a declaração de impostos, compartilhamento com contador ou backup pessoal.",
    icon: <FileText className="size-6" />,
    benefits: [
      "Múltiplos formatos (CSV, PDF, Excel)",
      "Relatórios prontos para IR",
      "Agendamento de exportações",
      "Criptografia de arquivos sensíveis",
    ],
  },
  {
    title: "Segurança das Informações",
    description:
      "Seus dados estão protegidos com as mais avançadas tecnologias de segurança, incluindo criptografia de ponta a ponta.",
    icon: <Lock className="size-6" />,
    benefits: [
      "Criptografia AES-256",
      "Autenticação de dois fatores (2FA)",
      "Conformidade com LGPD",
      "Backups automáticos diários",
    ],
  },
  {
    title: "Controle de Investimentos",
    description:
      "Acompanhe seus investimentos com ferramentas profissionais de análise de rentabilidade e diversificação de portfólio.",
    icon: <TrendingUp className="size-6" />,
    benefits: [
      "Integração com principais corretoras",
      "Cálculo automático de rentabilidade",
      "Análise de risco da carteira",
      "Rebalanceamento sugerido",
    ],
  },
  {
    title: "Resumo das Finanças",
    description:
      "Visualize sua evolução patrimonial através de dashboards visuais que mostram sua trajetória financeira de forma clara.",
    icon: <BarChart3 className="size-6" />,
    benefits: [
      "Gráfico de evolução patrimonial",
      "Análise de crescimento por período",
      "Comparativo com metas estabelecidas",
      "Projeções de longo prazo",
    ],
  },
]

export default function FuncionalidadesPage() {
  return (
    <PageLayout title="Funcionalidades">
      <div className="container px-4 md:px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/">
              <ArrowLeft className="mr-2 size-4" />
              Voltar para Home
            </Link>
          </Button>

          <Badge className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
            Funcionalidades
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Tudo que você precisa para gerenciar suas finanças
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl">
            Nossa plataforma oferece um conjunto completo de ferramentas para organizar, analisar e otimizar sua vida
            financeira. Conheça cada funcionalidade em detalhes.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 mb-16">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="size-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{feature.description}</p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Principais benefícios:</h4>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm">
                          <div className="size-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Experimente todas essas funcionalidades gratuitamente por 14 dias. Sem compromisso, sem cartão de crédito.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="rounded-full" asChild>
              <Link href="/cliente">Começar Teste Gratuito</Link>
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
