"use client"

// Organizar importações por grupos: React/Next, componentes UI, utilitários, tipos
import { useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { ChevronLeft, Calendar, Clock, Share2, Bookmark, MessageSquare } from "lucide-react"

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
      </ul>
      
      <p>Escolha o método que melhor se adapta à sua personalidade e situação financeira.</p>
      
      <h2>4. Negocie com credores</h2>
      
      <p>Muitos credores estão dispostos a negociar termos mais favoráveis se você demonstrar boa-fé e explicar sua situação. Você pode solicitar:</p>
      
      <ul>
        <li>Redução da taxa de juros</li>
        <li>Extensão do prazo de pagamento</li>
        <li>Perdão de parte da dívida em troca de um pagamento único</li>
        <li>Remoção de taxas de atraso</li>
      </ul>
      
      <p>O pior que pode acontecer é receberem um "não", então não tenha medo de pedir.</p>
      
      <h2>5. Aumente sua renda</h2>
      
      <p>Além de reduzir despesas, aumentar sua renda pode acelerar significativamente seu progresso no pagamento de dívidas. Considere:</p>
      
      <ul>
        <li>Pedir um aumento ou promoção no trabalho atual</li>
        <li>Buscar um emprego melhor remunerado</li>
        <li>Iniciar um trabalho freelance ou bico nas horas vagas</li>
        <li>Vender itens que você não usa mais</li>
        <li>Alugar um espaço ou quarto extra em sua casa</li>
      </ul>
      
      <p>Qualquer renda extra deve ser direcionada diretamente para o pagamento de dívidas.</p>
      
      <h2>Conclusão</h2>
      
      <p>Sair das dívidas requer disciplina, paciência e um plano claro. Não se desanime se o processo parecer lento no início. Cada pagamento que você faz está te aproximando da liberdade financeira.</p>
      
      <p>Lembre-se de celebrar as pequenas vitórias ao longo do caminho. Quitar uma dívida, por menor que seja, é um passo importante em direção à sua saúde financeira.</p>
      
      <p>E quando finalmente estiver livre das dívidas, não esqueça de construir hábitos financeiros saudáveis para evitar cair no ciclo de endividamento novamente.</p>
    `,
    relatedPosts: ["habitos-financeiros", "orcamento-eficiente", "planejamento-familiar"],
  },
  {
    slug: "planejamento-familiar",
    title: "Planejamento financeiro para famílias",
    excerpt: "Como organizar as finanças familiares e envolver todos os membros no processo.",
    image: "/placeholder.svg?height=600&width=1200",
    author: "Juliana Santos",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "28 de Março, 2023",
    readTime: "9 min",
    category: "Planejamento",
    content: `
      <p>Gerenciar as finanças de uma família é como administrar uma pequena empresa: requer planejamento, comunicação e colaboração de todos os membros. Neste artigo, compartilharemos estratégias eficazes para organizar as finanças familiares e criar um futuro financeiro sólido para todos.</p>
      
      <h2>A importância do planejamento financeiro familiar</h2>
      
      <p>O planejamento financeiro familiar vai além de simplesmente pagar as contas em dia. Trata-se de alinhar os recursos financeiros da família com seus valores e objetivos de curto e longo prazo. Um bom planejamento financeiro pode:</p>
      
      <ul>
        <li>Reduzir o estresse relacionado a dinheiro</li>
        <li>Preparar a família para emergências</li>
        <li>Financiar objetivos importantes como educação dos filhos</li>
        <li>Construir um patrimônio para o futuro</li>
        <li>Ensinar hábitos financeiros saudáveis para as crianças</li>
      </ul>
      
      <h2>Criando um orçamento familiar colaborativo</h2>
      
      <p>O orçamento é a base de qualquer plano financeiro familiar. Para criar um orçamento eficaz:</p>
      
      <ol>
        <li><strong>Reúna toda a família:</strong> Inclua todos os membros adultos nas discussões financeiras e, quando apropriado, as crianças também.</li>
        <li><strong>Liste todas as fontes de renda:</strong> Salários, benefícios, pensões, rendimentos de investimentos, etc.</li>
        <li><strong>Categorize as despesas:</strong> Divida em despesas fixas (aluguel/hipoteca, contas de serviços públicos) e variáveis (alimentação, entretenimento).</li>
        <li><strong>Estabeleça prioridades:</strong> Identifique o que é essencial, importante e desejável.</li>
        <li><strong>Defina metas financeiras em conjunto:</strong> Tanto de curto prazo (férias) quanto de longo prazo (aposentadoria, faculdade dos filhos).</li>
      </ol>
      
      <p>Ferramentas como a Safe Finance podem ajudar a manter o orçamento organizado e acessível para todos os membros da família.</p>
      
      <h2>Estratégias para economizar como família</h2>
      
      <p>Economizar dinheiro como família pode ser mais eficaz quando todos estão envolvidos:</p>
      
      <ul>
        <li><strong>Crie desafios de economia:</strong> Transforme a economia em um jogo familiar, com recompensas para quem conseguir economizar mais.</li>
        <li><strong>Estabeleça um "dia sem gastos" semanal:</strong> Escolha um dia da semana em que a família se compromete a não gastar dinheiro.</li>
        <li><strong>Planeje refeições em conjunto:</strong> Reduza gastos com alimentação planejando refeições e fazendo compras com uma lista.</li>
        <li><strong>Busque atividades gratuitas ou de baixo custo:</strong> Explore parques, bibliotecas e eventos comunitários gratuitos.</li>
        <li><strong>Ensine pelo exemplo:</strong> Mostre às crianças como você pesquisa preços e toma decisões de compra conscientes.</li>
      </ul>
      
      <h2>Educação financeira para crianças</h2>
      
      <p>O planejamento financeiro familiar é uma excelente oportunidade para ensinar às crianças sobre dinheiro:</p>
      
      <ul>
        <li><strong>Mesada com propósito:</strong> Use a mesada como ferramenta educacional, ensinando sobre poupar, doar e gastar.</li>
        <li><strong>Contas bancárias infantis:</strong> Abra contas de poupança para as crianças e ensine-as a acompanhar seu crescimento.</li>
        <li><strong>Jogos financeiros:</strong> Use jogos de tabuleiro ou aplicativos que ensinam conceitos financeiros de forma divertida.</li>
        <li><strong>Inclua as crianças nas discussões:</strong> De acordo com a idade, permita que participem de algumas decisões financeiras da família.</li>
      </ul>
      
      <h2>Preparando-se para grandes despesas familiares</h2>
      
      <p>Famílias enfrentam várias despesas significativas ao longo do tempo. Planeje com antecedência para:</p>
      
      <ul>
        <li><strong>Educação dos filhos:</strong> Comece a poupar cedo e explore opções como planos de previdência educacional.</li>
        <li><strong>Compra de casa:</strong> Estabeleça um plano de poupança para entrada e considere o impacto das prestações no orçamento familiar.</li>
        <li><strong>Veículos:</strong> Crie um fundo para manutenção e eventual substituição de veículos.</li>
        <li><strong>Saúde:</strong> Mantenha uma reserva para despesas médicas não cobertas pelo plano de saúde.</li>
      </ul>
      
      <h2>Proteção financeira familiar</h2>
      
      <p>Proteger a família financeiramente é tão importante quanto construir patrimônio:</p>
      
      <ul>
        <li><strong>Reserva de emergência:</strong> Mantenha de 3 a 6 meses de despesas em um fundo de fácil acesso.</li>
        <li><strong>Seguros adequados:</strong> Considere seguros de vida, saúde, residencial e outros relevantes para sua situação.</li>
        <li><strong>Planejamento sucessório:</strong> Tenha um testamento e outros documentos legais em ordem.</li>
        <li><strong>Diversificação de investimentos:</strong> Não coloque todos os ovos na mesma cesta.</li>
      </ul>
      
      <h2>Conclusão</h2>
      
      <p>O planejamento financeiro familiar bem-sucedido requer comunicação aberta, colaboração e consistência. Ao envolver todos os membros da família no processo, você não apenas melhora as finanças da família, mas também cria uma cultura financeira saudável que beneficiará as gerações futuras.</p>
      
      <p>Lembre-se de que cada família é única, com suas próprias necessidades, valores e objetivos. Adapte estas estratégias à sua situação específica e não hesite em buscar ajuda profissional quando necessário.</p>
    `,
    relatedPosts: ["habitos-financeiros", "sair-das-dividas", "orcamento-eficiente"],
  },
]

// Função para encontrar posts relacionados
const getRelatedPosts = (relatedSlugs: string[]) => {
  return blogPosts.filter((post) => relatedSlugs.includes(post.slug)).slice(0, 3)
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string

  // Encontrar o post atual pelo slug
  const post = blogPosts.find((post) => post.slug === slug)

  // Scroll para o topo quando a página carregar
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  // Se o post não for encontrado
  if (!post) {
    return (
      <PageLayout title="Artigo não encontrado">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-6">
            O artigo que você está procurando não foi encontrado ou foi removido.
          </p>
          <Button asChild className="rounded-full">
            <Link href="/recursos/blog">Voltar para o Blog</Link>
          </Button>
        </div>
      </PageLayout>
    )
  }

  // Encontrar posts relacionados
  const relatedPosts = getRelatedPosts(post.relatedPosts)

  return (
    <div className="container max-w-4xl py-12 md:py-20">
      <Link
        href="/recursos/blog"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Voltar para o Blog
      </Link>

      <article className="space-y-8">
        {/* Cabeçalho do artigo */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="rounded-full">
              {post.category}
            </Badge>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground flex items-center">
              <Clock className="mr-1 size-3" /> {post.readTime} de leitura
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

          <div className="flex items-center gap-4 mb-8">
            <Image
              src={post.authorImage || "/placeholder.svg"}
              alt={post.author}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="font-medium">{post.author}</p>
              <p className="text-sm text-muted-foreground flex items-center">
                <Calendar className="mr-1 size-3" /> {post.date}
              </p>
            </div>
          </div>
        </div>

        {/* Imagem principal */}
        <div className="rounded-xl overflow-hidden">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full h-auto"
          />
        </div>

        {/* Conteúdo do artigo */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Ações do artigo */}
        <div className="flex flex-wrap gap-4 justify-between items-center border-t border-b py-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-full">
              <Share2 className="mr-2 size-4" />
              Compartilhar
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              <Bookmark className="mr-2 size-4" />
              Salvar
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-full">
              <MessageSquare className="mr-2 size-4" />
              Comentários (0)
            </Button>
          </div>
        </div>

        {/* Artigos relacionados */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Artigos Relacionados</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/recursos/blog/${relatedPost.slug}`}>
                  <div className="group rounded-lg overflow-hidden border hover:shadow-md transition-shadow">
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        width={400}
                        height={225}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <Badge variant="outline" className="mb-2 text-xs">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{relatedPost.date}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
