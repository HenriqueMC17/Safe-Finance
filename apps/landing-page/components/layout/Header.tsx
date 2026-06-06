"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Wallet, Moon, Sun, ArrowRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import SearchButton from "./search-button"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const navItems = [
    { label: "Funcionalidades", href: "#features" },
    { label: "Sobre", href: "#about" },
    { label: "Benefícios", href: "#benefits" },
    { label: "Equipe", href: "#team" },
    { label: "Planos", href: "#pricing" },
  ]

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-7xl transition-all duration-500 ease-in-out rounded-full border ${
        isScrolled 
          ? "bg-background/60 backdrop-blur-xl border-border/40 shadow-sm" 
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="px-4 md:px-5 lg:px-8 flex h-14 items-center justify-between">
        <div className="flex items-center gap-2 font-semibold group cursor-pointer flex-shrink-0">
          <div className="size-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary ring-1 ring-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-sm">
            <Wallet className="size-4" />
          </div>
          <span className="tracking-tight text-base font-bold text-foreground/90 group-hover:text-foreground transition-colors hidden sm:block">
            Safe Finance
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-2 overflow-hidden">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground hover:bg-muted/60 rounded-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex gap-3 xl:gap-4 items-center flex-shrink-0">
          <SearchButton />
          
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="size-9 rounded-full shadow-none hover:bg-muted/60 transition-colors">
            {mounted && theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            <span className="sr-only">Alternar tema</span>
          </Button>
          
          <div className="flex items-center gap-3">
            <Link
              href="/cliente"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Entrar
            </Link>
            
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/30 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
              <Button className="relative h-9 px-5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-[1.02]" asChild>
                <Link href="/cliente">
                  Começar
                  <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="size-9 rounded-full hover:bg-muted/60">
            {mounted && theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="size-9 rounded-full hover:bg-muted/60">
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-[calc(100%+0.5rem)] inset-x-0 rounded-2xl bg-background/95 backdrop-blur-xl border border-border/50 shadow-lg overflow-hidden mx-auto w-full"
          >
            <div className="p-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link 
                  key={item.label} 
                  href={item.href} 
                  className="px-4 py-3 text-sm font-medium rounded-xl hover:bg-muted/50 transition-colors" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 p-4 bg-muted/20 border-t mt-2 rounded-b-xl">
                <Link 
                  href="/cliente" 
                  className="px-4 py-2 text-sm font-medium text-center hover:text-primary transition-colors" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Já tenho uma conta
                </Link>
                <Button className="w-full h-11 rounded-full bg-primary hover:bg-primary/90" asChild>
                  <Link href="/cliente">
                    Começar Agora
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
