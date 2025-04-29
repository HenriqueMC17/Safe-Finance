import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

const roles = [
  { id: 1, name: "Administrador", description: "Acesso completo a todas as funcionalidades" },
  { id: 2, name: "Gerente", description: "Acesso a relatórios e gerenciamento de equipe" },
  { id: 3, name: "Analista", description: "Acesso a relatórios e análises" },
  { id: 4, name: "Usuário", description: "Acesso básico ao sistema" },
]

const permissions = [
  { id: 1, name: "Dashboard", description: "Acesso ao painel principal" },
  { id: 2, name: "Relatórios", description: "Visualização de relatórios financeiros" },
  { id: 3, name: "Transações", description: "Gerenciamento de transações" },
  { id: 4, name: "Usuários", description: "Gerenciamento de usuários" },
  { id: 5, name: "Configurações", description: "Acesso às configurações do sistema" },
]

function RolesTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Função</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {roles.map((role) => (
          <TableRow key={role.id}>
            <TableCell className="font-medium">{role.name}</TableCell>
            <TableCell>{role.description}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm">
                Editar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function PermissionsMatrix() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Permissão</TableHead>
          <TableHead>Administrador</TableHead>
          <TableHead>Gerente</TableHead>
          <TableHead>Analista</TableHead>
          <TableHead>Usuário</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {permissions.map((permission) => (
          <TableRow key={permission.id}>
            <TableCell>
              <div>
                <p className="font-medium">{permission.name}</p>
                <p className="text-xs text-muted-foreground">{permission.description}</p>
              </div>
            </TableCell>
            <TableCell className="text-center">
              <Switch defaultChecked />
            </TableCell>
            <TableCell className="text-center">
              <Switch defaultChecked={permission.id < 4} />
            </TableCell>
            <TableCell className="text-center">
              <Switch defaultChecked={permission.id < 3} />
            </TableCell>
            <TableCell className="text-center">
              <Switch defaultChecked={permission.id === 1} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default function PermissionsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Permissões</h1>

      <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
        <Card>
          <CardHeader>
            <CardTitle>Funções</CardTitle>
          </CardHeader>
          <CardContent>
            <RolesTable />
          </CardContent>
        </Card>
      </Suspense>

      <Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
        <Card>
          <CardHeader>
            <CardTitle>Matriz de Permissões</CardTitle>
          </CardHeader>
          <CardContent>
            <PermissionsMatrix />
          </CardContent>
        </Card>
      </Suspense>
    </div>
  )
}
