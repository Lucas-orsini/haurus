import type { Metadata } from 'next'
import { Tektur } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const tektur = Tektur({
  subsets: ['latin'],
  variable: '--font-tektur',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Haurus — The metrics bookmakers use. Now yours.',
  description:
    'Access the analytical layer that professional bettors use to price ATP matches. Glicko-2, p_serve, BPPI, and more.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%2309090b'/><text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' font-size='18' font-weight='700' fill='%23F2CB38'>H</text></svg>",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth antialiased">
      <body className={`${tektur.variable} bg-[var(--bg)] text-[var(--text-1)] min-h-screen`}>
        {children}

        {/* Iconify with Solar icon set */}
        <Script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
