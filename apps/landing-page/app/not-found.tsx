"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Search, Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#2a3c3e_1px,transparent_1px),linear-gradient(to_bottom,#2a3c3e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-30"></div>
      
      <div className="absolute top-1/4 left-1/4 size-64 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 size-64 bg-primary/5 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-2xl w-full text-center space-y-12 relative z-10">
        <div className="relative inline-block">
          <h1 className="text-[12rem] md:text-[18rem] font-bold leading-none tracking-tighter opacity-5 select-none font-serif italic">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-32 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 backdrop-blur-sm shadow-2xl">
              <Search size={48} className="text-primary animate-bounce-slow" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Perdido no Fluxo?</h2>
          <p className="text-muted-foreground text-lg md:text-xl font-light max-w-lg mx-auto">
            A página que você procura não foi encontrada. Talvez ela tenha sido movida para outro lugar ou nunca existiu.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button 
            size="lg" 
            className="rounded-full h-16 px-12 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20 hover:scale-105 transition-all duration-500"
            asChild
          >
            <Link href="/">
              <Home className="mr-2 size-5" />
              Voltar ao Início
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="lg" 
            className="rounded-full h-16 px-8 text-lg font-medium border border-white/5 hover:bg-white/5 transition-all duration-500"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 size-5" />
            Página Anterior
          </Button>
        </div>

        <div className="pt-12">
          <p className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">
            Safe Finance — Sistema de Gerenciamento de Alta Performance
          </p>
        </div>
      </div>
    </div>
  )
}
