"use client"

import { useState } from "react"
import { Bell, X, Info, AlertTriangle, CreditCard, TrendingUp, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const notifications = [
  {
    id: 1,
    title: "Nova Funcionalidade",
    message: "Confira nossa nova ferramenta de acompanhamento de orçamento!",
    date: "2023-07-15",
    icon: Info,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: 2,
    title: "Alerta de Conta",
    message: "Atividade incomum detectada em sua conta.",
    date: "2023-07-14",
    icon: AlertTriangle,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    id: 3,
    title: "Pagamento Pendente",
    message: "Seu pagamento do cartão de crédito vence em 3 dias.",
    date: "2023-07-13",
    icon: CreditCard,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    id: 4,
    title: "Atualização de Investimento",
    message: "Seu portfólio de investimentos cresceu 5% este mês.",
    date: "2023-07-12",
    icon: TrendingUp,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: 5,
    title: "Nova Oferta",
    message: "Você está elegível para uma nova conta poupança com juros mais altos!",
    date: "2023-07-11",
    icon: Gift,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
]

export function Notifications() {
  const [isOpen, setIsOpen] = useState(false)
  const [notificationList, setNotificationList] = useState(notifications)
  const unreadCount = notificationList.length

  const handleMarkAllAsRead = () => {
    setNotificationList([])
  }

  const handleDismissNotification = (id) => {
    setNotificationList(notificationList.filter((notification) => notification.id !== id))
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notificações"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full" />}
      </Button>
      {isOpen && (
        <Card className="absolute right-0 mt-2 w-96 z-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notificações</CardTitle>
            <div className="flex space-x-2">
              {notificationList.length > 0 && (
                <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
                  Marcar todas como lidas
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Fechar notificações">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {notificationList.length > 0 ? (
                notificationList.map((notification) => (
                  <Card key={notification.id} className="mb-4 last:mb-0 border shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className={`${notification.bgColor} p-2 rounded-full`}>
                          <notification.icon className={`h-5 w-5 ${notification.color}`} />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between">
                            <p className="text-sm font-medium leading-none">{notification.title}</p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5"
                              onClick={() => handleDismissNotification(notification.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">{notification.date}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-8">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Nenhuma notificação nova</p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
