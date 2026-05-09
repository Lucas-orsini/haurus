'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, RefreshCw } from 'lucide-react'

import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { getSession, type AuthUser } from '@/lib/auth'
import { unsubscribeFromNewsletter } from './actions'

type UIState = 'checking' | 'authenticated' | 'confirming' | 'loading' | 'success' | 'error'

export default function UnsubscribePage() {
  const router = useRouter()

  const [uiState, setUIState] = useState<UIState>('checking')
  const [userEmail, setUserEmail] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  // ── Session check ───────────────────────────────────────────────────────────

  useEffect(() => {
    let cancelled = false

    async function checkSession() {
      try {
        const session: AuthUser | null = await getSession()
        if (cancelled) return

        if (!session) {
          router.push('/login?redirectTo=/unsubscribe')
          return
        }

        setUserEmail(session.email ?? '')
        setUIState('authenticated')
      } catch {
        if (!cancelled) {
          setErrorMessage('Une erreur est survenue. Veuillez réessayer.')
          setUIState('error')
        }
      }
    }

    checkSession()
    return () => { cancelled = true }
  }, [router])

  // ── Handlers ────────────────────────────────────────────────────────────────

  function handleUnsubscribeClick() {
    setUIState('confirming')
  }

  function handleCancel() {
    setUIState('authenticated')
  }

  async function handleConfirm() {
    setUIState('loading')
    try {
      await unsubscribeFromNewsletter()
      setUIState('success')
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Une erreur est survenue. Veuillez réessayer.'
      )
      setUIState('error')
    }
  }

  function handleRetry() {
    setErrorMessage('')
    setUIState('authenticated')
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Root wrapper — full-page centered layout */}
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
        <div className="w-full max-w-sm">

          {/* ── checking ────────────────────────────────────────────────── */}
          {uiState === 'checking' && (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-[var(--border-md)] border-t-[var(--accent)] animate-spin" />
              <p className="text-sm text-[var(--text-3)]">Vérification...</p>
            </div>
          )}

          {/* ── authenticated ────────────────────────────────────────────── */}
          {uiState === 'authenticated' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-xl p-6"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--surface-2)] border border-[var(--border-md)] mb-4 mx-auto">
                {/* Bell-off icon — inline SVG */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[var(--text-3)]"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              </div>

              <div className="text-center mb-6">
                <h1 className="text-base font-semibold text-[var(--text-1)] tracking-tight mb-1.5">
                  Se désabonner de la newsletter
                </h1>
                <p className="text-sm text-[var(--text-3)] leading-relaxed">
                  Vous allez supprimer votre adresse email de notre liste de diffusion.
                  Cette action est irréversible.
                </p>
              </div>

              {/* Email display — read-only */}
              <div className="mb-5">
                <label className="block text-xs font-medium text-[var(--text-3)] mb-1.5 select-none">
                  Adresse concernée
                </label>
                <div className="h-10 px-3 flex items-center rounded-lg bg-[var(--surface-2)] border border-[var(--border-md)] text-sm text-[var(--text-1)] font-mono truncate">
                  {userEmail}
                </div>
              </div>

              <button
                type="button"
                onClick={handleUnsubscribeClick}
                className="w-full h-10 flex items-center justify-center gap-2 rounded-lg font-medium text-sm
                           border border-[var(--red)]/25 bg-[var(--red)]/[0.06] text-[var(--red)]
                           hover:bg-[var(--red)]/10 hover:border-[var(--red)]/40
                           transition-colors duration-150"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
                Se désabonner
              </button>
            </motion.div>
          )}

          {/* ── error ───────────────────────────────────────────────────── */}
          {uiState === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-xl p-6"
            >
              {/* Warning icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--red)]/10 border border-[var(--red)]/20 mb-4 mx-auto">
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

              <div className="text-center mb-5">
                <h2 className="text-base font-semibold text-[var(--text-1)] tracking-tight mb-1.5">
                  Désabonnement échoué
                </h2>
                <p className="text-sm text-[var(--red)] leading-relaxed">{errorMessage}</p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleRetry}
                  className="w-full h-10 flex items-center justify-center gap-2 rounded-lg font-medium text-sm
                             bg-[var(--accent)] hover:bg-[var(--accent-hi)] text-black
                             transition-colors duration-150"
                >
                  <RefreshCw size={14} strokeWidth={1.5} className="shrink-0" />
                  Réessayer
                </button>
                <Link
                  href="/"
                  className="w-full h-10 flex items-center justify-center rounded-lg font-medium text-sm
                             border border-[var(--border-md)] bg-transparent text-[var(--text-2)]
                             hover:text-[var(--text-1)] hover:bg-white/[0.04] hover:border-[var(--border-hi)]
                             transition-colors duration-150"
                >
                  Retour au site
                </Link>
              </div>
            </motion.div>
          )}

          {/* ── success ─────────────────────────────────────────────────── */}
          {uiState === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-xl p-6"
            >
              {/* Animated check circle */}
              <div className="flex items-center justify-center mb-5">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-12 h-12 rounded-full bg-[var(--green)]/15 border-2 border-[var(--green)]/30
                             flex items-center justify-center"
                >
                  <motion.div
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.4, ease: 'easeOut' }}
                  >
                    <Check
                      size={22}
                      strokeWidth={2.5}
                      className="text-[var(--green)]"
                    />
                  </motion.div>
                </motion.div>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-base font-semibold text-[var(--text-1)] tracking-tight mb-1.5">
                  Désabonnement confirmé
                </h2>
                <p className="text-sm text-[var(--text-3)] leading-relaxed">
                  Vous avez été retiré de notre liste de diffusion.
                  Vous ne recevrez plus nos newsletters.
                </p>
              </div>

              <Link
                href="/"
                className="w-full h-10 flex items-center justify-center rounded-lg font-medium text-sm
                           bg-[var(--accent)] hover:bg-[var(--accent-hi)] text-black
                           transition-colors duration-150"
              >
                Retour au site
              </Link>
            </motion.div>
          )}

        </div>
      </div>

      {/* ── ConfirmDialog overlay — toujours mounté, s'anime en entrée/sortie ── */}
      <AnimatePresence>
        {(uiState === 'confirming' || uiState === 'loading') && (
          <ConfirmDialog
            title="Confirmer le désabonnement"
            message={`Êtes-vous sûr de vouloir vous désabonner de la newsletter ? ${userEmail} ne recevra plus nos emails.`}
            confirmLabel="Confirmer"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            loading={uiState === 'loading'}
          />
        )}
      </AnimatePresence>
    </>
  )
}
