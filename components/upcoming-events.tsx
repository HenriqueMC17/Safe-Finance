"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, PiggyBank, TrendingUp, CreditCard, ArrowRight } from "lucide-react"
import { useLocale } from "@/contexts/locale-context"
import { memo } from "react"

const events = [
  {
    id: 1,
    title: "Fundo de Emergência",
    subtitle: "3 meses de despesas economizadas",
    icon: PiggyBank,
    status: "Em Andamento",
    progress: 65,
    target: 15000,
    date: "Dez 2024",
  },
  {
    id: 2,
    title: "Portfólio de Ações",
    subtitle: "Plano de investimento no setor de tecnologia",
    icon: TrendingUp,
    status: "Pendente",
    progress: 30,
    target: 50000,
    date: "Jun 2024",
  },
  {
    id: 3,
    title: "Pagamento de Dívidas",
    subtitle: "Plano de quitação de empréstimo estudantil",
    icon: CreditCard,
    status: "Em Andamento",
    progress: 45,
    target: 25000,
    date: "Mar 2025",
  },
]

const statusColors = {
  Pendente: "bg-yellow-500/20 text-yellow-500",
  "Em Andamento": "bg-primary/20 text-primary",
  Concluído: "bg-primary/20 text-primary",
}

export const UpcomingEvents = memo(function UpcomingEvents() {
  const { formatCurrency } = useLocale()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Próximos Eventos</h2>
        <Button variant="outline" size="sm">
          Ver Todos <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{event.title}</CardTitle>
              <event.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{event.subtitle}</p>
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className={`px-2 py-1 rounded-full ${statusColors[event.status]}`}>{event.status}</span>
                  <span className="text-muted-foreground">
                    <Calendar className="inline mr-1 h-3 w-3" />
                    {event.date}
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: `${event.progress}%` }} />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">{formatCurrency(event.target)}</span>
                  <span className="text-muted-foreground">{event.progress}% completo</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
})
