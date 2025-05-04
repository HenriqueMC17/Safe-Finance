"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"
import { FileText, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface ReportExporterProps {
  userId: number
}

export function ReportExporter({ userId }: ReportExporterProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [reportType, setReportType] = useState("transactions")
  const [fileFormat, setFileFormat] = useState("pdf")
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  })
  const [selectedSections, setSelectedSections] = useState({
    transactions: true,
    categories: true,
    balance: true,
    goals: false,
    budgets: false,
    forecasts: false,
  })

  const handleGenerateReport = async () => {
    setIsLoading(true)

    try {
      // Aqui você implementaria a lógica para gerar o relatório
      // Normalmente, isso envolveria uma chamada à API
      const response = await fetch("/api/reports/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          reportType,
          fileFormat,
          dateRange: {
            from: date?.from ? format(date.from, "yyyy-MM-dd") : undefined,
            to: date?.to ? format(date.to, "yyyy-MM-dd") : undefined,
          },
          sections: selectedSections,
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao gerar relatório")
      }

      // Para PDF, precisamos criar um blob e fazer download
      if (fileFormat === "pdf") {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `relatorio-financeiro-${format(new Date(), "yyyy-MM-dd")}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        // Para CSV, podemos fazer download direto
        const text = await response.text()
        const blob = new Blob([text], { type: "text/csv;charset=utf-8" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `relatorio-financeiro-${format(new Date(), "yyyy-MM-dd")}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }

      toast({
        title: "Sucesso",
        description: "Relatório gerado com sucesso",
      })
    } catch (error) {
      console.error("Erro ao gerar relatório:", error)
      toast({
        title: "Erro",
        description: "Não foi possível gerar o relatório",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exportar Relatórios</CardTitle>
        <CardDescription>Gere relatórios personalizados das suas finanças</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Tipo de Relatório</Label>
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo de relatório" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="transactions">Transações</SelectItem>
              <SelectItem value="budget">Orçamento</SelectItem>
              <SelectItem value="goals">Metas Financeiras</SelectItem>
              <SelectItem value="analytics">Análise Financeira</SelectItem>
              <SelectItem value="complete">Relatório Completo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Período</Label>
          <DatePickerWithRange date={date} setDate={setDate} />
        </div>

        <div className="space-y-2">
          <Label>Formato do Arquivo</Label>
          <RadioGroup defaultValue="pdf" value={fileFormat} onValueChange={setFileFormat} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pdf" id="pdf" />
              <Label htmlFor="pdf" className="cursor-pointer">
                PDF
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="csv" id="csv" />
              <Label htmlFor="csv" className="cursor-pointer">
                CSV
              </Label>
            </div>
          </RadioGroup>
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
              <Label htmlFor="transactions" className="cursor-pointer">
                Transações
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="categories"
                checked={selectedSections.categories}
                onCheckedChange={(checked) => setSelectedSections({ ...selectedSections, categories: !!checked })}
              />
              <Label htmlFor="categories" className="cursor-pointer">
                Categorias
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="balance"
                checked={selectedSections.balance}
                onCheckedChange={(checked) => setSelectedSections({ ...selectedSections, balance: !!checked })}
              />
              <Label htmlFor="balance" className="cursor-pointer">
                Saldo
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="goals"
                checked={selectedSections.goals}
                onCheckedChange={(checked) => setSelectedSections({ ...selectedSections, goals: !!checked })}
              />
              <Label htmlFor="goals" className="cursor-pointer">
                Metas
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="budgets"
                checked={selectedSections.budgets}
                onCheckedChange={(checked) => setSelectedSections({ ...selectedSections, budgets: !!checked })}
              />
              <Label htmlFor="budgets" className="cursor-pointer">
                Orçamentos
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="forecasts"
                checked={selectedSections.forecasts}
                onCheckedChange={(checked) => setSelectedSections({ ...selectedSections, forecasts: !!checked })}
              />
              <Label htmlFor="forecasts" className="cursor-pointer">
                Previsões
              </Label>
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
              <FileText className="mr-2 h-4 w-4" /> Gerar Relatório
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
