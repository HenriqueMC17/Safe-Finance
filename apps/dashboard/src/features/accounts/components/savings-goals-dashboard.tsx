"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Progress } from "@/shared/ui/progress"
import { Button } from "@/shared/ui/button"
import { PlusCircle } from "lucide-react"
import { useLocale } from "@/shared/contexts/locale-context"
import { Skeleton } from "@/shared/ui/skeleton"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

interface SavingsGoal {
  id: string | number
  name: string
  target_amount: number
  current_amount: number
  target_date: string
}

interface SavingsGoalsDashboardProps {
  userId: string | number
}

export function SavingsGoalsDashboard({ userId }: SavingsGoalsDashboardProps) {
  const { formatCurrency } = useLocale()
  const goalsRaw = useQuery(api.savings_goals.list, { 
    userId: userId as Id<"users">
  })
  const [goals, setGoals] = useState<SavingsGoal[]>([])

  useEffect(() => {
    if (goalsRaw) {
      setGoals(goalsRaw.map(v => ({
        id: v._id,
        name: v.name,
        target_amount: v.target_amount,
        current_amount: v.current_amount,
        target_date: v.target_date || ""
      })))
    }
  }, [goalsRaw])

  const isLoading = goalsRaw === undefined;
  const error = null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR").format(date)
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium">Metas de Economia</CardTitle>
          <Button variant="outline" size="icon" disabled>
            <PlusCircle className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium">Metas de Economia</CardTitle>
          <Button variant="outline" size="icon">
            <PlusCircle className="h-4 w-4 text-primary" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-center text-red-500">{error}</div>
        </CardContent>
      </Card>
    )
  }

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
          {goals.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              Nenhuma meta de economia encontrada. Clique no botão + para adicionar uma nova meta.
            </div>
          ) : (
            goals.map((goal) => {
              const percentage = (Number(goal.current_amount) / Number(goal.target_amount)) * 100
              return (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{goal.name}</span>
                    <span>
                      {formatCurrency(Number(goal.current_amount))} / {formatCurrency(Number(goal.target_amount))}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2 bg-secondary [&>div]:bg-primary" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{percentage.toFixed(1)}% completo</span>
                    <span>Meta: {formatDate(goal.target_date)}</span>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
