import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PlusCircle } from "lucide-react"

const members = [
  {
    id: 1,
    name: "Ana Silva",
    email: "ana.silva@exemplo.com",
    role: "Administrador",
    department: "Financeiro",
    status: "Ativo",
  },
  {
    id: 2,
    name: "Carlos Oliveira",
    email: "carlos.oliveira@exemplo.com",
    role: "Analista",
    department: "Contabilidade",
    status: "Ativo",
  },
  {
    id: 3,
    name: "Mariana Santos",
    email: "mariana.santos@exemplo.com",
    role: "Gerente",
    department: "Operações",
    status: "Ativo",
  },
  {
    id: 4,
    name: "Pedro Costa",
    email: "pedro.costa@exemplo.com",
    role: "Analista",
    department: "Financeiro",
    status: "Inativo",
  },
  {
    id: 5,
    name: "Juliana Lima",
    email: "juliana.lima@exemplo.com",
    role: "Diretor",
    department: "Executivo",
    status: "Ativo",
  },
]

const statusStyles = {
  Ativo: "bg-primary/20 text-primary",
  Inativo: "bg-red-500/20 text-red-500",
}

function MembersTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Membro</TableHead>
          <TableHead>Cargo</TableHead>
          <TableHead>Departamento</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>{member.role}</TableCell>
            <TableCell>{member.department}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs ${statusStyles[member.status]}`}>{member.status}</span>
            </TableCell>
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

export default function MembersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Membros</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Membro
        </Button>
      </div>

      <Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
        <Card>
          <CardHeader>
            <CardTitle>Equipe</CardTitle>
          </CardHeader>
          <CardContent>
            <MembersTable />
          </CardContent>
        </Card>
      </Suspense>
    </div>
  )
}
