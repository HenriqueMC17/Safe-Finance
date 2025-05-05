import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SettingsProvider } from "@/contexts/settings-context"
import { LocaleProvider } from "@/contexts/locale-context"
import { Toaster } from "@/components/ui/toaster"
import { getCookiesSafe } from "@/lib/headers-utils"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Painel Financeiro Flowers&Saints",
  description: "Um painel financeiro moderno e responsivo",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Tentativa segura de obter cookies
  const cookies = getCookiesSafe()
  const sidebarState = cookies?.get("sidebar-state")?.value
  const defaultCollapsed = sidebarState === "collapsed"

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SettingsProvider>
            <LocaleProvider>
              <TooltipProvider delayDuration={0}>
                <div className="min-h-screen flex">
                  {/* Sidebar - hidden on mobile, visible on desktop */}
                  <div className="hidden md:block">
                    <Sidebar defaultCollapsed={defaultCollapsed} />
                  </div>

                  {/* Floating sidebar - visible on mobile */}
                  <div className="md:hidden">
                    <Sidebar isFloating={true} />
                  </div>

                  <main className="flex-1">
                    <TopNav />
                    <div className="container mx-auto p-4 md:p-6 max-w-7xl">{children}</div>
                  </main>
                </div>
                <Toaster />
              </TooltipProvider>
            </LocaleProvider>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
