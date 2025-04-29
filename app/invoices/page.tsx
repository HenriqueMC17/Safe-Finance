import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const invoices = [
  { id: "INV-001", client: "Empresa ABC Ltda", amount: 1250.0, date: "2023-07-15", status: "Pago" },
  { id: "INV-002", client: "Comércio XYZ S.A.", amount: 3450.75, date: "2023-07-20", status: "Pendente" },
  { id: "INV-003", client: "Consultoria Silva & Associados", amount: 5780.5, date: "2023-07-25", status: "Pago" },
  { id: "INV-004", client: "Indústria Nacional Ltda", amount: 2340.25, date: "2023-07-30", status: "Atrasado" },
  { id: "INV-005", client: "Distribuidora Rápida S.A.", amount: 1890.0, date: "2023-08-05", status: "Pendente" },
]

const statusStyles = {
  Pago: "bg-primary/20 text-primary",
  Pendente: "bg-yellow-500/20 text-yellow-500",
  Atrasado: "bg-red-500/20 text-red-500",
}

function InvoicesTable() {
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
          <TableRow key={invoice.id}>
            <TableCell>{invoice.id}</TableCell>
            <TableCell>{invoice.client}</TableCell>
            <TableCell>{invoice.date}</TableCell>
            <TableCell>R$ {invoice.amount.toFixed(2).replace(".", ",")}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs ${statusStyles[invoice.status]}`}>{invoice.status}</span>
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
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Faturas</h1>

      <Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
        <Card>
          <CardHeader>
            <CardTitle>Faturas Emitidas</CardTitle>
          </CardHeader>
          <CardContent>
            <InvoicesTable />
          </CardContent>
        </Card>
      </Suspense>
    </div>
  )
}
