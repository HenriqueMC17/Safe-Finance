"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2 } from "lucide-react"

const steps = ["Select Contact", "Enter Amount", "Add Note", "Confirmation"]

const contacts = [
  { id: "1", name: "John Doe", phoneNumber: "+1 234 567 8901", email: "john.doe@example.com" },
  { id: "2", name: "Jane Smith", phoneNumber: "+1 987 654 3210", email: "jane.smith@example.com" },
  { id: "3", name: "Alice Johnson", phoneNumber: "+1 555 123 4567", email: "alice.johnson@example.com" },
  { id: "4", name: "Bob Williams", phoneNumber: "+1 555 987 6543", email: "bob.williams@example.com" },
  { id: "5", name: "Charlie Brown", phoneNumber: "+1 555 246 8135", email: "charlie.brown@example.com" },
]

export function RequestMoneyModal({ isOpen, onClose, onRequestMoney }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedContact, setSelectedContact] = useState(null)
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      // Validação para cada etapa
      if (currentStep === 0) {
        if (!selectedContact) {
          alert("Please select a contact")
          return
        }
        setCurrentStep(currentStep + 1)
      } else if (currentStep === 1) {
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
          alert("Please enter a valid amount")
          return
        }
        setCurrentStep(currentStep + 1)
      } else if (currentStep === 2) {
        // Note is optional, no validation needed

        // Simular processamento
        setIsProcessing(true)
        setTimeout(() => {
          setIsProcessing(false)
          setCurrentStep(currentStep + 1)
        }, 1500)
      }
    } else {
      onRequestMoney(Number.parseFloat(amount), selectedContact)
      onClose()
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <Label htmlFor="contact">Select Contact</Label>
            <Select onValueChange={(value) => setSelectedContact(contacts.find((c) => c.id === value))}>
              <SelectTrigger id="contact">
                <SelectValue placeholder="Select a contact" />
              </SelectTrigger>
              <SelectContent>
                {contacts.map((contact) => (
                  <SelectItem key={contact.id} value={contact.id}>
                    {contact.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedContact && (
              <div className="space-y-2 p-3 bg-muted rounded-md">
                <p className="text-sm font-medium">Contact Details:</p>
                <p className="text-sm">Name: {selectedContact.name}</p>
                <p className="text-sm">Email: {selectedContact.email}</p>
                <p className="text-sm">Phone: {selectedContact.phoneNumber}</p>
              </div>
            )}
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <Label htmlFor="amount">Amount to Request</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <Label htmlFor="note">Add a Note (Optional)</Label>
            <Input
              id="note"
              placeholder="e.g., For dinner last night"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        )
      case 3:
        return (
          <div className="text-center space-y-4">
            <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
            <p className="text-lg font-medium">Money Request Sent</p>
            <p className="text-sm text-muted-foreground">
              ${amount} has been requested from {selectedContact.name}.
              {note && <span className="block mt-2">Note: "{note}"</span>}
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
