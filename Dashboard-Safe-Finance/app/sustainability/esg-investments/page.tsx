import type { Metadata } from "next"
import { ESGInvestmentPortfolio } from "@/components/sustainability/esg-investment-portfolio"

export const metadata: Metadata = {
  title: "Investimentos ESG | Sustentabilidade",
  description: "Gerencie seu portfólio de investimentos sustentáveis",
}

export default function ESGInvestmentsPage() {
  return (
    <div className="container mx-auto p-6">
      <ESGInvestmentPortfolio />
    </div>
  )
}
