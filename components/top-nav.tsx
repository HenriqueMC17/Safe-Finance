"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Notifications } from "@/components/notifications"
import { ThemeToggle } from "@/components/theme-toggle"
import { useEffect, useState } from "react"

interface TopNavProps extends React.HTMLAttributes<HTMLElement> {}

export function TopNav({ className }: TopNavProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const routes = [
    {
      href: "/",
      label: "Início",
    },
    {
      href: "/analytics",
      label: "Análises",
    },
    {
      href: "/organization",
      label: "Organização",
    },
    {
      href: "/projects",
      label: "Projetos",
    },
    {
      href: "/transactions",
      label: "Transações",
    },
    {
      href: "/invoices",
      label: "Faturas",
    },
    {
      href: "/payments",
      label: "Pagamentos",
    },
    {
      href: "/members",
      label: "Membros",
    },
    {
      href: "/permissions",
      label: "Permissões",
    },
    {
      href: "/settings",
      label: "Configurações",
    },
    {
      href: "/chat",
      label: "Chat",
    },
    {
      href: "/meetings",
      label: "Reuniões",
    },
    {
      href: "/help",
      label: "Ajuda",
    },
  ]

  return (
    <>
      <div className={cn("flex h-16 items-center justify-between border-b px-4", className)}>
        <div className="flex items-center gap-6">
          <Link href="/" className="font-semibold">
            Painel Financeiro
          </Link>
          <nav className="hidden items-center space-x-4 lg:flex">
            <Button asChild variant="link" size="sm">
              <Link
                href="/"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/" ? "text-primary" : "text-muted-foreground",
                )}
              >
                Início
              </Link>
            </Button>
            <Button asChild variant="link" size="sm">
              <Link
                href="/analytics"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/analytics" ? "text-primary" : "text-muted-foreground",
                )}
              >
                Análises
              </Link>
            </Button>
            <Button asChild variant="link" size="sm">
              <Link
                href="/settings"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/settings" ? "text-primary" : "text-muted-foreground",
                )}
              >
                Configurações
              </Link>
            </Button>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <form className="hidden lg:block">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Pesquisar..." className="w-64 rounded-lg bg-background pl-8" />
            </div>
          </form>
          <Button variant="outline" size="sm" className="h-8 lg:hidden" onClick={() => setOpen(true)}>
            <Search className="h-4 w-4" />
            <span className="sr-only">Pesquisar</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-4 w-4" />
            <span className="hidden lg:inline">Notificações</span>
          </Button>
          <ThemeToggle />
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <span className="hidden lg:inline">Minha Conta</span>
          </Button>
        </div>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Pesquisar em tudo..." />
        <CommandList>
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
          <CommandGroup heading="Links">
            {routes.map((route) => (
              <CommandItem
                key={route.href}
                onSelect={() => {
                  setOpen(false)
                  window.location.href = route.href
                }}
              >
                {route.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <Notifications open={showNotifications} onOpenChange={setShowNotifications} />
    </>
  )
}
