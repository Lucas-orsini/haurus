'use client'
import { useRouter } from 'next/navigation'
import { useLocale } from '@/providers/LocaleProvider'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()
  const router = useRouter()

  function handleToggle() {
    const next = locale === 'fr' ? 'en' : 'fr'
    // Write cookie so Server Components re-render with the new locale on refresh
    document.cookie = `locale=${next};path=/;max-age=31536000;SameSite=Lax`
    setLocale(next)
    // Trigger re-render of all Server Components on the current route
    router.refresh()
  }

  return (
    <button
      onClick={handleToggle}
      aria-label={locale === 'fr' ? 'Switch to English' : 'Passer en français'}
      className="h-8 px-3 flex items-center justify-center rounded-full border border-[var(--border-md)] hover:border-[var(--border-hi)] hover:bg-white/[0.04] transition-all duration-150 text-xs font-medium text-[var(--text-2)] shrink-0"
    >
      <span className="font-mono tracking-tight">
        {locale === 'fr' ? 'EN' : 'FR'}
      </span>
    </button>
  )
}
