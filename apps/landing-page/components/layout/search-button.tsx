"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import SearchDialog from "./search-dialog"

export default function SearchButton() {
  const [isOpen, setIsOpen] = useState(false)

  // Adicionar manipulador de tecla para abrir a pesquisa com Ctrl+K ou Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      <Button
        variant="secondary"
        className="hidden xl:flex h-9 w-40 lg:w-56 justify-between items-center rounded-full bg-muted/40 hover:bg-muted/80 text-muted-foreground border border-transparent hover:border-border/50 transition-all duration-300 shadow-sm"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center gap-2">
          <Search className="size-4" />
          <span className="text-xs font-normal">Pesquisar...</span>
        </div>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded bg-background/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex border">
          <span className="text-[10px]">⌘</span>K
        </kbd>
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsOpen(true)}
        className="xl:hidden rounded-full hover:bg-muted/50"
      >
         <Search className="size-5" />
      </Button>
      <SearchDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}
