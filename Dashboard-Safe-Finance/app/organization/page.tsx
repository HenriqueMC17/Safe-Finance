import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OrganizationPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Organização</h1>

      <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
        <Card>
          <CardHeader>
            <CardTitle>Estrutura Organizacional</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie a estrutura da sua organização, departamentos e hierarquia.</p>
            <div className="mt-4 p-8 border border-dashed border-muted-foreground/50 rounded-lg text-center">
              <h3 className="font-medium text-lg mb-2">Estrutura Organizacional</h3>
              <p className="text-muted-foreground">Configure departamentos, equipes e funções para sua organização.</p>
            </div>
          </CardContent>
        </Card>
      </Suspense>
    </div>
  )
}
