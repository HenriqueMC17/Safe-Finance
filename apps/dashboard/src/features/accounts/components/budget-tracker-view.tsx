"use client";

import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle, Progress } from "@/shared/ui";
import { useLocale } from "@/shared/contexts/locale-context";
import { motion } from "framer-motion";
import { type BudgetCategory } from "../hooks/use-budget-data";

interface BudgetTrackerViewProps {
  budgetCategories: BudgetCategory[];
  totalBudget: number;
  totalSpent: number;
  overallPercentage: number;
  isLoading?: boolean;
}

const BudgetTrackerViewComponent = ({
  budgetCategories,
  totalBudget,
  totalSpent,
  overallPercentage,
  isLoading,
}: BudgetTrackerViewProps) => {
  const { formatCurrency } = useLocale();

  return (
    <Card className="rounded-none border border-border/50 bg-background/80 backdrop-blur-md relative overflow-hidden group">
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      <CardHeader className="pb-4 border-b border-border/30 mb-4">
        <CardTitle className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground flex items-center justify-between">
          <span>Orçamento Disponível</span>
          <span className="h-px bg-border/50 flex-1 ml-4" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Volume de Gastos</span>
            <span className="text-lg font-mono tracking-tight text-primary">
              {formatCurrency(totalSpent)} / {formatCurrency(totalBudget)}
            </span>
          </div>
          <Progress value={overallPercentage} className="h-1 rounded-none bg-muted/30 [&>div]:bg-primary" />
          <p className="text-[10px] text-muted-foreground text-right font-mono uppercase tracking-tighter opacity-70">
            {overallPercentage.toFixed(1)}% do orçamento utilizado
          </p>

          <div className="space-y-4 pt-4">
            {budgetCategories.map((category) => {
              const percentage = (category.spent / category.budget) * 100;
              return (
                <div key={category.name} className="grid grid-cols-1 gap-2 group/item">
                  <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest">
                    <span className="text-foreground group-hover/item:text-primary transition-colors">{category.name}</span>
                    <span className="text-muted-foreground">{percentage.toFixed(0)}%</span>
                  </div>
                  <Progress value={percentage} className="h-0.5 rounded-none bg-muted/20 [&>div]:bg-primary/60" />
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const BudgetTrackerView = memo(BudgetTrackerViewComponent);
