'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, Copy, Check, Send, Lock, AlertTriangle } from 'lucide-react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { AuthUser } from '@/lib/auth'
import { getRoleLimits } from '@/lib/config/role-limits'

// ── Types ────────────────────────────────────────────────────────────────────

type TelegramConnectionState = 'not-eligible' | 'not-connected' | 'connected-active' | 'suspended'

interface TelegramTokenResponse {
  token: string
  role: string
  telegramChatId: number | null
  telegramActive: boolean
}

interface TelegramModalProps {
  user: AuthUser
  onClose: () => void
}

// ── Pure state derivation ────────────────────────────────────────────────────

function hasTelegramAccess(role: string | null | undefined): boolean {
  if (!role) return false
  return getRoleLimits(role).telegram
}

function deriveTelegramState(
  role: string | null | undefined,
  telegramChatId: string | number | null | undefined,
  telegramActive: boolean | null | undefined,
): TelegramConnectionState {
  if (!hasTelegramAccess(role)) return 'not-eligible'
  if (telegramChatId == null) return 'not-connected'
  if (telegramActive) return 'connected-active'
  return 'suspended'
}

// ── Animation variants (mirrors UserProfileModal) ───────────────────────────

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15, ease: 'easeOut' as const } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: 'easeIn' as const } },
}

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 4 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' as const } },
  exit: { opacity: 0, scale: 0.96, y: 4, transition: { duration: 0.15, ease: 'easeIn' as const } },
}

// ── Skeleton ─────────────────────────────────────────────────────────────────

