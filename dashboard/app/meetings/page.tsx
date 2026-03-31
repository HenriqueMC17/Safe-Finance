import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PlusCircle, Video, Users, Calendar } from "lucide-react"

const meetings = [
  {
    id: 1,
    title: "Revisão Financeira Mensal",
    date: "2023-08-15",
    time: "14:00",
    participants: 8,
    type: "Videoconferência",
  },
  { id: 2, title: "Planejamento Estratégico", date: "2023-08-16", time: "10:00", participants: 5, type: "Presencial" },
  {
    id: 3,
    title: "Análise de Resultados Q2",
    date: "2023-08-17",
    time: "15:30",
    participants: 12,
    type: "Videoconferência",
  },
  { id: 4, title: "Treinamento de Equipe", date: "2023-08-18", time: "09:00", participants: 20, type: "Híbrido" },
  {
    id: 5,
    title: "Reunião com Investidores",
    date: "2023-08-20",
    time: "11:00",
    participants: 6,
    type: "Videoconferência",
  },
]

function MeetingsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Horário</TableHead>
          <TableHead>Participantes</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {meetings.map((meeting) => (
          <TableRow key={meeting.id}>
            <TableCell className="font-medium">{meeting.title}</TableCell>
            <TableCell>{meeting.date}</TableCell>
            <TableCell>{meeting.time}</TableCell>
            <TableCell>{meeting.participants}</TableCell>
            <TableCell>
              <div className="flex items-center">
                {meeting.type === "Videoconferência" && <Video className="mr-2 h-4 w-4 text-primary" />}
                {meeting.type === "Presencial" && <Users className="mr-2 h-4 w-4 text-primary" />}
                {meeting.type === "Híbrido" && <Calendar className="mr-2 h-4 w-4 text-primary" />}
                {meeting.type}
              </div>
            </TableCell>
            <TableCell>
              <Button variant="outline" size="sm">
                Entrar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default function MeetingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reuniões</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <PlusCircle className="mr-2 h-4 w-4" /> Agendar Reunião
        </Button>
      </div>

      <Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
        <Card>
          <CardHeader>
            <CardTitle>Próximas Reuniões</CardTitle>
          </CardHeader>
          <CardContent>
            <MeetingsTable />
          </CardContent>
        </Card>
      </Suspense>
    </div>
  )
}
