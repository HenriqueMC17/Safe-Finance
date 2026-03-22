import type { Metadata } from "next"
import { SustainabilityDashboard } from "@/components/sustainability/sustainability-dashboard"

export const metadata: Metadata = {
  title: "Sustentabilidade | Dashboard Financeiro",
  description: "Acompanhe seu impacto ambiental e conquistas verdes",
}

export default function SustainabilityPage() {
  return (
    <div className="container mx-auto p-6">
      <SustainabilityDashboard />
    </div>
  )
}
