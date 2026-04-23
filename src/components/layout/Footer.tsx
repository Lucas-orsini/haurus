import Link from 'next/link'

const footerLinks = {
  Product: ['Metrics', 'Pricing', 'API Docs', 'Changelog'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Disclaimer'],
  Company: ['About', 'Contact', 'Blog'],
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
              The analytical layer that serious bettors use to price ATP matches. Data-driven. No predictions.
            </p>
            {/* Tagline */}
            <p className="text-base font-semibold tracking-tight text-[var(--accent)]">
              Not tips. Data.
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
            © 2024 Haurus. All rights reserved.
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
            {/* LinkedIn */}
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Legal disclaimer */}
        <p className="text-xs text-[var(--text-3)] mt-6 leading-relaxed max-w-2xl">
          Haurus provides statistical data only. No predictions or betting advice. All data is for informational purposes.
        </p>
      </div>
    </footer>
  )
}
