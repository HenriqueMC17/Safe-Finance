"use client"

import { useState, memo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PaymentModal } from "@/components/payment-modal"
import { useLocale } from "@/contexts/locale-context"

interface Bill {
  id: number
  name: string
  amount: number
  dueDate: string
}

const QuickBillPayComponent = () => {
  const { formatCurrency } = useLocale()
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null)

  // Dados simulados
  const bills: Bill[] = [
    {
      id: 1,
      name: "Conta de Luz",
      amount: 150.75,
      dueDate: "2023-05-10",
    },
    {
      id: 2,
      name: "Conta de Água",
      amount: 85.32,
      dueDate: "2023-05-15",
    },
    {
      id: 3,
      name: "Internet",
      amount: 120.0,
      dueDate: "2023-05-20",
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR").format(date)
  }

  const handlePayBill = (bill: Bill) => {
    setSelectedBill(bill)
    setIsPaymentModalOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Pagamento Rápido de Contas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bills.map((bill) => (
              <div key={bill.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <div className="font-medium">{bill.name}</div>
                  <div className="text-sm text-muted-foreground">Vencimento: {formatDate(bill.dueDate)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-medium">{formatCurrency(bill.amount)}</div>
                  <Button size="sm" onClick={() => handlePayBill(bill)}>
                    Pagar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} bill={selectedBill} />
    </>
  )
}

export const QuickBillPay = memo(QuickBillPayComponent)
