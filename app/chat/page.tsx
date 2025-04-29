"use client"

import { useState } from "react"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send } from "lucide-react"

const contacts = [
  { id: 1, name: "Ana Silva", status: "online", lastMessage: "Olá, como posso ajudar?", time: "Agora" },
  {
    id: 2,
    name: "Carlos Oliveira",
    status: "offline",
    lastMessage: "Vamos revisar os relatórios amanhã",
    time: "1h atrás",
  },
  { id: 3, name: "Mariana Santos", status: "online", lastMessage: "Reunião confirmada para 15h", time: "30min atrás" },
  { id: 4, name: "Pedro Costa", status: "away", lastMessage: "Enviei os documentos por email", time: "2h atrás" },
  { id: 5, name: "Juliana Lima", status: "online", lastMessage: "Precisamos discutir o orçamento", time: "5min atrás" },
]

const messages = [
  {
    id: 1,
    sender: "Ana Silva",
    content: "Olá, como posso ajudar com suas finanças hoje?",
    time: "10:30",
    isMine: false,
  },
  {
    id: 2,
    sender: "Você",
    content: "Olá Ana! Preciso revisar o relatório financeiro do mês passado.",
    time: "10:32",
    isMine: true,
  },
  {
    id: 3,
    sender: "Ana Silva",
    content: "Claro! Vou preparar um resumo dos principais indicadores para você.",
    time: "10:33",
    isMine: false,
  },
  {
    id: 4,
    sender: "Você",
    content: "Ótimo! Também gostaria de discutir algumas estratégias para redução de custos.",
    time: "10:35",
    isMine: true,
  },
  {
    id: 5,
    sender: "Ana Silva",
    content: "Podemos marcar uma reunião para amanhã às 14h para discutir isso em detalhes?",
    time: "10:36",
    isMine: false,
  },
  {
    id: 6,
    sender: "Você",
    content: "Perfeito! Vou reservar esse horário na minha agenda.",
    time: "10:38",
    isMine: true,
  },
]

function ChatSidebar({ onSelectContact, selectedContact }) {
  return (
    <div className="w-full md:w-80 border-r border-border">
      <div className="p-4">
        <Input placeholder="Pesquisar contatos..." />
      </div>
      <div className="overflow-auto h-[calc(100vh-13rem)]">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`p-4 cursor-pointer hover:bg-muted ${selectedContact === contact.id ? "bg-muted" : ""}`}
            onClick={() => onSelectContact(contact.id)}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar>
                  <AvatarFallback>
                    {contact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${
                    contact.status === "online"
                      ? "bg-primary"
                      : contact.status === "away"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <p className="font-medium truncate">{contact.name}</p>
                  <p className="text-xs text-muted-foreground">{contact.time}</p>
                </div>
                <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ChatMessages() {
  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-13rem)]">
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isMine ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.isMine ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              {!message.isMine && <p className="text-xs font-medium mb-1">{message.sender}</p>}
              <p>{message.content}</p>
              <p
                className={`text-xs mt-1 text-right ${message.isMine ? "text-primary-foreground/70" : "text-muted-foreground"}`}
              >
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input placeholder="Digite sua mensagem..." className="flex-1" />
          <Button size="icon" className="bg-primary hover:bg-primary/90">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function ChatContent() {
  const [selectedContact, setSelectedContact] = useState(1)

  return (
    <div className="flex h-[calc(100vh-10rem)]">
      <ChatSidebar onSelectContact={setSelectedContact} selectedContact={selectedContact} />
      <ChatMessages />
    </div>
  )
}

export default function ChatPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Chat</h1>

      <Suspense fallback={<Skeleton className="w-full h-[calc(100vh-10rem)]" />}>
        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            <ChatContent />
          </CardContent>
        </Card>
      </Suspense>
    </div>
  )
}
