import { v } from "convex/values";
import { query } from "./_generated/server";

export const getChartData = query({
  args: {
    userId: v.id("users"),
    months: v.number(),
  },
  handler: async (ctx, args) => {
    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_user", (q) => q.eq("user_id", args.userId))
      .collect();

    const grouped = new Map<string, { income: number; expenses: number }>();

    const now = new Date();
    const targetMonths: string[] = [];
    for (let i = args.months - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthStr = d.toLocaleString('en-US', { month: 'short' });
      const year = d.getFullYear();
      const key = `${monthStr} ${year}`;
      targetMonths.push(key);
      grouped.set(key, { income: 0, expenses: 0 });
    }

    transactions.forEach((tx) => {
      const txDate = new Date(tx.date);
      const monthStr = txDate.toLocaleString('en-US', { month: 'short' });
      const year = txDate.getFullYear();
      const key = `${monthStr} ${year}`;

      if (grouped.has(key)) {
        const current = grouped.get(key)!;
        if (tx.type === "income" || tx.type === "credit") {
          current.income += Math.abs(tx.amount);
        } else {
          current.expenses += Math.abs(tx.amount);
        }
      }
    });

    return targetMonths.map((month) => ({
      month: month.split(' ')[0],
      fullMonth: month,
      ...grouped.get(month)!,
    }));
  },
});

export const getFinancialSummary = query({
  args: {
    userId: v.id("users"),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let transactions = await ctx.db
      .query("transactions")
      .withIndex("by_user", (q) => q.eq("user_id", args.userId))
      .collect();

    if (args.startDate) {
      transactions = transactions.filter((t) => t.date >= args.startDate!);
    }
    if (args.endDate) {
      transactions = transactions.filter((t) => t.date <= args.endDate!);
    }

    let totalIncome = 0;
    let totalExpenses = 0;
    transactions.forEach((tx) => {
      const isIncome = tx.type === "income" || tx.type === "credit";
      if (isIncome) {
        totalIncome += Math.abs(tx.amount);
      } else {
        totalExpenses += Math.abs(tx.amount);
      }
    });
    const incomeVsExpenses = { income: totalIncome, expenses: totalExpenses };

    const categoryMap = new Map<string, number>();
    transactions.forEach((tx) => {
      const isIncome = tx.type === "income" || tx.type === "credit";
      if (!isIncome) {
        const cat = tx.category || "Outros";
        categoryMap.set(cat, (categoryMap.get(cat) || 0) + Math.abs(tx.amount));
      }
    });
    const spendingByCategory = Array.from(categoryMap.entries()).map(([category, total]) => ({
      category,
      total,
    }));

    const monthlyMap = new Map<string, { income: number; expenses: number }>();
    transactions.forEach((tx) => {
      const txDate = new Date(tx.date);
      const monthStr = txDate.toLocaleString('pt-BR', { month: 'short' });
      const year = txDate.getFullYear();
      const key = `${monthStr} ${year}`;
      
      if (!monthlyMap.has(key)) {
        monthlyMap.set(key, { income: 0, expenses: 0 });
      }
      
      const val = monthlyMap.get(key)!;
      const isIncome = tx.type === "income" || tx.type === "credit";
      if (isIncome) {
        val.income += Math.abs(tx.amount);
      } else {
        val.expenses += Math.abs(tx.amount);
      }
    });
    
    const sortedMonths = Array.from(monthlyMap.entries())
      .map(([month, data]) => {
        const parts = month.split(' ');
        const mStr = parts[0].toLowerCase().replace('.', '');
        const yStr = parts[1];
        const monthsPt = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
        const idx = monthsPt.indexOf(mStr);
        const monthIndex = idx !== -1 ? idx : 0;
        
        return {
          month,
          income: data.income,
          expenses: data.expenses,
          balance: data.income - data.expenses,
          dateObj: new Date(parseInt(yStr), monthIndex, 1)
        };
      })
      .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
      .map(({ month, income, expenses, balance }) => ({
        month,
        income,
        expenses,
        balance
      }));

    const dailyMap = new Map<string, { income: number; expenses: number }>();
    transactions.forEach((tx) => {
      const dateStr = tx.date.split('T')[0];
      
      if (!dailyMap.has(dateStr)) {
        dailyMap.set(dateStr, { income: 0, expenses: 0 });
      }
      
      const val = dailyMap.get(dateStr)!;
      const isIncome = tx.type === "income" || tx.type === "credit";
      if (isIncome) {
        val.income += Math.abs(tx.amount);
      } else {
        val.expenses += Math.abs(tx.amount);
      }
    });
    
    const transactionTrends = Array.from(dailyMap.entries())
      .map(([date, data]) => ({
        date: new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        income: data.income,
        expenses: data.expenses,
        rawDate: date
      }))
      .sort((a, b) => a.rawDate.localeCompare(b.rawDate))
      .map(({ date, income, expenses }) => ({ date, income, expenses }));

    const topExpenses = transactions
      .filter((tx) => !(tx.type === "income" || tx.type === "credit"))
      .map((tx) => ({
        description: tx.description,
        amount: Math.abs(tx.amount),
        category: tx.category || "Outros",
        date: new Date(tx.date).toLocaleDateString('pt-BR'),
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    return {
      spendingByCategory,
      monthlyBalance: sortedMonths,
      transactionTrends,
      topExpenses,
      incomeVsExpenses,
    };
  },
});