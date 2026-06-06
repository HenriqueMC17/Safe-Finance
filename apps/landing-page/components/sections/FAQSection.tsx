"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faq = [
  {
    question: "O Safe Finance é seguro?",
    answer: "Sim! Utilizamos criptografia end-to-end e autenticação via OAuth/JWT para garantir que seus dados financeiros permaneçam privados e seguros.",
  },
  {
    question: "Posso exportar meus dados?",
    answer: "Sim, no Safe Finance você pode exportar seus dados no formato de PDF e Excel a qualquer momento.",
  },
  {
    question: "Existe suporte técnico?",
    answer: "Nossa equipe de suporte está disponível em todos os planos, com tempo de resposta prioritário para o plano corporativo.",
  },
  {
    question: "Qual o benefício de gerenciar minhas finanças?",
    answer: "Gerenciar as finanças traz clareza sobre de onde vem e para onde vai o seu dinheiro, permitindo planejar e alcançar metas e sonhos financeiros.",
  },
]

import { copywriting } from "@/config/copywriting"

export default function FAQSection() {
  const { faq: content } = copywriting

  return (
    <section id="faq" className="w-full py-24 md:py-32 relative overflow-hidden bg-muted/20">
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

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto w-full p-8 md:p-12 glass-panel border-border/40 rounded-[2rem] shadow-2xl overflow-hidden relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
          <Accordion type="single" collapsible className="w-full relative z-10 space-y-4">
            {content.items.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border/40 pb-4 last:border-none last:pb-0">
                <AccordionTrigger className="text-left text-lg md:text-xl font-bold hover:no-underline hover:text-primary transition-all duration-300 group/trigger py-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-md md:text-lg leading-relaxed pt-2 pb-6 font-light max-w-[95%]">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
