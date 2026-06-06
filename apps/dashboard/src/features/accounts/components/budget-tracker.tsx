"use client";

import { useBudgetData } from "../hooks/use-budget-data";
import { BudgetTrackerView } from "./budget-tracker-view";

export function BudgetTracker({ userId }: { userId: string }) {
  const { budgetCategories, totalBudget, totalSpent, overallPercentage, isLoading } = useBudgetData(userId);

  return (
    <BudgetTrackerView 
      budgetCategories={budgetCategories} 
      totalBudget={totalBudget} 
      totalSpent={totalSpent} 
      overallPercentage={overallPercentage} 
      isLoading={isLoading} 
    />
  );
}
