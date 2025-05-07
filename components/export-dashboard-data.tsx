"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-range-picker"
import type { DateRange } from "react-day-picker"
import { addDays } from "date-fns"
import { Download, FileText, Loader2, Table } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { convertToCSV, downloadCSV, generateFileName } from "@/lib/export-utils"
import { exportToPDF } from "@/lib/pdf-export"

interface ExportDashboardDataProps {
  userId: number
}

export function ExportDashboardData({ userId }: ExportDashboardDataProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [exportFormat, setExportFormat] = useState<"csv" | "pdf">("csv")
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  })
  const [selectedData, setSelectedData] = useState({
    transactions: true,
    accounts: true,
    budgets: true,
    goals: false,
    invoices: false,
  })

  const handleExport = async () => {
    if (!Object.values(selectedData).some(Boolean)) {
      toast({
        title: "Nenhum dado selecionado",
        description: "Selecione pelo menos um tipo de dado para exportar",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Coletar dados selecionados
      const dataToExport: Record<string, any[]> = {}

      if (selectedData.transactions) {
        const response = await fetch(
          `/api/transactions?userId=${userId}&startDate=${date?.from?.toISOString()}&endDate=${date?.to?.toISOString()}`,
        )
        if (response.ok) {
          const data = await response.json()
          dataToExport.transactions = data.transactions
        }
      }

      if (selectedData.accounts) {
        const response = await fetch(`/api/accounts?userId=${userId}`)
        if (response.ok) {
          const data = await response.json()
          dataToExport.accounts = data.accounts
        }
      }

      if (selectedData.budgets) {
        const response = await fetch(
          `/api/budgets?userId=${userId}&startDate=${date?.from?.toISOString()}&endDate=${date?.to?.toISOString()}`,
        )
        if (response.ok) {
          const data = await response.json()
          dataToExport.budgets = data
        }
      }

      if (selectedData.goals) {
        const response = await fetch(`/api/savings-goals?userId=${userId}`)
        if (response.ok) {
          const data = await response.json()
          dataToExport.goals = data.goals
        }
      }

      if (selectedData.invoices) {
        const response = await fetch(`/api/invoices?userId=${userId}`)
        if (response.ok) {
          const data = await response.json()
          dataToExport.invoices = data.invoices
        }
      }

      // Exportar dados no formato selecionado
      if (exportFormat === "csv") {
        // Exportar cada tipo de dado como um arquivo CSV separado
        for (const [key, data] of Object.entries(dataToExport)) {
          if (data && data.length > 0) {
            let headers: Record<string, string> = {}
            let dateFields: string[] = []

            // Definir cabeçalhos e campos de data com base no tipo de dado
            switch (key) {
              case "transactions":
                headers = {
                  description: "Descrição",
                  amount: "Valor",
                  type: "Tipo",
                  category: "Categoria",
                  date: "Data",
                }
                dateFields = ["date"]
                break
              case "accounts":
                headers = {
                  name: "Nome",
                  type: "Tipo",
                  balance: "Saldo",
                  currency: "Moeda",
                  created_at: "Data de Criação",
                }
                dateFields = ["created_at"]
                break
              case "budgets":
                headers = {
                  category: "Categoria",
                  amount: "Valor",
                  period: "Período",
                  start_date: "Data de Início",
                  end_date: "Data de Término",
                }
                dateFields = ["start_date", "end_date"]
                break
              case "goals":
                headers = {
                  name: "Nome",
                  target_amount: "Valor Alvo",
                  current_amount: "Valor Atual",
                  deadline: "Prazo",
                  created_at: "Data de Criação",
                }
                dateFields = ["deadline", "created_at"]
                break
              case "invoices":
                headers = {
                  client: "Cliente",
                  amount: "Valor",
                  issue_date: "Data de Emissão",
                  due_date: "Data de Vencimento",
                  status: "Status",
                }
                dateFields = ["issue_date", "due_date"]
                break
            }

            const csvContent = convertToCSV(data, headers, dateFields as any)
            const fileName = generateFileName(`safe_finance_${key}`, "csv")
            downloadCSV(csvContent, fileName)
          }
        }

        toast({
          title: "Exportação concluída",
          description: "Os dados foram exportados com sucesso",
        })
      } else if (exportFormat === "pdf") {
        // Exportar cada tipo de dado como um arquivo PDF separado
        for (const [key, data] of Object.entries(dataToExport)) {
          if (data && data.length > 0) {
            let headers: Record<string, string> = {}
            let dateFields: string[] = []
            let title = ""

            // Definir cabeçalhos, campos de data e título com base no tipo de dado
            switch (key) {
              case "transactions":
                headers = {
                  description: "Descrição",
                  amount: "Valor",
                  type: "Tipo",
                  category: "Categoria",
                  date: "Data",
                }
                dateFields = ["date"]
                title = "Relatório de Transações"
                break
              case "accounts":
                headers = {
                  name: "Nome",
                  type: "Tipo",
                  balance: "Saldo",
                  currency: "Moeda",
                  created_at: "Data de Criação",
                }
                dateFields = ["created_at"]
                title = "Relatório de Contas"
                break
              case "budgets":
                headers = {
                  category: "Categoria",
                  amount: "Valor",
                  period: "Período",
                  start_date: "Data de Início",
                  end_date: "Data de Término",
                }
                dateFields = ["start_date", "end_date"]
                title = "Relatório de Orçamentos"
                break
              case "goals":
                headers = {
                  name: "Nome",
                  target_amount: "Valor Alvo",
                  current_amount: "Valor Atual",
                  deadline: "Prazo",
                  created_at: "Data de Criação",
                }
                dateFields = ["deadline", "created_at"]
                title = "Relatório de Metas"
                break
              case "invoices":
                headers = {
                  client: "Cliente",
                  amount: "Valor",
                  issue_date: "Data de Emissão",
                  due_date: "Data de Vencimento",
                  status: "Status",
                }
                dateFields = ["issue_date", "due_date"]
                title = "Relatório de Faturas"
                break
            }

            await exportToPDF(data, headers, title, `safe_finance_${key}`, dateFields as any, "landscape")
          }
        }

        toast({
          title: "Exportação concluída",
          description: "Os dados foram exportados com sucesso",
        })
      }
    } catch (error) {
      console.error("Erro na exportação:", error)
      toast({
        title: "Erro na exportação",
        description: "Ocorreu um erro ao exportar os dados",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exportar Dados</CardTitle>
        <CardDescription>Exporte seus dados financeiros para análise externa</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Período</Label>
          <DatePickerWithRange date={date} setDate={setDate} />
        </div>

        <div className="space-y-2">
          <Label>Formato de Exportação</Label>
          <Select value={exportFormat} onValueChange={(value: "csv" | "pdf") => setExportFormat(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o formato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">
                <div className="flex items-center">
                  <Table className="mr-2 h-4 w-4" />
                  <span>CSV (Excel, Planilhas)</span>
                </div>
              </SelectItem>
              <SelectItem value="pdf">
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>PDF (Documento)</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Dados a Exportar</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="transactions"
                checked={selectedData.transactions}
                onCheckedChange={(checked) => setSelectedData({ ...selectedData, transactions: !!checked })}
              />
              <Label htmlFor="transactions">Transações</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="accounts"
                checked={selectedData.accounts}
                onCheckedChange={(checked) => setSelectedData({ ...selectedData, accounts: !!checked })}
              />
              <Label htmlFor="accounts">Contas</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="budgets"
                checked={selectedData.budgets}
                onCheckedChange={(checked) => setSelectedData({ ...selectedData, budgets: !!checked })}
              />
              <Label htmlFor="budgets">Orçamentos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="goals"
                checked={selectedData.goals}
                onCheckedChange={(checked) => setSelectedData({ ...selectedData, goals: !!checked })}
              />
              <Label htmlFor="goals">Metas</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="invoices"
                checked={selectedData.invoices}
                onCheckedChange={(checked) => setSelectedData({ ...selectedData, invoices: !!checked })}
              />
              <Label htmlFor="invoices">Faturas</Label>
            </div>
          </div>
        </div>

        <Button
          className="w-full"
          onClick={handleExport}
          disabled={isLoading || !Object.values(selectedData).some(Boolean)}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Exportando...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" /> Exportar Dados
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
