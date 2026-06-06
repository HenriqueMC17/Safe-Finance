"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Search, Code, Database, Shield, HelpCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function DocumentacaoPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementar busca na documentação
    console.log("Buscando por:", searchTerm)
  }

  return (
    <div className="container py-12 md:py-20">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Voltar para a página inicial
      </Link>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <div className="md:w-64 flex-shrink-0">
          <div className="sticky top-20">
            <form onSubmit={handleSearch} className="relative mb-6">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar na documentação..."
                className="w-full pl-9 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>

            <nav className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Introdução</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <a href="#primeiros-passos" className="text-muted-foreground hover:text-primary block py-1">
                      Primeiros Passos
                    </a>
                  </li>
                  <li>
                    <a href="#instalacao" className="text-muted-foreground hover:text-primary block py-1">
                      Instalação
                    </a>
                  </li>
                  <li>
                    <a href="#requisitos" className="text-muted-foreground hover:text-primary block py-1">
                      Requisitos do Sistema
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Funcionalidades</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <a href="#transacoes" className="text-muted-foreground hover:text-primary block py-1">
                      Cadastro de Transações
                    </a>
                  </li>
                  <li>
                    <a href="#categorias" className="text-muted-foreground hover:text-primary block py-1">
                      Categorias
                    </a>
                  </li>
                  <li>
                    <a href="#orcamentos" className="text-muted-foreground hover:text-primary block py-1">
                      Orçamentos
                    </a>
                  </li>
                  <li>
                    <a href="#relatorios" className="text-muted-foreground hover:text-primary block py-1">
                      Relatórios
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">API</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <a href="#autenticacao" className="text-muted-foreground hover:text-primary block py-1">
                      Autenticação
                    </a>
                  </li>
                  <li>
                    <a href="#endpoints" className="text-muted-foreground hover:text-primary block py-1">
                      Endpoints
                    </a>
                  </li>
                  <li>
                    <a href="#exemplos" className="text-muted-foreground hover:text-primary block py-1">
                      Exemplos
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Suporte</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <a href="#faq" className="text-muted-foreground hover:text-primary block py-1">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <Link href="/contato" className="text-muted-foreground hover:text-primary block py-1">
                      Contato
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 max-w-3xl">
          <h1 className="text-4xl font-bold mb-6">Documentação</h1>
          <p className="text-muted-foreground mb-12">
            Bem-vindo à documentação oficial da Safe Finance. Aqui você encontrará tudo o que precisa para começar a
            usar nossa plataforma e aproveitar ao máximo todas as funcionalidades.
          </p>

          {/* Introdução */}
          <section id="primeiros-passos" className="mb-16">
            <h2 className="text-2xl font-semibold mb-4">Primeiros Passos</h2>
            <p className="text-muted-foreground mb-4">
              A Safe Finance é uma plataforma completa para gestão financeira pessoal e empresarial. Com ela, você pode
              registrar transações, categorizar gastos, estabelecer orçamentos e acompanhar sua evolução financeira
              através de gráficos e relatórios detalhados.
            </p>
            <p className="text-muted-foreground mb-4">
              Para começar a usar a Safe Finance, você precisa criar uma conta e escolher um plano que atenda às suas
              necessidades. Após o cadastro, você terá acesso imediato à plataforma.
            </p>
            <div className="p-4 bg-muted/30 rounded-lg mt-6">
              <h3 className="font-medium mb-2">Dica Rápida</h3>
              <p className="text-sm text-muted-foreground">
                Recomendamos começar importando seus dados bancários ou registrando suas transações dos últimos 3 meses
                para ter uma visão mais completa da sua situação financeira.
              </p>
            </div>
          </section>

          <section id="instalacao" className="mb-16">
            <h2 className="text-2xl font-semibold mb-4">Instalação</h2>
            <p className="text-muted-foreground mb-4">
              A Safe Finance é uma plataforma baseada em nuvem, o que significa que não é necessário instalar nenhum
              software em seu computador. Basta acessar nosso site e fazer login.
            </p>
            <p className="text-muted-foreground mb-4">
              Para dispositivos móveis, oferecemos aplicativos para iOS e Android que podem ser baixados nas respectivas
              lojas de aplicativos. Nossos aplicativos oferecem todas as funcionalidades da versão web, permitindo que
              você gerencie suas finanças em qualquer lugar.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">Aplicativo iOS</h3>
                <p className="text-sm text-muted-foreground mb-4">Disponível para iPhone e iPad na App Store.</p>
                <Button asChild variant="outline" className="w-full rounded-full">
                  <Link href="#">Download na App Store</Link>
                </Button>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">Aplicativo Android</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Disponível para smartphones e tablets Android na Google Play.
                </p>
                <Button asChild variant="outline" className="w-full rounded-full">
                  <Link href="#">Download na Google Play</Link>
                </Button>
              </div>
            </div>
          </section>

          <section id="requisitos" className="mb-16">
            <h2 className="text-2xl font-semibold mb-4">Requisitos do Sistema</h2>
            <p className="text-muted-foreground mb-4">
              A Safe Finance é compatível com a maioria dos navegadores modernos e dispositivos. Para a melhor
              experiência, recomendamos:
            </p>

            <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
              <li>Navegadores: Chrome, Firefox, Safari ou Edge (versões atualizadas)</li>
              <li>Sistemas operacionais: Windows 10+, macOS 10.13+, iOS 13+, Android 8+</li>
              <li>Conexão com a internet estável</li>
              <li>Resolução de tela mínima: 1280x720</li>
            </ul>

            <p className="text-muted-foreground">
              Para funcionalidades avançadas como importação automática de dados bancários, pode ser necessário permitir
              cookies e scripts de terceiros em seu navegador.
            </p>
          </section>

          {/* Funcionalidades */}
          <section id="transacoes" className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Database className="mr-2 h-6 w-6" />
              Cadastro de Transações
            </h2>
            <p className="text-muted-foreground mb-4">
              O cadastro de transações é o coração da Safe Finance. Aqui você pode registrar todas as suas receitas e
              despesas de forma simples e organizada.
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">Tipos de Transação</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • <strong>Receitas:</strong> Salários, vendas, investimentos, etc.
                  </li>
                  <li>
                    • <strong>Despesas:</strong> Compras, contas, impostos, etc.
                  </li>
                  <li>
                    • <strong>Transferências:</strong> Entre contas próprias
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">Campos Obrigatórios</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Descrição da transação</li>
                  <li>• Valor</li>
                  <li>• Data</li>
                  <li>• Categoria</li>
                  <li>• Conta de origem/destino</li>
                </ul>
              </div>
            </div>

            <Button asChild className="rounded-full">
              <Link href="/demo">Ver Exemplo Prático</Link>
            </Button>
          </section>

          <section id="categorias" className="mb-16">
            <h2 className="text-2xl font-semibold mb-4">Categorias</h2>
            <p className="text-muted-foreground mb-4">
              As categorias ajudam você a organizar e analisar seus gastos. A Safe Finance oferece categorias
              pré-definidas e permite criar categorias personalizadas.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">Categorias de Receita</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Salário</li>
                  <li>• Freelance</li>
                  <li>• Investimentos</li>
                  <li>• Vendas</li>
                  <li>• Outras receitas</li>
                </ul>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">Categorias de Despesa</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Alimentação</li>
                  <li>• Transporte</li>
                  <li>• Moradia</li>
                  <li>• Saúde</li>
                  <li>• Educação</li>
                  <li>• Lazer</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="orcamentos" className="mb-16">
            <h2 className="text-2xl font-semibold mb-4">Orçamentos</h2>
            <p className="text-muted-foreground mb-4">
              Defina metas de gastos por categoria e acompanhe seu progresso em tempo real. Os orçamentos ajudam você a
              manter o controle financeiro e alcançar seus objetivos.
            </p>

            <div className="p-4 bg-muted/30 rounded-lg mb-6">
              <h3 className="font-medium mb-2">Como Funciona</h3>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Defina um valor limite para cada categoria</li>
                <li>Escolha o período (mensal, trimestral, anual)</li>
                <li>Acompanhe o progresso através de gráficos</li>
                <li>Receba alertas quando se aproximar do limite</li>
              </ol>
            </div>
          </section>

          <section id="relatorios" className="mb-16">
            <h2 className="text-2xl font-semibold mb-4">Relatórios</h2>
            <p className="text-muted-foreground mb-4">
              Visualize sua situação financeira através de relatórios detalhados e gráficos interativos.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <h3 className="font-medium mb-2">Fluxo de Caixa</h3>
                <p className="text-sm text-muted-foreground">Entradas vs Saídas</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <h3 className="font-medium mb-2">Gastos por Categoria</h3>
                <p className="text-sm text-muted-foreground">Análise detalhada</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <h3 className="font-medium mb-2">Evolução Patrimonial</h3>
                <p className="text-sm text-muted-foreground">Crescimento ao longo do tempo</p>
              </div>
            </div>
          </section>

          {/* API */}
          <section id="autenticacao" className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Shield className="mr-2 h-6 w-6" />
              Autenticação
            </h2>
            <p className="text-muted-foreground mb-4">
              A API da Safe Finance utiliza autenticação via token JWT para garantir a segurança dos seus dados.
            </p>

            <div className="p-4 bg-muted/30 rounded-lg mb-6">
              <h3 className="font-medium mb-2">Obtendo o Token</h3>
              <pre className="text-sm bg-black text-green-400 p-3 rounded mt-2 overflow-x-auto">
                {`POST /api/auth/login
{
  "email": "seu@email.com",
  "password": "suasenha"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600
}`}
              </pre>
            </div>
          </section>

          <section id="endpoints" className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Code className="mr-2 h-6 w-6" />
              Endpoints
            </h2>
            <p className="text-muted-foreground mb-4">Principais endpoints disponíveis na API da Safe Finance:</p>

            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">Transações</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • <code>GET /api/transactions</code> - Listar transações
                  </li>
                  <li>
                    • <code>POST /api/transactions</code> - Criar transação
                  </li>
                  <li>
                    • <code>PUT /api/transactions/:id</code> - Atualizar transação
                  </li>
                  <li>
                    • <code>DELETE /api/transactions/:id</code> - Excluir transação
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">Categorias</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • <code>GET /api/categories</code> - Listar categorias
                  </li>
                  <li>
                    • <code>POST /api/categories</code> - Criar categoria
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">Relatórios</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • <code>GET /api/reports/summary</code> - Resumo financeiro
                  </li>
                  <li>
                    • <code>GET /api/reports/cashflow</code> - Fluxo de caixa
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section id="exemplos" className="mb-16">
            <h2 className="text-2xl font-semibold mb-4">Exemplos</h2>
            <p className="text-muted-foreground mb-4">Exemplos práticos de como usar a API:</p>

            <div className="p-4 bg-muted/30 rounded-lg mb-6">
              <h3 className="font-medium mb-2">Criar uma Transação</h3>
              <pre className="text-sm bg-black text-green-400 p-3 rounded mt-2 overflow-x-auto">
                {`POST /api/transactions
Authorization: Bearer seu_token_jwt

{
  "description": "Compra no supermercado",
  "amount": -150.00,
  "date": "2024-01-15",
  "category_id": 1,
  "account_id": 1
}

Response:
{
  "id": 123,
  "description": "Compra no supermercado",
  "amount": -150.00,
  "date": "2024-01-15",
  "created_at": "2024-01-15T10:30:00Z"
}`}
              </pre>
            </div>
          </section>

          {/* Suporte */}
          <section id="faq" className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <HelpCircle className="mr-2 h-6 w-6" />
              FAQ - Perguntas Frequentes
            </h2>

            <div className="space-y-6">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">Como importar dados do meu banco?</h3>
                <p className="text-sm text-muted-foreground">
                  Você pode importar dados através de arquivos OFX, CSV ou conectando diretamente com seu banco através
                  da nossa integração Open Banking.
                </p>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">Meus dados estão seguros?</h3>
                <p className="text-sm text-muted-foreground">
                  Sim! Utilizamos criptografia de ponta a ponta e seguimos os mais altos padrões de segurança da
                  indústria. Seus dados bancários nunca são armazenados em nossos servidores.
                </p>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">Posso usar em múltiplos dispositivos?</h3>
                <p className="text-sm text-muted-foreground">
                  Sim! Sua conta sincroniza automaticamente entre todos os seus dispositivos - web, iOS e Android.
                </p>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">Como cancelar minha assinatura?</h3>
                <p className="text-sm text-muted-foreground">
                  Você pode cancelar a qualquer momento através das configurações da sua conta. Não há taxas de
                  cancelamento.
                </p>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">Existe suporte técnico?</h3>
                <p className="text-sm text-muted-foreground">
                  Sim! Oferecemos suporte via chat, email e telefone. Usuários premium têm acesso a suporte prioritário
                  24/7.
                </p>
              </div>
            </div>
          </section>

          <div className="text-center mt-16 p-6 bg-muted/30 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Não encontrou o que procurava?</h3>
            <p className="text-muted-foreground mb-6">
              Nossa equipe de suporte está pronta para ajudar com qualquer dúvida que você possa ter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="rounded-full">
                <Link href="/contato">Entrar em Contato</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/recursos/suporte">Central de Ajuda</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
