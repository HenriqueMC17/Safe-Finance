"use client"

import { useState, useEffect } from "react"
import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  CreditCard,
  FileText,
  Home,
  Settings,
  Users,
  Wallet,
  Bot,
  LayoutDashboard,
  TrendingUp,
  PieChart,
  BellRing,
  Target,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useMediaQuery } from "@/hooks/use-media-query"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isFloating?: boolean
}

export function Sidebar({ className, isFloating = false }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Reset state when screen size changes
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false)
    }
  }, [isMobile])

  // Handle sidebar toggle for mobile floating sidebar
  const toggleSidebar = () => {
    if (isMobile || isFloating) {
      setIsOpen(!isOpen)
    }
  }

  // Determine sidebar width based on collapsed state
  const sidebarWidth = collapsed ? "w-16" : "w-52"

  // Determine sidebar position and visibility
  const sidebarPosition =
    isFloating || isMobile
      ? `fixed top-0 bottom-0 left-0 z-40 ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`
      : "relative"

  // Render menu item with or without text based on collapsed state
  const renderMenuItem = (icon: React.ReactNode, label: string, href: string, isActive: boolean) => {
    const menuItem = (
      <Button
        asChild
        variant={isActive ? "secondary" : "ghost"}
        className={cn("w-full justify-start h-7 text-xs px-2 py-1", collapsed && "justify-center px-0")}
      >
        <Link href={href}>
          {icon}
          {!collapsed && <span className="ml-1.5">{label}</span>}
        </Link>
      </Button>
    )

    return collapsed ? (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{menuItem}</TooltipTrigger>
          <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      menuItem
    )
  }

  return (
    <>
      {/* Mobile toggle button - visible only on mobile when sidebar is floating */}
      {(isMobile || isFloating) && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 left-4 z-50 rounded-full shadow-lg md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-4 w-4" />
        </Button>
      )}

      {/* Overlay for mobile - visible only when sidebar is open */}
      {(isMobile || isFloating) && isOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30" onClick={toggleSidebar} />
      )}

      <div
        className={cn(
          "pb-12 bg-background",
          sidebarWidth,
          sidebarPosition,
          isFloating || isMobile ? "shadow-lg" : "border-r",
          className,
        )}
      >
        <div className="space-y-2 py-2">
          <div className="px-2 py-1.5 flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center">
                <div className="rounded-md bg-primary p-1 mr-2">
                  <Wallet className="h-4 w-4 text-primary-foreground" />
                </div>
                <h1 className="text-base font-bold">F&S</h1>
              </div>
            )}

            {/* Collapse/Expand button - not visible on mobile */}
            {!isMobile && (
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setCollapsed(!collapsed)}>
                {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            )}
          </div>

          <Separator className="mb-2" />

          {!collapsed && <h2 className="mb-1 px-1 text-xs font-semibold tracking-tight">Menu</h2>}

          <div className="space-y-0.5 px-2">
            {renderMenuItem(
              <Home className={cn("h-3.5 w-3.5", !collapsed && "mr-1.5")} />,
              "Início",
              "/",
              pathname === "/",
            )}

            {renderMenuItem(
              <LayoutDashboard className={cn("h-3.5 w-3.5", !collapsed && "mr-1.5")} />,
              "Dashboard",
              "/dashboard",
              pathname === "/dashboard",
            )}

            {renderMenuItem(
              <TrendingUp className={cn("h-3.5 w-3.5", !collapsed && "mr-1.5")} />,
              "Análise",
              "/financial-analysis",
              pathname === "/financial-analysis",
            )}

            {renderMenuItem(
              <PieChart className={cn("h-3.5 w-3.5", !collapsed && "mr-1.5")} />,
              "Orçamentos",
              "/budget-forecast",
              pathname === "/budget-forecast",
            )}

            {renderMenuItem(
              <Target className={cn("h-3.5 w-3.5", !collapsed && "mr-1.5")} />,
              "Metas",
              "/goals",
              pathname === "/goals",
            )}

            {renderMenuItem(
              <Bot className={cn("h-3.5 w-3.5", !collapsed && "mr-1.5")} />,
              "Assistente",
              "/assistant",
              pathname === "/assistant",
            )}

            {renderMenuItem(
              <BellRing className={cn("h-3.5 w-3.5", !collapsed && "mr-1.5")} />,
              "Alertas",
              "/notifications",
              pathname === "/notifications",
            )}
          </div>

          {!collapsed && (
            <div className="px-2 py-1.5">
              <h2 className="mb-1 px-1 text-xs font-semibold tracking-tight">Transações</h2>
            </div>
          )}

          <div className="space-y-0.5 px-2">
            {renderMenuItem(
              <CreditCard className={cn("h-3.5 w-3.5", !collapsed && "mr-1.5")} />,
              "Transações",
              "/transactions",
              pathname === "/transactions",
            )}

            {renderMenuItem(
              <FileText className={cn("h-3.5 w-3.5", !collapsed && "mr-1.5")} />,
              "Faturas",
              "/invoices",
              pathname === "/invoices",
            )}

            {renderMenuItem(
              <Wallet className={cn("h-3.5 w-3.5", !collapsed && "mr-1.5")} />,
              "Pagamentos",
              "/payments",
              pathname === "/payments",
            )}
          </div>

          {!collapsed && (
            <div className="px-2 py-1.5">
              <h2 className="mb-1 px-1 text-xs font-semibold tracking-tight">Admin</h2>
            </div>
          )}

          <div className="space-y-0.5 px-2">
            {renderMenuItem(
              <Users className={cn("h-3.5 w-3.5", !collapsed && "mr-1.5")} />,
              "Membros",
              "/members",
              pathname === "/members",
            )}

            {renderMenuItem(
              <Settings className={cn("h-3.5 w-3.5", !collapsed && "mr-1.5")} />,
              "Config.",
              "/settings",
              pathname === "/settings",
            )}
          </div>
        </div>

        <div className="px-2 py-1.5 mt-auto">
          <Separator className="mb-2" />
          <div className="flex items-center justify-between">
            {!collapsed ? (
              <>
                <div className="flex items-center gap-1">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                    <AvatarFallback>FS</AvatarFallback>
                  </Avatar>
                  <div className="text-[10px]">
                    <p className="font-medium">Usuário</p>
                  </div>
                </div>
                <ThemeToggle />
              </>
            ) : (
              <div className="flex flex-col items-center w-full space-y-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                  <AvatarFallback>FS</AvatarFallback>
                </Avatar>
                <ThemeToggle />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
