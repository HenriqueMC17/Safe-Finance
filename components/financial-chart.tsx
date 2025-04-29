"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
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
  { month: "Jan", income: 2000, expenses: 1800 },
  { month: "Feb", income: 2200, expenses: 1900 },
  { month: "Mar", income: 2400, expenses: 2000 },
  { month: "Apr", income: 2600, expenses: 2200 },
  { month: "May", income: 2800, expenses: 2400 },
  { month: "Jun", income: 3000, expenses: 2600 },
]

export function FinancialChart() {
  const { theme } = useTheme()
  const { formatCurrency } = useLocale()

  // Memoize translated data
  const data = useMemo(
    () =>
      rawData.map((item) => ({
        ...item,
        monthPt: monthsInPortuguese[item.month],
      })),
    [],
  )

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const monthPt = monthsInPortuguese[label]
      return (
        <div className="bg-background p-3 border border-border rounded-md shadow-md">
          <p className="font-medium">{monthPt}</p>
          <p className="text-sm">Receita: {formatCurrency(payload[0].value)}</p>
          <p className="text-sm">Despesas: {formatCurrency(payload[1].value)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visão Financeira</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="monthPt" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => formatCurrency(value).replace(/[^0-9]/g, "")}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                name="Receita"
                dataKey="income"
                stroke={theme === "dark" ? "#50c8a8" : "#50c8a8"}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                name="Despesas"
                dataKey="expenses"
                stroke={theme === "dark" ? "#213133" : "#213133"}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
