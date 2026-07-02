"use client"

import { Suspense } from "react"
import { Skeleton } from "@/shared/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

function TransactionsTable({ userId }: { userId: Id<"users"> }) {
  const transactions = useQuery(api.transactions.list, { userId })

  if (transactions === undefined) {
    return <Skeleton className="w-full h-[300px]" />
  }

  if (transactions.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">Nenhuma transação encontrada.</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Conta</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Tipo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => {
          const isIncome = transaction.type === "income" || transaction.type === "credit" || transaction.type === "receita"
          return (
            <TableRow key={transaction._id}>
              <TableCell>
                {new Date(transaction.date).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.accountName || "N/A"}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span
                    className={`font-medium ${
                      isIncome ? "text-primary" : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {isIncome ? "+" : "-"}
                    R$ {Math.abs(transaction.amount).toFixed(2).replace(".", ",")}
                  </span>
                  {isIncome ? (
                    <ArrowUpRight className="h-4 w-4 text-primary ml-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-600 dark:text-red-400 ml-1" />
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    isIncome ? "bg-primary/20 text-primary" : "bg-red-500/20 text-red-500"
                  }`}
                >
                  {isIncome ? "Receita" : "Despesa"}
                </span>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default function TransactionsPage() {
  const userId = "k577xg84pjhwcwaxebmbesj43984s1pa" as Id<"users">

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Transações</h1>

      <Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Transações</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionsTable userId={userId} />
          </CardContent>
        </Card>
      </Suspense>
    </div>
  )
}
