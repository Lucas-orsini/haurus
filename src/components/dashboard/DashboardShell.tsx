'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import { DashboardDictContext, type DashboardDict } from './DashboardDictContext'

export default function DashboardShell({
  children,
  dict,
}: {
  children: React.ReactNode
  dict: DashboardDict
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function handleMenuToggle() {
    setSidebarOpen((prev) => !prev)
  }

  function handleSidebarClose() {
    setSidebarOpen(false)
  }

  return (
    <DashboardDictContext.Provider value={dict}>
      <div className="flex h-screen overflow-hidden bg-[var(--bg)]">
        {/* Sidebar — fixed width, full height, never scrolls */}
        <DashboardSidebar
          isOpen={sidebarOpen}
          onClose={handleSidebarClose}
        />

        {/* Main zone — takes remaining space */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          {/* Page header — fixed, never scrolls */}
          <DashboardHeader onMenuToggle={handleMenuToggle} />

          {/* Content — sole scrollable zone */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-4 md:p-6">
              {children}
            </div>
          </main>
        </div>

        {/* Mobile backdrop — click to close sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              onClick={handleSidebarClose}
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              aria-hidden="true"
            />
          )}
        </AnimatePresence>
      </div>
    </DashboardDictContext.Provider>
  )
}
