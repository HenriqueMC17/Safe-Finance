"use client"

import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DateRangePicker } from "@/components/date-range-picker"
import { OverviewTab } from "@/components/analytics/overview-tab"
import { AnalyticsTab } from "@/components/analytics/analytics-tab"
import { ReportsTab } from "@/components/analytics/reports-tab"
import { NotificationsTab } from "@/components/analytics/notifications-tab"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useState } from "react"

export function AnalyticsContent() {
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("tab") || "overview"
  const [activeTab, setActiveTab] = useState(defaultTab)

  const handleExportData = () => {
    // Implementar exportação de dados
    alert("Exportando dados do período selecionado...")
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Análises</h2>
        <div className="flex items-center space-x-2">
          <DateRangePicker />
          <Button onClick={handleExportData} className="flex items-center gap-2 bg-primary hover:bg-primary/90">
            <Download className="h-4 w-4" />
            Exportar Dados
          </Button>
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsTab />
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <ReportsTab />
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <NotificationsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
