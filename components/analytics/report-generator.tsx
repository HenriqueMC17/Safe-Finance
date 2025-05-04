"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-range-picker"
import type { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"
import { Download, Loader2 } from "lucide-react"

interface ReportGeneratorProps {
  userId: number
}

export function ReportGenerator({ userId }: ReportGeneratorProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [reportType, setReportType] = useState("monthly")
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  })
  const [selectedSections, setSelectedSections] = useState({
    transactions: true,
    categories: true,
    balance: true,
    goals: false,
    invoices: false,
  })

  const handleGenerateReport = async () => {
    setIsLoading(true)

    try {
      // Aqui você implementaria a lógica para gerar o relatório
      // Normalmente, isso envolveria uma chamada à API
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulação

      // Simulação de download de relatório
      const element = document.createElement("a")
      const file = new Blob(
        [
          `Relatório Financeiro
          Período: ${date?.from ? format(date.from, "dd/MM/yyyy") : ""} a ${date?.to ? format(date.to, "dd/MM/yyyy") : ""}
          Tipo: ${reportType === "monthly" ? "Mensal" : reportType === "quarterly" ? "Trimestral" : "Anual"}
          Seções incluídas: ${Object.entries(selectedSections)
            .filter(([_, included]) => included)
            .map(([section]) => section)
            .join(", ")}
          `,
        ],
        { type: "text/plain" },
      )
      element.href = URL.createObjectURL(file)
      element.download = `relatorio-financeiro-${format(new Date(), "yyyy-MM-dd")}.txt`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    } catch (error) {
      console.error("Erro ao gerar relatório:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerador de Relatórios</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="report-type">Tipo de Relatório</Label>
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger id="report-type">
              <SelectValue placeholder="Selecione o tipo de relatório" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Mensal</SelectItem>
              <SelectItem value="quarterly">Trimestral</SelectItem>
              <SelectItem value="annual">Anual</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Período</Label>
          <DatePickerWithRange date={date} setDate={setDate} />
        </div>

        <div className="space-y-2">
          <Label>Seções a Incluir</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="transactions"
                checked={selectedSections.transactions}
                onCheckedChange={(checked) => setSelectedSections({ ...selectedSections, transactions: !!checked })}
              />
              <Label htmlFor="transactions">Transações</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="categories"
                checked={selectedSections.categories}
                onCheckedChange={(checked) => setSelectedSections({ ...selectedSections, categories: !!checked })}
              />
              <Label htmlFor="categories">Categorias</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="balance"
                checked={selectedSections.balance}
                onCheckedChange={(checked) => setSelectedSections({ ...selectedSections, balance: !!checked })}
              />
              <Label htmlFor="balance">Saldo</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="goals"
                checked={selectedSections.goals}
                onCheckedChange={(checked) => setSelectedSections({ ...selectedSections, goals: !!checked })}
              />
              <Label htmlFor="goals">Metas</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="invoices"
                checked={selectedSections.invoices}
                onCheckedChange={(checked) => setSelectedSections({ ...selectedSections, invoices: !!checked })}
              />
              <Label htmlFor="invoices">Faturas</Label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleGenerateReport} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gerando...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" /> Gerar Relatório
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
