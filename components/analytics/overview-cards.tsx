import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, CreditCard, TrendingUp } from "lucide-react"
import { useLocale } from "@/contexts/locale-context"

const cards = [
  {
    title: "Receita Total",
    icon: DollarSign,
    amount: 45231.89,
    description: "+20,1% em relação ao mês anterior",
    trend: "up",
  },
  {
    title: "Novos Clientes",
    icon: Users,
    amount: 2350,
    description: "+180,1% em relação ao mês anterior",
    trend: "up",
  },
  {
    title: "Contas Ativas",
    icon: CreditCard,
    amount: 12234,
    description: "+19% em relação ao mês anterior",
    trend: "up",
  },
  {
    title: "Taxa de Crescimento",
    icon: TrendingUp,
    amount: 18.6,
    description: "+5,4% em relação ao mês anterior",
    trend: "up",
  },
]

export function OverviewCards() {
  const { formatCurrency } = useLocale?.() || {
    formatCurrency: (value) => {
      if (typeof value === "number" && value % 1 !== 0) {
        return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
      } else if (typeof value === "number") {
        return `R$ ${value.toLocaleString("pt-BR")}`
      }
      return `R$ ${value}`
    },
  }

  return (
    <>
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {card.title === "Taxa de Crescimento" ? `${card.amount}%` : formatCurrency(card.amount)}
            </div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
            <div
              className={`mt-2 flex items-center text-xs ${card.trend === "up" ? "text-green-500" : "text-red-500"}`}
            >
              {card.trend === "up" ? (
                <TrendingUp className="mr-1 h-3 w-3" />
              ) : (
                <TrendingUp className="mr-1 h-3 w-3 transform rotate-180" />
              )}
              {card.description.split(" ")[0]}
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
