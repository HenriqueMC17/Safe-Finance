"use client";

import { useState, useEffect } from "react";

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  type: "credit" | "debit";
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const mockTransactions: Transaction[] = [
          {
            id: 1,
            description: "Supermercado Extra",
            amount: 250.75,
            date: "2023-04-25",
            type: "debit",
          },
          {
            id: 2,
            description: "Salário",
            amount: 5000.0,
            date: "2023-04-20",
            type: "credit",
          },
          {
            id: 3,
            description: "Netflix",
            amount: 39.9,
            date: "2023-04-18",
            type: "debit",
          },
          {
            id: 4,
            description: "Transferência recebida",
            amount: 1200.0,
            date: "2023-04-15",
            type: "credit",
          },
          {
            id: 5,
            description: "Restaurante",
            amount: 89.9,
            date: "2023-04-12",
            type: "debit",
          },
        ];

        setTransactions(mockTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return { transactions, isLoading };
}
