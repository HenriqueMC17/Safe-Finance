"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { ThemeToggle } from "@/components/theme-toggle"
import { useSettings } from "@/contexts/settings-context"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  CreditCard,
  Settings,
  HelpCircle,
  Users,
  FileText,
  BarChart3,
  MessageSquare,
  Calendar,
  Lock,
  Building,
  Wallet,
  PieChart,
  Target,
  Bell,
  Menu,
  X,
} from "lucide-react"

interface SidebarProps {
  isFloating?: boolean
  defaultCollapsed?: boolean
}

export function Sidebar({ isFloating = false, defaultCollapsed = false }: SidebarProps) {
  const pathname = usePathname()
  const { settings } = useSettings()
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Reset state when screen size changes
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false)
    }
  }, [isMobile])

  // Handle sidebar toggle
  const toggleSidebar = () => {
    if (isFloating) {
      setIsOpen(!isOpen)
    } else {
      setIsCollapsed(!isCollapsed)
      // Save sidebar state in cookie
      if (typeof document !== "undefined") {
        document.cookie = `sidebar-state=${!isCollapsed ? "collapsed" : "expanded"}; path=/; max-age=31536000`
      }
    }
  }

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar")
      if (isFloating && isOpen && sidebar && !sidebar.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isFloating && isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isFloating, isOpen])

  // Sidebar items
  const menuItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Análises",
      href: "/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Análise Financeira",
      href: "/financial-analysis",
      icon: <PieChart className="h-5 w-5" />,
    },
    {
      title: "Orçamentos",
      href: "/budget-forecast",
      icon: <Target className="h-5 w-5" />,
    },
    {
      title: "Notificações",
      href: "/notifications",
      icon: <Bell className="h-5 w-5" />,
    },
  ]

  const transactionItems = [
    {
      title: "Transações",
      href: "/transactions",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      title: "Faturas",
      href: "/invoices",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Pagamentos",
      href: "/payments",
      icon: <Wallet className="h-5 w-5" />,
    },
  ]

  const adminItems = [
    {
      title: "Organização",
      href: "/organization",
      icon: <Building className="h-5 w-5" />,
    },
    {
      title: "Projetos",
      href: "/projects",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Membros",
      href: "/members",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Permissões",
      href: "/permissions",
      icon: <Lock className="h-5 w-5" />,
    },
    {
      title: "Chat",
      href: "/chat",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Reuniões",
      href: "/meetings",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Configurações",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      title: "Ajuda",
      href: "/help",
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ]

  // Sidebar content
  const sidebarContent = (
    <div
      className={cn("flex flex-col h-screen", isCollapsed ? "w-16" : "w-52", "transition-all duration-300 ease-in-out")}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-14 px-3 border-b">
        {!isCollapsed && <div className="font-semibold text-sm truncate">Flowers&Saints</div>}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className={cn(isCollapsed ? "mx-auto" : "")}>
          {isFloating ? (
            <X className="h-4 w-4" />
          ) : isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Scrollable area */}
      <ScrollArea className="flex-1 py-2">
        <div className="space-y-4 px-2">
          {/* Menu section */}
          <div>
            <h3 className={cn("text-xs font-medium text-muted-foreground mb-2 px-2", isCollapsed && "sr-only")}>
              Menu
            </h3>
            <div className="space-y-1">
              {menuItems.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  title={item.title}
                  isActive={pathname === item.href}
                  isCollapsed={isCollapsed}
                />
              ))}
            </div>
          </div>

          {/* Transactions section */}
          <div>
            <h3 className={cn("text-xs font-medium text-muted-foreground mb-2 px-2", isCollapsed && "sr-only")}>
              Transações
            </h3>
            <div className="space-y-1">
              {transactionItems.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  title={item.title}
                  isActive={pathname === item.href}
                  isCollapsed={isCollapsed}
                />
              ))}
            </div>
          </div>

          {/* Admin section */}
          <div>
            <h3 className={cn("text-xs font-medium text-muted-foreground mb-2 px-2", isCollapsed && "sr-only")}>
              Administração
            </h3>
            <div className="space-y-1">
              {adminItems.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  title={item.title}
                  isActive={pathname === item.href}
                  isCollapsed={isCollapsed}
                />
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Footer with user profile */}
      <div className={cn("flex items-center gap-2 border-t p-3", isCollapsed ? "flex-col" : "justify-between")}>
        <div className={cn("flex items-center gap-2", isCollapsed && "flex-col")}>
          <Avatar className="h-8 w-8">
            <AvatarImage src={settings.avatar || "/placeholder.svg"} alt={settings.fullName} />
            <AvatarFallback>{settings.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="text-xs">
              <div className="font-medium">{settings.fullName}</div>
              <div className="text-muted-foreground truncate">{settings.email}</div>
            </div>
          )}
        </div>
        <ThemeToggle />
      </div>
    </div>
  )

  // Mobile floating button
  const floatingButton = isFloating && !isOpen && (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-4 left-4 z-50 rounded-full shadow-lg"
      onClick={toggleSidebar}
    >
      <Menu className="h-5 w-5" />
    </Button>
  )

  // Floating sidebar with overlay
  if (isFloating) {
    return (
      <TooltipProvider>
        {floatingButton}
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <div id="sidebar" className="fixed inset-y-0 left-0 z-50 bg-background border-r shadow-lg">
              {sidebarContent}
            </div>
          </div>
        )}
      </TooltipProvider>
    )
  }

  // Regular sidebar
  return (
    <TooltipProvider>
      <div id="sidebar" className="border-r">
        {sidebarContent}
      </div>
    </TooltipProvider>
  )
}

// Navigation item component
function NavItem({
  href,
  icon,
  title,
  isActive,
  isCollapsed,
}: {
  href: string
  icon: React.ReactNode
  title: string
  isActive: boolean
  isCollapsed: boolean
}) {
  const content = (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground",
        isCollapsed && "justify-center px-2",
      )}
    >
      {icon}
      {!isCollapsed && <span>{title}</span>}
    </Link>
  )

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right">{title}</TooltipContent>
      </Tooltip>
    )
  }

  return content
}
