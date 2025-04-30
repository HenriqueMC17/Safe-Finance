"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocale } from "@/contexts/locale-context"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Plus } from "lucide-react"

interface Invoice {
  id: number
  client: string
  amount: number
  issue_date: string
  due_date: string
  status: string
}

interface InvoicesDashboardProps {
  userId: number
}

export function InvoicesDashboard({ userId }: InvoicesDashboardProps) {
  const { formatCurrency } = useLocale()
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInvoices = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/invoices?userId=${userId}`)

        if (!response.ok) {
          throw new Error("Erro ao buscar faturas")
        }

        const data = await response.json()
        setInvoices(data.invoices)
      } catch (error) {
        console.error("Erro:", error)
        setError("Não foi possível carregar suas faturas.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchInvoices()
  }, [userId])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR").format(date)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Pago</span>
      case "pending":
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Pendente</span>
      case "overdue":
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Atrasado</span>
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">{status}</span>
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium">Faturas</CardTitle>
          <Button variant="outline" size="sm" disabled>
            <Plus className="h-4 w-4 mr-2" /> Nova Fatura
          </Button>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium">Faturas</CardTitle>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" /> Nova Fatura
          </Button>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-center text-red-500">{error}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">Faturas</CardTitle>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" /> Nova Fatura
        </Button>
      </CardHeader>
      <CardContent>
        {invoices.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            Nenhuma fatura encontrada. Clique no botão "Nova Fatura" para criar uma.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Emissão</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell>{formatCurrency(Number(invoice.amount))}</TableCell>
                  <TableCell>{formatDate(invoice.issue_date)}</TableCell>
                  <TableCell>{formatDate(invoice.due_date)}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
