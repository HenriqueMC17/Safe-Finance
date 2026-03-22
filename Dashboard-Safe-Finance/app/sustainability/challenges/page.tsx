import type { Metadata } from "next"
import { SustainabilityChallenges } from "@/components/sustainability/sustainability-challenges"

export const metadata: Metadata = {
  title: "Desafios | Sustentabilidade",
  description: "Participe de desafios sustentáveis e ganhe pontos",
}

export default function ChallengesPage() {
  return (
    <div className="container mx-auto p-6">
      <SustainabilityChallenges />
    </div>
  )
}
