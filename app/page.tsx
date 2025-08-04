import { Suspense } from "react"
import { AccountsOverview } from "@/components/accounts-overview"
import { RecentTransactions } from "@/components/recent-transactions"
import { QuickBillPay } from "@/components/quick-bill-pay"
import { BusinessMetrics } from "@/components/business-metrics"
import { FinancialChart } from "@/components/financial-chart"
import { SavingsGoals } from "@/components/savings-goals"
import { UpcomingEvents } from "@/components/upcoming-events"
import { Skeleton } from "@/components/ui/skeleton"

// Componente de carregamento para cada seção
function SectionSkeleton() {
  return <Skeleton className="w-full h-[300px] rounded-lg" />
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-tutorial="dashboard-cards">
        <div className="lg:col-span-1">
          <Suspense fallback={<SectionSkeleton />}>
            <AccountsOverview />
          </Suspense>
        </div>
        <div className="lg:col-span-1">
          <Suspense fallback={<SectionSkeleton />}>
            <RecentTransactions />
          </Suspense>
        </div>
        <div className="lg:col-span-1">
          <Suspense fallback={<SectionSkeleton />}>
            <QuickBillPay />
          </Suspense>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Suspense fallback={<SectionSkeleton />}>
            <FinancialChart />
          </Suspense>
        </div>
        <div className="lg:col-span-1">
          <Suspense fallback={<SectionSkeleton />}>
            <SavingsGoals />
          </Suspense>
        </div>
      </div>

      <Suspense fallback={<SectionSkeleton />}>
        <BusinessMetrics />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <UpcomingEvents />
      </Suspense>
    </div>
  )
}
