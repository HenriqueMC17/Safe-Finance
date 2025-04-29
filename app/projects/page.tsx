import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Projetos</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <PlusCircle className="mr-2 h-4 w-4" /> Novo Projeto
        </Button>
      </div>

      <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>Projeto {i}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Descrição do projeto e detalhes relevantes.</p>
                <div className="mt-4 flex justify-between">
                  <span className="text-sm">Progresso: 65%</span>
                  <span className="text-sm text-primary">Ativo</span>
                </div>
                <div className="mt-2 w-full bg-secondary h-2 rounded-full">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Suspense>
    </div>
  )
}
