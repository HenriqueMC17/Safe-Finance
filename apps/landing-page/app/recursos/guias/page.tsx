import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function GuiasPage() {
  return (
    <div className="container max-w-4xl py-12 md:py-20">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Voltar para a página inicial
      </Link>

      <h1 className="text-4xl font-bold mb-6">Guias e Tutoriais</h1>
      <p className="text-muted-foreground mb-12 max-w-2xl">
        Aprenda a usar todas as funcionalidades da Safe Finance com nossos guias passo a passo e tutoriais detalhados.
      </p>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Guias para Iniciantes</h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Primeiros passos com a Safe Finance",
                description: "Um guia completo para começar a usar a plataforma e configurar sua conta.",
                image: "/placeholder.svg?height=200&width=400",
                time: "10 min",
                level: "Iniciante",
              },
              {
                title: "Configurando suas categorias",
                description: "Aprenda a personalizar categorias para organizar melhor suas finanças.",
                image: "/placeholder.svg?height=200&width=400",
                time: "8 min",
                level: "Iniciante",
              },
              {
                title: "Registrando transações",
                description: "Como registrar receitas e despesas de forma rápida e eficiente.",
                image: "/placeholder.svg?height=200&width=400",
                time: "5 min",
                level: "Iniciante",
              },
              {
                title: "Criando seu primeiro orçamento",
                description: "Passo a passo para criar um orçamento mensal eficaz.",
                image: "/placeholder.svg?height=200&width=400",
                time: "12 min",
                level: "Iniciante",
              },
            ].map((guide, i) => (
              <Card key={i} className="overflow-hidden">
                <Image
                  src={guide.image || "/placeholder.svg"}
                  alt={guide.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{guide.level}</span>
                    <span className="text-xs text-muted-foreground">{guide.time} de leitura</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{guide.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{guide.description}</p>
                  <Button asChild variant="outline" className="w-full rounded-full">
                    <Link href="#">Ler Guia</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Tutoriais Avançados</h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Análise de fluxo de caixa",
                description: "Como usar os relatórios avançados para analisar seu fluxo de caixa.",
                image: "/placeholder.svg?height=200&width=400",
                time: "15 min",
                level: "Avançado",
              },
              {
                title: "Planejamento financeiro de longo prazo",
                description: "Estratégias para configurar metas financeiras de longo prazo.",
                image: "/placeholder.svg?height=200&width=400",
                time: "20 min",
                level: "Avançado",
              },
              {
                title: "Importação automática de dados bancários",
                description: "Configure a sincronização automática com suas contas bancárias.",
                image: "/placeholder.svg?height=200&width=400",
                time: "10 min",
                level: "Intermediário",
              },
              {
                title: "Gestão de investimentos",
                description: "Como acompanhar e analisar seus investimentos na plataforma.",
                image: "/placeholder.svg?height=200&width=400",
                time: "18 min",
                level: "Avançado",
              },
            ].map((guide, i) => (
              <Card key={i} className="overflow-hidden">
                <Image
                  src={guide.image || "/placeholder.svg"}
                  alt={guide.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className={`text-xs ${guide.level === "Avançado" ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"} px-2 py-1 rounded-full`}
                    >
                      {guide.level}
                    </span>
                    <span className="text-xs text-muted-foreground">{guide.time} de leitura</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{guide.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{guide.description}</p>
                  <Button asChild variant="outline" className="w-full rounded-full">
                    <Link href="#">Ler Guia</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Vídeo Tutoriais</h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Tour pela plataforma Safe Finance",
                description: "Um tour completo por todas as funcionalidades da plataforma.",
                image: "/placeholder.svg?height=200&width=400",
                time: "8:45",
              },
              {
                title: "Como criar relatórios personalizados",
                description: "Aprenda a criar relatórios personalizados para suas necessidades específicas.",
                image: "/placeholder.svg?height=200&width=400",
                time: "12:20",
              },
            ].map((video, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="relative">
                  <Image
                    src={video.image || "/placeholder.svg"}
                    alt={video.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="size-12 rounded-full bg-primary/90 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.time}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{video.description}</p>
                  <Button asChild variant="outline" className="w-full rounded-full">
                    <Link href="#">Assistir Vídeo</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="text-center mt-8">
          <p className="text-muted-foreground mb-6">
            Não encontrou o que procurava? Solicite um guia ou tutorial sobre um tópico específico.
          </p>
          <Button asChild className="rounded-full">
            <Link href="/contato">Solicitar Conteúdo</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
