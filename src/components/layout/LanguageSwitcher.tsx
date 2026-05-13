'use client'
import { useLocale } from '@/providers/LocaleProvider'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()

  function handleToggle() {
    setLocale(locale === 'fr' ? 'en' : 'fr')
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
