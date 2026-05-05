'use client'

import { useState } from 'react'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import MobileSidebar from '@/components/dashboard/MobileSidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function handleToggleSidebar() {
    setSidebarOpen((prev) => !prev)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)]">
      {/* Sidebar desktop — hidden on mobile, visible from md up */}
      <div className="hidden md:flex shrink-0">
        <DashboardSidebar />
      </div>

      {/* Mobile sidebar — drawer overlay */}
      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main zone — takes remaining space */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Page header — fixed, never scrolls */}
        <DashboardHeader
          onToggleSidebar={handleToggleSidebar}
          sidebarOpen={sidebarOpen}
        />

        {/* Content — sole scrollable zone */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
