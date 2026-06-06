"use client";

import { memo } from "react";
import { PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Progress, Button } from "@/shared/ui";
import { useLocale } from "@/shared/contexts/locale-context";
import { type SavingsGoal } from "../hooks/use-savings-goals";

interface SavingsGoalsListProps {
  goals: SavingsGoal[];
  isLoading?: boolean;
}

const SavingsGoalsListComponent = ({ goals, isLoading }: SavingsGoalsListProps) => {
  const { formatCurrency } = useLocale();

  return (
    <Card className="rounded-none border border-border/50 bg-background/80 backdrop-blur-md relative overflow-hidden group">
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-border/30 mb-4">
        <CardTitle className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground flex items-center justify-between flex-1">
          <span>Metas de Economia</span>
          <span className="h-px bg-border/50 flex-1 ml-4 mr-4" />
        </CardTitle>
        <Button variant="outline" size="icon" className="h-8 w-8 rounded-none border-primary/30 hover:border-primary/60 transition-colors">
          <PlusCircle className="h-4 w-4 text-primary" />
          <span className="sr-only">Adicionar nova meta de economia</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.map((goal) => {
            const percentage = (goal.current / goal.target) * 100;
            return (
              <div key={goal.name} className="space-y-2 group/item">
                <div className="flex justify-between text-xs font-mono uppercase tracking-widest">
                  <span className="text-foreground group-hover/item:text-primary transition-colors">{goal.name}</span>
                  <span className="text-muted-foreground">
                    {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
                  </span>
                </div>
                <Progress value={percentage} className="h-1 rounded-none bg-muted/30 [&>div]:bg-primary" />
                <p className="text-[10px] text-right text-muted-foreground font-mono uppercase tracking-tighter opacity-70">
                  {percentage.toFixed(1)}% completo
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export const SavingsGoalsList = memo(SavingsGoalsListComponent);
