'use client'
import { useLocale } from '@/providers/LocaleProvider'

interface LanguageSwitcherProps {
  dict?: {
    dashboard?: {
      languageSwitcher: {
        frAriaLabel: string
        enAriaLabel: string
      }
    }
  }
}

export default function LanguageSwitcher({ dict }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocale()

  const frAriaLabel = dict?.dashboard?.languageSwitcher?.frAriaLabel ?? 'Passer en français'
  const enAriaLabel = dict?.dashboard?.languageSwitcher?.enAriaLabel ?? 'Switch to English'

  return (
    <div className="flex items-center gap-1 rounded-full border border-[var(--border-md)] p-0.5 shrink-0">
      <button
        onClick={() => setLocale('fr')}
        aria-label={frAriaLabel}
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
        aria-label={enAriaLabel}
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
