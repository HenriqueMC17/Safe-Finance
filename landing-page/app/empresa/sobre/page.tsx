import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function SobrePage() {
  return (
    <div className="container max-w-4xl py-12 md:py-20">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Voltar para a página inicial
      </Link>

      <h1 className="text-4xl font-bold mb-6">Sobre a Safe Finance</h1>

      <div className="space-y-12">
        <section>
          <div className="rounded-xl overflow-hidden mb-8">
            <Image
              src="https://cdn.gamma.app/33klz2ifj6dnjv0/3b418702f4104c62be18926660efa238/original/20250525_1443_Logo-Profissional-Financeiro_remix_01jw48ms9cen8bgmmaztkg6y5m.png"
              alt="Equipe Safe Finance"
              width={800}
              height={400}
              className="w-full h-auto"
            />
          </div>

          <p className="text-lg mb-4">
            A Safe Finance é um organizador financeiro completo desenvolvido para ajudar indivíduos e pequenas empresas
            a gerenciarem suas finanças de maneira eficiente e intuitiva. Nossa plataforma oferece todas as ferramentas
            necessárias para um controle financeiro preciso e consciente.
          </p>

          <p className="text-lg mb-4">
            Com nossa plataforma intuitiva, você pode registrar todas as suas transações, categorizar gastos,
            estabelecer orçamentos e acompanhar sua evolução financeira através de gráficos e relatórios detalhados.
          </p>

          <p className="text-lg">
            Não deixe que a falta de organização e dívidas comprometa suas metas financeiras. O Safe Finance está aqui
            para simplificar sua vida financeira e ajudar você a alcançar seus objetivos.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Nossa Missão</h2>

          <div className="bg-muted/30 p-6 rounded-lg mb-8">
            <p className="text-lg italic">
              "Capacitar pessoas e empresas a tomarem controle de suas finanças através de ferramentas intuitivas e
              educação financeira, promovendo bem-estar financeiro e realizando sonhos."
            </p>
          </div>

          <p className="text-lg mb-4">
            Na Safe Finance, acreditamos que a saúde financeira é um componente essencial para uma vida plena e
            equilibrada. Nossa missão é democratizar o acesso a ferramentas de gestão financeira de qualidade,
            tornando-as acessíveis e compreensíveis para todos, independentemente de seu nível de conhecimento
            financeiro.
          </p>

          <p className="text-lg">
            Trabalhamos diariamente para desenvolver soluções que não apenas ajudem nossos usuários a organizar suas
            finanças, mas também a educar-se sobre princípios financeiros saudáveis, promovendo mudanças positivas em
            seus comportamentos financeiros a longo prazo.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Nossa História</h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg mb-4">
                A Safe Finance nasceu em 2022, quando um grupo de estudantes de Análise e Desenvolvimento de Sistemas da
                Facens (Faculdade de Engenharia de Sorocaba) identificou uma lacuna no mercado: a falta de uma
                ferramenta financeira verdadeiramente intuitiva e acessível para o público brasileiro.
              </p>

              <p className="text-lg">
                Inspirados por suas próprias dificuldades em gerenciar finanças pessoais, eles desenvolveram um projeto
                que combinava simplicidade de uso com recursos poderosos de gestão financeira. O que começou como um
                projeto acadêmico rapidamente evoluiu para uma startup promissora, com o objetivo de transformar a
                relação dos brasileiros com suas finanças.
              </p>
            </div>

            <div className="rounded-xl overflow-hidden">
              <Image
                src="https://cdn.gamma.app/33klz2ifj6dnjv0/c63b955f50464134b5c3d1098edc7e13/original/Foto-da-Equipe.jpg"
                alt="História da Safe Finance"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Nossos Valores</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "Simplicidade",
                description:
                  "Acreditamos que ferramentas financeiras devem ser acessíveis a todos, independentemente de seu conhecimento técnico.",
              },
              {
                title: "Transparência",
                description:
                  "Mantemos uma comunicação clara e honesta com nossos usuários em todos os aspectos de nosso serviço.",
              },
              {
                title: "Segurança",
                description: "A proteção dos dados de nossos usuários é nossa prioridade absoluta.",
              },
              {
                title: "Inovação",
                description:
                  "Buscamos constantemente novas maneiras de melhorar nossa plataforma e oferecer mais valor aos nossos usuários.",
              },
              {
                title: "Educação",
                description: "Acreditamos no poder da educação financeira para transformar vidas.",
              },
              {
                title: "Impacto Social",
                description:
                  "Trabalhamos para criar um impacto positivo na sociedade, promovendo a saúde financeira e o bem-estar.",
              },
            ].map((value, i) => (
              <div key={i} className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center p-8 bg-muted/30 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Junte-se a nós nessa jornada</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Transforme sua vida financeira hoje mesmo com a Safe Finance.
          </p>
          <Button asChild className="rounded-full">
            <Link href="/#pricing">Começar Agora</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
