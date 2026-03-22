"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, AlertTriangle } from "lucide-react"

interface Budget {
  id: number
  category: string
  amount: number
  period: string
  start_date: string
  end_date?: string
}

interface Transaction {
  id: number
  description: string
  amount: number
  type: string
  category: string
  date: string
}

interface BudgetProgressProps {
  userId: number
}

export function BudgetProgress({ userId }: BudgetProgressProps) {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [budgetProgress, setBudgetProgress] = useState<Record<string, { spent: number; percentage: number }>>({})

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Buscar orçamentos
        const budgetsResponse = await fetch(`/api/budgets?userId=${userId}`)
        if (!budgetsResponse.ok) {
          throw new Error("Erro ao buscar orçamentos")
        }
        const budgetsData = await budgetsResponse.json()
        setBudgets(budgetsData)

        // Buscar transações do mês atual
        const now = new Date()
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString()

        const transactionsResponse = await fetch(
          `/api/transactions?userId=${userId}&startDate=${startOfMonth}&endDate=${endOfMonth}`,
        )
        if (!transactionsResponse.ok) {
          throw new Error("Erro ao buscar transações")
        }
        const transactionsData = await transactionsResponse.json()
        setTransactions(transactionsData)

        // Calcular progresso do orçamento
        const progress: Record<string, { spent: number; percentage: number }> = {}

        budgetsData.forEach((budget: Budget) => {
          const categoryTransactions = transactionsData.filter(
            (t: Transaction) => t.type === "debit" && t.category === budget.category,
          )

          const spent = categoryTransactions.reduce((sum: number, t: Transaction) => sum + Number(t.amount), 0)

          const percentage = (spent / Number(budget.amount)) * 100

          progress[budget.category] = { spent, percentage }
        })

        setBudgetProgress(progress)
      } catch (error) {
        console.error("Erro:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [userId])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progresso do Orçamento (Mês Atual)</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : budgets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Nenhum orçamento definido</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Defina orçamentos para visualizar o progresso dos seus gastos
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {budgets.map((budget) => {
              const progress = budgetProgress[budget.category] || { spent: 0, percentage: 0 }
              const isOverBudget = progress.percentage > 100

              return (
                <div key={budget.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{budget.category}</span>
                    <span className="text-sm">
                      {formatCurrency(progress.spent)} / {formatCurrency(Number(budget.amount))}
                    </span>
                  </div>
                  <Progress
                    value={Math.min(progress.percentage, 100)}
                    className={`h-2 ${isOverBudget ? "bg-red-200" : ""}`}
                  />
                  <div className="flex justify-between items-center text-sm">
                    <span className={isOverBudget ? "text-red-500 flex items-center" : "text-muted-foreground"}>
                      {isOverBudget && <AlertTriangle className="h-3 w-3 mr-1" />}
                      {progress.percentage.toFixed(1)}% {isOverBudget ? "Orçamento excedido!" : "utilizado"}
                    </span>
                    <span className="text-muted-foreground">
                      {formatCurrency(Number(budget.amount) - progress.spent)} restante
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
