import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMemo } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useLocale } from "@/shared/contexts/locale-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

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

export function FinancialChart({ userId }: { userId: string }) {
  const { theme } = useTheme()
  const { formatCurrency } = useLocale()

  const rawData = useQuery(api.analytics.getChartData, {
    userId: userId as Id<"users">,
    months: 6,
  });

  const isLoading = rawData === undefined;
  
  // Memoize translated data
  const data = useMemo(
    () =>
      (rawData ?? []).map((item) => ({
        ...item,
        monthPt: monthsInPortuguese[item.month as keyof typeof monthsInPortuguese] || item.month,
      })),
    [rawData],
  )

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const monthPt = label
      return (
        <div className="bg-background/90 backdrop-blur-sm p-4 border border-border/50 shadow-2xl rounded-none">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">{monthPt}</p>
          <div className="space-y-1">
            <p className="font-mono text-sm text-primary drop-shadow-[0_0_8px_rgba(0,255,209,0.3)]">
              REC: {formatCurrency(payload[0].value)}
            </p>
            <p className="font-mono text-sm text-destructive drop-shadow-[0_0_8px_rgba(255,0,0,0.3)]">
              DES: {formatCurrency(payload[1].value)}
            </p>
          </div>
        </div>
      )
    }
    return null
  }

  if (isLoading) {
    return (
      <Card className="rounded-none border border-border/50 bg-background/80 backdrop-blur-md h-full flex items-center justify-center">
        <div className="font-mono text-xs uppercase animate-pulse">Carregando dados...</div>
      </Card>
    );
  }

  return (
    <Card className="rounded-none border border-border/50 bg-background/80 backdrop-blur-md relative overflow-hidden h-full flex flex-col group transition-colors duration-500 hover:border-primary/30">
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:bg-primary/10 transition-colors duration-700" />

      <CardHeader className="pb-4">
        <CardTitle className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground flex items-center justify-between">
          <span>Fluxo de Caixa</span>
          <span className="h-px bg-border/50 flex-1 ml-4" />
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pb-4 flex-1">
        <motion.div 
          className="h-[300px] w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
              <XAxis 
                dataKey="monthPt" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                dy={10}
                style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                style={{ fontFamily: 'monospace' }}
                tickFormatter={(value) => `R$ ${value >= 1000 ? (value/1000).toFixed(0) + 'k' : value}`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1, strokeDasharray: "3 3" }} />
              <Line
                type="step"
                name="Receita"
                dataKey="income"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ r: 0 }}
                activeDot={{ r: 4, fill: "hsl(var(--primary))", stroke: "hsl(var(--background))", strokeWidth: 2 }}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
              <Line
                type="step"
                name="Despesas"
                dataKey="expenses"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                dot={{ r: 0 }}
                activeDot={{ r: 4, fill: "hsl(var(--destructive))", stroke: "hsl(var(--background))", strokeWidth: 2 }}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </CardContent>
    </Card>
  )
}
