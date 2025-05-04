"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Bot, Loader2, Sparkles, HelpCircle, TrendingUp, PieChart, Target } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface FinancialAssistantProps {
  userId: number
}

interface Message {
  role: "user" | "assistant"
  content: string
}

interface SuggestedQuestion {
  text: string
  icon: React.ReactNode
}

export function FinancialAssistant({ userId }: FinancialAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Olá! Sou seu assistente financeiro inteligente. Como posso ajudar você hoje?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const suggestedQuestions: SuggestedQuestion[] = [
    {
      text: "Como estão minhas finanças este mês?",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      text: "Quais são minhas maiores despesas?",
      icon: <PieChart className="h-4 w-4" />,
    },
    {
      text: "Como posso economizar mais dinheiro?",
      icon: <Sparkles className="h-4 w-4" />,
    },
    {
      text: "Como estou progredindo em minhas metas financeiras?",
      icon: <Target className="h-4 w-4" />,
    },
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (messageText: string = input) => {
    if ((!messageText.trim() && !input.trim()) || isLoading) return

    const userMessage = messageText.trim() || input.trim()
    setInput("")

    // Adicionar mensagem do usuário
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])

    setIsLoading(true)

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          question: userMessage,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao processar sua pergunta")
      }

      // Adicionar resposta do assistente
      setMessages((prev) => [...prev, { role: "assistant", content: data.answer }])
    } catch (error) {
      console.error("Erro:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Desculpe, ocorreu um erro ao processar sua pergunta. Por favor, tente novamente.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          Assistente Financeiro Inteligente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="space-y-4">
            <div className="flex flex-col space-y-4 h-[400px] overflow-y-auto p-4 border rounded-md">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-muted flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Pensando...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && !isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start"
                    onClick={() => handleSuggestedQuestion(question.text)}
                  >
                    {question.icon}
                    <span className="ml-2 text-left">{question.text}</span>
                  </Button>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Textarea
                placeholder="Faça uma pergunta sobre suas finanças..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <Button onClick={() => handleSendMessage()} disabled={isLoading || !input.trim()}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="insights">
            <div className="space-y-4 p-4 border rounded-md h-[400px] overflow-y-auto">
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Oportunidade de Economia</h3>
                  <p className="text-sm text-muted-foreground">
                    Seus gastos com alimentação aumentaram 15% no último mês. Considere revisar este orçamento.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Tendência Positiva</h3>
                  <p className="text-sm text-muted-foreground">
                    Sua taxa de economia aumentou para 12% este mês, acima da média de 8% dos últimos 3 meses.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Target className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Meta em Risco</h3>
                  <p className="text-sm text-muted-foreground">
                    Sua meta "Viagem de Férias" está atrasada. Considere aumentar suas contribuições mensais.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <PieChart className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Distribuição de Gastos</h3>
                  <p className="text-sm text-muted-foreground">
                    Seus três principais gastos são: Moradia (35%), Alimentação (20%) e Transporte (15%).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <HelpCircle className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Dica Financeira</h3>
                  <p className="text-sm text-muted-foreground">
                    Considere automatizar suas economias definindo transferências automáticas para sua conta poupança.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
