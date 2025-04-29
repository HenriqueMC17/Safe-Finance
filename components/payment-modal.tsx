"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLocale } from "@/contexts/locale-context"

interface Bill {
  id: number
  name: string
  amount: number
  dueDate: string
}

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  bill: Bill | null
}

export function PaymentModal({ isOpen, onClose, bill }: PaymentModalProps) {
  const { formatCurrency } = useLocale()
  const [paymentMethod, setPaymentMethod] = useState("pix")
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    if (!bill) return

    setIsProcessing(true)
    // Simulando processamento de pagamento
    setTimeout(() => {
      setIsProcessing(false)
      onClose()
      // Aqui você poderia mostrar uma notificação de sucesso
    }, 2000)
  }

  if (!bill) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR").format(date)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pagar Conta</DialogTitle>
          <DialogDescription>Complete os detalhes para pagar esta conta.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Conta</Label>
            <div className="rounded-lg border p-3">
              <div className="font-medium">{bill.name}</div>
              <div className="text-sm text-muted-foreground">Vencimento: {formatDate(bill.dueDate)}</div>
              <div className="mt-2 font-bold">{formatCurrency(bill.amount)}</div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="payment-method">Método de Pagamento</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger id="payment-method">
                <SelectValue placeholder="Selecione um método de pagamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pix">PIX</SelectItem>
                <SelectItem value="credit-card">Cartão de Crédito</SelectItem>
                <SelectItem value="bank-transfer">Transferência Bancária</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {paymentMethod === "credit-card" && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="card-number">Número do Cartão</Label>
                <Input id="card-number" placeholder="0000 0000 0000 0000" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="expiry">Validade</Label>
                  <Input id="expiry" placeholder="MM/AA" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
            </>
          )}
          {paymentMethod === "bank-transfer" && (
            <div className="grid gap-2">
              <Label htmlFor="bank">Banco</Label>
              <Select defaultValue="itau">
                <SelectTrigger id="bank">
                  <SelectValue placeholder="Selecione seu banco" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="itau">Itaú</SelectItem>
                  <SelectItem value="bradesco">Bradesco</SelectItem>
                  <SelectItem value="santander">Santander</SelectItem>
                  <SelectItem value="bb">Banco do Brasil</SelectItem>
                  <SelectItem value="caixa">Caixa Econômica</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? "Processando..." : "Pagar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
