import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

const transactions = [
  { id: 1, name: "Amazon.com", amount: -129.99, date: "2023-07-15", type: "expense" },
  { id: 2, name: "Mercado Pão de Açúcar", amount: -89.72, date: "2023-07-10", type: "expense" },
  { id: 3, name: "Assinatura Netflix", amount: -15.99, date: "2023-07-05", type: "expense" },
  { id: 4, name: "Pagamento Freelance", amount: 750, date: "2023-07-12", type: "income" },
  { id: 5, name: "Posto de Gasolina", amount: -45.5, date: "2023-07-18", type: "expense" },
  { id: 6, name: "Transferência Bancária", amount: 1200, date: "2023-07-20", type: "income" },
  { id: 7, name: "Restaurante Sabor & Arte", amount: -78.5, date: "2023-07-22", type: "expense" },
  { id: 8, name: "Farmácia São Paulo", amount: -32.75, date: "2023-07-25", type: "expense" },
]

function TransactionsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Tipo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.name}</TableCell>
            <TableCell>
              <div className="flex items-center">
                <span
                  className={`font-medium ${
                    transaction.type === "income" ? "text-primary" : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  R$ {Math.abs(transaction.amount).toFixed(2).replace(".", ",")}
                </span>
                {transaction.type === "income" ? (
                  <ArrowUpRight className="h-4 w-4 text-primary ml-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-600 dark:text-red-400 ml-1" />
                )}
              </div>
            </TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  transaction.type === "income" ? "bg-primary/20 text-primary" : "bg-red-500/20 text-red-500"
                }`}
              >
                {transaction.type === "income" ? "Receita" : "Despesa"}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Transações</h1>

      <Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Transações</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionsTable />
          </CardContent>
        </Card>
      </Suspense>
    </div>
  )
}
