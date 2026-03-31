import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="container max-w-4xl py-12 md:py-20">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Voltar para a página inicial
      </Link>

      <h1 className="text-4xl font-bold mb-6">Termos de Serviço</h1>
      <p className="text-muted-foreground mb-8">Última atualização: 15 de Abril de 2023</p>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          Bem-vindo à Safe Finance. Estes Termos de Serviço ("Termos") regem seu acesso e uso do site, aplicativos
          móveis e serviços oferecidos pela Safe Finance ("Serviço").
        </p>

        <p>
          Ao acessar ou usar nosso Serviço, você concorda com estes Termos. Se você não concordar com qualquer parte
          destes Termos, não poderá acessar ou usar nosso Serviço.
        </p>

        <h2>1. Uso do Serviço</h2>

        <h3>1.1 Elegibilidade</h3>
        <p>
          Para usar o Serviço, você deve ter pelo menos 18 anos de idade ou a maioridade legal em sua jurisdição, o que
          for maior. Ao usar o Serviço, você declara e garante que atende a este requisito.
        </p>

        <h3>1.2 Registro de Conta</h3>
        <p>
          Para acessar determinados recursos do Serviço, você precisará criar uma conta. Você é responsável por manter a
          confidencialidade de suas credenciais de conta e por todas as atividades que ocorrerem em sua conta. Você
          concorda em notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta.
        </p>

        <h3>1.3 Uso Aceitável</h3>
        <p>Você concorda em usar o Serviço apenas para fins legais e de acordo com estes Termos. Você não deve:</p>
        <ul>
          <li>Usar o Serviço de qualquer maneira que viole leis ou regulamentos aplicáveis</li>
          <li>
            Usar o Serviço para enviar, receber, carregar ou baixar material ofensivo, abusivo, difamatório ou ilegal
          </li>
          <li>
            Tentar obter acesso não autorizado a qualquer parte do Serviço ou a sistemas ou redes conectados ao Serviço
          </li>
          <li>Interferir no funcionamento adequado do Serviço</li>
          <li>Usar o Serviço para distribuir malware ou outros códigos maliciosos</li>
          <li>Realizar qualquer atividade que possa danificar, sobrecarregar ou comprometer a segurança do Serviço</li>
        </ul>

        <h2>2. Planos e Pagamentos</h2>

        <h3>2.1 Planos de Assinatura</h3>
        <p>
          A Safe Finance oferece diferentes planos de assinatura. Os detalhes e preços de cada plano estão disponíveis
          em nosso site. Reservamo-nos o direito de modificar, encerrar ou alterar os preços de nossos planos a qualquer
          momento.
        </p>

        <h3>2.2 Pagamentos</h3>
        <p>
          Ao assinar um plano pago, você concorda em pagar todas as taxas aplicáveis. A menos que especificado de outra
          forma:
        </p>
        <ul>
          <li>Os pagamentos são cobrados no início de cada período de faturamento</li>
          <li>As assinaturas são renovadas automaticamente, a menos que você as cancele</li>
          <li>Não há reembolsos para pagamentos já processados</li>
        </ul>

        <h3>2.3 Período de Teste</h3>
        <p>
          Podemos oferecer períodos de teste gratuitos para nossos planos pagos. Ao final do período de teste, sua
          assinatura será automaticamente convertida para o plano pago correspondente, a menos que você cancele antes do
          término do período de teste.
        </p>

        <h2>3. Propriedade Intelectual</h2>

        <h3>3.1 Nosso Conteúdo</h3>
        <p>
          O Serviço e seu conteúdo original, recursos e funcionalidades são e permanecerão propriedade exclusiva da Safe
          Finance e de seus licenciadores. O Serviço é protegido por direitos autorais, marcas registradas e outras leis
          de propriedade intelectual do Brasil e de outros países.
        </p>

        <h3>3.2 Seu Conteúdo</h3>
        <p>
          Você mantém todos os direitos sobre o conteúdo que você envia, publica ou exibe no Serviço. Ao fornecer
          conteúdo ao Serviço, você nos concede uma licença mundial, não exclusiva, isenta de royalties para usar,
          reproduzir, processar, adaptar, modificar e publicar esse conteúdo exclusivamente para o propósito de fornecer
          o Serviço a você.
        </p>

        <h2>4. Limitação de Responsabilidade</h2>

        <p>
          Em nenhuma circunstância a Safe Finance, seus diretores, funcionários, parceiros, agentes, fornecedores ou
          afiliados serão responsáveis por quaisquer danos indiretos, incidentais, especiais, consequenciais ou
          punitivos, incluindo, sem limitação, perda de lucros, dados, uso, boa vontade ou outras perdas intangíveis,
          resultantes de:
        </p>
        <ul>
          <li>Seu acesso ou uso ou incapacidade de acessar ou usar o Serviço</li>
          <li>Qualquer conduta ou conteúdo de terceiros no Serviço</li>
          <li>Conteúdo obtido do Serviço</li>
          <li>Acesso não autorizado, uso ou alteração de suas transmissões ou conteúdo</li>
        </ul>

        <h2>5. Isenção de Garantias</h2>

        <p>
          O Serviço é fornecido "como está" e "conforme disponível", sem garantias de qualquer tipo, expressas ou
          implícitas. A Safe Finance não garante que o Serviço será ininterrupto, seguro ou livre de erros.
        </p>

        <h2>6. Alterações nos Termos</h2>

        <p>
          Reservamo-nos o direito de modificar ou substituir estes Termos a qualquer momento. Se uma revisão for
          material, forneceremos pelo menos 30 dias de aviso antes que os novos termos entrem em vigor. O que constitui
          uma alteração material será determinado a nosso critério.
        </p>

        <h2>7. Rescisão</h2>

        <p>
          Podemos encerrar ou suspender sua conta e acesso ao Serviço imediatamente, sem aviso prévio ou
          responsabilidade, por qualquer motivo, incluindo, sem limitação, se você violar estes Termos.
        </p>

        <h2>8. Lei Aplicável</h2>

        <p>
          Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem considerar suas disposições de
          conflito de leis.
        </p>

        <h2>9. Contato</h2>

        <p>Se você tiver dúvidas sobre estes Termos, entre em contato conosco:</p>
        <ul>
          <li>Por e-mail: termos@safefinance.com.br</li>
          <li>Por correio: Safe Finance, Av. Exemplo, 123 - Sorocaba, SP - CEP 18000-000</li>
        </ul>
      </div>

      <div className="mt-12 p-6 bg-muted/30 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Dúvidas sobre os Termos de Serviço?</h3>
        <p className="text-muted-foreground mb-4">
          Se você tiver qualquer dúvida sobre nossos Termos de Serviço, entre em contato com nossa equipe jurídica.
        </p>
        <Button asChild className="rounded-full">
          <Link href="/contato">Entrar em Contato</Link>
        </Button>
      </div>
    </div>
  )
}
