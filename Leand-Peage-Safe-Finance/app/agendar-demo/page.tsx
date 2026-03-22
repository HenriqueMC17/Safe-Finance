"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, CheckCircle2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import PageLayout from "../components/page-layout"

export default function AgendarDemoPage() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulação de envio do formulário
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  // Horários disponíveis para demonstração
  const availableTimes = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"]

  if (isSubmitted) {
    return (
      <PageLayout title="Demonstração Agendada">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="size-16 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Demonstração Agendada!</h2>
            <p className="text-muted-foreground mb-6">
              Sua demonstração foi agendada com sucesso. Enviamos um email de confirmação com os detalhes.
            </p>
            {date && time && (
              <div className="bg-muted p-4 rounded-lg mb-6">
                <p className="font-medium">Data e Hora:</p>
                <p>
                  {format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })} às {time}
                </p>
              </div>
            )}
            <Button asChild className="rounded-full">
              <Link href="/">Voltar para a Página Inicial</Link>
            </Button>
          </CardContent>
        </Card>
      </PageLayout>
    )
  }

  return (
    <PageLayout
      title="Agendar Demonstração"
      description="Agende uma demonstração personalizada da Safe Finance com um de nossos especialistas."
    >
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Agendar Demonstração</CardTitle>
          <CardDescription>
            Preencha o formulário abaixo para agendar uma demonstração personalizada da Safe Finance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" placeholder="Seu nome completo" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" id="email-label">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  aria-labelledby="email-label"
                  aria-describedby="email-error"
                  aria-invalid={!!error}
                />
                {error && (
                  <p id="email-error" className="text-sm text-red-500" role="alert">
                    {error}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" placeholder="(00) 00000-0000" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Empresa (opcional)</Label>
                <Input id="company" placeholder="Nome da sua empresa" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Qual o seu interesse principal?</Label>
              <RadioGroup defaultValue="pessoal">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pessoal" id="pessoal" />
                    <Label htmlFor="pessoal" className="font-normal">
                      Finanças Pessoais
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="familiar" id="familiar" />
                    <Label htmlFor="familiar" className="font-normal">
                      Finanças Familiares
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="empresarial" id="empresarial" />
                    <Label htmlFor="empresarial" className="font-normal">
                      Finanças Empresariais
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Data da Demonstração</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 size-4" />
                      {date ? format(date, "dd/MM/yyyy") : "Selecione uma data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                        date > new Date(new Date().setMonth(new Date().getMonth() + 2)) ||
                        date.getDay() === 0 ||
                        date.getDay() === 6
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Horário</Label>
                <Select onValueChange={setTime}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um horário" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimes.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Mensagem (opcional)</Label>
              <Textarea
                id="message"
                placeholder="Conte-nos mais sobre suas necessidades e expectativas..."
                className="min-h-[100px]"
              />
            </div>

            <Button type="submit" className="w-full rounded-full" disabled={isSubmitting || !date || !time}>
              {isSubmitting ? "Agendando..." : "Agendar Demonstração"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col text-center text-sm text-muted-foreground">
          <p>
            Ao agendar uma demonstração, você concorda com nossa{" "}
            <Link href="/empresa/politica-de-privacidade" className="text-primary hover:underline">
              Política de Privacidade
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </PageLayout>
  )
}
