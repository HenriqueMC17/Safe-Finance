"use client"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Calendar, User, Clock, Tag, Share2, Bookmark, MessageSquare } from "lucide-react"
import PageLayout from "@/app/components/page-layout"

// Dados de exemplo para os artigos do blog
const blogPosts = [
  {
    slug: "habitos-financeiros",
    title: "5 hábitos financeiros que vão transformar sua vida",
    excerpt: "Pequenas mudanças nos seus hábitos diários podem ter um grande impacto nas suas finanças a longo prazo.",
    image: "/placeholder.svg?height=600&width=1200",
    author: "Carlos Oliveira",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "10 de Abril, 2023",
    readTime: "6 min",
    category: "Educação Financeira",
    content: `
      <p>Gerenciar suas finanças pessoais pode parecer uma tarefa assustadora, especialmente se você nunca desenvolveu bons hábitos financeiros. No entanto, pequenas mudanças em seu comportamento diário podem levar a grandes melhorias em sua saúde financeira ao longo do tempo.</p>
      
      <h2>1. Acompanhe todos os seus gastos</h2>
      
      <p>O primeiro passo para melhorar suas finanças é saber exatamente para onde seu dinheiro está indo. Registre todas as suas despesas, não importa quão pequenas sejam. Aplicativos como a Safe Finance podem ajudar a automatizar esse processo.</p>
      
      <p>Quando você tem uma visão clara de seus padrões de gastos, fica mais fácil identificar áreas onde pode economizar. Muitas pessoas se surpreendem ao descobrir quanto gastam em pequenas compras diárias, como café ou lanches.</p>
      
      <h2>2. Crie um orçamento realista</h2>
      
      <p>Um orçamento não é uma camisa de força, mas sim um plano para usar seu dinheiro de forma intencional. Crie um orçamento que seja realista e que se alinhe com seus valores e objetivos.</p>
      
      <p>Lembre-se de incluir categorias para economias e diversão. Um orçamento muito restritivo provavelmente não será sustentável a longo prazo.</p>
      
      <h2>3. Estabeleça uma reserva de emergência</h2>
      
      <p>Uma das melhores maneiras de proteger sua saúde financeira é ter uma reserva de emergência. Idealmente, essa reserva deve cobrir de 3 a 6 meses de despesas essenciais.</p>
      
      <p>Comece pequeno se necessário, mas faça contribuições regulares para sua reserva de emergência. Isso lhe dará tranquilidade e evitará que você recorra a dívidas em caso de imprevistos.</p>
      
      <h2>4. Automatize suas economias</h2>
      
      <p>Configure transferências automáticas para sua conta de poupança ou investimentos logo após receber seu salário. Quando o dinheiro é automaticamente direcionado para economias antes que você tenha a chance de gastá-lo, é muito mais provável que você mantenha o hábito de economizar.</p>
      
      <p>Lembre-se do ditado: "Pague-se primeiro". Trate suas economias como uma despesa não negociável.</p>
      
      <h2>5. Eduque-se continuamente sobre finanças</h2>
      
      <p>O conhecimento financeiro é uma jornada contínua. Reserve um tempo regularmente para aprender sobre finanças pessoais, investimentos e estratégias de economia.</p>
      
      <p>Leia livros, acompanhe blogs confiáveis (como o nosso!), ouça podcasts e participe de workshops. Quanto mais você entender sobre dinheiro, melhores decisões financeiras poderá tomar.</p>
      
      <h2>Conclusão</h2>
      
      <p>Desenvolver bons hábitos financeiros não acontece da noite para o dia, mas cada pequeno passo conta. Comece implementando um hábito de cada vez e, com o tempo, você verá uma transformação significativa em sua vida financeira.</p>
      
      <p>Lembre-se de que o objetivo não é apenas acumular dinheiro, mas usar seus recursos financeiros de maneira que apoie a vida que você deseja viver.</p>
    `,
    relatedPosts: ["investimentos-iniciantes", "sair-das-dividas", "planejamento-familiar"],
  },
  {
    slug: "investimentos-iniciantes",
    title: "Investimentos para iniciantes: por onde começar",
    excerpt: "Um guia completo para quem quer começar a investir mas não sabe por onde começar.",
    image: "/placeholder.svg?height=600&width=1200",
    author: "Ana Luiza",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "5 de Abril, 2023",
    readTime: "10 min",
    category: "Investimentos",
    content: `
      <p>Começar a investir pode parecer intimidador, especialmente se você não tem experiência prévia com finanças. No entanto, investir é uma das melhores maneiras de construir riqueza a longo prazo e alcançar seus objetivos financeiros.</p>
      
      <h2>Por que investir?</h2>
      
      <p>Antes de mergulharmos nos detalhes de como começar a investir, é importante entender por que você deveria investir em primeiro lugar. Investir permite que seu dinheiro trabalhe para você, gerando retornos ao longo do tempo através de juros compostos.</p>
      
      <p>Além disso, investir é uma forma de proteger seu dinheiro contra a inflação. Se você simplesmente guardar dinheiro em casa ou em uma conta corrente sem rendimentos, seu poder de compra diminuirá com o tempo devido à inflação.</p>
      
      <h2>Defina seus objetivos financeiros</h2>
      
      <p>Antes de começar a investir, é crucial definir seus objetivos financeiros. Você está investindo para a aposentadoria? Para comprar uma casa? Para a educação dos seus filhos? Seus objetivos determinarão seu horizonte de investimento e sua tolerância ao risco.</p>
      
      <p>Objetivos de curto prazo (1-3 anos) geralmente exigem investimentos mais conservadores, enquanto objetivos de longo prazo (10+ anos) podem se beneficiar de investimentos mais agressivos com potencial de retorno mais alto.</p>
      
      <h2>Entenda seu perfil de investidor</h2>
      
      <p>Seu perfil de investidor é determinado por sua tolerância ao risco, horizonte de tempo e objetivos financeiros. Geralmente, os perfis são classificados como:</p>
      
      <ul>
        <li><strong>Conservador:</strong> Prefere segurança e está disposto a aceitar retornos menores para evitar riscos.</li>
        <li><strong>Moderado:</strong> Busca um equilíbrio entre segurança e crescimento.</li>
        <li><strong>Agressivo:</strong> Está disposto a aceitar maior volatilidade em busca de retornos potencialmente mais altos.</li>
      </ul>
      
      <h2>Comece com uma reserva de emergência</h2>
      
      <p>Antes de começar a investir para objetivos de longo prazo, é essencial ter uma reserva de emergência. Esta reserva deve cobrir de 3 a 6 meses de despesas essenciais e deve ser mantida em investimentos de alta liquidez e baixo risco, como uma conta poupança ou um CDB de liquidez diária.</p>
      
      <h2>Conheça as principais classes de ativos</h2>
      
      <p>Existem várias classes de ativos nas quais você pode investir, cada uma com seu próprio perfil de risco e retorno potencial:</p>
      
      <ul>
        <li><strong>Renda Fixa:</strong> Inclui títulos do governo, CDBs, LCIs, LCAs. Geralmente oferecem menor risco e retornos mais previsíveis.</li>
        <li><strong>Renda Variável:</strong> Inclui ações, fundos de ações. Oferecem potencial para retornos mais altos, mas com maior risco e volatilidade.</li>
        <li><strong>Fundos Imobiliários:</strong> Permitem investir no mercado imobiliário sem precisar comprar propriedades diretamente.</li>
        <li><strong>Criptomoedas:</strong> Uma classe de ativos mais recente e altamente volátil.</li>
      </ul>
      
      <h2>Diversifique seus investimentos</h2>
      
      <p>A diversificação é uma estratégia fundamental para reduzir o risco. Ao distribuir seus investimentos entre diferentes classes de ativos, setores e regiões geográficas, você pode minimizar o impacto de um mau desempenho em qualquer área específica.</p>
      
      <h2>Comece pequeno e seja consistente</h2>
      
      <p>Você não precisa de uma grande soma de dinheiro para começar a investir. Muitas plataformas permitem que você comece com valores pequenos. O mais importante é ser consistente e investir regularmente, aproveitando o poder dos juros compostos ao longo do tempo.</p>
      
      <h2>Eduque-se continuamente</h2>
      
      <p>O mundo dos investimentos está sempre evoluindo, e é importante manter-se informado. Leia livros, acompanhe blogs financeiros confiáveis, participe de cursos e webinars. Quanto mais você entender sobre investimentos, melhores decisões poderá tomar.</p>
      
      <h2>Conclusão</h2>
      
      <p>Começar a investir pode parecer desafiador, mas com um plano claro e educação contínua, você pode construir uma carteira de investimentos que o ajudará a alcançar seus objetivos financeiros. Lembre-se de que investir é uma maratona, não uma corrida de velocidade. Seja paciente, mantenha-se disciplinado e ajuste sua estratégia conforme necessário ao longo do tempo.</p>
    `,
    relatedPosts: ["habitos-financeiros", "controle-investimentos", "aposentadoria"],
  },
  {
    slug: "sair-das-dividas",
    title: "Como sair das dívidas em 5 passos",
    excerpt: "Estratégias práticas para quitar suas dívidas e recuperar sua saúde financeira.",
    image: "/placeholder.svg?height=600&width=1200",
    author: "Ricardo Mendes",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "1 de Abril, 2023",
    readTime: "7 min",
    category: "Dívidas",
    content: `
      <p>Estar endividado pode ser uma experiência estressante e opressiva. No entanto, com um plano claro e determinação, é possível sair das dívidas e recuperar o controle da sua vida financeira. Neste artigo, compartilharemos cinco passos práticos para ajudá-lo a eliminar suas dívidas de forma eficaz.</p>
      
      <h2>1. Faça um levantamento completo das suas dívidas</h2>
      
      <p>O primeiro passo para sair das dívidas é saber exatamente quanto você deve. Faça uma lista detalhada de todas as suas dívidas, incluindo:</p>
      
      <ul>
        <li>O valor total de cada dívida</li>
        <li>A taxa de juros</li>
        <li>O valor mínimo de pagamento mensal</li>
        <li>A data de vencimento</li>
      </ul>
      
      <p>Este exercício pode ser desconfortável, mas é essencial para ter uma visão clara da sua situação financeira atual.</p>
      
      <h2>2. Crie um orçamento realista</h2>
      
      <p>Um orçamento detalhado é sua ferramenta mais poderosa para sair das dívidas. Liste todas as suas fontes de renda e todas as suas despesas mensais. Identifique áreas onde você pode reduzir gastos e redirecionar esse dinheiro para o pagamento de dívidas.</p>
      
      <p>Lembre-se de que seu orçamento deve ser realista. Se for muito restritivo, você provavelmente não conseguirá segui-lo a longo prazo.</p>
      
      <h2>3. Escolha uma estratégia de pagamento de dívidas</h2>
      
      <p>Existem duas estratégias principais para pagar dívidas:</p>
      
      <ul>
        <li><strong>Método da Bola de Neve:</strong> Comece pagando a dívida com o menor saldo, enquanto faz os pagamentos mínimos nas outras. Depois de quitar a menor dívida, direcione esse valor para a próxima menor, e assim por diante. Esta estratégia proporciona vitórias rápidas e motivação.</li>
        <li><strong>Método da Avalanche:</strong> Foque primeiro na dívida com a maior taxa de juros, enquanto faz os pagamentos mínimos nas outras. Esta estratégia economiza mais dinheiro em juros ao longo do tempo.</li>
    `,
    relatedPosts: ["habitos-financeiros", "controle-investimentos", "aposentadoria"],
  },
]

