import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { SmoothScroll } from "@/components/smooth-scroll"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Safe Finance - Domine Suas Finanças com Inteligência",
  description: "A plataforma definitiva para controle financeiro pessoal. Monitore gastos, gerencie orçamentos e alcance sua liberdade financeira com a Safe Finance.",
  keywords: ["finanças pessoais", "controle financeiro", "planejamento financeiro", "organização de gastos", "gestão de dinheiro"],
  authors: [{ name: "Safe Finance Team" }],
  openGraph: {
    title: "Safe Finance - Controle Financeiro Inteligente",
    description: "Organize sua vida financeira em um só lugar. Seguro, intuitivo e poderoso.",
    url: "https://safefinance.com.br",
    siteName: "Safe Finance",
    images: [
      {
        url: "https://cdn.gamma.app/33klz2ifj6dnjv0/c63b955f50464134b5c3d1098edc7e13/original/Foto-da-Equipe.jpg",
        width: 1200,
        height: 630,
        alt: "Safe Finance Preview",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Safe Finance - Domine Suas Finanças",
    description: "A melhor ferramenta para gestão financeira pessoal.",
    images: ["https://cdn.gamma.app/33klz2ifj6dnjv0/c63b955f50464134b5c3d1098edc7e13/original/Foto-da-Equipe.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SmoothScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
