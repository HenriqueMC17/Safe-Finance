"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { Notifications } from "@/components/notifications"
import { LanguageSelector } from "@/components/language-selector"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useSettings } from "@/contexts/settings-context"
import { useLocale } from "@/contexts/locale-context"
import { useMediaQuery } from "@/hooks/use-media-query"

export function TopNav() {
  const pathname = usePathname()
  const { settings } = useSettings()
  const { t } = useLocale()
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6">
        {/* Mobile Menu Button */}
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              {/* Mobile navigation content */}
              <div className="flex flex-col space-y-4 mt-4">
                <Link href="/" className="text-lg font-semibold">
                  {t("dashboard")}
                </Link>
                <Link href="/transactions" className="text-sm">
                  {t("transactions")}
                </Link>
                <Link href="/analytics" className="text-sm">
                  {t("analytics")}
                </Link>
                <Link href="/budget-forecast" className="text-sm">
                  {t("budget")}
                </Link>
                <Link href="/goals" className="text-sm">
                  {t("goals")}
                </Link>
                <Link href="/settings" className="text-sm">
                  {t("settings")}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        )}

        <div className="ml-auto flex items-center space-x-2 md:space-x-4">
          {/* Search Bar - Hidden on mobile */}
          <div className="relative hidden md:flex">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={`${t("search")}...`}
              className="w-[200px] rounded-lg bg-background pl-8 md:w-[240px] lg:w-[320px] transition-all duration-200 focus:w-[280px] lg:focus:w-[360px]"
            />
          </div>

          {/* Mobile Search Button */}
          {isMobile && (
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">{t("search")}</span>
            </Button>
          )}

          {/* Language Selector */}
          <LanguageSelector />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <Notifications />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={settings.avatar || "/placeholder.svg"} alt={settings.fullName} />
                  <AvatarFallback>
                    {settings.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{settings.fullName}</p>
                  <p className="text-xs leading-none text-muted-foreground">{settings.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings">{t("profile")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>{t("help")}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{t("logout")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