export default function ClientPage() {
  const params = useParams()
  const slug = params.slug as string

  const post = blogPosts.find((post) => post.slug === slug)

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <PageLayout title={post.title}>
      <Button asChild variant="ghost">
        <Link href="/recursos/blog">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Voltar
        </Link>
      </Button>
      <div className="container relative max-w-5xl md:py-12 lg:py-24">
        <div className="mx-auto w-full">
          <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 md:text-5xl">
            {post.title}
          </h1>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
            <User className="h-4 w-4" />
            <span>{post.author}</span>
            <Clock className="h-4 w-4" />
            <span>{post.readTime}</span>
          </div>
          <Image
            src={post.image || "/placeholder.svg"}
            width={1200}
            height={600}
            alt={post.title}
            className="mt-4 rounded-md"
          />
          <div className="flex flex-col space-y-4 mt-4">
            <div className="flex items-center space-x-2">
              <Tag className="h-4 w-4" />
              <span>{post.category}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Share2 className="h-4 w-4" />
              <span>Compartilhar</span>
              <Bookmark className="h-4 w-4" />
              <span>Salvar</span>
              <MessageSquare className="h-4 w-4" />
              <span>Comentar</span>
            </div>
          </div>
          <div className="content mt-8" dangerouslySetInnerHTML={{ __html: post.content }} />
          <div className="mt-8">
            <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0 md:text-3xl">
              Artigos relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {post.relatedPosts.map((slug) => {
                const relatedPost = blogPosts.find((post) => post.slug === slug)
                if (!relatedPost) return null
                return (
                  <Link href={`/recursos/blog/${relatedPost.slug}`} key={relatedPost.slug}>
                    <div className="border rounded-md p-4">
                      <h3 className="text-lg font-semibold">{relatedPost.title}</h3>
                      <p className="text-sm text-muted-foreground">{relatedPost.excerpt}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
