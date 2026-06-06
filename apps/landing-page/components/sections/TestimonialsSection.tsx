"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    quote: "A Safe Finance transformou minha relação com o dinheiro. Nunca tive tanta clareza sobre meus gastos.",
    author: "Ana Silva",
    role: "Empreendedora",
  },
  {
    quote: "Os alertas de orçamento me salvaram de gastar mais do que deveria este mês. Recomendo muito!",
    author: "Carlos Oliveira",
    role: "Profissional Liberal",
  },
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-24 md:py-32 bg-muted/20 relative">
      <div className="container px-4 md:px-6 relative">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          >
            <Badge className="mb-6 rounded-none border-l-2 border-primary bg-transparent text-primary hover:bg-transparent px-3 py-1 text-xs font-mono tracking-widest uppercase">
                Depoimentos
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">O que Dizem Nossos Clientes</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl font-light">
                Junte-se a centenas de pessoas que já transformaram suas vidas financeiras.
            </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto items-stretch">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="h-full"
            >
              <Card className="h-full glass-panel border-border/40 relative overflow-hidden group hover:border-primary/20 transition-all duration-500">
                <CardContent className="p-10 flex flex-col justify-between h-full bg-gradient-to-br from-white/5 to-transparent dark:from-white/[0.02]">
                  <div className="absolute top-6 left-6 text-primary/10 transition-transform duration-700 group-hover:scale-125 group-hover:-rotate-12 translate-x-[-15%] translate-y-[-15%]">
                    <Quote className="size-24" />
                  </div>
                  <p className="text-xl md:text-2xl font-light italic mb-10 relative z-10 leading-relaxed text-foreground/90">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="size-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold shadow-sm">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold tracking-tight">{testimonial.author}</h4>
                      <p className="text-sm text-muted-foreground font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
