import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Mail, MessageSquare, Phone, FileText, HelpCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

export default function SuportePage() {
  return (
    <div className="container max-w-4xl py-12 md:py-20">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Voltar para a página inicial
      </Link>

      <h1 className="text-4xl font-bold mb-6">Suporte</h1>
      <p className="text-muted-foreground mb-12 max-w-2xl">
        Estamos aqui para ajudar. Encontre respostas para perguntas frequentes ou entre em contato com nossa equipe de
        suporte.
      </p>

      <div className="grid gap-8 md:grid-cols-2 mb-16">
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <MessageSquare className="size-6" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Chat ao Vivo</h2>
            <p className="text-muted-foreground mb-6">
              Converse com um de nossos especialistas em tempo real para obter ajuda imediata.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <div className="size-2 rounded-full bg-green-500"></div>
              <span>Disponível agora</span>
            </div>
            <Button asChild className="w-full rounded-full">
              <Link href="/agendar-demo" className="flex items-center justify-center">
                <span>Iniciar Chat</span>
                <span className="ml-2 size-4 animate-pulse bg-primary/20 rounded-full hidden group-hover:inline-block"></span>
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Mail className="size-6" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Email</h2>
            <p className="text-muted-foreground mb-6">Envie-nos um email e responderemos em até 24 horas.</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span>suporte@safefinance.com.br</span>
            </div>
            <Button asChild variant="outline" className="w-full rounded-full">
              <Link href="mailto:suporte@safefinance.com.br">Enviar Email</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Phone className="size-6" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Telefone</h2>
            <p className="text-muted-foreground mb-6">
              Disponível para clientes dos planos Profissional e Empresarial.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span>Segunda a Sexta, 9h às 18h</span>
            </div>
            <Button asChild variant="outline" className="w-full rounded-full">
              <Link href="tel:+551140028922">0800 123 4567</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <FileText className="size-6" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Base de Conhecimento</h2>
            <p className="text-muted-foreground mb-6">
              Explore nossa extensa base de conhecimento com tutoriais e guias.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span>Mais de 200 artigos disponíveis</span>
            </div>
            <Button asChild variant="outline" className="w-full rounded-full">
              <Link href="/recursos/documentacao">Acessar Base de Conhecimento</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <section className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="size-5 text-primary" />
          <h2 className="text-2xl font-semibold">Perguntas Frequentes</h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {[
            {
              question: "Como posso começar a usar a Safe Finance?",
              answer:
                "Para começar, basta criar uma conta em nosso site e escolher um plano que atenda às suas necessidades. Após o cadastro, você terá acesso imediato à plataforma e poderá começar a registrar suas transações e configurar seu perfil financeiro.",
            },
            {
              question: "A Safe Finance é segura?",
              answer:
                "Sim, a segurança é nossa prioridade. Utilizamos criptografia de ponta a ponta para proteger seus dados, autenticação de dois fatores e seguimos as melhores práticas de segurança da indústria. Além disso, não armazenamos informações sensíveis como senhas de bancos ou números completos de cartões de crédito.",
            },
            {
              question: "Posso cancelar minha assinatura a qualquer momento?",
              answer:
                "Sim, você pode cancelar sua assinatura a qualquer momento através do seu painel de controle. Não há taxas de cancelamento ou contratos de longo prazo. Se você cancelar, sua conta permanecerá ativa até o final do período de faturamento atual.",
            },
            {
              question: "A Safe Finance se conecta automaticamente com meu banco?",
              answer:
                "Sim, para os planos Profissional e Empresarial, oferecemos integração com os principais bancos brasileiros para importação automática de transações. Para o plano Básico, o registro de transações é manual.",
            },
            {
              question: "Posso usar a Safe Finance em dispositivos móveis?",
              answer:
                "Sim, a Safe Finance está disponível como aplicativo para iOS e Android, além da versão web que é responsiva e funciona em qualquer dispositivo com acesso à internet.",
            },
            {
              question: "O que acontece com meus dados se eu cancelar minha conta?",
              answer:
                "Se você cancelar sua conta, seus dados permanecerão em nosso sistema por 30 dias, período durante o qual você pode reativar sua conta com todos os dados intactos. Após esse período, seus dados serão excluídos permanentemente de nossos servidores.",
            },
          ].map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-border/40 py-2">
              <AccordionTrigger className="text-left font-medium hover:no-underline">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <div className="text-center p-8 bg-muted/30 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Ainda precisa de ajuda?</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Se você não encontrou a resposta que procurava, entre em contato conosco e teremos prazer em ajudar.
        </p>
        <Button asChild className="rounded-full">
          <Link href="/contato">Entrar em Contato</Link>
        </Button>
      </div>
    </div>
  )
}
