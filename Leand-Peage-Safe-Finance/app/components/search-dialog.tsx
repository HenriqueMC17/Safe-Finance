"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, FileText, BookOpen, HelpCircle, X } from "lucide-react"

// Dados de exemplo para a busca
const searchData = [
  {
    type: "documentacao",
    title: "Primeiros Passos",
    description: "Guia para começar a usar a Safe Finance",
    url: "/recursos/documentacao#primeiros-passos",
  },
  {
    type: "documentacao",
    title: "Cadastro de Transações",
    description: "Como registrar suas receitas e despesas",
    url: "/recursos/documentacao#transacoes",
  },
  {
    type: "documentacao",
    title: "Orçamentos",
    description: "Como criar e gerenciar orçamentos mensais",
    url: "/recursos/documentacao#orcamentos",
  },
  {
    type: "blog",
    title: "5 hábitos financeiros que vão transformar sua vida",
    description: "Dicas para melhorar sua saúde financeira",
    url: "/recursos/blog/habitos-financeiros",
  },
  {
    type: "blog",
    title: "Investimentos para iniciantes",
    description: "Por onde começar a investir",
    url: "/recursos/blog/investimentos-iniciantes",
  },
  {
    type: "suporte",
    title: "Perguntas Frequentes",
    description: "Respostas para as dúvidas mais comuns",
    url: "/recursos/suporte#faq",
  },
  {
    type: "suporte",
    title: "Contato",
    description: "Entre em contato com nossa equipe",
    url: "/contato",
  },
]

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<typeof searchData>([])

  // Filtrar resultados com base na consulta de pesquisa
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setResults([])
      return
    }

    const filtered = searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setResults(filtered)
  }, [searchQuery])

  // Lidar com a navegação quando um resultado é selecionado
  const handleSelect = (url: string) => {
    router.push(url)
    onOpenChange(false)
    setSearchQuery("")
  }

  // Lidar com o pressionamento de tecla
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Search className="size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar na Safe Finance..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 pl-0"
              autoFocus
            />
          </div>
        </div>

        {results.length > 0 && (
          <div className="py-2 max-h-[60vh] overflow-y-auto">
            {results.map((result, index) => (
              <button
                key={index}
                className="w-full text-left px-4 py-2 hover:bg-muted flex items-start gap-3"
                onClick={() => handleSelect(result.url)}
              >
                <div className="mt-0.5">
                  {result.type === "documentacao" && <FileText className="size-4 text-primary" />}
                  {result.type === "blog" && <BookOpen className="size-4 text-primary" />}
                  {result.type === "suporte" && <HelpCircle className="size-4 text-primary" />}
                </div>
                <div>
                  <p className="font-medium">{result.title}</p>
                  <p className="text-sm text-muted-foreground">{result.description}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {searchQuery.trim() !== "" && results.length === 0 && (
          <div className="py-6 text-center">
            <p className="text-muted-foreground">Nenhum resultado encontrado para "{searchQuery}"</p>
          </div>
        )}

        {searchQuery.trim() === "" && (
          <div className="py-6 text-center">
            <p className="text-muted-foreground">Digite para buscar na documentação, blog e suporte</p>
          </div>
        )}

        <div className="p-2 border-t text-xs text-muted-foreground flex justify-between items-center">
          <span>Pressione ESC para fechar</span>
          <div className="flex gap-2">
            <span>Navegue com</span>
            <kbd className="px-1.5 py-0.5 bg-muted border rounded text-xs">↑</kbd>
            <kbd className="px-1.5 py-0.5 bg-muted border rounded text-xs">↓</kbd>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
