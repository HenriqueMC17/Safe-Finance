"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, CreditCard, FileText, Home, Settings, Users, Wallet, Bot, LayoutDashboard } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Menu</h2>
          <div className="space-y-1">
            <Button asChild variant={pathname === "/" ? "secondary" : "ghost"} className="w-full justify-start">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Início
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === "/dashboard" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/dashboard">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === "/assistant" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/assistant">
                <Bot className="mr-2 h-4 w-4" />
                Assistente IA
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === "/analytics" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                Análises
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === "/transactions" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/transactions">
                <CreditCard className="mr-2 h-4 w-4" />
                Transações
              </Link>
            </Button>
            <Button asChild variant={pathname === "/invoices" ? "secondary" : "ghost"} className="w-full justify-start">
              <Link href="/invoices">
                <FileText className="mr-2 h-4 w-4" />
                Faturas
              </Link>
            </Button>
            <Button asChild variant={pathname === "/payments" ? "secondary" : "ghost"} className="w-full justify-start">
              <Link href="/payments">
                <Wallet className="mr-2 h-4 w-4" />
                Pagamentos
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Administração</h2>
          <div className="space-y-1">
            <Button asChild variant={pathname === "/members" ? "secondary" : "ghost"} className="w-full justify-start">
              <Link href="/members">
                <Users className="mr-2 h-4 w-4" />
                Membros
              </Link>
            </Button>
            <Button asChild variant={pathname === "/settings" ? "secondary" : "ghost"} className="w-full justify-start">
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
