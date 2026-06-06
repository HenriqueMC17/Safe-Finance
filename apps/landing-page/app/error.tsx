"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AlertCircle, RotateCcw, Home } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#2a3c3e_1px,transparent_1px),linear-gradient(to_bottom,#2a3c3e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-30"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center space-y-8 glass-panel p-12 rounded-[2rem] border-red-500/20 shadow-2xl shadow-red-500/5 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-red-500/5 via-transparent to-transparent opacity-50"></div>
        
        <div className="relative z-10">
          <div className="size-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500 animate-pulse">
            <AlertCircle size={40} />
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight mb-2">Ops! Algo deu errado</h1>
          <p className="text-muted-foreground mb-8 font-light">
            Ocorreu um erro inesperado. Nossa equipe técnica já foi notificada e estamos trabalhando para resolver.
          </p>
          
          <div className="flex flex-col gap-4">
            <Button 
              size="lg" 
              className="rounded-full bg-primary hover:bg-primary/90 h-14"
              onClick={() => reset()}
            >
              <RotateCcw className="mr-2 size-4" />
              Tentar Novamente
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full h-14 border-white/10 hover:bg-white/5"
              asChild
            >
              <Link href="/">
                <Home className="mr-2 size-4" />
                Voltar ao Início
              </Link>
            </Button>
          </div>
          
          {error.digest && (
            <p className="mt-8 text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">
              ID do Erro: {error.digest}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  )
}
