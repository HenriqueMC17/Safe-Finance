"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { BellRing, Info, AlertTriangle, CheckCircle, Clock, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"

type Alert = {
  id: string
  title: string
  description: string
  type: "info" | "warning" | "success" | "error"
  date: string
  read: boolean
}

type AlertRule = {
  id: string
  name: string
  condition: string
  threshold: number
  category: string
  active: boolean
}

export default function NotificationsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      title: "Orçamento de Alimentação",
      description: "Você atingiu 80% do seu orçamento de alimentação para este mês.",
      type: "warning",
      date: "2023-07-15T10:30:00",
      read: false,
    },
    {
      id: "2",
      title: "Pagamento Recebido",
      description: "Você recebeu um pagamento de R$ 1.500,00 na sua conta.",
      type: "success",
      date: "2023-07-14T14:45:00",
      read: true,
    },
    {
      id: "3",
      title: "Fatura do Cartão",
      description: "Sua fatura do cartão de crédito vence em 3 dias.",
      type: "info",
      date: "2023-07-13T09:15:00",
      read: false,
    },
    {
      id: "4",
      title: "Limite de Gastos",
      description: "Você excedeu seu limite de gastos em Lazer.",
      type: "error",
      date: "2023-07-12T16:20:00",
      read: true,
    },
  ])

  const [alertRules, setAlertRules] = useState<AlertRule[]>([
    {
      id: "1",
      name: "Alerta de Orçamento",
      condition: "acima",
      threshold: 80,
      category: "Alimentação",
      active: true,
    },
    {
      id: "2",
      name: "Lembrete de Fatura",
      condition: "dias-antes",
      threshold: 3,
      category: "Cartão de Crédito",
      active: true,
    },
    {
      id: "3",
      name: "Alerta de Saldo Baixo",
      condition: "abaixo",
      threshold: 1000,
      category: "Conta Corrente",
      active: false,
    },
  ])

  const [newRule, setNewRule] = useState<Omit<AlertRule, "id">>({
    name: "",
    condition: "",
    threshold: 0,
    category: "",
    active: true,
  })

  const handleMarkAsRead = (id: string) => {
    setAlerts(
      alerts.map((alert) => {
        if (alert.id === id) {
          return { ...alert, read: true }
        }
        return alert
      }),
    )
  }

  const handleMarkAllAsRead = () => {
    setAlerts(alerts.map((alert) => ({ ...alert, read: true })))
    toast.success("Todas as notificações foram marcadas como lidas")
  }

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
    toast.success("Notificação removida com sucesso")
  }

  const handleAddRule = () => {
    if (!newRule.name || !newRule.condition || !newRule.category) {
      toast.error("Por favor, preencha todos os campos obrigatórios")
      return
    }

    const rule: AlertRule = {
      ...newRule,
      id: Date.now().toString(),
    }

    setAlertRules([...alertRules, rule])
    setNewRule({
      name: "",
      condition: "",
      threshold: 0,
      category: "",
      active: true,
    })

    toast.success("Regra de alerta adicionada com sucesso")
  }

  const handleToggleRule = (id: string) => {
    setAlertRules(
      alertRules.map((rule) => {
        if (rule.id === id) {
          return { ...rule, active: !rule.active }
        }
        return rule
      }),
    )
  }

  const handleDeleteRule = (id: string) => {
    setAlertRules(alertRules.filter((rule) => rule.id !== id))
    toast.success("Regra de alerta removida com sucesso")
  }

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const unreadCount = alerts.filter((alert) => !alert.read).length

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Alertas e Notificações</h1>
          <p className="text-muted-foreground">Gerencie seus alertas e configure notificações personalizadas</p>
        </div>
        <Button onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>
          Marcar todas como lidas
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todas ({alerts.length})</TabsTrigger>
          <TabsTrigger value="unread">Não lidas ({unreadCount})</TabsTrigger>
          <TabsTrigger value="rules">Regras de Alerta</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {alerts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <BellRing className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Nenhuma notificação</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Você não tem notificações no momento. Elas aparecerão aqui quando surgirem.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {alerts.map((alert) => (
                <Card key={alert.id} className={alert.read ? "opacity-70" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
                        <div>
                          <h3 className="font-medium">{alert.title}</h3>
                          <p className="text-sm text-muted-foreground">{alert.description}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{formatDate(alert.date)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {!alert.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            onClick={() => handleMarkAsRead(alert.id)}
                          >
                            Marcar como lida
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleDeleteAlert(alert.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          {unreadCount === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Nenhuma notificação não lida</h3>
                <p className="text-sm text-muted-foreground mt-1">Você leu todas as suas notificações. Bom trabalho!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {alerts
                .filter((alert) => !alert.read)
                .map((alert) => (
                  <Card key={alert.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
                          <div>
                            <h3 className="font-medium">{alert.title}</h3>
                            <p className="text-sm text-muted-foreground">{alert.description}</p>
                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{formatDate(alert.date)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            onClick={() => handleMarkAsRead(alert.id)}
                          >
                            Marcar como lida
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleDeleteAlert(alert.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Regras de Alerta</CardTitle>
              <CardDescription>Configure regras para receber alertas automáticos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rule-name">Nome da Regra</Label>
                  <Input
                    id="rule-name"
                    placeholder="Ex: Alerta de Orçamento"
                    value={newRule.name}
                    onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rule-category">Categoria</Label>
                  <Select
                    value={newRule.category}
                    onValueChange={(value) => setNewRule({ ...newRule, category: value })}
                  >
                    <SelectTrigger id="rule-category">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Alimentação">Alimentação</SelectItem>
                      <SelectItem value="Transporte">Transporte</SelectItem>
                      <SelectItem value="Lazer">Lazer</SelectItem>
                      <SelectItem value="Saúde">Saúde</SelectItem>
                      <SelectItem value="Educação">Educação</SelectItem>
                      <SelectItem value="Moradia">Moradia</SelectItem>
                      <SelectItem value="Cartão de Crédito">Cartão de Crédito</SelectItem>
                      <SelectItem value="Conta Corrente">Conta Corrente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rule-condition">Condição</Label>
                  <Select
                    value={newRule.condition}
                    onValueChange={(value) => setNewRule({ ...newRule, condition: value })}
                  >
                    <SelectTrigger id="rule-condition">
                      <SelectValue placeholder="Selecione uma condição" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acima">Acima de</SelectItem>
                      <SelectItem value="abaixo">Abaixo de</SelectItem>
                      <SelectItem value="igual">Igual a</SelectItem>
                      <SelectItem value="dias-antes">Dias antes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rule-threshold">Valor Limite</Label>
                  <Input
                    id="rule-threshold"
                    type="number"
                    placeholder="0"
                    value={newRule.threshold || ""}
                    onChange={(e) => setNewRule({ ...newRule, threshold: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="rule-active"
                  checked={newRule.active}
                  onCheckedChange={(checked) => setNewRule({ ...newRule, active: checked })}
                />
                <Label htmlFor="rule-active">Ativar regra</Label>
              </div>
              <Button onClick={handleAddRule}>
                <Plus className="h-4 w-4 mr-2" /> Adicionar Regra
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-2">
            {alertRules.map((rule) => (
              <Card key={rule.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{rule.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {rule.category} • {rule.condition === "acima" && "Acima de "}
                        {rule.condition === "abaixo" && "Abaixo de "}
                        {rule.condition === "igual" && "Igual a "}
                        {rule.condition === "dias-antes" && ""}
                        {rule.threshold}
                        {rule.condition === "dias-antes" && " dias antes"}
                        {rule.condition !== "dias-antes" && "%"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`toggle-${rule.id}`}
                          checked={rule.active}
                          onCheckedChange={() => handleToggleRule(rule.id)}
                        />
                        <Label htmlFor={`toggle-${rule.id}`} className="sr-only">
                          Ativar regra
                        </Label>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteRule(rule.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificação</CardTitle>
              <CardDescription>Personalize como você recebe notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Canais de Notificação</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="email-notifications" defaultChecked />
                        <Label htmlFor="email-notifications">Notificações por E-mail</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Receba alertas no seu e-mail</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="push-notifications" defaultChecked />
                        <Label htmlFor="push-notifications">Notificações Push</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Receba alertas no navegador</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="sms-notifications" />
                        <Label htmlFor="sms-notifications">Notificações por SMS</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Receba alertas por mensagem de texto</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Tipos de Notificação</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="budget-alerts" defaultChecked />
                        <Label htmlFor="budget-alerts">Alertas de Orçamento</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Quando você atingir limites de orçamento</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="payment-reminders" defaultChecked />
                        <Label htmlFor="payment-reminders">Lembretes de Pagamento</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Quando faturas estiverem próximas do vencimento</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="security-alerts" defaultChecked />
                        <Label htmlFor="security-alerts">Alertas de Segurança</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Atividades suspeitas na sua conta</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="goal-updates" defaultChecked />
                        <Label htmlFor="goal-updates">Atualizações de Metas</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Progresso nas suas metas financeiras</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Frequência</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Select defaultValue="real-time">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione a frequência" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="real-time">Tempo real</SelectItem>
                          <SelectItem value="daily">Resumo diário</SelectItem>
                          <SelectItem value="weekly">Resumo semanal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Configurações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
