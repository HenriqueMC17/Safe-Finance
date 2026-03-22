"use client"

import { useEffect, useState, memo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocale } from "@/contexts/locale-context"
import { motion } from "framer-motion"

interface Account {
  id: number
  name: string
  balance: number
  type: string
}

const AccountsOverviewComponent = () => {
  const { formatCurrency } = useLocale()
  const [accounts, setAccounts] = useState<Account[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalBalance, setTotalBalance] = useState(0)

  useEffect(() => {
    // Simulando uma chamada de API
    const fetchAccounts = async () => {
      setIsLoading(true)
      try {
        // Dados simulados
        const mockAccounts: Account[] = [
          {
            id: 1,
            name: "Conta Corrente",
            balance: 12500.75,
            type: "checking",
          },
          {
            id: 2,
            name: "Poupança",
            balance: 45000.32,
            type: "savings",
          },
          {
            id: 3,
            name: "Investimentos",
            balance: 78900.45,
            type: "investment",
          },
        ]

        setAccounts(mockAccounts)
        const total = mockAccounts.reduce((sum, account) => sum + account.balance, 0)
        setTotalBalance(total)
      } catch (error) {
        console.error("Erro ao buscar contas:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAccounts()
  }, [])

  if (isLoading) {
    return (
      <Card className="rounded-none border-border/50 bg-background/50">
        <CardHeader>
          <CardTitle className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Visão Geral</CardTitle>
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
    <Card className="rounded-none border border-border/50 bg-background/80 backdrop-blur-md relative overflow-hidden group hover:border-primary/50 transition-colors duration-500">
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:bg-primary/10 transition-colors duration-700" />
      
      <CardHeader className="pb-4">
        <CardTitle className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground flex items-center justify-between">
          <span>Visão Geral</span>
          <span className="h-px bg-border/50 flex-1 ml-4" />
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="flex items-end justify-between border-b border-border/30 pb-4"
          >
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Saldo Total</div>
            <div className="text-3xl font-mono tracking-tight text-primary drop-shadow-[0_0_15px_rgba(0,255,209,0.3)]">
              {formatCurrency(totalBalance)}
            </div>
          </motion.div>
          
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
            {accounts.map((account) => (
              <motion.div 
                key={account.id} 
                className="flex items-center justify-between border border-border/20 p-4 bg-background/40 hover:bg-muted/10 transition-all duration-300 hover:border-primary/30"
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0, transition: { type: "spring", bounce: 0, duration: 0.6 } }
                }}
              >
                <div>
                  <div className="font-mono text-sm text-foreground uppercase tracking-wide">{account.name}</div>
                  <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mt-1">
                    {account.type === "checking"
                      ? "Corrente"
                      : account.type === "savings"
                        ? "Poupança"
                        : "Invest"}
                  </div>
                </div>
                <div className="font-mono text-sm text-primary">{formatCurrency(account.balance)}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}

export const AccountsOverview = memo(AccountsOverviewComponent)
