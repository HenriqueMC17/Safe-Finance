import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function CookiePolicyPage() {
  return (
    <div className="container max-w-4xl py-12 md:py-20">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Voltar para a página inicial
      </Link>

      <h1 className="text-4xl font-bold mb-6">Política de Cookies</h1>
      <p className="text-muted-foreground mb-8">Última atualização: 15 de Abril de 2023</p>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          Esta Política de Cookies explica como a Safe Finance ("nós", "nosso" ou "nossa") utiliza cookies e tecnologias
          similares para reconhecê-lo quando você visita nosso site e aplicativos ("Serviço"). Ela explica o que são
          essas tecnologias e por que as usamos, bem como seus direitos de controlar nosso uso delas.
        </p>

        <h2>1. O que são Cookies?</h2>

        <p>
          Cookies são pequenos arquivos de dados que são colocados em seu computador ou dispositivo móvel quando você
          visita um site. Os cookies são amplamente utilizados pelos proprietários de sites para fazer seus sites
          funcionarem, ou funcionarem de maneira mais eficiente, bem como para fornecer informações de relatórios.
        </p>

        <p>
          Os cookies definidos pelo proprietário do site (neste caso, Safe Finance) são chamados de cookies "primários".
          Os cookies definidos por partes que não o proprietário do site são chamados de cookies "de terceiros". Os
          cookies de terceiros permitem que recursos ou funcionalidades de terceiros sejam fornecidos no ou através do
          site (como publicidade, conteúdo interativo e análises).
        </p>

        <h2>2. Por que usamos Cookies?</h2>

        <p>Utilizamos cookies primários e de terceiros pelos seguintes motivos:</p>

        <ul>
          <li>
            <strong>Necessários:</strong> Cookies que são essenciais para o funcionamento do Serviço. Eles permitem
            recursos básicos como navegação de página e acesso a áreas seguras.
          </li>
          <li>
            <strong>Preferências:</strong> Cookies que nos permitem lembrar suas escolhas e personalizar o Serviço com
            recursos aprimorados.
          </li>
          <li>
            <strong>Estatísticas:</strong> Cookies que nos ajudam a entender como os visitantes interagem com o Serviço,
            coletando e relatando informações anonimamente.
          </li>
          <li>
            <strong>Marketing:</strong> Cookies usados para rastrear visitantes em sites. A intenção é exibir anúncios
            relevantes e envolventes para o usuário individual.
          </li>
        </ul>

        <h2>3. Cookies que utilizamos</h2>

        <p>Os cookies específicos que utilizamos incluem:</p>

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 text-left">Nome</th>
              <th className="border p-2 text-left">Tipo</th>
              <th className="border p-2 text-left">Finalidade</th>
              <th className="border p-2 text-left">Duração</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">session_id</td>
              <td className="border p-2">Necessário</td>
              <td className="border p-2">Mantém sua sessão ativa</td>
              <td className="border p-2">Sessão</td>
            </tr>
            <tr>
              <td className="border p-2">auth_token</td>
              <td className="border p-2">Necessário</td>
              <td className="border p-2">Autenticação do usuário</td>
              <td className="border p-2">30 dias</td>
            </tr>
            <tr>
              <td className="border p-2">theme_preference</td>
              <td className="border p-2">Preferência</td>
              <td className="border p-2">Armazena sua preferência de tema (claro/escuro)</td>
              <td className="border p-2">1 ano</td>
            </tr>
            <tr>
              <td className="border p-2">_ga</td>
              <td className="border p-2">Estatística</td>
              <td className="border p-2">Google Analytics - Usado para distinguir usuários</td>
              <td className="border p-2">2 anos</td>
            </tr>
            <tr>
              <td className="border p-2">_gid</td>
              <td className="border p-2">Estatística</td>
              <td className="border p-2">Google Analytics - Usado para distinguir usuários</td>
              <td className="border p-2">24 horas</td>
            </tr>
          </tbody>
        </table>

        <h2>4. Como controlar os Cookies</h2>

        <p>
          Você pode definir ou alterar os controles do seu navegador da web para aceitar ou recusar cookies. Se você
          optar por rejeitar cookies, ainda poderá usar nosso Serviço, embora seu acesso a algumas funcionalidades e
          áreas do nosso Serviço possa ser restrito.
        </p>

        <p>
          Como os meios pelos quais você pode recusar cookies através dos controles do seu navegador da web variam de
          navegador para navegador, você deve visitar o menu de ajuda do seu navegador para obter mais informações. Aqui
          estão links para instruções dos navegadores mais populares:
        </p>

        <ul>
          <li>
            <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
              Google Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/pt-BR/kb/ative-e-desative-os-cookies-que-os-sites-usam"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/pt-br/guide/safari/sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
            >
              Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/pt-br/microsoft-edge/excluir-cookies-no-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Edge
            </a>
          </li>
        </ul>

        <p>
          Além disso, a maioria das redes de publicidade oferece uma maneira de optar por não receber publicidade
          direcionada. Se você gostaria de obter mais informações, visite:
        </p>

        <ul>
          <li>
            <a href="https://www.networkadvertising.org/managing/opt_out.asp" target="_blank" rel="noopener noreferrer">
              Network Advertising Initiative
            </a>
          </li>
          <li>
            <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
              Digital Advertising Alliance
            </a>
          </li>
        </ul>

        <h2>5. Alterações nesta Política de Cookies</h2>

        <p>
          Podemos atualizar esta Política de Cookies de tempos em tempos para refletir, por exemplo, mudanças nos
          cookies que usamos ou por outros motivos operacionais, legais ou regulatórios. Portanto, visite esta Política
          de Cookies regularmente para se manter informado sobre nosso uso de cookies e tecnologias relacionadas.
        </p>

        <p>A data no topo desta Política de Cookies indica quando ela foi atualizada pela última vez.</p>

        <h2>6. Contato</h2>

        <p>Se você tiver dúvidas sobre nosso uso de cookies ou outras tecnologias, entre em contato conosco:</p>
        <ul>
          <li>Por e-mail: privacidade@safefinance.com.br</li>
          <li>Por correio: Safe Finance, Av. Exemplo, 123 - Sorocaba, SP - CEP 18000-000</li>
        </ul>
      </div>

      <div className="mt-12 p-6 bg-muted/30 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Dúvidas sobre cookies?</h3>
        <p className="text-muted-foreground mb-4">
          Se você tiver qualquer dúvida sobre como utilizamos cookies ou outras tecnologias de rastreamento, entre em
          contato conosco.
        </p>
        <Button asChild className="rounded-full">
          <Link href="/contato">Entrar em Contato</Link>
        </Button>
      </div>
    </div>
  )
}
