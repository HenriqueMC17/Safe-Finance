import type React from "react"
import { Sidebar } from "./sidebar"
import { TopNav } from "./top-nav"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - hidden on mobile, visible on desktop */}
      {!isMobile && <Sidebar />}

      {/* Floating sidebar - visible on mobile */}
      {isMobile && <Sidebar isFloating={true} />}

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">{children}</main>
      </div>
    </div>
  )
}
