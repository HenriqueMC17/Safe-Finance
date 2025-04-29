"use client"

import { useEffect, useState, memo } from "react"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocale } from "@/contexts/locale-context"

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
      <Card>
        <CardHeader>
          <CardTitle>Transações Recentes</CardTitle>
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
        <CardTitle>Transações Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div
                  className={`rounded-full p-2 ${
                    transaction.type === "credit"
                      ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                      : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
                  }`}
                >
                  {transaction.type === "credit" ? (
                    <ArrowUpIcon className="h-4 w-4" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <div className="font-medium">{transaction.description}</div>
                  <div className="text-sm text-muted-foreground">{formatDate(transaction.date)}</div>
                </div>
              </div>
              <div className={`font-medium ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                {transaction.type === "credit" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export const RecentTransactions = memo(RecentTransactionsComponent)
