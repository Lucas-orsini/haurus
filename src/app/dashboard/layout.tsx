import type { Metadata } from 'next'
import { LocaleProvider } from '@/providers/LocaleProvider'
import DashboardShell from '@/components/dashboard/DashboardShell'

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
    <LocaleProvider>
      <DashboardShell>{children}</DashboardShell>
    </LocaleProvider>
  )
}
