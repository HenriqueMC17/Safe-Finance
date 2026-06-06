"use client"

import type React from "react"

import { useEffect } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

interface PageLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
  backUrl?: string
  backLabel?: string
  preserveScrollPosition?: boolean
}

/**
 * PageLayout - Componente de layout padrão para páginas do site
 *
 * Este componente fornece uma estrutura consistente para todas as páginas,
 * incluindo navegação de volta, título, descrição e controle de scroll.
 *
 * @param {React.ReactNode} children - Conteúdo da página
 * @param {string} title - Título principal da página
 * @param {string} description - Descrição opcional da página
 * @param {string} backUrl - URL para o link de voltar (padrão: "/")
 * @param {string} backLabel - Texto para o link de voltar (padrão: "Voltar para a página inicial")
 * @param {boolean} preserveScrollPosition - Se verdadeiro, mantém a posição de scroll ao navegar de volta
 */
export default function PageLayout({
  children,
  title,
  description,
  backUrl = "/",
  backLabel = "Voltar para a página inicial",
  preserveScrollPosition = false,
}: PageLayoutProps) {
  // Scroll to top on page load, unless preserveScrollPosition is true
  useEffect(() => {
    if (!preserveScrollPosition) {
      window.scrollTo(0, 0)
    }
  }, [preserveScrollPosition])

  const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (preserveScrollPosition) {
      // Don't do anything special, let the browser handle it
      return
    }

    // If not preserving scroll, prevent default and handle navigation manually
    if (backUrl === "/") {
      e.preventDefault()
      window.location.href = "/"
    }
  }

  return (
    <div className="container max-w-4xl py-12 md:py-20">
      <Link
        href={backUrl}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
        onClick={handleBackClick}
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        {backLabel}
      </Link>

      <h1 className="text-4xl font-bold mb-6">{title}</h1>
      {description && <p className="text-muted-foreground mb-12 max-w-2xl">{description}</p>}

      {children}
    </div>
  )
}
