import type { Metadata } from "next"
import { CarbonFootprintCalculator } from "@/components/sustainability/carbon-footprint-calculator"

export const metadata: Metadata = {
  title: "Pegada de Carbono | Sustentabilidade",
  description: "Calcule e monitore suas emissões de CO₂",
}

export default function CarbonFootprintPage() {
  return (
    <div className="container mx-auto p-6">
      <CarbonFootprintCalculator />
    </div>
  )
}
