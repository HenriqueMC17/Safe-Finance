"use client"

import { Suspense } from "react"
import { Skeleton } from "@/shared/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { Button } from "@/shared/ui/button"
import { Download } from "lucide-react"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-500",
  paid: "bg-primary/20 text-primary",
  overdue: "bg-red-500/20 text-red-500",
}

const statusLabels: Record<string, string> = {
  pending: "Pendente",
  paid: "Pago",
  overdue: "Atrasado",
}

function InvoicesTable({ userId }: { userId: Id<"users"> }) {
  const invoices = useQuery(api.invoices.list, { userId })

  if (invoices === undefined) {
    return <Skeleton className="w-full h-[300px]" />
  }

  if (invoices.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">Nenhuma fatura encontrada.</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nº da Fatura</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice._id}>
            <TableCell>{invoice._id.slice(-8).toUpperCase()}</TableCell>
            <TableCell>{invoice.client}</TableCell>
            <TableCell>{new Date(invoice.issue_date).toLocaleDateString("pt-BR")}</TableCell>
            <TableCell>R$ {invoice.amount.toFixed(2).replace(".", ",")}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs ${statusStyles[invoice.status] || ""}`}>
                {statusLabels[invoice.status] || invoice.status}
              </span>
            </TableCell>
            <TableCell>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" /> PDF
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default function InvoicesPage() {
  const userId = "k577xg84pjhwcwaxebmbesj43984s1pa" as Id<"users">

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Faturas</h1>

      <Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
        <Card>
          <CardHeader>
            <CardTitle>Faturas Emitidas</CardTitle>
          </CardHeader>
          <CardContent>
            <InvoicesTable userId={userId} />
          </CardContent>
        </Card>
      </Suspense>
    </div>
  )
}
