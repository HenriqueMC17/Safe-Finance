"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Printer } from "lucide-react"
import { ExportDataButton } from "@/components/export-data-button"
import { exportToPDF } from "@/lib/pdf-export"
import { useLocale } from "@/contexts/locale-context"

const reportTypes = [
  "Resumo Financeiro",
  "Aquisição de Clientes",
  "Desempenho de Produtos",
  "Avaliação de Riscos",
  "Análise de Campanhas de Marketing",
  "Eficiência Operacional",
]

const dummyReportData = {
  "Resumo Financeiro": [
    { id: 1, metric: "Receita Total", value: "R$ 1.234.567" },
    { id: 2, metric: "Lucro Líquido", value: "R$ 345.678" },
    { id: 3, metric: "Despesas Operacionais", value: "R$ 567.890" },
    { id: 4, metric: "Margem Bruta", value: "28%" },
    { id: 5, metric: "Retorno sobre Investimento", value: "15%" },
  ],
  "Aquisição de Clientes": [
    { id: 1, metric: "Novos Clientes", value: "1.234" },
    { id: 2, metric: "Custo de Aquisição de Cliente", value: "R$ 50" },
    { id: 3, metric: "Taxa de Conversão", value: "3,5%" },
    { id: 4, metric: "Valor do Cliente ao Longo da Vida", value: "R$ 1.200" },
    { id: 5, metric: "Taxa de Cancelamento", value: "2,3%" },
  ],
  "Desempenho de Produtos": [
    { id: 1, metric: "Produto Mais Vendido", value: "Plano Premium" },
    { id: 2, metric: "Receita por Produto", value: "R$ 450.000" },
    { id: 3, metric: "Taxa de Crescimento", value: "12%" },
    { id: 4, metric: "Margem de Lucro", value: "35%" },
    { id: 5, metric: "Satisfação do Cliente", value: "4,7/5" },
  ],
  "Avaliação de Riscos": [
    { id: 1, metric: "Índice de Inadimplência", value: "1,8%" },
    { id: 2, metric: "Exposição ao Risco", value: "R$ 250.000" },
    { id: 3, metric: "Reserva para Perdas", value: "R$ 75.000" },
    { id: 4, metric: "Classificação de Risco Média", value: "B+" },
    { id: 5, metric: "Conformidade Regulatória", value: "98%" },
  ],
  "Análise de Campanhas de Marketing": [
    { id: 1, metric: "ROI de Marketing", value: "320%" },
    { id: 2, metric: "Custo por Clique", value: "R$ 1,25" },
    { id: 3, metric: "Taxa de Engajamento", value: "4,2%" },
    { id: 4, metric: "Alcance da Campanha", value: "250.000" },
    { id: 5, metric: "Conversões", value: "3.500" },
  ],
  "Eficiência Operacional": [
    { id: 1, metric: "Tempo Médio de Processamento", value: "2,3 dias" },
    { id: 2, metric: "Custo por Transação", value: "R$ 3,50" },
    { id: 3, metric: "Taxa de Erro", value: "0,5%" },
    { id: 4, metric: "Utilização de Recursos", value: "78%" },
    { id: 5, metric: "Tempo de Inatividade", value: "0,1%" },
  ],
}

export function ReportsTab() {
  const [selectedReport, setSelectedReport] = useState(reportTypes[0])
  const { formatCurrency } = useLocale()

  const handleGenerateReport = () => {
    console.log(`Gerando relatório ${selectedReport}...`)
  }

  const handlePrintReport = () => {
    window.print()
  }

  // Função para exportar relatório para PDF
  const handleExportPDF = async () => {
    const reportData = dummyReportData[selectedReport]

    const headers = {
      metric: "Métrica",
      value: "Valor",
    }

    await exportToPDF(
      reportData,
      headers,
      `Relatório: ${selectedReport}`,
      `relatorio_${selectedReport.toLowerCase().replace(/ /g, "_")}`,
      [],
      "portrait",
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Gerar Relatório</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <Select value={selectedReport} onValueChange={setSelectedReport}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Selecione o tipo de relatório" />
            </SelectTrigger>
            <SelectContent>
              {reportTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleGenerateReport}>Gerar Relatório</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">Relatório: {selectedReport}</CardTitle>
          <div className="flex space-x-2">
            <ExportDataButton
              data={dummyReportData[selectedReport]}
              headers={{
                metric: "Métrica",
                value: "Valor",
              }}
              filename={`relatorio_${selectedReport.toLowerCase().replace(/ /g, "_")}`}
              label="Exportar"
              onExportPDF={handleExportPDF}
            />
            <Button variant="outline" onClick={handlePrintReport}>
              <Printer className="mr-2 h-4 w-4" />
              Imprimir
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Métrica</TableHead>
                <TableHead>Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyReportData[selectedReport]?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.metric}</TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
