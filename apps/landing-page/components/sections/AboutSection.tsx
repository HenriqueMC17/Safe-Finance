"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { copywriting } from "@/config/copywriting"

export default function AboutSection() {
  const { about } = copywriting

  return (
    <section 
      id="about" 
      className="w-full py-24 md:py-32 bg-muted/20 relative overflow-hidden"
      aria-labelledby="about-heading"
      role="region"
    >
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
        >
          <Badge variant="secondary" className="rounded-full px-4 py-1 text-sm font-medium">{about.badge}</Badge>
          <h2 id="about-heading" className="text-3xl md:text-5xl font-bold tracking-tight">{about.title}</h2>
          <p className="max-w-[800px] text-muted-foreground md:text-xl font-light">
            {about.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group"
          >
            <motion.div 
              className="rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 relative"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Image
                src="https://cdn.gamma.app/33klz2ifj6dnjv0/3b418702f4104c62be18926660efa238/original/20250525_1443_Logo-Profissional-Financeiro_remix_01jw48ms9cen8bgmmaztkg6y5m.png"
                width={800}
                height={600}
                alt="Safe Finance App Interface"
                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            
            <div className="flex gap-4">
              <Button className="rounded-full h-12 px-8 text-base">
                {about.cta}
                <ChevronRight className="ml-1 size-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
