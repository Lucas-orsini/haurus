import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/auth'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)]">
      {/* Sidebar */}
      <aside className="w-[220px] shrink-0 h-screen flex flex-col bg-[var(--bg)] border-r border-[var(--border)] px-3 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2 px-2 mb-6 shrink-0">
          <div className="w-6 h-6 rounded-md bg-[var(--accent)] flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">H</span>
          </div>
          <span className="text-sm font-semibold text-[var(--text-1)] tracking-tight truncate">
            Haurus
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-0.5 flex-1 overflow-y-auto">
          <Link
            href="/dashboard/overview"
            className="flex items-center gap-2.5 px-2 h-8 rounded-md text-sm text-[var(--text-3)] hover:text-[var(--text-2)] hover:bg-white/[0.03] transition-colors duration-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <rect width="7" height="9" x="3" y="3" rx="1" />
              <rect width="7" height="5" x="14" y="3" rx="1" />
              <rect width="7" height="9" x="14" y="12" rx="1" />
              <rect width="7" height="5" x="3" y="16" rx="1" />
            </svg>
            <span className="truncate">Overview</span>
          </Link>
        </nav>

        {/* User footer */}
        <div className="shrink-0 border-t border-[var(--border)] pt-3 mt-2">
          <div className="flex items-center gap-2.5 px-2 py-2">
            <div className="w-6 h-6 rounded-full bg-[var(--surface-3)] flex items-center justify-center text-[10px] text-[var(--text-2)] font-medium shrink-0">
              {session.name ? session.name.slice(0, 2).toUpperCase() : session.email.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-medium text-[var(--text-1)] truncate">
                {session.name || session.email}
              </span>
              <span className="text-[11px] text-[var(--text-3)] truncate">
                {session.email}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
