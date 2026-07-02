"use client";

import { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export interface BudgetCategory {
  name: string;
  spent: number;
  budget: number;
}

export function useBudgetData(userId: string) {
  const budgetsRaw = useQuery(api.budgets.list, {
    userId: userId as Id<"users">,
  });

  const isLoading = budgetsRaw === undefined;
  const budgets = budgetsRaw ?? [];

  const budgetCategories: BudgetCategory[] = useMemo(() => {
    return budgets.map((b) => ({
      name: b.category,
      spent: b.spent_amount,
      budget: b.amount,
    }));
  }, [budgets]);

  const totalBudget = useMemo(
    () => budgetCategories.reduce((sum, category) => sum + category.budget, 0),
    [budgetCategories],
  );

  const totalSpent = useMemo(
    () => budgetCategories.reduce((sum, category) => sum + category.spent, 0),
    [budgetCategories],
  );

  const overallPercentage = useMemo(
    () => (totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0),
    [totalSpent, totalBudget],
  );

  return { budgetCategories, totalBudget, totalSpent, overallPercentage, isLoading };
}
