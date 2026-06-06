"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { AccountsOverview } from "@/features/accounts/components/accounts-overview"
import { RecentTransactions } from "@/features/transactions/components/recent-transactions"
import { SavingsGoals } from "@/features/accounts/components/savings-goals"
import { BudgetTracker } from "@/features/accounts/components/budget-tracker"
import { FinancialChart } from "@/features/analytics/components/financial-chart"
import { QuickActions } from "@/features/transactions/components/quick-actions"
import { Notifications } from "@/features/notifications/components/notifications"
import { UpcomingEvents } from "@/features/events/components/upcoming-events"
import { OnboardingWizard } from "@/features/onboarding/components/onboarding-wizard"
import { InteractiveTutorial } from "@/features/tutorial/components/interactive-tutorial"
import { FinancialTips } from "@/features/education/components/financial-tips"
import { FinancialHealthScore } from "@/features/health/components/financial-health-score"
import { AccessibilityMode } from "@/features/accessibility/components/accessibility-mode"

export default function HomePage() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)
  const { scrollYProgress } = useScroll()
  
  // Parallax effects
  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, -50])
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem("onboarding-completed")
    const hasSkippedOnboarding = localStorage.getItem("onboarding-skipped")

    if (!hasCompletedOnboarding && !hasSkippedOnboarding) {
      setTimeout(() => setShowOnboarding(true), 1000)
    }

    const hasCompletedTutorial = localStorage.getItem("tutorial-completed")
    const hasSkippedTutorial = localStorage.getItem("tutorial-skipped")

    if (hasCompletedOnboarding && !hasCompletedTutorial && !hasSkippedTutorial) {
      setTimeout(() => setShowTutorial(true), 2000)
    }

    const handleOnboardingCompleted = () => {
      setShowOnboarding(false)
      setTimeout(() => setShowTutorial(true), 500)
    }

    const handleStepCompleted = (event: Event) => {
      const customEvent = event as CustomEvent
      console.log("Etapa completada:", customEvent.detail)
    }

    window.addEventListener("onboardingCompleted", handleOnboardingCompleted)
    window.addEventListener("onboardingStepCompleted", handleStepCompleted)

    return () => {
      window.removeEventListener("onboardingCompleted", handleOnboardingCompleted)
      window.removeEventListener("onboardingStepCompleted", handleStepCompleted)
    }
  }, [])

  const springTransition = {
    type: "spring" as const,
    damping: 24,
    stiffness: 100,
    mass: 0.8,
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: springTransition }
  }

  const userId = "k577xg84pjhwcwaxebmbesj43984s1pa";

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden" data-tutorial="dashboard">
      <AccessibilityMode />
      
      {/* Cinematic Typographic Hero */}
      <motion.section 
        className="relative pt-24 pb-16 md:pt-40 md:pb-32 px-6 flex flex-col justify-end min-h-[50vh] xl:min-h-[60vh] border-b-2 border-primary"
        style={{ y: yHero, opacity: opacityHero }}
      >
        <div className="absolute top-10 right-10 text-primary font-mono text-sm tracking-widest uppercase opacity-70">
          SYSTEM_ACCESS: GRANTED
        </div>
        
        <h1 className="text-[clamp(3.5rem,8vw,8rem)] font-black leading-[0.85] tracking-tighter uppercase mb-4 text-foreground w-full md:w-[85%]">
          Control<br/>
          <span className="text-primary italic font-serif">Absolute.</span>
        </h1>
        
        <p className="font-mono text-muted-foreground max-w-xl text-lg mt-8 border-l-2 border-primary pl-4 tracking-tight">
          Sua síntese financeira. Desenvolvido para máxima performance analítica e precisão de dados.
        </p>
      </motion.section>

      {/* Extreme Asymmetry Continuous Flow */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-12 gap-x-0 gap-y-16 md:gap-y-32 py-20 px-4 md:px-8"
      >
        {/* Layer 1: Health & Quick Actions (Staggered Left/Right) */}
        <motion.div variants={itemVariants} className="md:col-start-1 md:col-span-5 relative z-10" data-tutorial="quick-actions">
          <div className="sticky top-24">
            <h2 className="font-mono text-xs uppercase tracking-widest text-primary mb-6">01 // Operations</h2>
            <QuickActions />
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="md:col-start-7 md:col-span-6 relative z-10 -mt-10 md:mt-0">
          <h2 className="font-mono text-xs uppercase tracking-widest text-primary mb-6">02 // Vital Signs</h2>
          <FinancialHealthScore />
        </motion.div>

        {/* Layer 2: Massive Chart spanning full width but asymmetric container */}
        <motion.div variants={itemVariants} className="md:col-start-2 md:col-span-11 relative z-20 border-l-4 border-primary pl-4 md:pl-12 my-10" data-tutorial="chart">
          <h2 className="font-mono text-xs uppercase tracking-widest text-primary mb-6">03 // Telemetry</h2>
          <div className="bg-card shadow-2xl overflow-hidden p-2">
            <FinancialChart userId={userId} />
          </div>
        </motion.div>

        {/* Layer 3: Split flow for Accounts & Transactions */}
        <motion.div variants={itemVariants} className="md:col-start-1 md:col-span-7 relative z-10" data-tutorial="accounts">
          <h2 className="font-mono text-xs uppercase tracking-widest text-primary mb-6">04 // Core Assets</h2>
          <AccountsOverview userId={userId} />
        </motion.div>

        <motion.div variants={itemVariants} className="md:col-start-9 md:col-span-4 relative z-10" data-tutorial="transactions">
          <h2 className="font-mono text-xs uppercase tracking-widest text-primary mb-6">05 // Real-time Feed</h2>
          <RecentTransactions userId={userId} />
        </motion.div>
        
        {/* Layer 4: Intelligence & Goals overlapping the center */}
        <motion.div variants={itemVariants} className="md:col-start-2 md:col-span-5 relative z-10 p-6 md:p-12 border-2 border-foreground/10 bg-foreground/5 backdrop-blur-md">
          <h2 className="font-mono text-xs uppercase tracking-widest text-primary mb-6">06 // Objectives</h2>
          <SavingsGoals userId={userId} />
          <div className="mt-12">
            <BudgetTracker userId={userId} />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="md:col-start-8 md:col-span-4 relative z-10 flex flex-col gap-12" data-tutorial="events">
          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-primary mb-6">07 // Vectors</h2>
            <UpcomingEvents />
          </div>
          <div data-tutorial="notifications">
            <Notifications />
          </div>
          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-primary mb-6">08 // Intel</h2>
            <FinancialTips />
          </div>
        </motion.div>

      </motion.div>

      {showOnboarding && <OnboardingWizard />}
      {showTutorial && <InteractiveTutorial autoStart={true} onComplete={() => setShowTutorial(false)} />}
    </div>
  )
}
