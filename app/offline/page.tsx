"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WifiOff, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function OfflinePage() {
  const handleRetry = () => {
    if (typeof window !== "undefined") {
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <WifiOff className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl">Você está offline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Não foi possível conectar à internet. Verifique sua conexão e tente novamente.
          </p>

          <div className="space-y-2">
            <Button onClick={handleRetry} className="w-full" variant="default">
              <RefreshCw className="mr-2 h-4 w-4" />
              Tentar novamente
            </Button>

            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Ir para início
              </Link>
            </Button>
          </div>

          <div className="mt-6 text-sm text-muted-foreground">
            <p className="font-medium mb-2">Funcionalidades offline disponíveis:</p>
            <ul className="text-left space-y-1">
              <li>• Visualizar dados salvos</li>
              <li>• Adicionar transações (serão sincronizadas)</li>
              <li>• Acessar configurações</li>
              <li>• Ver relatórios básicos</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
