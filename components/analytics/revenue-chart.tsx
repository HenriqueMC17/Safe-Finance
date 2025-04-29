"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"
import { useLocale } from "@/contexts/locale-context"
import { useMemo } from "react"

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
  { month: "Jan", revenue: 2000 },
  { month: "Feb", revenue: 2200 },
  { month: "Mar", revenue: 2700 },
  { month: "Apr", revenue: 2400 },
  { month: "May", revenue: 2800 },
  { month: "Jun", revenue: 3200 },
  { month: "Jul", revenue: 3100 },
  { month: "Aug", revenue: 3400 },
  { month: "Sep", revenue: 3700 },
  { month: "Oct", revenue: 3500 },
  { month: "Nov", revenue: 3800 },
  { month: "Dec", revenue: 4200 },
]

export function RevenueChart() {
  const { theme } = useTheme()
  const { formatCurrency } = useLocale?.() || {
    formatCurrency: (value) => `R$ ${value.toLocaleString("pt-BR")}`,
  }

  // Traduzir os meses para português
  const data = useMemo(() => {
    return rawData.map((item) => ({
      ...item,
      monthPt: monthsInPortuguese[item.month],
    }))
  }, [])

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const monthPt = monthsInPortuguese[label]
      return (
        <Card className="border-none shadow-lg">
          <CardContent className="p-2">
            <p className="text-sm font-semibold">{monthPt}</p>
            <p className="text-sm text-muted-foreground">Receita: {formatCurrency(payload[0].value)}</p>
          </CardContent>
        </Card>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis
          dataKey="monthPt"
          stroke={theme === "dark" ? "#888888" : "#333333"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke={theme === "dark" ? "#888888" : "#333333"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `R$ ${value}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="revenue"
          name="Receita"
          stroke={theme === "dark" ? "#adfa1d" : "#0ea5e9"}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
