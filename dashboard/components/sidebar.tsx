"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  CreditCard,
  FileText,
  HelpCircle,
  Home,
  Leaf,
  PieChart,
  Settings,
  Target,
  TrendingUp,
  Wallet,
  Award,
  Trophy,
  TreePine,
  ShoppingBag,
  BookOpen,
  Heart,
  Globe,
  Calculator,
  MessageSquare,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface SidebarProps {
  className?: string
  isFloating?: boolean
}

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    isActive: false,
  },
  {
    title: "Transações",
    url: "/transactions",
    icon: CreditCard,
    isActive: false,
  },
  {
    title: "Análises",
    url: "/analytics",
    icon: BarChart3,
    isActive: false,
  },
  {
    title: "Orçamentos",
    url: "/budget-forecast",
    icon: Target,
    isActive: false,
  },
  {
    title: "Metas",
    url: "/goals",
    icon: Trophy,
    isActive: false,
  },
  {
    title: "Pagamentos",
    url: "/payments",
    icon: Wallet,
    isActive: false,
  },
  {
    title: "Faturas",
    url: "/invoices",
    icon: FileText,
    isActive: false,
  },
  {
    title: "Sustentabilidade",
    url: "#",
    icon: Leaf,
    isActive: false,
    items: [
      {
        title: "Dashboard Verde",
        url: "/sustainability",
        icon: TreePine,
      },
      {
        title: "Pegada de Carbono",
        url: "/sustainability/carbon-footprint",
        icon: Calculator,
      },
      {
        title: "Orçamentos Verdes",
        url: "/sustainability/green-budgets",
        icon: Target,
      },
      {
        title: "Investimentos ESG",
        url: "/sustainability/esg-investments",
        icon: TrendingUp,
      },
      {
        title: "Desafios Verdes",
        url: "/sustainability/challenges",
        icon: Award,
      },
      {
        title: "Conquistas",
        url: "/sustainability/achievements",
        icon: Trophy,
      },
      {
        title: "Marketplace Verde",
        url: "/sustainability/marketplace",
        icon: ShoppingBag,
      },
      {
        title: "Educação Ambiental",
        url: "/sustainability/education",
        icon: BookOpen,
      },
      {
        title: "Doações Verdes",
        url: "/sustainability/donations",
        icon: Heart,
      },
    ],
  },
  {
    title: "Assistente IA",
    url: "/assistant",
    icon: MessageSquare,
    isActive: false,
  },
  {
    title: "Relatórios",
    url: "/export",
    icon: PieChart,
    isActive: false,
  },
  {
    title: "Configurações",
    url: "/settings",
    icon: Settings,
    isActive: false,
  },
  {
    title: "Ajuda",
    url: "/help",
    icon: HelpCircle,
    isActive: false,
  },
]

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [openItems, setOpenItems] = React.useState<string[]>(["Sustentabilidade"])

  const toggleItem = (title: string) => {
    setOpenItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  return (
    <div className={cn("flex h-full w-64 flex-col border-r bg-background", className)}>
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="text-lg font-semibold">Safe Finance</span>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const isActive =
              pathname === item.url || (item.items && item.items.some((subItem) => pathname === subItem.url))
            const hasSubItems = item.items && item.items.length > 0
            const isOpen = openItems.includes(item.title)

            if (hasSubItems) {
              return (
                <Collapsible key={item.title} open={isOpen} onOpenChange={() => toggleItem(item.title)}>
                  <CollapsibleTrigger asChild>
                    <Button variant={isActive ? "secondary" : "ghost"} className="w-full justify-start">
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                      {isOpen ? (
                        <ChevronDown className="ml-auto h-4 w-4" />
                      ) : (
                        <ChevronRight className="ml-auto h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 pl-6">
                    {item.items?.map((subItem) => {
                      const isSubActive = pathname === subItem.url
                      return (
                        <Button
                          key={subItem.title}
                          variant={isSubActive ? "secondary" : "ghost"}
                          size="sm"
                          className="w-full justify-start"
                          asChild
                        >
                          <Link href={subItem.url}>
                            <subItem.icon className="mr-2 h-4 w-4" />
                            {subItem.title}
                          </Link>
                        </Button>
                      )
                    })}
                  </CollapsibleContent>
                </Collapsible>
              )
            }

            return (
              <Button
                key={item.title}
                variant={isActive ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href={item.url}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            )
          })}
        </nav>
      </ScrollArea>

      <div className="border-t p-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Globe className="h-4 w-4 text-green-600" />
          <span>Impacto Positivo</span>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">Você já economizou 2.5 toneladas de CO₂ este ano! 🌱</div>
      </div>
    </div>
  )
}

export default Sidebar
