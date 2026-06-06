"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Layout & Core
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import HeroSection from "@/components/sections/HeroSection"
import AboutSection from "@/components/sections/AboutSection"
import FeaturesSection from "@/components/sections/FeaturesSection"
import BenefitsSection from "@/components/sections/BenefitsSection"
import TeamSection from "@/components/sections/TeamSection"
import TestimonialsSection from "@/components/sections/TestimonialsSection"
import PricingSection from "@/components/sections/PricingSection"
import FAQSection from "@/components/sections/FAQSection"
import CTASection from "@/components/sections/CTASection"

// Interactive Components (Lazy Loaded)
const UserTypeSelector = dynamic(() => import("@/components/interactive/UserTypeSelector"), { 
    ssr: false,
    loading: () => <div className="h-[400px] flex items-center justify-center animate-pulse bg-muted/20 rounded-3xl" />
})
const PersonalizedContent = dynamic(() => import("@/components/interactive/PersonalizedContent"), { ssr: false })
const FinancialQuiz = dynamic(() => import("@/components/interactive/FinancialQuiz"), { ssr: false })
const PublicRoadmap = dynamic(() => import("@/components/interactive/PublicRoadmap"), { ssr: false })
const SustainableFinance = dynamic(() => import("@/components/interactive/SustainableFinance"), { ssr: false })
const MicroCTA = dynamic(() => import("@/components/interactive/MicroCTA"), { ssr: false })

export default function LandingPage() {
  const [selectedUserType, setSelectedUserType] = useState("individual")

  const handleUserTypeSelect = (type: string) => {
    setSelectedUserType(type)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 transition-colors duration-500 overflow-x-hidden">
      {/* Header Orchestrator */}
      <Header />

      <main className="flex-1">
        {/* Core Sections */}
        <HeroSection />
        
        <AboutSection />
        
        <FeaturesSection />

        {/* Personalized Interactive Section */}
        <section id="personalization" className="w-full py-24 md:py-32 bg-background relative border-y border-border/40">
           <div className="container px-4 md:px-6">
             <UserTypeSelector onTypeSelect={handleUserTypeSelect} />
             <div className="mt-16 bg-muted/10 p-1 md:p-8 rounded-[3rem] border border-border/40 relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
               <PersonalizedContent userType={selectedUserType} />
             </div>
           </div>
        </section>

        <BenefitsSection />

        {/* Interactive Features */}
        <section className="w-full py-24 md:py-32 bg-muted/20">
          <div className="container px-4 md:px-6">
            <FinancialQuiz />
          </div>
        </section>
        
        <TeamSection />
        
        <TestimonialsSection />

        <section className="w-full py-24 md:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <PublicRoadmap />
          </div>
        </section>

        <section className="w-full py-24 md:py-32 bg-muted/10 border-y border-border/40 overflow-hidden relative">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_right,rgba(80,200,168,0.1),transparent_70%)]"></div>
          <div className="container px-4 md:px-6 relative">
            <SustainableFinance />
          </div>
        </section>
        
        <PricingSection />
        
        <FAQSection />

        <section className="w-full py-12 bg-background/50 border-y border-border/20">
          <div className="container px-4 md:px-6">
            <MicroCTA type="practice" />
          </div>
        </section>
        
        <CTASection />
      </main>

      {/* Footer Ecosystem */}
      <Footer />
    </div>
  )
}
