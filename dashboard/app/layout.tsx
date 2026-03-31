import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { SettingsProvider } from "@/contexts/settings-context"
import { LocaleProvider } from "@/contexts/locale-context"
import Layout from "@/components/layout"
import { PWAInstallButton } from "@/components/pwa/install-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Safe Finance - Gestão Financeira Inteligente",
    template: "%s | Safe Finance",
  },
  description:
    "Plataforma completa de gestão financeira pessoal com IA, análises avançadas, orçamentos inteligentes e metas de economia. Controle total das suas finanças.",
  keywords: ["finanças", "gestão financeira", "orçamento", "economia", "investimentos", "controle financeiro"],
  authors: [{ name: "Safe Finance Team" }],
  creator: "Safe Finance",
  publisher: "Safe Finance",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://safe-finance.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Safe Finance - Gestão Financeira Inteligente",
    description:
      "Plataforma completa de gestão financeira pessoal com IA, análises avançadas e controle total das suas finanças.",
    url: "https://safe-finance.vercel.app",
    siteName: "Safe Finance",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Safe Finance - Dashboard Financeiro",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Safe Finance - Gestão Financeira Inteligente",
    description: "Controle total das suas finanças com IA e análises avançadas.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#000000" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Safe Finance",
  },
  applicationName: "Safe Finance",
  category: "finance",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Safe Finance" />
        <meta name="application-name" content="Safe Finance" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SettingsProvider>
            <LocaleProvider>
              <Layout>{children}</Layout>
              <Toaster />
              <PWAInstallButton />
              <div className="noise-overlay" />
            </LocaleProvider>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
