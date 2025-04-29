"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useTheme } from "next-themes"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useLocale } from "@/contexts/locale-context"

const customerSegmentationData = [
  { segment: "Alto Valor", count: 1200 },
  { segment: "Médio Valor", count: 5300 },
  { segment: "Baixo Valor", count: 8500 },
  { segment: "Em Risco", count: 1700 },
  { segment: "Perdidos", count: 800 },
]

const retentionRateData = [
  { month: "Jan", rate: 95 },
  { month: "Fev", rate: 93 },
  { month: "Mar", rate: 94 },
  { month: "Abr", rate: 95 },
  { month: "Mai", rate: 97 },
  { month: "Jun", rate: 98 },
]

const channelPerformanceData = [
  { channel: "Direto", acquisitions: 1200, revenue: 50000 },
  { channel: "Busca Orgânica", acquisitions: 2500, revenue: 75000 },
  { channel: "Busca Paga", acquisitions: 1800, revenue: 60000 },
  { channel: "Redes Sociais", acquisitions: 1500, revenue: 45000 },
  { channel: "Email", acquisitions: 900, revenue: 30000 },
]

export function AnalyticsTab() {
  const { theme } = useTheme()
  const [timeFrame, setTimeFrame] = useState("last_30_days")
  const { formatCurrency } = useLocale?.() || {
    formatCurrency: (value) => `R$ ${value.toLocaleString("pt-BR")}`,
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Análises Detalhadas</h3>
        <Select value={timeFrame} onValueChange={setTimeFrame}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last_7_days">Últimos 7 Dias</SelectItem>
            <SelectItem value="last_30_days">Últimos 30 Dias</SelectItem>
            <SelectItem value="last_90_days">Últimos 90 Dias</SelectItem>
            <SelectItem value="last_12_months">Últimos 12 Meses</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Segmentação de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={customerSegmentationData}>
                <XAxis dataKey="segment" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} clientes`, "Quantidade"]} />
                <Bar dataKey="count" name="Quantidade" fill={theme === "dark" ? "#adfa1d" : "#0ea5e9"} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Taxa de Retenção de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={retentionRateData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, "Taxa"]} />
                <Line type="monotone" dataKey="rate" name="Taxa" stroke={theme === "dark" ? "#adfa1d" : "#0ea5e9"} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Desempenho por Canal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={channelPerformanceData}>
                <XAxis dataKey="channel" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "acquisitions") return [`${value} clientes`, "Aquisições"]
                    return [formatCurrency(value), "Receita"]
                  }}
                />
                <Bar
                  yAxisId="left"
                  dataKey="acquisitions"
                  name="Aquisições"
                  fill={theme === "dark" ? "#adfa1d" : "#0ea5e9"}
                />
                <Bar yAxisId="right" dataKey="revenue" name="Receita" fill={theme === "dark" ? "#1e40af" : "#3b82f6"} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
