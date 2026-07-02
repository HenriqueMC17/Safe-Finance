"use client"

import { useState } from "react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { RealAccountsOverview } from "@/features/accounts/components/real-accounts-overview"
import { RealTransactions } from "@/features/transactions/components/real-transactions"
import { SavingsGoalsDashboard } from "@/features/accounts/components/savings-goals-dashboard"
import { InvoicesDashboard } from "@/features/transactions/components/invoices-dashboard"
import { Skeleton } from "@/shared/ui/skeleton"

export default function DashboardPage() {
  // Normalmente, você obteria o ID do usuário da sessão
  // Para este exemplo, usaremos um ID fixo — será substituído pela integração de Auth
  const userId = "k577xg84pjhwcwaxebmbesj43984s1pa" as Id<"users">

  const accountsRaw = useQuery(api.accounts.list, { userId })
  const isLoading = accountsRaw === undefined
  const accounts = accountsRaw ?? []
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    accounts.length > 0 ? String(accounts[0]._id) : null
  )

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
        <div className="md:col-span-1">{selectedAccountId && <RealTransactions userId={userId} />}</div>
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
