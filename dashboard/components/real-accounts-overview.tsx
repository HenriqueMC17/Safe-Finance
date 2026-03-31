"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocale } from "@/contexts/locale-context"
import { Skeleton } from "@/components/ui/skeleton"

interface Account {
  id: number
  name: string
  balance: number
  type: string
  currency: string
}

interface RealAccountsOverviewProps {
  userId: number
}

export function RealAccountsOverview({ userId }: RealAccountsOverviewProps) {
  const { formatCurrency } = useLocale()
  const [accounts, setAccounts] = useState<Account[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAccounts = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/accounts?userId=${userId}`)

        if (!response.ok) {
          throw new Error("Erro ao buscar contas")
        }

        const data = await response.json()
        setAccounts(data.accounts)
      } catch (error) {
        console.error("Erro:", error)
        setError("Não foi possível carregar suas contas. Por favor, tente novamente.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAccounts()
  }, [userId])

  const totalBalance = accounts.reduce((sum, account) => sum + Number(account.balance), 0)

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Visão Geral das Contas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-20 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Visão Geral das Contas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-center text-red-500">{error}</div>
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
                <div className="font-medium">{formatCurrency(Number(account.balance))}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
