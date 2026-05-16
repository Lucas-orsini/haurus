import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import DashboardShell from '@/components/dashboard/DashboardShell'
import { LocaleProvider } from '@/components/providers/locale-provider'
import { LOCALE_COOKIE_NAME, DEFAULT_LOCALE } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import type { Locale } from '@/lib/i18n/types'

export const metadata: Metadata = {
  title: 'Dashboard — Haurus',
  description: 'Your tennis analytics dashboard.',
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Read locale from HTTP cookie — fallback to default
  const cookieStore = await cookies()
  const rawLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value
  const locale: Locale =
    rawLocale === 'en' || rawLocale === 'fr' ? rawLocale : DEFAULT_LOCALE

  // Load the dictionary for the resolved locale on the server
  const dictionary = await getDictionary(locale)

  return (
    <LocaleProvider initialLocale={locale} initialDictionary={dictionary}>
      <DashboardShell>{children}</DashboardShell>
    </LocaleProvider>
  )
}
