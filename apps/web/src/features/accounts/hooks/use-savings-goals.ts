"use client";

import { useMemo } from "react";

export interface SavingsGoal {
  name: string;
  current: number;
  target: number;
}

const mockGoals: SavingsGoal[] = [
  { name: "Fundo de Emergência", current: 10000, target: 25000 },
  { name: "Férias", current: 3000, target: 5000 },
  { name: "Carro Novo", current: 15000, target: 35000 },
];

export function useSavingsGoals() {
  const goals = useMemo(() => mockGoals, []);

  return { goals, isLoading: false };
}
