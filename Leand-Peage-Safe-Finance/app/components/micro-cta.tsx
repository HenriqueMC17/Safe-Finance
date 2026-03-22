"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowRight, Play, BarChart3, Zap } from "lucide-react"
import Link from "next/link"

interface MicroCTAProps {
  type: "test" | "demo" | "compare" | "practice"
}

export default function MicroCTA({ type }: MicroCTAProps) {
  const getContent = () => {
    switch (type) {
      case "test":
        return {
          icon: <Zap className="size-5" />,
          title: "Pronto para testar?",
          description: "Experimente gratuitamente por 14 dias",
          cta: "Começar teste gratuito",
          href: "/cliente",
          gradient: "from-blue-500 to-cyan-500",
        }
      case "demo":
        return {
          icon: <Play className="size-5" />,
          title: "Veja na prática",
          description: "Agende uma demonstração personalizada",
          cta: "Agendar demo",
          href: "/agendar-demo",
          gradient: "from-green-500 to-emerald-500",
        }
      case "compare":
        return {
          icon: <BarChart3 className="size-5" />,
          title: "Compare os planos",
          description: "Encontre o plano ideal para você",
          cta: "Ver planos",
          href: "#pricing",
          gradient: "from-purple-500 to-pink-500",
        }
      case "practice":
        return {
          icon: <ArrowRight className="size-5" />,
          title: "Coloque em prática",
          description: "Comece a organizar suas finanças hoje",
          cta: "Começar agora",
          href: "/cliente",
          gradient: "from-orange-500 to-red-500",
        }
      default:
        return {
          icon: <Zap className="size-5" />,
          title: "Pronto para testar?",
          description: "Experimente gratuitamente por 14 dias",
          cta: "Começar teste gratuito",
          href: "/cliente",
          gradient: "from-blue-500 to-cyan-500",
        }
    }
  }

  const content = getContent()

  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-2xl mx-auto border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur overflow-hidden">
            <CardContent className="p-8 text-center">
              <div
                className={`size-12 rounded-full bg-gradient-to-r ${content.gradient} flex items-center justify-center text-white mb-4 mx-auto`}
              >
                {content.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{content.title}</h3>
              <p className="text-muted-foreground mb-6">{content.description}</p>
              <Button asChild className="rounded-full">
                <Link href={content.href}>
                  {content.cta}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
