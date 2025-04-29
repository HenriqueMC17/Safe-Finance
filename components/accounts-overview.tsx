"use client"

import { useEffect, useState, memo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocale } from "@/contexts/locale-context"

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
      <Card>
        <CardHeader>
          <CardTitle>Visão Geral das Contas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visão Geral das Contas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Saldo Total</div>
            <div className="text-xl font-bold">{formatCurrency(totalBalance)}</div>
          </div>
          <div className="space-y-2">
            {accounts.map((account) => (
              <div key={account.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <div className="font-medium">{account.name}</div>
                  <div className="text-sm text-muted-foreground capitalize">
                    {account.type === "checking"
                      ? "Conta Corrente"
                      : account.type === "savings"
                        ? "Poupança"
                        : "Investimentos"}
                  </div>
                </div>
                <div className="font-medium">{formatCurrency(account.balance)}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const AccountsOverview = memo(AccountsOverviewComponent)
