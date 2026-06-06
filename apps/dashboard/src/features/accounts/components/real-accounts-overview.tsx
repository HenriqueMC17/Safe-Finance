"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { useLocale } from "@/shared/contexts/locale-context"
import { Skeleton } from "@/shared/ui/skeleton"

interface Account {
  id: string | number
  name: string
  balance: number
  type: string
  currency: string
}

interface RealAccountsOverviewProps {
  userId: string | number
}

export function RealAccountsOverview({ userId }: RealAccountsOverviewProps) {
  const { formatCurrency } = useLocale()
  const accountsRaw = useQuery(api.accounts.list, {
    userId: userId as Id<"users">,
  })

  const isLoading = accountsRaw === undefined
  const error = null

  const accounts: Account[] = (accountsRaw ?? []).map((v) => ({
    id: v._id,
    name: v.name,
    balance: v.balance,
    type: v.type,
    currency: v.currency ?? "BRL",
  }))

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
