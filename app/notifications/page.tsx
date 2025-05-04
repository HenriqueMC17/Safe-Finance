"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Bell, Settings, AlertTriangle, Info, CreditCard, TrendingUp, Gift, Check, X } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

const notifications = [
  {
    id: 1,
    title: "Nova Funcionalidade",
    message: "Confira nossa nova ferramenta de acompanhamento de orçamento!",
    date: "2023-07-15",
    icon: Info,
    color: "text-primary",
    bgColor: "bg-primary/10",
    read: false,
  },
  {
    id: 2,
    title: "Alerta de Conta",
    message: "Atividade incomum detectada em sua conta.",
    date: "2023-07-14",
    icon: AlertTriangle,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    read: false,
  },
  {
    id: 3,
    title: "Pagamento Pendente",
    message: "Seu pagamento do cartão de crédito vence em 3 dias.",
    date: "2023-07-13",
    icon: CreditCard,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    read: true,
  },
  {
    id: 4,
    title: "Atualização de Investimento",
    message: "Seu portfólio de investimentos cresceu 5% este mês.",
    date: "2023-07-12",
    icon: TrendingUp,
    color: "text-primary",
    bgColor: "bg-primary/10",
    read: true,
  },
  {
    id: 5,
    title: "Nova Oferta",
    message: "Você está elegível para uma nova conta poupança com juros mais altos!",
    date: "2023-07-11",
    icon: Gift,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    read: true,
  },
]

export default function NotificationsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [notificationList, setNotificationList] = useState(notifications)
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    budgetAlerts: true,
    goalAlerts: true,
    transactionAlerts: true,
    marketingAlerts: false,
  })

  useEffect(() => {
    // Simulação de carregamento
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleMarkAsRead = (id: number) => {
    setNotificationList(
      notificationList.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
    toast({
      title: "Notificação marcada como lida",
      description: "A notificação foi marcada como lida com sucesso.",
    })
  }

  const handleMarkAllAsRead = () => {
    setNotificationList(notificationList.map((notification) => ({ ...notification, read: true })))
    toast({
      title: "Todas as notificações marcadas como lidas",
      description: "Todas as notificações foram marcadas como lidas com sucesso.",
    })
  }

  const handleDismissNotification = (id: number) => {
    setNotificationList(notificationList.filter((notification) => notification.id !== id))
    toast({
      title: "Notificação removida",
      description: "A notificação foi removida com sucesso.",
    })
  }

  const handleClearAll = () => {
    setNotificationList([])
    toast({
      title: "Notificações limpas",
      description: "Todas as notificações foram removidas com sucesso.",
    })
  }

  const handleSettingChange = (setting: string, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: value,
    })
    toast({
      title: "Configuração atualizada",
      description: "Suas preferências de notificação foram atualizadas.",
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR").format(date)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-[600px] w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Notificações</h1>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="unread">Não Lidas</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Todas as Notificações</CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  disabled={notificationList.length === 0}
                >
                  Marcar todas como lidas
                </Button>
                <Button variant="outline" size="sm" onClick={handleClearAll} disabled={notificationList.length === 0}>
                  Limpar todas
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {notificationList.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Nenhuma notificação</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notificationList.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start space-x-4 p-4 rounded-lg border ${
                        notification.read ? "bg-background" : "bg-muted/30"
                      }`}
                    >
                      <div className={`${notification.bgColor} p-2 rounded-full`}>
                        <notification.icon className={`h-5 w-5 ${notification.color}`} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium leading-none">{notification.title}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(notification.date)}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                      </div>
                      <div className="flex space-x-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="h-8 w-8"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDismissNotification(notification.id)}
                          className="h-8 w-8"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="unread">
          <Card>
            <CardHeader>
              <CardTitle>Notificações Não Lidas</CardTitle>
            </CardHeader>
            <CardContent>
              {notificationList.filter((n) => !n.read).length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Nenhuma notificação não lida</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notificationList
                    .filter((notification) => !notification.read)
                    .map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-start space-x-4 p-4 rounded-lg border bg-muted/30"
                      >
                        <div className={`${notification.bgColor} p-2 rounded-full`}>
                          <notification.icon className={`h-5 w-5 ${notification.color}`} />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between">
                            <p className="text-sm font-medium leading-none">{notification.title}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(notification.date)}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="h-8 w-8"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDismissNotification(notification.id)}
                            className="h-8 w-8"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configurações de Notificação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Canais de Notificação</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Notificações por Email</Label>
                      <p className="text-sm text-muted-foreground">Receba notificações por email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notificationSettings.email}
                      onCheckedChange={(checked) => handleSettingChange("email", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-notifications">Notificações Push</Label>
                      <p className="text-sm text-muted-foreground">Receba notificações no navegador</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notificationSettings.push}
                      onCheckedChange={(checked) => handleSettingChange("push", checked)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Tipos de Alerta</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="budget-alerts">Alertas de Orçamento</Label>
                      <p className="text-sm text-muted-foreground">
                        Receba alertas quando se aproximar do limite do orçamento
                      </p>
                    </div>
                    <Switch
                      id="budget-alerts"
                      checked={notificationSettings.budgetAlerts}
                      onCheckedChange={(checked) => handleSettingChange("budgetAlerts", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="goal-alerts">Alertas de Metas</Label>
                      <p className="text-sm text-muted-foreground">Receba alertas sobre o progresso das suas metas</p>
                    </div>
                    <Switch
                      id="goal-alerts"
                      checked={notificationSettings.goalAlerts}
                      onCheckedChange={(checked) => handleSettingChange("goalAlerts", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="transaction-alerts">Alertas de Transações</Label>
                      <p className="text-sm text-muted-foreground">Receba alertas sobre novas transações</p>
                    </div>
                    <Switch
                      id="transaction-alerts"
                      checked={notificationSettings.transactionAlerts}
                      onCheckedChange={(checked) => handleSettingChange("transactionAlerts", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing-alerts">Alertas de Marketing</Label>
                      <p className="text-sm text-muted-foreground">Receba ofertas e novidades</p>
                    </div>
                    <Switch
                      id="marketing-alerts"
                      checked={notificationSettings.marketingAlerts}
                      onCheckedChange={(checked) => handleSettingChange("marketingAlerts", checked)}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="w-full">Salvar Configurações</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
