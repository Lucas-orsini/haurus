'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { UnsubscribeNamespace } from '@/lib/i18n/dictionaries/types'

type UnsubscribeState = 'idle' | 'loading' | 'success' | 'error'

interface UnsubscribeClientProps {
  email: string
  dict: Pick<UnsubscribeNamespace, 'form' | 'success' | 'error' | 'common' | 'confirmDialog'>
}

export default function UnsubscribeClient({ email, dict }: UnsubscribeClientProps) {
  const [state, setState] = useState<UnsubscribeState>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleUnsubscribe = async () => {
    setState('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setState('success')
        return
      }

      // Parse error body
      let message = dict.error.generic
      try {
        const data = await res.json()
        if (data?.error) message = data.error
      } catch {
        // ignore parse error
      }

      if (res.status === 404) {
        message = "Aucun abonné trouvé avec cet email."
      } else if (res.status === 400) {
        message = message || 'Email manquant ou invalide.'
      } else if (res.status >= 500) {
        message = 'Erreur serveur interne. Merci de réessayer plus tard.'
      }

      setErrorMessage(message)
      setState('error')
    } catch {
      setErrorMessage(dict.error.generic)
      setState('error')
    }
  }

  const handleRetry = () => {
    setErrorMessage('')
    setState('idle')
  }

  // ── Success state ────────────────────────────────────────────────────────
  if (state === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
        <div className="w-full max-w-sm">
          <div className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-xl p-8 text-center">
            {/* Success icon */}
            <div className="w-10 h-10 rounded-xl bg-[var(--green)]/10 border border-[var(--green)]/20 flex items-center justify-center mx-auto mb-5">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--green)]"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="text-base font-semibold text-[var(--text-1)] mb-2">
              {dict.success.title}
            </h1>
            <p className="text-sm text-[var(--text-3)] leading-relaxed mb-6">
              {dict.success.message}
            </p>
            <Link
              href="/"
              className="h-9 px-5 flex items-center justify-center gap-2 rounded-lg
                         bg-[var(--accent)] hover:bg-[var(--accent-hi)] text-white
                         text-sm font-medium transition-colors duration-150
                         shadow-[0_0_12px_var(--accent-glow)]"
            >
              {dict.common.backToSite}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ── Idle / Error / Loading states ────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="w-full max-w-sm">
        <div className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-xl p-8 text-center">
          {/* Header icon */}
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-[var(--border-md)] flex items-center justify-center mx-auto mb-5">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[var(--text-2)]"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>

          <h1 className="text-base font-semibold text-[var(--text-1)] mb-2">
            {dict.form.confirmButton}
          </h1>

          <p className="text-sm text-[var(--text-3)] leading-relaxed mb-5">
            Tu vas être désabonné de la newsletter Haurus pour l'adresse :
          </p>

          {/* Email display — monospace, truncate long emails */}
          <div className="px-3 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border-md)] mb-6">
            <p className="text-sm font-mono text-[var(--text-1)] truncate min-w-0">
              {email}
            </p>
          </div>

          {/* Error message */}
          {state === 'error' && errorMessage && (
            <div className="flex items-start gap-2.5 px-3 py-3 rounded-lg bg-[var(--red)]/[0.07] border border-[var(--red)]/20 mb-5 text-left">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--red)] shrink-0 mt-0.5"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-xs text-[var(--red)] leading-relaxed">{errorMessage}</p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col gap-2">
            {state === 'error' ? (
              <>
                <button
                  onClick={handleRetry}
                  className={cn(
                    'h-9 px-5 flex items-center justify-center gap-2 rounded-lg',
                    'bg-[var(--accent)] hover:bg-[var(--accent-hi)] text-white',
                    'text-sm font-medium transition-colors duration-150',
                    'shadow-[0_0_12px_var(--accent-glow)]'
                  )}
                >
                  <Loader2 size={14} className="animate-spin shrink-0" />
                  {dict.common.retry}
                </button>
                <Link
                  href="/"
                  className="h-9 px-5 flex items-center justify-center gap-2 rounded-lg border border-[var(--border-md)] bg-white/[0.03] hover:bg-white/[0.06] text-[var(--text-2)] text-sm font-medium transition-colors duration-150"
                >
                  {dict.common.backToSite}
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={handleUnsubscribe}
                  disabled={state === 'loading'}
                  className={cn(
                    'h-9 px-5 flex items-center justify-center gap-2 rounded-lg',
                    'bg-[var(--red)] hover:bg-[var(--red)]/90 text-white',
                    'text-sm font-medium transition-colors duration-150',
                    'disabled:opacity-70 disabled:cursor-not-allowed'
                  )}
                >
                  {state === 'loading' ? (
                    <>
                      <Loader2 size={14} className="animate-spin shrink-0" />
                      <span>Traitement en cours…</span>
                    </>
                  ) : (
                    <span>{dict.form.confirmButton}</span>
                  )}
                </button>
                <Link
                  href="/"
                  className="h-9 px-5 flex items-center justify-center gap-2 rounded-lg border border-[var(--border-md)] bg-white/[0.03] hover:bg-white/[0.06] text-[var(--text-2)] text-sm font-medium transition-colors duration-150"
                >
                  Annuler
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
