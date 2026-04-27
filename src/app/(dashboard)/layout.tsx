import { DashboardSidebar } from '@/components/layout/DashboardSidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)]">
      <DashboardSidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <header className="shrink-0 h-14 px-6 flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)]">
          <h1 className="text-sm font-semibold text-[var(--text-1)]">Overview</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
