import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function IntegracoesPage() {
  return (
    <div className="container max-w-4xl py-12 md:py-20">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Voltar para a página inicial
      </Link>

      <h1 className="text-4xl font-bold mb-6">Integrações</h1>
      <p className="text-muted-foreground mb-12 max-w-2xl">
        A Safe Finance se integra com diversas plataformas e serviços para facilitar sua gestão financeira. Conheça
        nossas principais integrações.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            name: "Bancos Brasileiros",
            description: "Conecte-se com os principais bancos do Brasil para importar transações automaticamente.",
            image: "/placeholder.svg?height=80&width=80",
            available: true,
          },
          {
            name: "Plataformas de Investimento",
            description: "Importe seus investimentos de corretoras e plataformas de investimento.",
            image: "/placeholder.svg?height=80&width=80",
            available: true,
          },
          {
            name: "Sistemas de Contabilidade",
            description: "Exporte dados para os principais sistemas de contabilidade do mercado.",
            image: "/placeholder.svg?height=80&width=80",
            available: true,
          },
          {
            name: "Plataformas de E-commerce",
            description: "Integre suas vendas online para acompanhar receitas e despesas.",
            image: "/placeholder.svg?height=80&width=80",
            available: false,
            coming: "Em breve",
          },
          {
            name: "Aplicativos de Pagamento",
            description: "Conecte com PIX, PayPal, PagSeguro e outros serviços de pagamento.",
            image: "/placeholder.svg?height=80&width=80",
            available: true,
          },
          {
            name: "Sistemas ERP",
            description: "Integração com sistemas de gestão empresarial para empresas.",
            image: "/placeholder.svg?height=80&width=80",
            available: false,
            coming: "Em desenvolvimento",
          },
        ].map((integration, i) => (
          <Card key={i} className="overflow-hidden border-border/40">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <Image
                    src={integration.image || "/placeholder.svg"}
                    alt={integration.name}
                    width={60}
                    height={60}
                    className="rounded-md"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{integration.name}</h3>
                  {integration.available ? (
                    <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded-full">
                      Disponível
                    </span>
                  ) : (
                    <span className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 px-2 py-1 rounded-full">
                      {integration.coming}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{integration.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Precisa de uma integração específica?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Nossa equipe está constantemente trabalhando em novas integrações. Se você precisa de uma integração
          específica, entre em contato conosco.
        </p>
        <Button asChild className="rounded-full">
          <Link href="/contato">Solicitar Integração</Link>
        </Button>
      </div>
    </div>
  )
}
