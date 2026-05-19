import { cookies } from 'next/headers'
import { getTranslations } from '@/lib/i18n'
import DashboardShell from '@/components/dashboard/DashboardShell'

/**
 * Dashboard layout — wraps all /dashboard/* pages.
 *
 * Server Component — reads the locale cookie and passes the
 * dashboard translation fragment to the shell.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('locale')?.value ?? 'fr') as 'fr' | 'en'
  const translations = getTranslations(locale)

  return <DashboardShell dict={translations.dashboard}>{children}</DashboardShell>
}
