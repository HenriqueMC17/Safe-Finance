import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Newsletter from "./newsletter"

export default function BlogPage() {
  return (
    <div className="container max-w-4xl py-12 md:py-20">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Voltar para a página inicial
      </Link>

      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">Blog Safe Finance</h1>
        <div className="hidden md:flex gap-2">
          <Button variant="outline" className="rounded-full">
            Categorias
          </Button>
          <Button variant="outline" className="rounded-full">
            Mais Recentes
          </Button>
        </div>
      </div>

      {/* Featured Post */}
      <div className="mb-16">
        <Card className="overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Como criar um orçamento eficiente"
                width={600}
                height={400}
                className="w-full h-64 md:h-full object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="md:w-1/2">
              <CardContent className="p-6 md:p-8">
                <Badge className="mb-4">Destaque</Badge>
                <h2 className="text-2xl font-bold mb-4">
                  Como criar um orçamento eficiente que você realmente vai seguir
                </h2>
                <p className="text-muted-foreground mb-4">
                  Descubra as melhores estratégias para criar um orçamento realista e eficiente que se adapte ao seu
                  estilo de vida e que você consiga seguir consistentemente.
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="size-10 rounded-full bg-muted flex items-center justify-center text-foreground font-medium">
                    M
                  </div>
                  <div>
                    <p className="font-medium">Marina Silva</p>
                    <p className="text-xs text-muted-foreground">15 de Abril, 2023 • 8 min de leitura</p>
                  </div>
                </div>
                <Button asChild className="rounded-full">
                  <Link href="/recursos/blog/orcamento-eficiente">Ler Artigo</Link>
                </Button>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Posts */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Artigos Recentes</h2>

        <div className="grid gap-8 md:grid-cols-2">
          {[
            {
              title: "5 hábitos financeiros que vão transformar sua vida",
              excerpt:
                "Pequenas mudanças nos seus hábitos diários podem ter um grande impacto nas suas finanças a longo prazo.",
              image: "/placeholder.svg?height=200&width=400",
              author: "Carlos Oliveira",
              date: "10 de Abril, 2023",
              readTime: "6 min",
              category: "Educação Financeira",
            },
            {
              title: "Investimentos para iniciantes: por onde começar",
              excerpt: "Um guia completo para quem quer começar a investir mas não sabe por onde começar.",
              image: "/placeholder.svg?height=200&width=400",
              author: "Ana Luiza",
              date: "5 de Abril, 2023",
              readTime: "10 min",
              category: "Investimentos",
            },
            {
              title: "Como sair das dívidas em 5 passos",
              excerpt: "Estratégias práticas para quitar suas dívidas e recuperar sua saúde financeira.",
              image: "/placeholder.svg?height=200&width=400",
              author: "Ricardo Mendes",
              date: "1 de Abril, 2023",
              readTime: "7 min",
              category: "Dívidas",
            },
            {
              title: "Planejamento financeiro para famílias",
              excerpt: "Como organizar as finanças familiares e envolver todos os membros no processo.",
              image: "/placeholder.svg?height=200&width=400",
              author: "Juliana Santos",
              date: "28 de Março, 2023",
              readTime: "9 min",
              category: "Planejamento",
            },
          ].map((post, i) => (
            <Card key={i} className="overflow-hidden">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="outline" className="rounded-full text-xs">
                    {post.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{post.readTime} de leitura</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-8 rounded-full bg-muted flex items-center justify-center text-foreground font-medium text-xs">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{post.author}</p>
                    <p className="text-xs text-muted-foreground">{post.date}</p>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full rounded-full">
                  <Link
                    href={
                      i === 0
                        ? "/recursos/blog/habitos-financeiros"
                        : i === 1
                          ? "/recursos/blog/investimentos-iniciantes"
                          : i === 2
                            ? "/recursos/blog/sair-das-dividas"
                            : "/recursos/blog/planejamento-familiar"
                    }
                  >
                    Ler Artigo
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Categorias</h2>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {[
            { name: "Educação Financeira", count: 24, slug: "educacao-financeira" },
            { name: "Investimentos", count: 18, slug: "investimentos" },
            { name: "Dívidas", count: 12, slug: "dividas" },
            { name: "Planejamento", count: 15, slug: "planejamento" },
            { name: "Economia", count: 9, slug: "economia" },
            { name: "Empreendedorismo", count: 7, slug: "empreendedorismo" },
            { name: "Aposentadoria", count: 5, slug: "aposentadoria" },
            { name: "Impostos", count: 8, slug: "impostos" },
          ].map((category, i) => (
            <Link
              key={i}
              href={`/recursos/blog?categoria=${category.slug}`}
              className="p-4 bg-muted/30 rounded-lg text-center hover:bg-muted/50 transition-colors"
            >
              <h3 className="font-medium mb-1">{category.name}</h3>
              <p className="text-xs text-muted-foreground">{category.count} artigos</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  )
}
