"use client";

import { useMemo } from "react";

const monthsInPortuguese = {
  Jan: "Jan",
  Feb: "Fev",
  Mar: "Mar",
  Apr: "Abr",
  May: "Mai",
  Jun: "Jun",
  Jul: "Jul",
  Aug: "Ago",
  Sep: "Set",
  Oct: "Out",
  Nov: "Nov",
  Dec: "Dez",
};

const rawData = [
  { month: "Jan", income: 2000, expenses: 1800 },
  { month: "Feb", income: 2200, expenses: 1900 },
  { month: "Mar", income: 2400, expenses: 2000 },
  { month: "Apr", income: 2600, expenses: 2200 },
  { month: "May", income: 2800, expenses: 2400 },
  { month: "Jun", income: 3000, expenses: 2600 },
];

export function useFinancialData() {
  const data = useMemo(
    () =>
      rawData.map((item) => ({
        ...item,
        monthPt: monthsInPortuguese[item.month as keyof typeof monthsInPortuguese],
      })),
    [],
  );

  return { data, isLoading: false };
}
