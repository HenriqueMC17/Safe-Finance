"use client"

import Link from "next/link"
import { Wallet, Instagram, Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-background border-t border-border/40 pb-12 pt-24 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(80,200,168,0.05),transparent_40%)]"></div>
        
        <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
                <div className="space-y-8 col-span-1 md:col-span-2 lg:col-span-1">
                    <Link href="/" className="flex items-center gap-2 font-bold group">
                        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary ring-1 ring-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-sm">
                            <Wallet className="size-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">Safe Finance</span>
                    </Link>
                    <p className="text-muted-foreground text-base leading-relaxed font-light max-w-sm">
                        Líder em soluções de gestão financeira inteligente, capacitando pessoas a alcançarem sua autonomia patrimonial através da tecnologia e inovação.
                    </p>
                    <div className="flex items-center gap-4">
                        {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                            <Link key={i} href="#" className="size-10 rounded-full bg-muted/50 border border-border/40 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-500 group/social">
                                <Icon className="size-4 group-hover/social:scale-110 transition-transform" />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    <h4 className="text-sm font-bold tracking-widest uppercase text-foreground/70">Produto</h4>
                    <ul className="space-y-4">
                        {["Funcionalidades", "Planos", "Sobre", "Dúvidas Frequentes", "Novidades"].map((link) => (
                            <li key={link}>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-px bg-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
                                    {link}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-8">
                    <h4 className="text-sm font-bold tracking-widest uppercase text-foreground/70">Legal</h4>
                    <ul className="space-y-4">
                        {["Termos de Uso", "Política de Privacidade", "Segurança", "LGPD"].map((link) => (
                            <li key={link}>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-px bg-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
                                    {link}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-8">
                    <h4 className="text-sm font-bold tracking-widest uppercase text-foreground/70">Contato</h4>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3 group">
                            <Mail className="size-4 mt-0.5 text-primary" />
                            <Link href="mailto:contato@safefinance.com.br" className="text-muted-foreground group-hover:text-foreground transition-colors text-sm font-medium">contato@safefinance.com.br</Link>
                        </li>
                        <li className="flex items-start gap-3 group">
                            <Phone className="size-4 mt-0.5 text-primary" />
                            <span className="text-muted-foreground group-hover:text-foreground transition-colors text-sm font-medium">(11) 99999-9999</span>
                        </li>
                        <li className="flex items-start gap-3 group">
                            <MapPin className="size-4 mt-0.5 text-primary" />
                            <span className="text-muted-foreground group-hover:text-foreground transition-colors text-sm font-medium">Av. Paulista, 1000 - São Paulo/SP</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-border/50 to-transparent mb-12"></div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 text-sm text-muted-foreground border-t border-border/20 pt-12">
                <p>© {currentYear} Safe Finance. Todos os direitos reservados.</p>
                <div className="flex items-center gap-8">
                    <p className="flex items-center gap-2">
                        Desenvolvido por <Link href="#" className="font-bold text-foreground hover:text-primary transition-colors">Henrique</Link>
                    </p>
                    <p className="flex items-center gap-2">
                        Arquitetura por <Link href="#" className="font-bold text-foreground hover:text-primary transition-colors">Antigravity AI</Link>
                    </p>
                </div>
            </div>
        </div>
    </footer>
  )
}
