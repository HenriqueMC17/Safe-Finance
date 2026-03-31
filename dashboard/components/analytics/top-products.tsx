import { CheckCircle2 } from "lucide-react"
import { useLocale } from "@/contexts/locale-context"

const topProducts = [
  { name: "Conta Poupança", revenue: 1200000, growth: "+12%" },
  { name: "Cartão de Crédito", revenue: 980000, growth: "+8%" },
  { name: "Empréstimo Pessoal", revenue: 850000, growth: "+15%" },
  { name: "Financiamento Imobiliário", revenue: 2300000, growth: "+5%" },
  { name: "Fundo de Investimento", revenue: 1800000, growth: "+20%" },
]

export function TopProducts() {
  const { formatCurrency } = useLocale?.() || { formatCurrency: (value) => `R$ ${value.toLocaleString("pt-BR")}` }

  return (
    <div className="space-y-8">
      {topProducts.map((product) => (
        <div key={product.name} className="flex items-center">
          <CheckCircle2 className="mr-2 h-4 w-4 text-muted-foreground" />
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{product.name}</p>
            <p className="text-sm text-muted-foreground">{formatCurrency(product.revenue)}</p>
          </div>
          <div className="ml-auto font-medium text-green-500">{product.growth}</div>
        </div>
      ))}
    </div>
  )
}
