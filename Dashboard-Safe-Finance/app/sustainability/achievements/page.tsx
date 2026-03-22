import type { Metadata } from "next"
import { SustainabilityBadges } from "@/components/sustainability/sustainability-badges"

export const metadata: Metadata = {
  title: "Conquistas | Sustentabilidade",
  description: "Veja suas badges e conquistas sustentáveis",
}

export default function AchievementsPage() {
  return (
    <div className="container mx-auto p-6">
      <SustainabilityBadges />
    </div>
  )
}
