"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useLocale } from "@/contexts/locale-context"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

interface IncomeVsExpensesProps {
  data: {
    income: number
    expenses: number
  }
  isLoading: boolean
}

export function IncomeVsExpenses({ data, isLoading }: IncomeVsExpensesProps) {
  const { formatCurrency } = useLocale()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Receitas vs Despesas</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <Skeleton className="h-[100px] w-full" />
        </CardContent>
      </Card>
    )
  }

  const income = Number(data.income) || 0
  const expenses = Number(data.expenses) || 0
  const balance = income - expenses
  const savingsRate = income > 0 ? (balance / income) * 100 : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Receitas vs Despesas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-4 border rounded-lg">
            <div className="flex items-center gap-2 text-green-500">
              <ArrowUpIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Receitas</span>
            </div>
            <div className="mt-2 text-2xl font-bold">{formatCurrency(income)}</div>
          </div>
          <div className="flex flex-col items-center p-4 border rounded-lg">
            <div className="flex items-center gap-2 text-red-500">
              <ArrowDownIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Despesas</span>
            </div>
            <div className="mt-2 text-2xl font-bold">{formatCurrency(expenses)}</div>
          </div>
        </div>
        <div className="mt-4 p-4 border rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Saldo</span>
            <span className={`text-xl font-bold ${balance >= 0 ? "text-green-500" : "text-red-500"}`}>
              {formatCurrency(balance)}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm font-medium">Taxa de Economia</span>
            <span className={`text-lg font-bold ${savingsRate >= 0 ? "text-green-500" : "text-red-500"}`}>
              {savingsRate.toFixed(1)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
