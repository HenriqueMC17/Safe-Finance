"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2 } from "lucide-react"

const steps = ["Amount and Account", "Recipient Details", "OTP Verification", "Confirmation"]

export function SendMoneyModal({ isOpen, onClose, onSendMoney, accounts }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [amount, setAmount] = useState("")
  const [selectedAccount, setSelectedAccount] = useState("")
  const [recipient, setRecipient] = useState({ name: "", email: "", accountNumber: "" })
  const [otp, setOtp] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      // Validação para cada etapa
      if (currentStep === 0) {
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
          alert("Please enter a valid amount")
          return
        }
        if (!selectedAccount) {
          alert("Please select an account")
          return
        }

        // Verificar se há saldo suficiente
        const account = accounts.find((acc) => acc.name === selectedAccount)
        if (account && Number(amount) > account.balance) {
          alert("Insufficient funds")
          return
        }

        setCurrentStep(currentStep + 1)
      } else if (currentStep === 1) {
        if (!recipient.name || !recipient.email || !recipient.accountNumber) {
          alert("Please fill in all recipient details")
          return
        }
        setCurrentStep(currentStep + 1)
      } else if (currentStep === 2) {
        if (!otp) {
          alert("Please enter the OTP")
          return
        }

        // Simular processamento
        setIsProcessing(true)
        setTimeout(() => {
          setIsProcessing(false)
          setCurrentStep(currentStep + 1)
        }, 1500)
      }
    } else {
      onSendMoney(Number.parseFloat(amount), selectedAccount)
      onClose()
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount to Send</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account">From Account</Label>
              <Select onValueChange={setSelectedAccount} value={selectedAccount}>
                <SelectTrigger id="account">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.name} value={account.name}>
                      {account.name} (${account.balance.toLocaleString()})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipientName">Recipient Name</Label>
              <Input
                id="recipientName"
                placeholder="Enter recipient name"
                value={recipient.name}
                onChange={(e) => setRecipient({ ...recipient, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipientEmail">Recipient Email</Label>
              <Input
                id="recipientEmail"
                type="email"
                placeholder="Enter recipient email"
                value={recipient.email}
                onChange={(e) => setRecipient({ ...recipient, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                placeholder="Enter account number"
                value={recipient.accountNumber}
                onChange={(e) => setRecipient({ ...recipient, accountNumber: e.target.value })}
              />
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Enter the OTP sent to your registered mobile number</p>
            <Input placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
          </div>
        )
      case 3:
        return (
          <div className="text-center space-y-4">
            <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
            <p className="text-lg font-medium">Money Sent Successfully</p>
            <p className="text-sm text-muted-foreground">
              ${amount} has been sent to {recipient.name} from your {selectedAccount} account.
            </p>
          </div>
        )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{steps[currentStep]}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {renderStepContent()}
          <div className="flex justify-between">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)} disabled={isProcessing}>
                Back
              </Button>
            )}
            <Button onClick={handleContinue} className="ml-auto bg-primary hover:bg-primary/90" disabled={isProcessing}>
              {isProcessing ? "Processing..." : currentStep === steps.length - 1 ? "Close" : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
