import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SettingsProvider } from "@/contexts/settings-context"
import { LocaleProvider } from "@/contexts/locale-context"
import { PageTransition } from "@/components/page-transition"
import type React from "react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata = {
  title: "Safe Finance",
  description: "Sistema de gestão financeira seguro e eficiente",
  generator: "v0.dev",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  robots: "index, follow",
  keywords: "finanças, gestão financeira, orçamento, investimentos, safe finance",
  authors: [{ name: "Safe Finance Team" }],
  creator: "Safe Finance",
  publisher: "Safe Finance",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <SettingsProvider>
            <LocaleProvider>
              <TooltipProvider delayDuration={0}>
                <div className="min-h-screen flex bg-background">
                  <Sidebar />
                  <div className="flex-1 flex flex-col min-w-0">
                    <TopNav />
                    <main className="flex-1 overflow-auto">
                      <div className="container mx-auto p-4 md:p-6 max-w-7xl">
                        <PageTransition>{children}</PageTransition>
                      </div>
                    </main>
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
