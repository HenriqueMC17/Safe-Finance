"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const benefits = [
  {
    title: "Gerenciamento Aprimorado",
    description: "Registro fluido e acompanhamento panorâmico de todas as transações em tempo real.",
  },
  {
    title: "Economia Inteligente",
    description: "Identifique e neutralize despesas desnecessárias com notificações preditivas e limites precisos.",
  },
  {
    title: "Visão 360",
    description: "Painéis e gráficos atualizados instantaneamente para uma saúde financeira cristalina.",
  },
  {
    title: "Autonomia Decisória",
    description: "Tome decisões estratégicas confiáveis baseadas em dados consolidados e evolução de longo prazo.",
  },
  {
    title: "Segurança de Dados",
    description: "Camadas de criptografia bancária para garantir a total privacidade e integridade das suas finanças.",
  },
  {
    title: "Alfabetização Financeira",
    description: "Transformamos números em sabedoria, ensinando você a investir e reinvestir com foco no futuro.",
  },
]

import { copywriting } from "@/config/copywriting"

export default function BenefitsSection() {
  const { benefits: content } = copywriting

  return (
    <section id="benefits" className="w-full py-24 md:py-32 bg-muted/40 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#2a3c3e_1px,transparent_1px),linear-gradient(to_bottom,#2a3c3e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_30%,transparent_110%)]"></div>

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
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">{content.title}</h2>
          <p className="max-w-[800px] text-muted-foreground md:text-xl font-light">
            {content.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {content.items.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-5 group"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all duration-300 transform group-hover:scale-110">
                  <Check className="size-3.5 text-primary group-hover:text-primary-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
