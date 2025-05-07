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
  Download,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useSettings } from "@/contexts/settings-context"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { settings } = useSettings()

  // Reset state when screen size changes
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false)
    }
  }, [isMobile])

  // Handle sidebar toggle for mobile
  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen)
    }
  }

  // Determine sidebar width based on collapsed state
  const sidebarWidth = collapsed ? "w-16" : "w-64"

  // Determine sidebar position and visibility
  const sidebarPosition = isMobile
    ? `fixed top-0 bottom-0 left-0 z-40 ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`
    : "fixed top-0 bottom-0 left-0 z-30"

  // Render menu item with or without text based on collapsed state
  const renderMenuItem = (icon: React.ReactNode, label: string, href: string, isActive: boolean) => {
    const menuItem = (
      <Button
        asChild
        variant={isActive ? "secondary" : "ghost"}
        className={cn("w-full justify-start", collapsed && "justify-center px-0")}
      >
        <Link href={href}>
          {icon}
          {!collapsed && <span className="ml-2">{label}</span>}
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
      {/* Mobile toggle button - visible only on mobile */}
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-4 w-4" />
        </Button>
      )}

      {/* Overlay for mobile - visible only when sidebar is open */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30" onClick={toggleSidebar} />
      )}

      <div
        className={cn(
          "pb-12 bg-background",
          sidebarWidth,
          sidebarPosition,
          isMobile ? "shadow-lg" : "border-r",
          className,
        )}
      >
        <div className="space-y-4 py-4">
          <div className="px-3 py-2 flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center">
                <div className="rounded-md bg-primary p-1 mr-2">
                  <Wallet className="h-4 w-4 text-primary-foreground" />
                </div>
                <h1 className="text-lg font-bold">Safe Finance</h1>
              </div>
            )}

            {/* Collapse/Expand button - not visible on mobile */}
            {!isMobile && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCollapsed(!collapsed)}>
                {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            )}
          </div>

          <Separator className="mb-2" />

          <div className="px-3 py-2">
            {!collapsed && <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Menu</h2>}
            <div className="space-y-1">
              {renderMenuItem(
                <Home className={cn("h-4 w-4", !collapsed && "mr-2")} />,
                "Início",
                "/",
                pathname === "/",
              )}

              {renderMenuItem(
                <LayoutDashboard className={cn("h-4 w-4", !collapsed && "mr-2")} />,
                "Dashboard",
                "/dashboard",
                pathname === "/dashboard",
              )}

              {renderMenuItem(
                <TrendingUp className={cn("h-4 w-4", !collapsed && "mr-2")} />,
                "Análise Financeira",
                "/financial-analysis",
                pathname === "/financial-analysis",
              )}

              {renderMenuItem(
                <PieChart className={cn("h-4 w-4", !collapsed && "mr-2")} />,
                "Orçamentos",
                "/budget-forecast",
                pathname === "/budget-forecast",
              )}

              {renderMenuItem(
                <Download className={cn("h-4 w-4", !collapsed && "mr-2")} />,
                "Exportação",
                "/export",
                pathname === "/export",
              )}

              {renderMenuItem(
                <Target className={cn("h-4 w-4", !collapsed && "mr-2")} />,
                "Metas",
                "/goals",
                pathname === "/goals",
              )}

              {renderMenuItem(
                <Bot className={cn("h-4 w-4", !collapsed && "mr-2")} />,
                "Assistente",
                "/assistant",
                pathname === "/assistant",
              )}

              {renderMenuItem(
                <BellRing className={cn("h-4 w-4", !collapsed && "mr-2")} />,
                "Alertas",
                "/notifications",
                pathname === "/notifications",
              )}
            </div>
          </div>

          <div className="px-3 py-2">
            {!collapsed && <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Transações</h2>}
            <div className="space-y-1">
              {renderMenuItem(
                <CreditCard className={cn("h-4 w-4", !collapsed && "mr-2")} />,
                "Transações",
                "/transactions",
                pathname === "/transactions",
              )}

              {renderMenuItem(
                <FileText className={cn("h-4 w-4", !collapsed && "mr-2")} />,
                "Faturas",
                "/invoices",
                pathname === "/invoices",
              )}

              {renderMenuItem(
                <Wallet className={cn("h-4 w-4", !collapsed && "mr-2")} />,
                "Pagamentos",
                "/payments",
                pathname === "/payments",
              )}
            </div>
          </div>

          <div className="px-3 py-2">
            {!collapsed && <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Administração</h2>}
            <div className="space-y-1">
              {renderMenuItem(
                <Users className={cn("h-4 w-4", !collapsed && "mr-2")} />,
                "Membros",
                "/members",
                pathname === "/members",
              )}

              {renderMenuItem(
                <Settings className={cn("h-4 w-4", !collapsed && "mr-2")} />,
                "Config.",
                "/settings",
                pathname === "/settings",
              )}
            </div>
          </div>
        </div>

        {/* Footer with user info and theme toggle */}
        <div className="absolute bottom-0 left-0 right-0 border-t p-3">
          <div className="flex items-center justify-between">
            {!collapsed ? (
              <>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={settings.avatar || "/placeholder.svg"} alt={settings.fullName} />
                    <AvatarFallback>
                      {settings.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-medium">{settings.fullName}</p>
                    <p className="text-xs text-muted-foreground">Administrador</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex justify-center w-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={settings.avatar || "/placeholder.svg"} alt={settings.fullName} />
                  <AvatarFallback>
                    {settings.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content padding to account for fixed sidebar */}
      {!isMobile && <div className={collapsed ? "ml-16" : "ml-64"} />}
    </>
  )
}
