"use client"

import Sidebar from "@/components/dashboard/Sidebar"
import TopNav from "@/components/dashboard/TobNav"
import { ThemeProvider } from "@/components/providers/theme-provider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar />
        <div className="w-full flex flex-1 flex-col min-h-0 min-w-0">
          <header className="h-16 border-b border-border">
            <TopNav />
          </header>
          <main className="flex-1 overflow-auto p-6 bg-background">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
