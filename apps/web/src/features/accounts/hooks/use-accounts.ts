"use client";

import { useState, useEffect } from "react";

export interface Account {
  id: number;
  name: string;
  balance: number;
  type: string;
}

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    const fetchAccounts = async () => {
      setIsLoading(true);
      try {
        // Mock data matching the original implementation
        const mockAccounts: Account[] = [
          {
            id: 1,
            name: "Conta Corrente",
            balance: 12500.75,
            type: "checking",
          },
          {
            id: 2,
            name: "Poupança",
            balance: 45000.32,
            type: "savings",
          },
          {
            id: 3,
            name: "Investimentos",
            balance: 78900.45,
            type: "investment",
          },
        ];

        setAccounts(mockAccounts);
        const total = mockAccounts.reduce((sum, account) => sum + account.balance, 0);
        setTotalBalance(total);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  return { accounts, isLoading, totalBalance };
}
