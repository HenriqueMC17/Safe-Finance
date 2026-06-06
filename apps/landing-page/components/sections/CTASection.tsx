"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { copywriting } from "@/config/copywriting"

export default function CTASection() {
  const { cta: content } = copywriting

  return (
    <section className="w-full py-24 md:py-32 relative overflow-hidden bg-background">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(circle_at_center,rgba(80,200,168,0.1),transparent_70%)]"></div>
      
      <div className="container px-4 md:px-6 relative text-center flex flex-col items-center">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "linear" }}
            className="max-w-4xl relative p-12 md:p-24 glass-panel border-primary/20 rounded-[3rem] overflow-hidden group shadow-2xl shadow-primary/5"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            <div className="relative z-10 flex flex-col items-center">
                <Badge className="mb-8 rounded-none border-l-2 border-primary bg-primary/5 text-primary hover:bg-primary/10 px-4 py-1.5 text-xs font-mono tracking-widest uppercase">
                    {content.badge}
                </Badge>
                <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1]">
                    {content.title} <span className="text-primary italic font-serif font-light">{content.titleItalic}</span>
                </h2>
                <p className="text-lg md:text-2xl text-muted-foreground mb-12 max-w-2xl font-light text-center">
                    {content.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 mb-12">
                  <Button size="lg" className="rounded-full h-16 px-12 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground group/btn shadow-xl shadow-primary/20 hover:scale-105 transition-all duration-500" asChild>
                    <Link href="/cliente">
                      {content.buttons.primary}
                      <ArrowRight className="ml-2 size-5 transition-transform duration-500 group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full h-16 px-12 text-lg font-bold bg-transparent border-white/20 hover:bg-white/5 transition-all duration-500" asChild>
                    <Link href="/agendar-demo">{content.buttons.secondary}</Link>
                  </Button>
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-muted-foreground">
                    {content.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2">
                          <div className="size-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                              <Check className="size-3" />
                          </div>
                          <span>{benefit}</span>
                      </div>
                    ))}
                </div>
            </div>
            
            <div className="absolute -top-12 -right-12 size-64 bg-primary/20 blur-3xl rounded-full opacity-50 group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="absolute -bottom-12 -left-12 size-64 bg-secondary/10 blur-3xl rounded-full opacity-30 group-hover:scale-110 transition-transform duration-1000"></div>
          </motion.div>
      </div>
    </section>
  )
}
