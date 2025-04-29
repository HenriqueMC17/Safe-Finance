"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useLocale } from "@/contexts/locale-context"
import { memo } from "react"

const savingsGoals = [
  { name: "Fundo de Emergência", current: 10000, target: 25000 },
  { name: "Férias", current: 3000, target: 5000 },
  { name: "Carro Novo", current: 15000, target: 35000 },
]

export const SavingsGoals = memo(function SavingsGoals() {
  const { formatCurrency } = useLocale()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">Metas de Economia</CardTitle>
        <Button variant="outline" size="icon">
          <PlusCircle className="h-4 w-4 text-primary" />
          <span className="sr-only">Adicionar nova meta de economia</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {savingsGoals.map((goal) => {
            const percentage = (goal.current / goal.target) * 100
            return (
              <div key={goal.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{goal.name}</span>
                  <span>
                    {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
                  </span>
                </div>
                <Progress value={percentage} className="h-2 bg-secondary [&>div]:bg-primary" />
                <p className="text-xs text-right text-muted-foreground">{percentage.toFixed(1)}% completo</p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
})
