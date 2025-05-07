"use client"

import { useSettings } from "@/contexts/settings-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Laptop, Smartphone, Tablet } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const defaultAvatars = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9439775.jpg-4JVJWOjPksd3DtnBYJXoWHA5lc1DU9.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238208_11475222.jpg-poEIzVHAGiIfMFQ7EiF8PUG1u0Zkzz.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-4MCwPC2Bec6Ume26Yo1kao3CnONxDg.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9720029.jpg-Yf9h2a3kT7rYyCb648iLIeHThq5wEy.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/27470341_7294795.jpg-XE0zf7R8tk4rfA1vm4fAHeZ1QoVEOo.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/799.jpg-0tEi4Xvg5YsFoGoQfQc698q4Dygl1S.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334228.jpg-eOsHCkvVrVAwcPHKYSs5sQwVKsqWpC.jpeg",
]

export default function SettingsPage() {
  const { settings, updateSettings, updateNotificationSettings, updatePrivacySettings } = useSettings()
  const [selectedAvatar, setSelectedAvatar] = useState(settings.avatar)

  const handleSaveAccount = () => {
    updateSettings({
      avatar: selectedAvatar,
      fullName: settings.fullName,
      email: settings.email,
      phone: settings.phone,
      timezone: settings.timezone,
    })
    toast.success("Configurações da conta salvas com sucesso")
  }

  const handleSaveNotifications = () => {
    updateNotificationSettings(settings.notifications)
    toast.success("Configurações de notificações salvas com sucesso")
  }

  const handleSavePrivacy = () => {
    updatePrivacySettings(settings.privacy)
    toast.success("Configurações de privacidade salvas com sucesso")
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Configurações</h1>
      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="account">Conta</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="preferences">Preferências</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="privacy">Privacidade</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Configurações da Conta</CardTitle>
              <CardDescription>Gerencie as informações da sua conta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Avatar Atual</Label>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={selectedAvatar || "/placeholder.svg"} alt={settings.fullName} />
                    <AvatarFallback>
                      {settings.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <Label>Escolha um novo avatar</Label>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {defaultAvatars.map((avatar, index) => (
                    <Avatar
                      key={index}
                      className={`h-20 w-20 rounded-lg cursor-pointer hover:ring-2 hover:ring-primary shrink-0 ${
                        selectedAvatar === avatar ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedAvatar(avatar)}
                    >
                      <AvatarImage
                        src={avatar || "/placeholder.svg"}
                        alt={`Avatar ${index + 1}`}
                        className="object-cover"
                      />
                      <AvatarFallback>{index + 1}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div>
                  <Label htmlFor="custom-avatar">Ou envie um avatar personalizado</Label>
                  <Input id="custom-avatar" type="file" accept="image/*" className="mt-1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="full-name">Nome Completo</Label>
                <Input
                  id="full-name"
                  value={settings.fullName}
                  onChange={(e) => updateSettings({ fullName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => updateSettings({ email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Número de Telefone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => updateSettings({ phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Fuso Horário</Label>
                <Select value={settings.timezone} onValueChange={(value) => updateSettings({ timezone: value })}>
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Selecione o Fuso Horário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc-3">Horário de Brasília (UTC-3)</SelectItem>
                    <SelectItem value="utc-2">Fernando de Noronha (UTC-2)</SelectItem>
                    <SelectItem value="utc-4">Manaus (UTC-4)</SelectItem>
                    <SelectItem value="utc-5">Acre (UTC-5)</SelectItem>
                    <SelectItem value="utc+0">Horário de Greenwich (UTC+0)</SelectItem>
                    <SelectItem value="utc-12">Linha Internacional de Data Oeste (UTC-12)</SelectItem>
                    <SelectItem value="utc+12">Nova Zelândia (UTC+12)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveAccount}>Salvar Configurações da Conta</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Configurações de Segurança</CardTitle>
                <CardDescription>Gerencie as configurações de segurança da sua conta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Senha Atual</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nova Senha</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="two-factor" />
                  <Label htmlFor="two-factor">Ativar Autenticação de Dois Fatores</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Salvar Configurações de Segurança</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Histórico de Login</CardTitle>
                <CardDescription>Atividades recentes de login na sua conta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { date: "20/07/2023", time: "14:30 UTC", ip: "192.168.1.1", location: "São Paulo, Brasil" },
                  { date: "19/07/2023", time: "09:15 UTC", ip: "10.0.0.1", location: "Rio de Janeiro, Brasil" },
                  { date: "18/07/2023", time: "22:45 UTC", ip: "172.16.0.1", location: "Belo Horizonte, Brasil" },
                ].map((login, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span>
                      {login.date} {login.time}
                    </span>
                    <span>{login.ip}</span>
                    <span>{login.location}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sessões Ativas</CardTitle>
                <CardDescription>Sessões atualmente ativas na sua conta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { device: "Notebook", browser: "Chrome", os: "Windows 10", icon: Laptop },
                  { device: "Smartphone", browser: "Safari", os: "iOS 15", icon: Smartphone },
                  { device: "Tablet", browser: "Firefox", os: "Android 12", icon: Tablet },
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      <session.icon className="mr-2 h-4 w-4" />
                      {session.device}
                    </span>
                    <span>{session.browser}</span>
                    <span>{session.os}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline">Encerrar Todas as Outras Sessões</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferências</CardTitle>
              <CardDescription>Personalize sua experiência no dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select defaultValue="pt">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Selecione o Idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt">Português</SelectItem>
                      <SelectItem value="en">Inglês</SelectItem>
                      <SelectItem value="es">Espanhol</SelectItem>
                      <SelectItem value="fr">Francês</SelectItem>
                      <SelectItem value="de">Alemão</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Moeda</Label>
                  <Select defaultValue="brl">
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Selecione a Moeda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brl">Real (R$)</SelectItem>
                      <SelectItem value="usd">Dólar (US$)</SelectItem>
                      <SelectItem value="eur">Euro (€)</SelectItem>
                      <SelectItem value="gbp">Libra (£)</SelectItem>
                      <SelectItem value="jpy">Iene (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">Formato de Data</Label>
                  <Select defaultValue="dd-mm-yyyy">
                    <SelectTrigger id="date-format">
                      <SelectValue placeholder="Selecione o Formato de Data" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd-mm-yyyy">DD/MM/AAAA</SelectItem>
                      <SelectItem value="mm-dd-yyyy">MM/DD/AAAA</SelectItem>
                      <SelectItem value="yyyy-mm-dd">AAAA/MM/DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="font-size">Tamanho da Fonte</Label>
                  <Slider defaultValue={[16]} max={24} min={12} step={1} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Tema</Label>
                <RadioGroup defaultValue="system">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label htmlFor="theme-light">Claro</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark">Escuro</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="theme-system" />
                    <Label htmlFor="theme-system">Sistema</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Layout do Dashboard</Label>
                <RadioGroup defaultValue="default">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="default" id="layout-default" />
                    <Label htmlFor="layout-default">Padrão</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="compact" id="layout-compact" />
                    <Label htmlFor="layout-compact">Compacto</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="expanded" id="layout-expanded" />
                    <Label htmlFor="layout-expanded">Expandido</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Preferências</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
              <CardDescription>Gerencie como você recebe notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Canais de Notificação</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="email-notifications"
                      defaultChecked={settings.notifications.email}
                      onChange={(e) =>
                        updateNotificationSettings({ ...settings.notifications, email: e.target.checked })
                      }
                    />
                    <Label htmlFor="email-notifications">Notificações por E-mail</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="push-notifications"
                      defaultChecked={settings.notifications.push}
                      onChange={(e) =>
                        updateNotificationSettings({ ...settings.notifications, push: e.target.checked })
                      }
                    />
                    <Label htmlFor="push-notifications">Notificações Push</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sms-notifications"
                      defaultChecked={settings.notifications.sms}
                      onChange={(e) => updateNotificationSettings({ ...settings.notifications, sms: e.target.checked })}
                    />
                    <Label htmlFor="sms-notifications">Notificações por SMS</Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Tipos de Notificação</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="account-activity"
                      defaultChecked={settings.notifications.accountActivity}
                      onChange={(e) =>
                        updateNotificationSettings({ ...settings.notifications, accountActivity: e.target.checked })
                      }
                    />
                    <Label htmlFor="account-activity">Atividade da Conta</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="new-features"
                      defaultChecked={settings.notifications.newFeatures}
                      onChange={(e) =>
                        updateNotificationSettings({ ...settings.notifications, newFeatures: e.target.checked })
                      }
                    />
                    <Label htmlFor="new-features">Novos Recursos e Atualizações</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="marketing"
                      defaultChecked={settings.notifications.marketing}
                      onChange={(e) =>
                        updateNotificationSettings({ ...settings.notifications, marketing: e.target.checked })
                      }
                    />
                    <Label htmlFor="marketing">Marketing e Promoções</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notification-frequency">Frequência de Notificações</Label>
                <Select
                  value={settings.notifications.frequency}
                  onValueChange={(value) => updateNotificationSettings({ ...settings.notifications, frequency: value })}
                >
                  <SelectTrigger id="notification-frequency">
                    <SelectValue placeholder="Selecione a Frequência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="real-time">Tempo Real</SelectItem>
                    <SelectItem value="daily">Resumo Diário</SelectItem>
                    <SelectItem value="weekly">Resumo Semanal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quiet-hours-start">Horário de Silêncio</Label>
                <div className="flex items-center space-x-2">
                  <Input id="quiet-hours-start" type="time" defaultValue="22:00" />
                  <span>até</span>
                  <Input id="quiet-hours-end" type="time" defaultValue="07:00" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotifications}>Salvar Configurações de Notificações</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Privacidade</CardTitle>
              <CardDescription>Gerencie suas configurações de privacidade e dados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Compartilhamento de Dados</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="analytics-sharing">Compartilhar dados analíticos</Label>
                      <Switch
                        id="analytics-sharing"
                        checked={settings.privacy.analyticsSharing}
                        onChange={(e) =>
                          updatePrivacySettings({ ...settings.privacy, analyticsSharing: e.target.checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="personalized-ads">Permitir anúncios personalizados</Label>
                      <Switch
                        id="personalized-ads"
                        checked={settings.privacy.personalizedAds}
                        onChange={(e) =>
                          updatePrivacySettings({ ...settings.privacy, personalizedAds: e.target.checked })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Visibilidade da Conta</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={settings.privacy.visibility}
                      onValueChange={(value) => updatePrivacySettings({ ...settings.privacy, visibility: value })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="public" id="visibility-public" />
                        <Label htmlFor="visibility-public">Pública</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="private" id="visibility-private" />
                        <Label htmlFor="visibility-private">Privada</Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Retenção de Dados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select
                      value={settings.privacy.dataRetention}
                      onValueChange={(value) => updatePrivacySettings({ ...settings.privacy, dataRetention: value })}
                    >
                      <SelectTrigger id="data-retention">
                        <SelectValue placeholder="Selecione o Período de Retenção de Dados" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6-months">6 Meses</SelectItem>
                        <SelectItem value="1-year">1 Ano</SelectItem>
                        <SelectItem value="2-years">2 Anos</SelectItem>
                        <SelectItem value="indefinite">Indefinido</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Integrações com Terceiros</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">Conectado: Google Analytics, Facebook Pixel</p>
                    <Button variant="outline">Gerenciar Integrações</Button>
                  </CardContent>
                </Card>
              </div>
              <div className="flex justify-between">
                <Button variant="outline">Baixar Seus Dados</Button>
                <Button variant="destructive">Excluir Minha Conta</Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePrivacy}>Salvar Configurações de Privacidade</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
