import { memo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Progress } from "@/shared/ui/progress"
import { Button } from "@/shared/ui/button"
import { PlusCircle } from "lucide-react"
import { useLocale } from "@/shared/contexts/locale-context"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

interface SavingsGoalsProps {
  userId: string
}

export const SavingsGoals = memo(function SavingsGoals({ userId }: SavingsGoalsProps) {
  const { formatCurrency } = useLocale()
  const goalsRaw = useQuery(api.savings_goals.list, {
    userId: userId as Id<"users">,
  })

  const isLoading = goalsRaw === undefined
  const goals = goalsRaw ?? []

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
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-10 w-full animate-pulse bg-muted rounded"></div>
              <div className="h-10 w-full animate-pulse bg-muted rounded"></div>
            </div>
          ) : goals.length === 0 ? (
            <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
              Nenhuma meta definida.
            </div>
          ) : (
            goals.map((goal) => {
              const percentage = (goal.current_amount / goal.target_amount) * 100
              return (
                <div key={goal._id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{goal.name}</span>
                    <span>
                      {formatCurrency(goal.current_amount)} / {formatCurrency(goal.target_amount)}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2 bg-secondary [&>div]:bg-primary" />
                  <p className="text-xs text-right text-muted-foreground">{percentage.toFixed(1)}% completo</p>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
})
