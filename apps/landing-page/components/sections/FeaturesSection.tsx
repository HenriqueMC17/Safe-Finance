"use client"

import { motion } from "framer-motion"
import { Wallet, DollarSign, Calendar, History, PieChart, Bell, FileText, Lock, TrendingUp, BarChart3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    title: "Cadastro de Transações",
    description: "Registre todas as suas transações (entradas e saídas) com dados como valor, data, categoria, descrição e tipo.",
    icon: <Wallet className="size-5" />,
  },
  {
    title: "Resumo Financeiro",
    description: "Visualize um resumo com total de entradas, saídas, saldo atual e categorias de gastos.",
    icon: <DollarSign className="size-5" />,
  },
  {
    title: "Orçamento Mensal",
    description: "Estabeleça um orçamento mensal com alertas de limite por categoria.",
    icon: <Calendar className="size-5" />,
  },
  {
    title: "Histórico de Transações",
    description: "Acesse o histórico completo, com filtros por data e categoria, além da opção de edição e exclusão.",
    icon: <History className="size-5" />,
  },
  {
    title: "Gráficos e Relatórios",
    description: "Visualize gráficos e relatórios sobre distribuição de gastos e fluxo de caixa.",
    icon: <PieChart className="size-5" />,
  },
  {
    title: "Alertas e Notificações",
    description: "Receba alertas personalizados sobre limites, metas e entradas esperadas.",
    icon: <Bell className="size-5" />,
  },
  {
    title: "Exportação de Dados",
    description: "Exporte seus dados em formatos como CSV ou PDF para facilitar a declaração de impostos.",
    icon: <FileText className="size-5" />,
  },
  {
    title: "Segurança das Informações",
    description: "Tenha a garantia de segurança das informações, com autenticação e criptografia.",
    icon: <Lock className="size-5" />,
  },
  {
    title: "Controle de Investimentos",
    description: "Acompanhe seus investimentos, com rentabilidade e percentual investido.",
    icon: <TrendingUp className="size-5" />,
  },
  {
    title: "Evolução Patrimonial",
    description: "Visualize um resumo da sua evolução patrimonial, com gráficos e painéis visuais de alto impacto.",
    icon: <BarChart3 className="size-5" />,
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

import { copywriting } from "@/config/copywriting"

export default function FeaturesSection() {
  const { features: content } = copywriting
  
  const icons = [
    <Wallet className="size-5" />,
    <DollarSign className="size-5" />,
    <Calendar className="size-5" />,
    <History className="size-5" />,
    <PieChart className="size-5" />,
    <Bell className="size-5" />,
    <FileText className="size-5" />,
    <Lock className="size-5" />,
    <TrendingUp className="size-5" />,
    <BarChart3 className="size-5" />,
  ]

  const features = content.items.map((item, i) => ({
    ...item,
    icon: icons[i],
  }))

  return (
    <section 
      id="features" 
      className="w-full py-24 md:py-32 relative"
      aria-labelledby="features-heading"
      role="region"
    >
      <div className="container px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
        >
          <Badge className="mb-6 rounded-none border-l-2 border-primary bg-transparent text-primary hover:bg-transparent px-3 py-1 text-xs font-mono tracking-widest uppercase">
            {content.badge}
          </Badge>
          <h2 id="features-heading" className="text-3xl md:text-5xl font-bold tracking-tighter">{content.title}</h2>
          <p className="max-w-[800px] text-muted-foreground md:text-xl font-light">
            {content.description}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          role="list"
        >
          {features.map((feature, i) => (
            <motion.div key={i} variants={item} role="listitem">
              <Card className="h-full overflow-hidden glass-panel border-border/40 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 group">
                <CardContent className="p-8 flex flex-col h-full bg-gradient-to-br from-white/5 to-transparent dark:from-white/[0.02]">
                  <div className="size-12 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
