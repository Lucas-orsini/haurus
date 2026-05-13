'use client'
import Link from 'next/link'
import { useLocale } from '@/providers/LocaleProvider'
import { getTranslations } from '@/lib/i18n'

export default function Footer() {
  const { locale } = useLocale()
  const t = getTranslations(locale)

  return (
    <footer className="border-t border-[var(--border-md)] bg-[var(--bg)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center transition-transform duration-200">
              <svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 122 110" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  fill="#f2cb38" 
                  d="M66.68,9.92c2.15,1.49,3.96,3.12,5.25,5.38l34.14,59.88c5.06,8.87,2.55,20.18-4.92,26.71-8.61,7.53-21.36,6.81-29.45-1.16-1.57-1.55-4.23-.7-5.26.93-1.21,1.93-.49,3.85,1.11,5.31,9.01,8.23,22.26,9.97,33.06,4.27,2.82-1.49,5.2-3.39,7.41-5.71,4.51-4.74,7.16-10.82,7.8-17.35.68-6.84-1.28-13.25-4.64-19.12L78.53,11.95c-7.59-13.26-25.14-15.81-36.15-6.05l-3.15,3.13,13.66,23.9c.64,1.12.47,2.14-.14,3.21l-22.12,38.66c-1.75,3.06-2.08,6.5-.25,9.68,1.54,2.69,4.51,4.68,7.88,4.56,2.15-.08,3.74-1.72,3.69-3.76s-1.57-3.61-3.66-3.63c-.66,0-1.3-.46-1.53-.91-.33-.65-.29-1.24.07-1.88l25.42-44.46-13.7-23.97c5.46-3.83,12.5-4.03,18.14-.54ZM65.72,55.42l13.4,23.43c.37.64.45,1.23.13,1.87-.21.41-.82.97-1.49.97h-21.94s-8.51,14.86-8.51,14.86c-6.69,11.69-22.83,14.2-32.85,5.05-7.65-6.99-9.33-18.27-4.19-27.28l26.46-46.27c1.09-1.91.28-4.18-1.47-5.13-1.89-1.02-3.93-.27-4.99,1.58L4.36,69.68c-7.23,12.27-5.43,27.78,5.19,37.47,13.41,12.25,35.13,8.78,43.89-6.43l6.68-11.6h17.36c3.27,0,6.16-1.51,7.82-4.1,1.74-2.72,2.18-6.37.54-9.25l-13.84-24.28c-1.05-1.84-3.38-2.33-5.08-1.3-1.78,1.08-2.3,3.29-1.19,5.23Z"
                />
              </svg>

            </div>
              <span className="text-sm font-medium tracking-tight text-[var(--text-1)]">
                Haur<span className="text-[var(--accent)]">u</span>s
              </span>
            </Link>
            <p className="text-sm text-[var(--text-3)] max-w-xs leading-relaxed mb-6">
              {t.footer.description}
            </p>
            <p className="text-base font-semibold tracking-tight text-[var(--accent)]">
              {t.footer.tagline}
            </p>
          </div>

          {/* Link columns */}
          <div>
            <h4 className="text-xs font-semibold text-[var(--text-2)] uppercase tracking-wider mb-4">
              {t.footer.product}
            </h4>
            <ul className="space-y-3">
              {t.footer.productLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors duration-150"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-[var(--text-2)] uppercase tracking-wider mb-4">
              {t.footer.legal}
            </h4>
            <ul className="space-y-3">
              {t.footer.legalLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors duration-150"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-[var(--text-2)] uppercase tracking-wider mb-4">
              {t.footer.company}
            </h4>
            <ul className="space-y-3">
              {t.footer.companyLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors duration-150"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-[var(--border-md)] pt-8 gap-4">
          <p className="text-xs text-[var(--text-3)]">
            {t.footer.copyright}
          </p>

          {/* Social links */}
          <div className="flex items-center gap-5">
            {/* X / Twitter */}
            <a
              href="#"
              aria-label="X (Twitter)"
              className="text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* TikTok */}
            <a
              href="#"
              aria-label="TikTok"
              className="text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Legal disclaimer */}
        <p className="text-xs text-[var(--text-3)] mt-6 leading-relaxed max-w-2xl">
          {t.footer.disclaimer}
        </p>
      </div>
    </footer>
  )
}
