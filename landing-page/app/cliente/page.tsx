"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Eye, EyeOff } from "lucide-react"

export default function ClienteLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("login")

  // Adicionar validação mais robusta para o formulário de registro
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
  })

  const validateForm = () => {
    let isValid = true
    const errors = {
      name: "",
      email: "",
      password: "",
    }

    // Validar nome
    if (!formData.name.trim()) {
      errors.name = "Nome é obrigatório"
      isValid = false
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      errors.email = "Email é obrigatório"
      isValid = false
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Email inválido"
      isValid = false
    }

    // Validar senha
    if (!formData.password) {
      errors.password = "Senha é obrigatória"
      isValid = false
    } else if (formData.password.length < 8) {
      errors.password = "A senha deve ter pelo menos 8 caracteres"
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulação de login
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/demo"
    }, 1500)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulação de registro
    setTimeout(() => {
      setIsLoading(false)
      setActiveTab("login")
    }, 1500)
  }

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulação de recuperação de senha
    setTimeout(() => {
      setIsLoading(false)
      setActiveTab("login")
    }, 1500)
  }

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-12">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 self-start"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Voltar para a página inicial
      </Link>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mx-auto size-12 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground mb-2">
            SF
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Área do Cliente</h1>
          <p className="text-sm text-muted-foreground">Acesse sua conta para gerenciar suas finanças</p>
        </div>

        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Criar Conta</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Entrar</CardTitle>
                <CardDescription>Entre com seu email e senha para acessar sua conta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="seu@email.com" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Senha</Label>
                        <button
                          type="button"
                          onClick={() => setActiveTab("forgot-password")}
                          className="text-xs text-primary hover:underline"
                        >
                          Esqueceu a senha?
                        </button>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        >
                          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-6 rounded-full" type="submit" disabled={isLoading}>
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Criar Conta</CardTitle>
                <CardDescription>Preencha os campos abaixo para criar sua conta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleRegister}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        placeholder="Seu nome"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        placeholder="seu@email.com"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Senha</Label>
                      <div className="relative">
                        <Input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          required
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        >
                          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-6 rounded-full" type="submit" disabled={isLoading}>
                    {isLoading ? "Criando conta..." : "Criar Conta"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground text-center">
                Ao criar uma conta, você concorda com nossos{" "}
                <Link href="/empresa/termos-de-servico" className="text-primary hover:underline">
                  Termos de Serviço
                </Link>{" "}
                e{" "}
                <Link href="/empresa/politica-de-privacidade" className="text-primary hover:underline">
                  Política de Privacidade
                </Link>
                .
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="forgot-password">
            <Card>
              <CardHeader>
                <CardTitle>Recuperar Senha</CardTitle>
                <CardDescription>Informe seu email para receber instruções de recuperação de senha</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleForgotPassword}>
                  <div className="space-y-2">
                    <Label htmlFor="recovery-email">Email</Label>
                    <Input id="recovery-email" placeholder="seu@email.com" type="email" required />
                  </div>
                  <Button className="w-full mt-6 rounded-full" type="submit" disabled={isLoading}>
                    {isLoading ? "Enviando..." : "Enviar Instruções"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" onClick={() => setActiveTab("login")} type="button">
                  Voltar para o login
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
