"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Mail, MessageSquare, Phone, Send, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ContatoPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulação de envio do formulário
    setTimeout(() => {
      setFormSubmitted(true)
    }, 1000)
  }

  return (
    <div className="container max-w-4xl py-12 md:py-20">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Voltar para a página inicial
      </Link>

      <h1 className="text-4xl font-bold mb-6">Entre em Contato</h1>
      <p className="text-muted-foreground mb-12 max-w-2xl">
        Estamos aqui para ajudar. Preencha o formulário abaixo ou use um de nossos canais de contato direto.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {formSubmitted ? (
            <Card className="overflow-hidden">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="size-16 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-4">Mensagem Enviada!</h2>
                <p className="text-muted-foreground mb-6">
                  Obrigado por entrar em contato. Nossa equipe responderá sua mensagem em breve.
                </p>
                <Button asChild className="rounded-full">
                  <Link href="/">Voltar para a Página Inicial</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input id="name" placeholder="Seu nome completo" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Assunto</Label>
                    <Input id="subject" placeholder="Assunto da sua mensagem" required />
                  </div>

                  <div className="space-y-2">
                    <Label>Departamento</Label>
                    <RadioGroup defaultValue="suporte" className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="suporte" id="suporte" />
                        <Label htmlFor="suporte" className="font-normal">
                          Suporte Técnico
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vendas" id="vendas" />
                        <Label htmlFor="vendas" className="font-normal">
                          Vendas
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="financeiro" id="financeiro" />
                        <Label htmlFor="financeiro" className="font-normal">
                          Financeiro
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="outro" id="outro" />
                        <Label htmlFor="outro" className="font-normal">
                          Outro
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea
                      id="message"
                      placeholder="Digite sua mensagem aqui..."
                      className="min-h-[150px]"
                      required
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" className="rounded-full">
                      <Send className="mr-2 size-4" />
                      Enviar Mensagem
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-sm text-muted-foreground">Resposta em até 24h</p>
                </div>
              </div>
              <a href="mailto:contato@safefinance.com.br" className="text-primary hover:underline">
                contato@safefinance.com.br
              </a>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Telefone</h3>
                  <p className="text-sm text-muted-foreground">Seg-Sex, 9h às 18h</p>
                </div>
              </div>
              <a href="tel:+551140028922" className="text-primary hover:underline">
                0800 123 4567
              </a>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MessageSquare className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Chat ao Vivo</h3>
                  <p className="text-sm text-muted-foreground">Suporte em tempo real</p>
                </div>
              </div>
              <Button asChild variant="outline" className="w-full rounded-full">
                <Link href="#">Iniciar Chat</Link>
              </Button>
            </CardContent>
          </Card>

          <div className="p-6 bg-muted/30 rounded-lg">
            <h3 className="font-semibold mb-2">Endereço</h3>
            <address className="not-italic text-muted-foreground">
              Av. Exemplo, 123
              <br />
              Sorocaba, SP
              <br />
              CEP 18000-000
              <br />
              Brasil
            </address>
          </div>
        </div>
      </div>
    </div>
  )
}