function ModalSkeleton() {
  return (
    <div className="px-5 py-5 flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <div className="h-4 bg-white/[0.06] rounded w-32 animate-pulse" />
        <div className="h-3 bg-white/[0.04] rounded w-48 animate-pulse" />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="h-3 bg-white/[0.04] rounded w-24 animate-pulse" />
        <div className="h-10 bg-white/[0.04] rounded-lg animate-pulse" />
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function TelegramModal({ user, onClose }: TelegramModalProps) {
  const router = useRouter()

  // ── Token fetch state ─────────────────────────────────────────────────────
  const [tokenData, setTokenData] = useState<TelegramTokenResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  // ── Copy feedback ─────────────────────────────────────────────────────────
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle')

  // ── Disconnect state ───────────────────────────────────────────────────────
  const [disconnectLoading, setDisconnectLoading] = useState(false)

  // ── Derive visual state ────────────────────────────────────────────────────
  // AuthUser.telegramChatId is number | null; tokenData.telegramChatId is number | null.
  // Both are compatible with the updated deriveTelegramState signature.
  const state = deriveTelegramState(
    tokenData?.role ?? user.role,
    tokenData?.telegramChatId ?? user.telegramChatId,
    tokenData?.telegramActive ?? user.telegramActive,
  )

  // ── Fetch token on mount ───────────────────────────────────────────────────
  const fetchToken = useCallback(async () => {
    setIsLoading(true)
    setFetchError(null)
    try {
      const res = await fetch('/api/telegram/token')
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error((data as { error?: string }).error ?? 'Erreur de chargement')
      }
      const data: TelegramTokenResponse = await res.json()
      setTokenData(data)
    } catch (err) {
      setFetchError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchToken()
  }, [fetchToken])

  // ── Keyboard + scroll lock ─────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = original
    }
  }, [onClose])

  // ── Copy token ─────────────────────────────────────────────────────────────
  const handleCopyToken = async () => {
    const token = tokenData?.token ?? user.telegramToken ?? ''
    try {
      await navigator.clipboard.writeText(token)
      setCopyState('copied')
      setTimeout(() => setCopyState('idle'), 2000)
    } catch {
      setCopyState('idle')
    }
  }

  // ── Disconnect ─────────────────────────────────────────────────────────────
  const handleDisconnect = async () => {
    setDisconnectLoading(true)
    try {
      const res = await fetch('/api/telegram/disconnect', { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error((data as { error?: string }).error ?? 'Erreur de déconnexion')
      }
      await fetchToken()
    } catch (err) {
      console.error('[TelegramModal] Disconnect failed:', err)
    } finally {
      setDisconnectLoading(false)
    }
  }

  // ── Open bot ───────────────────────────────────────────────────────────────
  const botUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME ?? 'HaurusBot'
  const botUrl = `https://t.me/${botUsername}`

  // ── Computed values ─────────────────────────────────────────────────────────
  const token = tokenData?.token ?? user.telegramToken ?? ''

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key="overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key="modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-md bg-[var(--surface-1)] border border-[var(--border-md)] rounded-xl shadow-2xl overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="telegram-modal-title"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] shrink-0">
            <div className="flex items-center gap-2">
              <Send size={14} strokeWidth={1.5} className="text-[var(--text-3)] shrink-0" />
              <h2 id="telegram-modal-title" className="text-sm font-semibold text-[var(--text-1)]">
                Telegram
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-md
                         hover:bg-white/[0.06] text-[var(--text-3)] hover:text-[var(--text-2)]
                         transition-colors duration-150"
              aria-label="Fermer"
            >
              <X size={14} />
            </button>
          </div>

          {/* Body */}
          <div className="max-h-[70vh] overflow-y-auto">
            {isLoading ? (
              <ModalSkeleton />
            ) : fetchError ? (
              <div className="px-5 py-8 flex flex-col items-center justify-center gap-3 text-center">
                <AlertTriangle size={20} className="text-[var(--red)]" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium text-[var(--text-2)] mb-1">
                    Impossible de charger les données
                  </p>
                  <p className="text-xs text-[var(--text-3)]">{fetchError}</p>
                </div>
                <button
                  onClick={fetchToken}
                  className="h-7 px-3 flex items-center justify-center gap-1.5 rounded-md
                             border border-[var(--border-md)] bg-white/[0.03] hover:bg-white/[0.06]
                             text-[var(--text-2)] text-xs transition-colors duration-150"
                >
                  Réessayer
                </button>
              </div>
            ) : (
              <div className="px-5 py-5 flex flex-col gap-5">

                {/* ── State 2: connected-active ── */}
                {state === 'connected-active' && (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap
                                         bg-[var(--green)]/10 text-[var(--green)] border border-[var(--green)]/20">
                          ✅ Telegram connecté
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-3)] leading-relaxed">
                        Vous recevrez une notification à chaque nouveau match ajouté.
                      </p>
                    </div>

                    <button
                      onClick={handleDisconnect}
                      disabled={disconnectLoading}
                      className="h-8 px-4 flex items-center justify-center gap-2 rounded-md
                                 border border-[var(--red)]/25 bg-[var(--red)]/[0.06] hover:bg-[var(--red)]/10
                                 text-[var(--red)] text-xs font-medium transition-colors duration-150
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {disconnectLoading ? (
                        <>
                          <svg
                            className="animate-spin shrink-0"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                          </svg>
                          Déconnexion...
                        </>
                      ) : (
                        'Déconnecter'
                      )}
                    </button>
                  </div>
                )}

                {/* ── State 3: suspended ── */}
                {state === 'suspended' && (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap
                                         bg-[var(--yellow)]/10 text-[var(--yellow)] border border-[var(--yellow)]/20">
                          ⚠️ Notifications suspendues
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-3)] leading-relaxed">
                        Votre plan actuel ne donne pas accès aux notifications Telegram.
                        Mettez à jour votre abonnement pour les réactiver.
                      </p>
                    </div>

                    {token && (
                      <div className="flex flex-col gap-1.5">
                        <p className="text-xs font-medium text-[var(--text-3)]">Token de connexion</p>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 min-w-0 px-3 py-2 rounded-lg text-xs font-mono text-[var(--text-1)]
                                           bg-[var(--surface-2)] border border-[var(--border-md)]
                                           opacity-50 select-none pointer-events-none truncate">
                            {token}
                          </code>
                          <button
                            disabled
                            aria-disabled="true"
                            className="h-7 px-2.5 flex items-center justify-center gap-1.5 rounded-md
                                       border border-[var(--border-md)] bg-white/[0.03]
                                       text-[var(--text-3)] text-[11px] font-medium
                                       opacity-50 cursor-not-allowed shrink-0"
                          >
                            <Copy size={11} strokeWidth={1.5} className="shrink-0" />
                            Copier
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ── State 1: not-connected ── */}
                {state === 'not-connected' && (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-sm font-semibold text-[var(--text-1)]">Connecter Telegram</h3>
                      <p className="text-xs text-[var(--text-3)] leading-relaxed">
                        Recevez une notification à chaque nouveau match ajouté.
                      </p>
                    </div>

                    {token && (
                      <div className="flex flex-col gap-1.5">
                        <p className="text-xs font-medium text-[var(--text-3)]">Token de connexion</p>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 min-w-0 px-3 py-2 rounded-lg text-xs font-mono text-[var(--text-1)]
                                           bg-[var(--surface-2)] border border-[var(--border-md)] truncate">
                            {token}
                          </code>
                          <button
                            onClick={handleCopyToken}
                            disabled={copyState === 'copied'}
                            className={cn(
                              'h-7 px-2.5 flex items-center justify-center gap-1.5 rounded-md border text-[11px] font-medium',
                              'transition-colors duration-150 shrink-0',
                              copyState === 'copied'
                                ? 'border-[var(--green)]/25 bg-[var(--green)]/[0.06] text-[var(--green)]'
                                : 'border-[var(--border-md)] bg-white/[0.03] hover:bg-white/[0.06] text-[var(--text-2)]',
                            )}
                          >
                            {copyState === 'copied' ? (
                              <>
                                <Check size={11} strokeWidth={2.5} className="shrink-0" />
                                Copié !
                              </>
                            ) : (
                              <>
                                <Copy size={11} strokeWidth={1.5} className="shrink-0" />
                                Copier
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col gap-1">
                      <p className="text-xs text-[var(--text-3)] leading-relaxed">
                        Ouvrez{' '}
                        <span className="font-mono text-[var(--text-2)]">@{botUsername}</span>{' '}
                        sur Telegram et envoyez&nbsp;:
                      </p>
                      <code className="inline-flex items-center px-3 py-2 rounded-md text-xs font-mono text-[var(--text-1)]
                                       bg-[var(--surface-2)] border border-[var(--border-md)]">
                        /connect {token || '[VOTRE_TOKEN]'}
                      </code>
                    </div>

                    <button
                      onClick={() => window.open(botUrl, '_blank')}
                      className="h-8 px-4 flex items-center justify-center gap-1.5 rounded-md
                                 bg-[var(--accent)] hover:bg-[var(--accent-hi)] text-white
                                 text-xs font-medium transition-colors duration-150"
                    >
                      <Send size={12} strokeWidth={1.5} className="shrink-0" />
                      Ouvrir le bot
                    </button>
                  </div>
                )}

                {/* ── State 4: not-eligible ── */}
                {state === 'not-eligible' && (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <Lock size={14} strokeWidth={1.5} className="text-[var(--text-3)] shrink-0" />
                        <h3 className="text-sm font-semibold text-[var(--text-1)]">
                          Fonctionnalité non disponible
                        </h3>
                      </div>
                      <p className="text-xs text-[var(--text-3)] leading-relaxed">
                        Les notifications Telegram sont disponibles à partir du plan Pro.
                      </p>
                    </div>

                    <button
                      onClick={() => router.push('/pricing')}
                      className="h-8 px-4 flex items-center justify-center gap-1.5 rounded-md
                                 bg-[var(--accent)] hover:bg-[var(--accent-hi)] text-white
                                 text-xs font-medium transition-colors duration-150"
                    >
                      Mettre à niveau
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
