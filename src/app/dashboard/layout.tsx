import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { LocaleProvider } from '@/providers/LocaleProvider'
import DashboardShell from '@/components/dashboard/DashboardShell'
import type { Locale } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Dashboard — Haurus',
  description: 'Your tennis analytics dashboard.',
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Read locale from the header set by middleware to hydrate the client
  // with the same value the SSR rendered — prevents flash of incorrect locale.
  const headersList = await headers()
  const initialLocale = (headersList.get('x-locale') ?? 'fr') as Locale

  return (
    <LocaleProvider initialLocale={initialLocale}>
      <DashboardShell>{children}</DashboardShell>
    </LocaleProvider>
  )
}
