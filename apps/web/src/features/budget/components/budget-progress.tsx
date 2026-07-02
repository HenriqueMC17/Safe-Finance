"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Progress } from "@/shared/ui/progress"
import { Skeleton } from "@/shared/ui/skeleton"
import { AlertCircle, AlertTriangle } from "lucide-react"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

interface Budget {
  id: string | number
  category: string
  amount: number
  period: string
  start_date: string
  end_date?: string
}

interface Transaction {
  id: string | number
  description: string
  amount: number
  type: string
  category: string
  date: string
}

interface BudgetProgressProps {
  userId: string
}

export function BudgetProgress({ userId }: BudgetProgressProps) {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [budgetProgress, setBudgetProgress] = useState<Record<string, { spent: number; percentage: number }>>({})

  const budgetsRaw = useQuery(api.budgets.list, { userId: userId as Id<"users"> });
  const transactionsRaw = useQuery(api.transactions.list, { userId: userId as Id<"users"> });

  const isLoading = budgetsRaw === undefined || transactionsRaw === undefined;

  useEffect(() => {
    const fetchData = async () => {
      if (!budgetsRaw || !transactionsRaw) return;

      try {
        const budgetsData = budgetsRaw.map(v => ({
          id: v._id,
          category: v.category,
          amount: v.amount,
          period: v.period,
          start_date: v.start_date,
          end_date: v.end_date
        }));
        setBudgets(budgetsData)

        const now = new Date()
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

        const transactionsData = transactionsRaw
          .filter(t => {
            const date = new Date(t.date);
            return date >= startOfMonth && date <= endOfMonth;
          })
          .map(t => ({
            id: t._id,
            description: t.description,
            amount: t.amount,
            type: t.type,
            category: t.category ?? "Geral",
            date: t.date,
          }));

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
      }
    }

    fetchData()
  }, [budgetsRaw, transactionsRaw])

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
