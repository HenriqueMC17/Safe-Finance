import { ExportDashboardData } from "@/components/export-dashboard-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ExportPage() {
  // Normalmente, este ID viria da sessão do usuário autenticado
  const userId = 1

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Exportação de Dados</h1>
        <p className="text-muted-foreground">Exporte seus dados financeiros para análise externa ou backup</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ExportDashboardData userId={userId} />

        <Card>
          <CardHeader>
            <CardTitle>Sobre a Exportação de Dados</CardTitle>
            <CardDescription>Informações importantes sobre a exportação</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Formatos Disponíveis</h3>
              <p className="text-sm text-muted-foreground">Você pode exportar seus dados nos seguintes formatos:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>CSV - Para uso em Excel, Google Sheets ou outras planilhas</li>
                <li>PDF - Para visualização e impressão</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Privacidade e Segurança</h3>
              <p className="text-sm text-muted-foreground">
                Seus dados exportados podem conter informações financeiras sensíveis. Recomendamos:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Armazenar os arquivos exportados em local seguro</li>
                <li>Não compartilhar os arquivos com terceiros não autorizados</li>
                <li>Excluir os arquivos quando não forem mais necessários</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Dicas de Uso</h3>
              <p className="text-sm text-muted-foreground">Para obter o máximo de suas exportações:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Selecione períodos específicos para análises focadas</li>
                <li>Exporte regularmente para manter backups de seus dados</li>
                <li>Use os arquivos CSV para análises personalizadas em planilhas</li>
                <li>Use os arquivos PDF para relatórios formais ou impressão</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
