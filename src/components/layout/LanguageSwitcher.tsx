'use client'
import { useLocale } from '@/providers/LocaleProvider'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()

  return (
    <div className="flex items-center gap-1 rounded-full border border-[var(--border-md)] p-0.5 shrink-0">
      <button
        onClick={() => setLocale('fr')}
        aria-label="Passer en français"
        aria-pressed={locale === 'fr'}
        className={`h-7 px-2.5 rounded-full text-xs font-medium transition-all duration-150 ${
          locale === 'fr'
            ? 'bg-[var(--accent)] text-black'
            : 'text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-white/[0.04]'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => setLocale('en')}
        aria-label="Switch to English"
        aria-pressed={locale === 'en'}
        className={`h-7 px-2.5 rounded-full text-xs font-medium transition-all duration-150 ${
          locale === 'en'
            ? 'bg-[var(--accent)] text-black'
            : 'text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-white/[0.04]'
        }`}
      >
        EN
      </button>
    </div>
  )
}
