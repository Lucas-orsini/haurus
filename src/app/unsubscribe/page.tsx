import { type Metadata } from 'next'
import UnsubscribeClient from './UnsubscribeClient'

export const metadata: Metadata = {
  title: 'Se désabonner — Haurus',
  description: 'Désabonnez-vous de la newsletter Haurus.',
}

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>
}) {
  // Resolve searchParams (Next.js 15 async)
  const params = await searchParams
  const email =
    typeof params.email === 'string' && params.email.includes('@')
      ? params.email
      : null

  // Email absent ou invalide → erreur immédiate, pas de bouton
  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
        <div className="w-full max-w-sm">
          <div className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-xl p-8 text-center">
            {/* Error icon */}
            <div className="w-10 h-10 rounded-xl bg-[var(--red)]/10 border border-[var(--red)]/20 flex items-center justify-center mx-auto mb-5">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--red)]"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h1 className="text-base font-semibold text-[var(--text-1)] mb-2">
              Lien invalide
            </h1>
            <p className="text-sm text-[var(--text-3)] leading-relaxed">
              Ce lien de désabonnement est incomplet ou a expiré. Merci de
              contacter notre support si le problème persiste.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return <UnsubscribeClient email={email} />
}
