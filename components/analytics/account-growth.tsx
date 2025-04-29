"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"
import { useLocale } from "@/contexts/locale-context"

const monthsInPortuguese = {
  Jan: "Jan",
  Feb: "Fev",
  Mar: "Mar",
  Apr: "Abr",
  May: "Mai",
  Jun: "Jun",
  Jul: "Jul",
  Aug: "Ago",
  Sep: "Set",
  Oct: "Out",
  Nov: "Nov",
  Dec: "Dez",
}

const rawData = [
  { month: "Jan", newAccounts: 100, totalAccounts: 1000 },
  { month: "Feb", newAccounts: 120, totalAccounts: 1120 },
  { month: "Mar", newAccounts: 150, totalAccounts: 1270 },
  { month: "Apr", newAccounts: 180, totalAccounts: 1450 },
  { month: "May", newAccounts: 200, totalAccounts: 1650 },
  { month: "Jun", newAccounts: 220, totalAccounts: 1870 },
]

export function AccountGrowth() {
  const { theme } = useTheme()
  const { formatCurrency } = useLocale?.() || {
    formatCurrency: (value) => `R$ ${value.toLocaleString("pt-BR")}`,
  }

  // Traduzir os meses para português
  const data = rawData.map((item) => ({
    ...item,
    monthPt: monthsInPortuguese[item.month],
  }))

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const monthPt = monthsInPortuguese[label]
      return (
        <Card className="border-none shadow-lg">
          <CardContent className="p-2">
            <p className="text-sm font-semibold">{monthPt}</p>
            <p className="text-sm text-muted-foreground">Novas Contas: {payload[0].value}</p>
            <p className="text-sm text-muted-foreground">Total de Contas: {payload[1].value}</p>
          </CardContent>
        </Card>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="monthPt"
          stroke={theme === "dark" ? "#888888" : "#333333"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis stroke={theme === "dark" ? "#888888" : "#333333"} fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="newAccounts"
          name="Novas Contas"
          fill={theme === "dark" ? "#adfa1d" : "#0ea5e9"}
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="totalAccounts"
          name="Total de Contas"
          fill={theme === "dark" ? "#1e40af" : "#3b82f6"}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
