import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, ArrowUpRight } from "lucide-react"
import PageLayout from "../components/page-layout"

export default function CarreirasPage() {
  // Lista de vagas disponíveis
  const jobs = [
    {
      id: 1,
      title: "Desenvolvedor Full Stack",
      department: "Tecnologia",
      location: "Sorocaba, SP",
      type: "Tempo Integral",
      description:
        "Estamos procurando um desenvolvedor Full Stack experiente para se juntar à nossa equipe de tecnologia e ajudar a construir e manter nossa plataforma financeira.",
      requirements: [
        "Experiência com React, Next.js e TypeScript",
        "Conhecimento em Node.js e bancos de dados SQL",
        "Familiaridade com metodologias ágeis",
        "Pelo menos 3 anos de experiência em desenvolvimento web",
      ],
    },
    {
      id: 2,
      title: "Designer de UX/UI",
      department: "Design",
      location: "Remoto",
      type: "Tempo Integral",
      description:
        "Procuramos um designer de UX/UI talentoso para criar experiências intuitivas e atraentes para nossa plataforma financeira.",
      requirements: [
        "Experiência em design de interfaces para aplicações web e mobile",
        "Conhecimento em ferramentas como Figma e Adobe Creative Suite",
        "Compreensão de princípios de usabilidade e acessibilidade",
        "Portfólio demonstrando projetos anteriores",
      ],
    },
    {
      id: 3,
      title: "Especialista em Marketing Digital",
      department: "Marketing",
      location: "Sorocaba, SP",
      type: "Tempo Integral",
      description:
        "Estamos em busca de um especialista em marketing digital para desenvolver e implementar estratégias que aumentem nossa presença online e aquisição de clientes.",
      requirements: [
        "Experiência em SEO, marketing de conteúdo e mídias sociais",
        "Conhecimento em ferramentas de análise como Google Analytics",
        "Habilidade para criar e gerenciar campanhas de marketing",
        "Pelo menos 2 anos de experiência em marketing digital",
      ],
    },
    {
      id: 4,
      title: "Analista de Suporte ao Cliente",
      department: "Atendimento ao Cliente",
      location: "Híbrido",
      type: "Meio Período",
      description:
        "Procuramos um analista de suporte ao cliente para ajudar nossos usuários a tirar o máximo proveito da plataforma Safe Finance.",
      requirements: [
        "Excelentes habilidades de comunicação",
        "Conhecimento em finanças pessoais",
        "Experiência com ferramentas de CRM",
        "Capacidade de resolver problemas de forma eficiente",
      ],
    },
    {
      id: 5,
      title: "Estagiário de Desenvolvimento",
      department: "Tecnologia",
      location: "Sorocaba, SP",
      type: "Estágio",
      description:
        "Oportunidade para estudantes de Análise e Desenvolvimento de Sistemas ou áreas relacionadas para aprender e crescer em um ambiente dinâmico.",
      requirements: [
        "Cursando Análise e Desenvolvimento de Sistemas ou áreas relacionadas",
        "Conhecimento básico em HTML, CSS e JavaScript",
        "Interesse em desenvolvimento web e mobile",
        "Disponibilidade para estágio de 20-30 horas semanais",
      ],
    },
  ]

  return (
    <PageLayout
      title="Carreiras"
      description="Junte-se à nossa equipe e faça parte da revolução financeira. Confira nossas vagas abertas."
    >
      <div className="space-y-12">
        <section>
          <div className="bg-muted/30 rounded-xl p-8 mb-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Por que trabalhar na Safe Finance?</h2>
              <p className="text-muted-foreground mb-8">
                Na Safe Finance, estamos construindo o futuro das finanças pessoais. Nosso ambiente é colaborativo,
                inovador e focado em criar impacto positivo na vida financeira das pessoas.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Crescimento</h3>
                  <p className="text-sm text-muted-foreground">
                    Oportunidades de desenvolvimento profissional e plano de carreira estruturado.
                  </p>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Flexibilidade</h3>
                  <p className="text-sm text-muted-foreground">
                    Horários flexíveis e possibilidade de trabalho remoto ou híbrido.
                  </p>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Impacto</h3>
                  <p className="text-sm text-muted-foreground">
                    Contribua para melhorar a saúde financeira de milhares de pessoas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Vagas Abertas</h2>
          <div className="space-y-6">
            {jobs.map((job) => (
              <Card key={job.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline">{job.department}</Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <MapPin className="size-3" /> {job.location}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="size-3" /> {job.type}
                    </Badge>
                  </div>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>{job.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-medium mb-2">Requisitos:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="rounded-full">
                    <Link href={`/carreiras/${job.id}`}>
                      Ver Detalhes e Candidatar-se
                      <ArrowUpRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Não encontrou uma vaga adequada?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Envie seu currículo para nosso banco de talentos e entraremos em contato quando surgir uma oportunidade
              que corresponda ao seu perfil.
            </p>
            <Button asChild className="rounded-full">
              <Link href="/contato">Enviar Currículo</Link>
            </Button>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
