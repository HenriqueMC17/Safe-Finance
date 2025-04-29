"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Building2,
  CreditCard,
  FileText,
  HelpCircle,
  Home,
  MessageSquare,
  Settings,
  Users,
  Video,
  Wallet,
  FolderKanban,
  ShieldCheck,
} from "lucide-react"

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
              variant={pathname === "/organization" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/organization">
                <Building2 className="mr-2 h-4 w-4" />
                Organização
              </Link>
            </Button>
            <Button asChild variant={pathname === "/projects" ? "secondary" : "ghost"} className="w-full justify-start">
              <Link href="/projects">
                <FolderKanban className="mr-2 h-4 w-4" />
                Projetos
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
            <Button
              asChild
              variant={pathname === "/permissions" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/permissions">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Permissões
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
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Comunicação</h2>
          <div className="space-y-1">
            <Button asChild variant={pathname === "/chat" ? "secondary" : "ghost"} className="w-full justify-start">
              <Link href="/chat">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat
              </Link>
            </Button>
            <Button asChild variant={pathname === "/meetings" ? "secondary" : "ghost"} className="w-full justify-start">
              <Link href="/meetings">
                <Video className="mr-2 h-4 w-4" />
                Reuniões
              </Link>
            </Button>
            <Button asChild variant={pathname === "/help" ? "secondary" : "ghost"} className="w-full justify-start">
              <Link href="/help">
                <HelpCircle className="mr-2 h-4 w-4" />
                Ajuda
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
