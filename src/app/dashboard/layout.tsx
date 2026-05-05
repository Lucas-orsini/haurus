import type { Metadata } from 'next'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'

export const metadata: Metadata = {
  title: 'Dashboard — Haurus',
  description: 'Your tennis analytics dashboard.',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)]">
      {/* Sidebar — fixed width, full height, never scrolls */}
      <DashboardSidebar />

      {/* Main zone — takes remaining space */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Page header — fixed, never scrolls */}
        <DashboardHeader />

        {/* Content — sole scrollable zone */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
