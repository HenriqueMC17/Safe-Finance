"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { PiggyBank, TrendingUp, Shield, Users, Home, Baby, Calculator, FileText, BarChart3 } from "lucide-react"

interface PersonalizedContentProps {
  userType: string
}

export default function PersonalizedContent({ userType }: PersonalizedContentProps) {
  const getContent = () => {
    switch (userType) {
      case "individual":
        return {
          title: "Finanças Pessoais Simplificadas",
          description: "Controle total sobre seu dinheiro com ferramentas pensadas para você",
          features: [
            {
              icon: <PiggyBank className="size-5" />,
              title: "Controle de Gastos Pessoais",
              description: "Acompanhe onde cada real é gasto e identifique oportunidades de economia",
            },
            {
              icon: <TrendingUp className="size-5" />,
              title: "Metas Financeiras",
              description: "Defina e acompanhe suas metas: viagem, casa própria, reserva de emergência",
            },
            {
              icon: <Shield className="size-5" />,
              title: "Reserva de Emergência",
              description: "Calcule e construa sua reserva ideal para imprevistos",
            },
          ],
          cta: "Comece sua jornada financeira",
          testimonial: {
            text: "Consegui economizar R$ 2.000 em 3 meses só organizando meus gastos!",
            author: "Maria Silva, 28 anos",
          },
        }

      case "family":
        return {
          title: "Orçamento Familiar Inteligente",
          description: "Gerencie as finanças de toda a família com transparência e eficiência",
          features: [
            {
              icon: <Users className="size-5" />,
              title: "Orçamento Compartilhado",
              description: "Todos da família podem acompanhar e contribuir com o orçamento",
            },
            {
              icon: <Home className="size-5" />,
              title: "Gastos da Casa",
              description: "Controle despesas fixas: aluguel, contas, mercado e educação",
            },
            {
              icon: <Baby className="size-5" />,
              title: "Planejamento Familiar",
              description: "Planeje gastos com filhos, educação e momentos especiais",
            },
          ],
          cta: "Organize a família financeiramente",
          testimonial: {
            text: "Nossa família conseguiu economizar 30% nas despesas mensais!",
            author: "João e Ana Santos, casal com 2 filhos",
          },
        }

      case "business":
        return {
          title: "Gestão Financeira Empresarial",
          description: "Ferramentas profissionais para MEIs e pequenas empresas crescerem",
          features: [
            {
              icon: <Calculator className="size-5" />,
              title: "Fluxo de Caixa",
              description: "Controle entradas e saídas para manter o negócio sempre no azul",
            },
            {
              icon: <FileText className="size-5" />,
              title: "Relatórios Fiscais",
              description: "Relatórios prontos para contador e declaração de impostos",
            },
            {
              icon: <BarChart3 className="size-5" />,
              title: "Análise de Rentabilidade",
              description: "Descubra quais produtos/serviços geram mais lucro",
            },
          ],
          cta: "Profissionalize seu negócio",
          testimonial: {
            text: "Aumentei meu faturamento em 40% com melhor controle financeiro!",
            author: "Carlos Oliveira, MEI - Consultoria",
          },
        }

      default:
        return {
          title: "Finanças Pessoais Simplificadas",
          description: "Controle total sobre seu dinheiro com ferramentas pensadas para você",
          features: [
            {
              icon: <PiggyBank className="size-5" />,
              title: "Controle de Gastos Pessoais",
              description: "Acompanhe onde cada real é gasto e identifique oportunidades de economia",
            },
            {
              icon: <TrendingUp className="size-5" />,
              title: "Metas Financeiras",
              description: "Defina e acompanhe suas metas: viagem, casa própria, reserva de emergência",
            },
            {
              icon: <Shield className="size-5" />,
              title: "Reserva de Emergência",
              description: "Calcule e construa sua reserva ideal para imprevistos",
            },
          ],
          cta: "Comece sua jornada financeira",
          testimonial: {
            text: "Consegui economizar R$ 2.000 em 3 meses só organizando meus gastos!",
            author: "Maria Silva, 28 anos",
          },
        }
    }
  }

  const content = getContent()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
          Personalizado para você
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{content.title}</h2>
        <p className="max-w-[600px] text-muted-foreground md:text-lg mx-auto">{content.description}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {content.features.map((feature: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card className="h-full border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="size-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="text-center space-y-6">
        <Card className="max-w-2xl mx-auto border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <blockquote className="text-lg italic mb-4">"{content.testimonial.text}"</blockquote>
            <cite className="text-sm text-muted-foreground">— {content.testimonial.author}</cite>
          </CardContent>
        </Card>

        <Button size="lg" className="rounded-full">
          {content.cta}
        </Button>
      </div>
    </motion.div>
  )
}
