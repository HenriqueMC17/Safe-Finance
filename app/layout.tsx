import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SettingsProvider } from "@/contexts/settings-context"
import { LocaleProvider } from "@/contexts/locale-context"
import { PageTransition } from "@/components/page-transition"
import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard"
import { FinancialTips } from "@/components/education/financial-tips"
import { AccessibilityMode } from "@/components/accessibility/accessibility-mode"
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
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#50c8a8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Safe Finance" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <LocaleProvider>
            <SettingsProvider>
              <TooltipProvider delayDuration={0}>
                <AccessibilityMode />
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
                <OnboardingWizard onComplete={() => {}} />
                <FinancialTips />
              </TooltipProvider>
            </SettingsProvider>
          </LocaleProvider>
        </ThemeProvider>

        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />

        {/* PWA Install Prompt */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              let deferredPrompt;
              window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                deferredPrompt = e;
                const installButton = document.getElementById('install-button');
                if (installButton) {
                  installButton.style.display = 'block';
                  installButton.addEventListener('click', () => {
                    deferredPrompt.prompt();
                    deferredPrompt.userChoice.then((choiceResult) => {
                      if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the install prompt');
                      }
                      deferredPrompt = null;
                    });
                  });
                }
              });
            `,
          }}
        />
      </body>
    </html>
  )
}
