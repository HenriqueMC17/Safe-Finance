import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function APIPage() {
  return (
    <div className="container max-w-4xl py-12 md:py-20">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Voltar para a página inicial
      </Link>

      <h1 className="text-4xl font-bold mb-6">API Safe Finance</h1>
      <p className="text-muted-foreground mb-12 max-w-2xl">
        Nossa API permite que você integre os dados financeiros da Safe Finance com seus próprios sistemas e
        aplicativos. Disponível para clientes dos planos Empresarial.
      </p>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Visão Geral</h2>
          <p className="text-muted-foreground mb-4">
            A API da Safe Finance é RESTful e utiliza JSON para todas as solicitações e respostas. Autenticação é feita
            via tokens JWT e todas as conexões são criptografadas via HTTPS.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 bg-muted/30 rounded-lg">
              <h3 className="font-medium mb-2">Endpoints Disponíveis</h3>
              <p className="text-sm text-muted-foreground">Acesso a transações, categorias, orçamentos e relatórios.</p>
            </div>
            <div className="p-6 bg-muted/30 rounded-lg">
              <h3 className="font-medium mb-2">Limites de Requisição</h3>
              <p className="text-sm text-muted-foreground">1000 requisições por hora para planos Empresariais.</p>
            </div>
            <div className="p-6 bg-muted/30 rounded-lg">
              <h3 className="font-medium mb-2">Suporte</h3>
              <p className="text-sm text-muted-foreground">Suporte dedicado para implementação e dúvidas técnicas.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Exemplos de Uso</h2>

          <Tabs defaultValue="transactions" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="transactions">Transações</TabsTrigger>
              <TabsTrigger value="categories">Categorias</TabsTrigger>
              <TabsTrigger value="reports">Relatórios</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="space-y-4">
              <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                <pre>{`// Exemplo de requisição para listar transações
fetch('https://api.safefinance.com.br/v1/transactions', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}</pre>
              </div>

              <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                <pre>{`// Resposta
{
  "data": [
    {
      "id": "tx_123456",
      "amount": 150.00,
      "description": "Supermercado",
      "category_id": "cat_groceries",
      "date": "2023-04-15T10:30:00Z",
      "type": "expense"
    },
    {
      "id": "tx_123457",
      "amount": 2500.00,
      "description": "Salário",
      "category_id": "cat_income",
      "date": "2023-04-05T08:00:00Z",
      "type": "income"
    }
  ],
  "meta": {
    "total": 2,
    "page": 1,
    "per_page": 10
  }
}`}</pre>
              </div>
            </TabsContent>

            <TabsContent value="categories" className="space-y-4">
              <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                <pre>{`// Exemplo de requisição para listar categorias
fetch('https://api.safefinance.com.br/v1/categories', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}</pre>
              </div>

              <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                <pre>{`// Resposta
{
  "data": [
    {
      "id": "cat_groceries",
      "name": "Supermercado",
      "color": "#50c8a8",
      "icon": "shopping-cart",
      "type": "expense"
    },
    {
      "id": "cat_income",
      "name": "Salário",
      "color": "#4CAF50",
      "icon": "dollar-sign",
      "type": "income"
    }
  ],
  "meta": {
    "total": 2,
    "page": 1,
    "per_page": 10
  }
}`}</pre>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                <pre>{`// Exemplo de requisição para gerar relatório mensal
fetch('https://api.safefinance.com.br/v1/reports/monthly?year=2023&month=4', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}</pre>
              </div>

              <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                <pre>{`// Resposta
{
  "data": {
    "period": "2023-04",
    "income": {
      "total": 3500.00,
      "by_category": [
        { "category": "Salário", "amount": 2500.00 },
        { "category": "Freelance", "amount": 1000.00 }
      ]
    },
    "expenses": {
      "total": 1850.00,
      "by_category": [
        { "category": "Supermercado", "amount": 650.00 },
        { "category": "Aluguel", "amount": 1200.00 }
      ]
    },
    "balance": 1650.00
  }
}`}</pre>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Começar a Usar</h2>
          <p className="text-muted-foreground mb-6">
            Para começar a usar nossa API, você precisa ter um plano Empresarial ativo. Após a contratação, você
            receberá suas credenciais de API no painel administrativo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="rounded-full">
              <Link href="/recursos/documentacao">Ver Documentação Completa</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/produto/planos">Ver Planos</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
