import Link from 'next/link'

const footerLinks = {
  Produit: ['Métriques', 'Tarifs', 'Docs API', 'Changelog'],
  ['Mentions_légales']: ['Confidentialité', 'CGU', 'Avertissement'],
  Entreprise: ['À propos', 'Contact', 'Blog'],
}

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-md)] bg-[var(--bg)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-5 h-5 rounded bg-[var(--accent)] flex items-center justify-center shrink-0">
                <span className="text-black text-[10px] font-bold leading-none">H</span>
              </div>
              <span className="text-sm font-medium tracking-tight text-[var(--text-1)]">
                Haur<span className="text-[var(--accent)]">u</span>s
              </span>
            </Link>
            <p className="text-sm text-[var(--text-3)] max-w-xs leading-relaxed mb-6">
              La couche analytique que les parieurs sérieux utilisent pour évaluer les cotes des matchs ATP. Axée sur les données. Sans predictions.
            </p>
            {/* Tagline */}
            <p className="text-base font-semibold tracking-tight text-[var(--accent)]">
              Pas de tips. Des données.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold text-[var(--text-2)] uppercase tracking-wider mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
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
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-[var(--border-md)] pt-8 gap-4">
          <p className="text-xs text-[var(--text-3)]">
            © 2024 Haurus. Tous droits réservés.
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
          Haurus fournit uniquement des données statistiques. Pas de predictions ni de conseils de pari. Toutes les données sont à titre informatif uniquement.
        </p>
      </div>
    </footer>
  )
}
