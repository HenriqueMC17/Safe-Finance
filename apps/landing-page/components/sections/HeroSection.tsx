"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { copywriting } from "@/config/copywriting"

export default function HeroSection() {
  const { hero } = copywriting

  return (
    <section 
      className="w-full pt-40 pb-20 md:pt-48 md:pb-32 lg:pb-40 overflow-hidden relative min-h-[100dvh] flex flex-col justify-center"
      aria-labelledby="hero-heading"
      role="region"
    >
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#2a3c3e_1px,transparent_1px),linear-gradient(to_bottom,#2a3c3e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(80,200,168,0.15),transparent_50%)]"></div>

      <div className="container px-4 md:px-6 relative flex flex-col items-start justify-end flex-1 pl-4 md:pl-12 lg:pl-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-3xl mb-12 text-left"
        >
          <Badge className="mb-6 rounded-none border-l-2 border-primary bg-transparent text-primary hover:bg-transparent px-3 py-1 text-xs font-mono tracking-widest uppercase">
            {hero.badge}
          </Badge>
          <h1 id="hero-heading" className="text-fluid-h1 font-bold tracking-tighter mb-8 leading-[1.1]">
            <span className="block text-foreground">{hero.title.line1}</span>
            <span className="block font-serif italic text-muted-foreground font-light text-[1.1em] mt-2">{hero.title.line2}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl font-light">
            {hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <Button size="lg" className="rounded-full h-14 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground ease-cinematic transition-all hover:scale-105">
              {hero.buttons.primary}
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base bg-transparent border-white/20 hover:bg-white/5 ease-cinematic transition-all" asChild>
              <Link href="/agendar-demo">{hero.buttons.secondary}</Link>
            </Button>
          </div>
          <div className="flex items-center justify-start gap-4 mt-8 text-sm text-muted-foreground">
            {hero.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-1">
                <Check className="size-4 text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
          className="relative mx-auto mt-12 w-full max-w-5xl"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/40 bg-gradient-to-b from-background/50 to-muted/20 backdrop-blur-sm p-1">
            <motion.div 
              className="rounded-[calc(1rem-1px)] overflow-hidden"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
                <Image
                  src="https://cdn.gamma.app/33klz2ifj6dnjv0/c63b955f50464134b5c3d1098edc7e13/original/Foto-da-Equipe.jpg"
                  width={1200}
                  height={675}
                  alt="Safe Finance dashboard"
                  className="w-full h-auto object-cover"
                  priority
                />
            </motion.div>
          </div>
          <div className="absolute -bottom-12 -right-12 -z-10 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl opacity-50"></div>
          <div className="absolute -top-12 -left-12 -z-10 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-3xl opacity-50"></div>
        </motion.div>
      </div>
    </section>
  )
}
