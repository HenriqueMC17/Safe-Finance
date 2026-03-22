"use client"

import { useEffect, useState, memo } from "react"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocale } from "@/contexts/locale-context"
import { motion } from "framer-motion"

interface Transaction {
  id: number
  description: string
  amount: number
  date: string
  type: "credit" | "debit"
}

const RecentTransactionsComponent = () => {
  const { formatCurrency } = useLocale()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulando uma chamada de API
    const fetchTransactions = async () => {
      setIsLoading(true)
      try {
        // Dados simulados
        const mockTransactions: Transaction[] = [
          {
            id: 1,
            description: "Supermercado Extra",
            amount: 250.75,
            date: "2023-04-25",
            type: "debit",
          },
          {
            id: 2,
            description: "Salário",
            amount: 5000.0,
            date: "2023-04-20",
            type: "credit",
          },
          {
            id: 3,
            description: "Netflix",
            amount: 39.9,
            date: "2023-04-18",
            type: "debit",
          },
          {
            id: 4,
            description: "Transferência recebida",
            amount: 1200.0,
            date: "2023-04-15",
            type: "credit",
          },
          {
            id: 5,
            description: "Restaurante",
            amount: 89.9,
            date: "2023-04-12",
            type: "debit",
          },
        ]

        setTransactions(mockTransactions)
      } catch (error) {
        console.error("Erro ao buscar transações:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR").format(date)
  }

  if (isLoading) {
    return (
      <Card className="rounded-none border-border/50 bg-background/50">
        <CardHeader>
          <CardTitle className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Transações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse bg-muted/50"></div>
            <div className="h-4 w-3/4 animate-pulse bg-muted/50"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="rounded-none border border-border/50 bg-background/80 backdrop-blur-md relative overflow-hidden group">
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      <CardHeader className="pb-4 border-b border-border/30 mb-4">
        <CardTitle className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground flex items-center justify-between">
          <span>Transações</span>
          <span className="h-px bg-border/50 flex-1 ml-4" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div 
          className="space-y-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {transactions.map((transaction) => (
            <motion.div 
              key={transaction.id} 
              className="group/item flex flex-col sm:flex-row sm:items-center justify-between border border-border/20 p-4 bg-background/40 hover:bg-muted/10 transition-all duration-300"
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0, transition: { type: "spring", bounce: 0, duration: 0.6 } }
              }}
            >
              <div className="flex items-center gap-4 mb-2 sm:mb-0">
                <div
                  className={`p-2 border backdrop-blur-sm ${
                    transaction.type === "credit"
                      ? "border-primary/30 text-primary bg-primary/5"
                      : "border-destructive/30 text-destructive bg-destructive/5"
                  }`}
                >
                  {transaction.type === "credit" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-foreground group-hover/item:text-primary transition-colors">{transaction.description}</div>
                  <div className="text-[10px] text-muted-foreground font-mono mt-1 opacity-70">{formatDate(transaction.date)}</div>
                </div>
              </div>
              <div className={`font-mono text-sm tracking-tight ${transaction.type === "credit" ? "text-primary drop-shadow-[0_0_8px_rgba(0,255,209,0.3)]" : "text-destructive drop-shadow-[0_0_8px_rgba(255,0,0,0.3)]"}`}>
                {transaction.type === "credit" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  )
}

export const RecentTransactions = memo(RecentTransactionsComponent)
