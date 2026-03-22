import type { Metadata } from "next"
import { GreenBudgetManager } from "@/components/sustainability/green-budget-manager"

export const metadata: Metadata = {
  title: "Orçamentos Verdes | Sustentabilidade",
  description: "Gerencie seus gastos sustentáveis e metas de carbono",
}

export default function GreenBudgetsPage() {
  return (
    <div className="container mx-auto p-6">
      <GreenBudgetManager />
    </div>
  )
}
