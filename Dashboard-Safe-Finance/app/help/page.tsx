import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, FileText, Video, MessageCircle, Book } from "lucide-react"

const faqItems = [
  {
    question: "Como adicionar uma nova transação?",
    answer:
      "Para adicionar uma nova transação, navegue até a página 'Transações' e clique no botão 'Adicionar Transação'. Preencha os detalhes necessários e clique em 'Salvar'.",
  },
  {
    question: "Como exportar relatórios financeiros?",
    answer:
      "Vá até a página 'Análises', selecione o período desejado e clique no botão 'Exportar Dados' no canto superior direito da tela.",
  },
  {
    question: "Como convidar novos membros para a equipe?",
    answer:
      "Acesse a página 'Membros', clique em 'Adicionar Membro', preencha os dados do novo membro e defina suas permissões.",
  },
  {
    question: "Como configurar notificações?",
    answer:
      "Vá até 'Configurações', selecione a aba 'Notificações' e personalize quais alertas você deseja receber e por quais canais.",
  },
  {
    question: "Como alterar a moeda padrão do sistema?",
    answer: "Em 'Configurações', acesse a aba 'Preferências' e selecione a moeda desejada no campo 'Moeda'.",
  },
]

const tutorials = [
  { title: "Introdução ao Dashboard", icon: FileText, duration: "5 min" },
  { title: "Gerenciando Transações", icon: Video, duration: "8 min" },
  { title: "Criando Relatórios Personalizados", icon: FileText, duration: "12 min" },
  { title: "Configurando Metas Financeiras", icon: Video, duration: "7 min" },
  { title: "Integrações com Bancos", icon: FileText, duration: "10 min" },
]

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Ajuda</h1>

      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2 mb-8">
            <Input placeholder="Pesquisar na ajuda..." className="max-w-md" />
            <Button className="bg-primary hover:bg-primary/90">
              <Search className="mr-2 h-4 w-4" /> Pesquisar
            </Button>
          </div>

          <Tabs defaultValue="faq">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="faq">Perguntas Frequentes</TabsTrigger>
              <TabsTrigger value="tutorials">Tutoriais</TabsTrigger>
              <TabsTrigger value="contact">Contato</TabsTrigger>
            </TabsList>

            <TabsContent value="faq" className="space-y-4">
              <Suspense fallback={<Skeleton className="w-full h-[400px]" />}>
                {faqItems.map((item, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{item.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{item.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </Suspense>
            </TabsContent>

            <TabsContent value="tutorials">
              <Suspense fallback={<Skeleton className="w-full h-[400px]" />}>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {tutorials.map((tutorial, index) => (
                    <Card key={index} className="cursor-pointer hover:bg-muted/50 transition-colors">
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <tutorial.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{tutorial.title}</h3>
                          <p className="text-sm text-muted-foreground">{tutorial.duration}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </Suspense>
            </TabsContent>

            <TabsContent value="contact">
              <Suspense fallback={<Skeleton className="w-full h-[400px]" />}>
                <Card>
                  <CardContent className="p-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Entre em Contato</h3>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <MessageCircle className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium">Chat ao Vivo</p>
                              <p className="text-sm text-muted-foreground">Disponível das 8h às 18h</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Book className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium">Base de Conhecimento</p>
                              <p className="text-sm text-muted-foreground">Artigos e guias detalhados</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-4">Formulário de Contato</h3>
                        <div className="space-y-4">
                          <div className="grid gap-2">
                            <label htmlFor="name" className="text-sm font-medium">
                              Nome
                            </label>
                            <Input id="name" placeholder="Seu nome" />
                          </div>
                          <div className="grid gap-2">
                            <label htmlFor="email" className="text-sm font-medium">
                              Email
                            </label>
                            <Input id="email" type="email" placeholder="seu.email@exemplo.com" />
                          </div>
                          <div className="grid gap-2">
                            <label htmlFor="message" className="text-sm font-medium">
                              Mensagem
                            </label>
                            <textarea
                              id="message"
                              className="min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="Descreva sua dúvida ou problema"
                            />
                          </div>
                          <Button className="w-full bg-primary hover:bg-primary/90">Enviar Mensagem</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Suspense>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
