import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

const payments = [
  { id: "PAY-001", method: "Cartão de Crédito", amount: 1250.0, date: "2023-07-15", status: "Concluído" },
  { id: "PAY-002", method: "Transferência Bancária", amount: 3450.75, date: "2023-07-20", status: "Processando" },
  { id: "PAY-003", method: "Boleto Bancário", amount: 5780.5, date: "2023-07-25", status: "Concluído" },
  { id: "PAY-004", method: "PIX", amount: 2340.25, date: "2023-07-30", status: "Concluído" },
  { id: "PAY-005", method: "Cartão de Débito", amount: 1890.0, date: "2023-08-05", status: "Falhou" },
]

const statusStyles = {
  Concluído: "bg-primary/20 text-primary",
  Processando: "bg-yellow-500/20 text-yellow-500",
  Falhou: "bg-red-500/20 text-red-500",
}

function PaymentsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID do Pagamento</TableHead>
          <TableHead>Método</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell>{payment.id}</TableCell>
            <TableCell>{payment.method}</TableCell>
            <TableCell>{payment.date}</TableCell>
            <TableCell>R$ {payment.amount.toFixed(2).replace(".", ",")}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs ${statusStyles[payment.status]}`}>{payment.status}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Pagamentos</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <PlusCircle className="mr-2 h-4 w-4" /> Novo Pagamento
        </Button>
      </div>

      <Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Pagamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <PaymentsTable />
          </CardContent>
        </Card>
      </Suspense>
    </div>
  )
}
