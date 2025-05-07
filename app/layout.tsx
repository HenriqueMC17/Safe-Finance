import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SettingsProvider } from "@/contexts/settings-context"
import { LocaleProvider } from "@/contexts/locale-context"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Safe Finance",
  description: "Sistema de gestão financeira seguro e eficiente",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SettingsProvider>
            <LocaleProvider>
              <TooltipProvider delayDuration={0}>
                <div className="min-h-screen flex">
                  <Sidebar />
                  <div className="flex-1">
                    <TopNav />
                    <div className="container mx-auto p-6 max-w-7xl">
                      <main className="w-full">{children}</main>
                    </div>
                  </div>
                </div>
              </TooltipProvider>
            </LocaleProvider>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
