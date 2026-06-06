"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const pricing = [
  {
    title: "Plano Individual",
    price: "R$ 19,90",
    description: "Ideal para gerenciar suas finanças pessoais de forma eficiente.",
    features: [
      "Transações Ilimitadas",
      "Categorias Personalizadas",
      "Relatórios Mensais",
      "Exportação para CSV",
    ],
  },
  {
    title: "Plano Família",
    price: "R$ 49,90",
    description: "Perfeito para famílias que buscam controle colaborativo de gastos.",
    features: [
      "Até 5 Usuários",
      "Compartilhamento de Contas",
      "Visão Geral da Família",
      "Exportação para PDF/Excel",
    ],
    highlight: true,
  },
  {
    title: "Plano Corporativo",
    price: "Sob Consulta",
    description: "Soluções sob medida para pequenas e médias empresas.",
    features: [
        "Múltiplas Empresas",
        "Acesso para Contadores",
        "Fluxo de Caixa Avançado",
        "Suporte Prioritário 24/7",
    ],
  },
]

import { copywriting } from "@/config/copywriting"

export default function PricingSection() {
  const { pricing: content } = copywriting

  return (
    <section id="pricing" className="w-full py-24 md:py-32 relative overflow-hidden bg-background">
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
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{content.title}</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl font-light">
                {content.description}
            </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {content.plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="h-full flex flex-col"
            >
              <Card className={`h-full flex flex-col overflow-hidden glass-panel border-border/40 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative group ${plan.highlight ? "border-primary/40 ring-1 ring-primary/20 shadow-primary/5" : ""}`}>
                {plan.highlight && (
                  <div className="absolute top-0 right-0 bg-primary/20 backdrop-blur-md px-4 py-1.5 rounded-bl-2xl text-xs font-bold tracking-widest text-primary uppercase border-l border-b border-primary/20 z-10 transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                    Popular
                  </div>
                )}
                
                <CardHeader className="p-8 pb-4 relative z-10">
                  <CardTitle className="text-xl md:text-2xl font-bold tracking-tight mb-2 flex items-center justify-between">
                    {plan.title}
                  </CardTitle>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground transition-colors duration-500 group-hover:text-primary">
                      {plan.price}
                    </span>
                    {plan.price !== "Sob Consulta" && <span className="text-muted-foreground font-medium">/mês</span>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4 leading-relaxed font-light">
                    {plan.description}
                  </p>
                </CardHeader>
                
                <CardContent className="p-8 pt-6 flex-grow relative z-10">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-border/50 to-transparent mb-8"></div>
                  <ul className="space-y-4">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3 group/item">
                        <div className="size-5 rounded-full bg-primary/5 dark:bg-primary/10 flex items-center justify-center transition-colors duration-300 group-hover/item:bg-primary">
                          <Check className="size-3 text-primary transition-colors duration-300 group-hover/item:text-primary-foreground shrink-0" />
                        </div>
                        <span className="text-sm text-foreground/80 group-hover/item:text-foreground transition-colors">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="p-8 pt-4 relative z-10">
                  <Button 
                    className={`w-full rounded-full h-12 text-sm font-bold transition-all duration-300 ${plan.highlight ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 scale-105" : "bg-muted/50 hover:bg-muted text-foreground"}`}
                  >
                    Escolher Plano
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
