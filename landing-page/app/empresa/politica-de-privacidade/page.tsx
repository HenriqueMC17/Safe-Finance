import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="container max-w-4xl py-12 md:py-20">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Voltar para a página inicial
      </Link>

      <h1 className="text-4xl font-bold mb-6">Política de Privacidade</h1>
      <p className="text-muted-foreground mb-8">Última atualização: 15 de Abril de 2023</p>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          A Safe Finance está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como
          coletamos, usamos, divulgamos e protegemos suas informações quando você utiliza nosso serviço.
        </p>

        <h2>1. Informações que Coletamos</h2>

        <h3>1.1 Informações Pessoais</h3>
        <p>Podemos coletar as seguintes informações pessoais:</p>
        <ul>
          <li>Informações de identificação (nome, endereço de e-mail, número de telefone)</li>
          <li>Informações de pagamento (para processamento de assinaturas)</li>
          <li>Informações de perfil (preferências, configurações)</li>
        </ul>

        <h3>1.2 Informações Financeiras</h3>
        <p>Dependendo de como você utiliza nosso serviço, podemos coletar:</p>
        <ul>
          <li>Transações financeiras que você registra manualmente</li>
          <li>Dados de contas bancárias que você opta por conectar (mediante sua autorização explícita)</li>
          <li>Categorias de gastos e orçamentos que você define</li>
        </ul>

        <h3>1.3 Informações de Uso</h3>
        <p>Coletamos informações sobre como você interage com nosso serviço:</p>
        <ul>
          <li>Dados de acesso (endereço IP, tipo de navegador, páginas visitadas)</li>
          <li>Dispositivos utilizados para acessar o serviço</li>
          <li>Tempo gasto no serviço e funcionalidades utilizadas</li>
        </ul>

        <h2>2. Como Usamos Suas Informações</h2>

        <p>Utilizamos suas informações para:</p>
        <ul>
          <li>Fornecer, manter e melhorar nosso serviço</li>
          <li>Processar pagamentos e gerenciar sua conta</li>
          <li>Enviar comunicações relacionadas ao serviço</li>
          <li>Personalizar sua experiência</li>
          <li>Analisar o uso do serviço para melhorias</li>
          <li>Detectar, prevenir e resolver problemas técnicos e de segurança</li>
        </ul>

        <h2>3. Compartilhamento de Informações</h2>

        <p>
          Não vendemos suas informações pessoais. Podemos compartilhar suas informações nas seguintes circunstâncias:
        </p>
        <ul>
          <li>
            Com provedores de serviços que nos ajudam a operar nosso serviço (processadores de pagamento, serviços de
            hospedagem)
          </li>
          <li>Quando exigido por lei ou para proteger nossos direitos</li>
          <li>Em caso de fusão, venda ou transferência de ativos (seus direitos de privacidade serão mantidos)</li>
          <li>Com seu consentimento explícito para outros fins</li>
        </ul>

        <h2>4. Segurança de Dados</h2>

        <p>
          Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não
          autorizado, alteração, divulgação ou destruição. Estas medidas incluem:
        </p>
        <ul>
          <li>Criptografia de dados em trânsito e em repouso</li>
          <li>Autenticação de dois fatores</li>
          <li>Revisões regulares de segurança e testes de penetração</li>
          <li>Acesso restrito a informações pessoais apenas a funcionários que precisam delas</li>
        </ul>

        <h2>5. Seus Direitos</h2>

        <p>
          De acordo com a Lei Geral de Proteção de Dados (LGPD) e outras leis de privacidade aplicáveis, você tem os
          seguintes direitos:
        </p>
        <ul>
          <li>Direito de acesso às suas informações pessoais</li>
          <li>Direito de retificação de dados incorretos ou incompletos</li>
          <li>Direito de exclusão de seus dados (com certas limitações)</li>
          <li>Direito de restringir ou opor-se ao processamento de seus dados</li>
          <li>Direito à portabilidade de dados</li>
          <li>Direito de retirar o consentimento a qualquer momento</li>
        </ul>

        <h2>6. Retenção de Dados</h2>

        <p>
          Mantemos suas informações pessoais pelo tempo necessário para fornecer o serviço e cumprir as finalidades
          descritas nesta Política de Privacidade, a menos que um período de retenção mais longo seja exigido ou
          permitido por lei.
        </p>

        <h2>7. Alterações a Esta Política</h2>

        <p>
          Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações
          publicando a nova Política de Privacidade nesta página e, se as alterações forem significativas, enviaremos
          uma notificação por e-mail.
        </p>

        <h2>8. Contato</h2>

        <p>Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco:</p>
        <ul>
          <li>Por e-mail: privacidade@safefinance.com.br</li>
          <li>Por correio: Safe Finance, Av. Exemplo, 123 - Sorocaba, SP - CEP 18000-000</li>
        </ul>
      </div>

      <div className="mt-12 p-6 bg-muted/30 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Dúvidas sobre privacidade?</h3>
        <p className="text-muted-foreground mb-4">
          Se você tiver qualquer dúvida sobre como tratamos seus dados ou quiser exercer seus direitos, entre em contato
          com nosso Encarregado de Proteção de Dados.
        </p>
        <Button asChild className="rounded-full">
          <Link href="/contato">Entrar em Contato</Link>
        </Button>
      </div>
    </div>
  )
}
