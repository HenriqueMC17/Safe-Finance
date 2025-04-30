"use client"

import { useState, useEffect } from "react"
import { RealAccountsOverview } from "@/components/real-accounts-overview"
import { RealTransactions } from "@/components/real-transactions"
import { SavingsGoalsDashboard } from "@/components/savings-goals-dashboard"
import { InvoicesDashboard } from "@/components/invoices-dashboard"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  // Normalmente, você obteria o ID do usuário da sessão
  // Para este exemplo, usaremos um ID fixo
  const userId = 1
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null)
  const [accounts, setAccounts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch(`/api/accounts?userId=${userId}`)

        if (!response.ok) {
          throw new Error("Erro ao buscar contas")
        }

        const data = await response.json()
        setAccounts(data.accounts)

        if (data.accounts.length > 0) {
          setSelectedAccountId(data.accounts[0].id)
        }
      } catch (error) {
        console.error("Erro:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAccounts()
  }, [userId])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[300px]" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[300px]" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-1">
          <RealAccountsOverview userId={userId} />
        </div>
        <div className="md:col-span-1">{selectedAccountId && <RealTransactions accountId={selectedAccountId} />}</div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-1">
          <SavingsGoalsDashboard userId={userId} />
        </div>
        <div className="md:col-span-1">
          <InvoicesDashboard userId={userId} />
        </div>
      </div>
    </div>
  )
}
