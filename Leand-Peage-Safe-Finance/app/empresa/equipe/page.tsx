import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Linkedin, Mail } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function EquipePage() {
  return (
    <div className="container max-w-4xl py-12 md:py-20">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Voltar para a página inicial
      </Link>

      <h1 className="text-4xl font-bold mb-6">Nossa Equipe</h1>
      <p className="text-muted-foreground mb-12 max-w-2xl">
        Conheça os desenvolvedores por trás da Safe Finance, um grupo destinado a contribuir para um futuro financeiro
        bom e saudável para os usuários.
      </p>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Desenvolvedores e Estudantes</h2>
          <p className="text-lg mb-8">
            Estudantes de Análise e Desenvolvimento de Sistemas da Facens (Faculdade de Engenharia de Sorocaba),
            chegaram em um projeto inspirador sobre o organizador financeiro, com o objetivo dos usuários melhorarem as
            suas vidas financeiras, inclusive cidadãos brasileiros a serem mais cuidadosos e sábios na hora de receber e
            gastar o dinheiro com prudência. Alunos desenvolvedores pretendem seguir a area de Tecnologia da Informação
            com focos diferentes.
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Anthony Losano Miranda",
                role: "Desenvolvedor de Sistemas, Analista de Suporte",
                image: "https://media.licdn.com/dms/image/v2/D4E03AQFllsoPru8mcw/profile-displayphoto-shrink_200_200/B4EZUg5HVSHgAY-/0/1740013639147?e=1753920000&v=beta&t=_oDOuhLw4fRwzhu5_kQ-DXFGNAYMvkoQC55ypiR05HI",
                linkedin: "https://www.linkedin.com/in/anthonylosanomiranda/",
                email: "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=CllgCJZZPzNppSTTvgljbZTCGtNJxmcpdSnQtkvQmgMVFFHWzzPBbpMpdDNTJHMJNgZlWntnCJV",
                bio: "Especialista em desenvolvimento de sistemas e suporte técnico, com foco em criar soluções robustas e de fácil manutenção.",
              },
              {
                name: "Gabriel Viana Krapp Guimarães",
                role: "Product Owner, Analista de Viabilidade",
                image: "https://media.licdn.com/dms/image/v2/D4D03AQGgsTMEO53W8Q/profile-displayphoto-shrink_200_200/B4DZZ831VLGwAY-/0/1745851734859?e=1753920000&v=beta&t=G4qojigBId1raWIaD4ShLmjKLocEUkypfgZoyAvmExo",
                linkedin: "https://www.linkedin.com/in/gabriel-krapp9001/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
                email: "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=DmwnWrRnXvZMXFmVSxdzPVjzMZhsglxzrClfrbjXpRbQvRJMrbfRFxQLjchqHDkkNQVdGXLqkbvv",
                bio: "Responsável pela visão do produto e análise de viabilidade, garantindo que a Safe Finance atenda às necessidades reais dos usuários.",
              },
              {
                name: "Gustavo de Matos Passarelli",
                role: "Scrum master, Gestor de projetos",
                image: "https://media.licdn.com/dms/image/v2/D4E03AQHV8HWK0FZw3w/profile-displayphoto-shrink_200_200/B4EZWF7wcLH0AY-/0/1741708790580?e=1753920000&v=beta&t=7E243CTg9-dLn6tfvZCeETigetiJfj2NDTFny-L2Ffw",
                linkedin: "https://www.linkedin.com/in/gustavo-passarelli/",
                email: "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=CllgCJZWxknhNwMFCMVgPbvwnChWpBnBdvmwqPfBZMGsJBlRQdhVkHSmLWHrzlLSxNsMPTtDdxq",
                bio: "Especialista em metodologias ágeis e gestão de projetos, garantindo a entrega eficiente e de alta qualidade.",
              },
              {
                name: "Henrique Monteiro Cardoso",
                role: "Desenvolvedor de Algoritmos, Analista de Requisitos",
                image: "https://media.licdn.com/dms/image/v2/D4D03AQFKZkX8KAg7eA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1719774970076?e=1753920000&v=beta&t=-rUc6PMJ9lPgnuHfx2MFWeGYIMuuVWBN_dwZhpC7piw",
                linkedin: "https://www.linkedin.com/in/henrique-monteiro-cardoso-ba3716229/",
                email: "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=CllgCHrlFZDxQKCqdMzNzDCnshRGNVmWBWLSxCwQSswbGlwtmZxqqzgjVjTFDCRgPpTrNSfxwCL",
                bio: "Focado no desenvolvimento de algoritmos eficientes e análise detalhada de requisitos para garantir soluções precisas.",
              },
              {
                name: "Lucas Sodré Teixeira",
                role: "Consultor de Usabilidade",
                image: "https://media.licdn.com/dms/image/v2/D4D03AQGzMUi_JGOuKQ/profile-displayphoto-shrink_200_200/B4DZUgzorCHkAY-/0/1740012164343?e=1753920000&v=beta&t=N1SwExvimrRmzGt1InorcG9wIx77w65tBAadTE_IqWw",
                linkedin: "https://www.linkedin.com/in/lucasantoniosodre/",
                email: "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=DmwnWtMqhRHqDxxDvwRjHkDBNPwFSQwrjNNWhmFWGPGbgZHzgbLkRflJTJjSTHvGRWspmxdZvdcV",
                bio: "Especialista em experiência do usuário, trabalhando para tornar a Safe Finance intuitiva e acessível para todos os públicos.",
              },
              {
                name: "Murilo Henrique Araujo Elias Fernandez",
                role: "Desenvolvedor de Sistemas, Arquitetura de Sistemas",
                image: "https://media.licdn.com/dms/image/v2/D4D03AQEanXSsHTtsJQ/profile-displayphoto-shrink_200_200/B4DZcI7UKwIEAY-/0/1748201457413?e=1753920000&v=beta&t=Slj74aFIj2s7u3hM0PqOlt3VB59cmWspfi9bVI05QfQ",
                linkedin: "https://www.linkedin.com/in/murilo-henrique-araujo-elias-fernandez-20b099283/",
                email: "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=CllgCJqbQjFKlmTKMBCkHkBlTfMPdVbpSQFWHngkgwdfbVhqjkMtwGfkLVCkPFxqCmTgdxShsqB",
                bio: "Responsável pela arquitetura de sistemas e desenvolvimento, garantindo uma base sólida e escalável para a plataforma.",
              },
            ].map((member, i) => (
              <Card key={i} className="overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
                  <p className="text-sm mb-4">{member.bio}</p>
                  <div className="flex gap-3">
                    <Button asChild variant="outline" size="icon" className="rounded-full">
                      <Link href={member.linkedin}>
                        <Linkedin className="size-4" />
                        <span className="sr-only">LinkedIn</span>
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="icon" className="rounded-full">
                      <Link href={`mailto:${member.email}`}>
                        <Mail className="size-4" />
                        <span className="sr-only">Email</span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Nossa Instituição</h2>

          <div className="bg-muted/30 p-8 rounded-lg">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <Image
                  src="https://jorplast.com.br/wp-content/uploads/2020/08/facens-logo-quadrado.jpg"
                  alt="Logo Facens"
                  width={200}
                  height={200}
                  className="w-full max-w-[200px] h-auto mx-auto"
                />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold mb-4">Facens - Faculdade de Engenharia de Sorocaba</h3>
                <p className="text-muted-foreground mb-4">
                  A Facens é uma instituição de ensino superior localizada em Sorocaba, São Paulo, reconhecida pela
                  excelência em cursos de engenharia e tecnologia. Com uma abordagem prática e inovadora, a Facens
                  prepara seus alunos para os desafios do mercado de trabalho e incentiva o desenvolvimento de projetos
                  com impacto social.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href="https://www.facens.br" target="_blank" rel="noopener noreferrer">
                      Visitar Site
                    </Link>
                  </Button>
                  <Button asChild className="rounded-full">
                    <Link href="https://www.instagram.com/instafacens/" target="_blank" rel="noopener noreferrer">
                      Seguir no Instagram
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Junte-se à Nossa Equipe</h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg mb-4">
                Estamos sempre em busca de talentos apaixonados por tecnologia e finanças para se juntar à nossa equipe.
                Se você é criativo, inovador e quer fazer parte de um projeto que está transformando a vida financeira
                de milhares de pessoas, queremos conhecer você!
              </p>

              <p className="text-lg mb-6">
                Oferecemos um ambiente de trabalho dinâmico, oportunidades de crescimento e a chance de contribuir para
                um produto que faz a diferença na vida das pessoas.
              </p>

              <Button asChild className="rounded-full">
                <Link href="/carreiras">Ver Vagas Abertas</Link>
              </Button>
            </div>

            <div className="rounded-xl overflow-hidden">
              <Image
                src="https://cdn.gamma.app/33klz2ifj6dnjv0/generated-images/8Ets8m23eBfKLOqttW0kx.png"
                alt="Equipe trabalhando"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
