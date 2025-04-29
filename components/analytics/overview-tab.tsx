"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OverviewCards } from "@/components/analytics/overview-cards"
import { RevenueChart } from "@/components/analytics/revenue-chart"
import { RecentTransactions } from "@/components/analytics/recent-transactions"
import { AccountGrowth } from "@/components/analytics/account-growth"
import { TopProducts } from "@/components/analytics/top-products"
import { UserActivity } from "@/components/analytics/user-activity"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function OverviewTab() {
  const [comparisonPeriod, setComparisonPeriod] = useState("previous_month")

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">Visão Geral do Dashboard</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Comparar com:</span>
          <Select value={comparisonPeriod} onValueChange={setComparisonPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="previous_month">Mês Anterior</SelectItem>
              <SelectItem value="previous_quarter">Trimestre Anterior</SelectItem>
              <SelectItem value="previous_year">Ano Anterior</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCards comparisonPeriod={comparisonPeriod} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Receita</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <RevenueChart comparisonPeriod={comparisonPeriod} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Transações Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentTransactions />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Crescimento de Contas</CardTitle>
          </CardHeader>
          <CardContent>
            <AccountGrowth comparisonPeriod={comparisonPeriod} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Produtos Principais</CardTitle>
          </CardHeader>
          <CardContent>
            <TopProducts />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Atividade de Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            <UserActivity />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
