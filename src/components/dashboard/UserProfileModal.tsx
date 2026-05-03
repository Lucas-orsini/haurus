'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { X, Copy, Check, Eye, EyeOff } from 'lucide-react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import type { AuthUser } from '@/lib/auth'
import { validateName } from '@/lib/auth'
import { updateProfile } from '@/lib/auth'

interface UserProfileModalProps {
  user: AuthUser
  onClose: () => void
  onUpdateSuccess: (updatedUser: AuthUser) => void
}

type SaveState = 'idle' | 'saving' | 'error'
type TelegramTabState = 'not-eligible' | 'not-connected' | 'connected' | 'suspended'

const ELIGIBLE_ROLES = ['user', 'analyste', 'pro', 'enterprise'] as const

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

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts[1]?.[0] ?? ''
  return (first + last).toUpperCase() || '?'
}

function getDisplayToken(token: string | null | undefined, revealed: boolean): string {
  if (!token) return '—'
  if (revealed) return token
  const first4 = token.slice(0, 4)
  return `${first4}••••••••••••`
}

export default function UserProfileModal({ user, onClose, onUpdateSuccess }: UserProfileModalProps) {
  const router = useRouter()
  const [name, setName] = useState(user.name ?? '')
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl ?? '')
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [nameError, setNameError] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<'profile' | 'telegram'>('profile')
  const [copied, setCopied] = useState(false)
  const [tokenRevealed, setTokenRevealed] = useState(false)
  const [disconnectLoading, setDisconnectLoading] = useState(false)
  const [disconnectError, setDisconnectError] = useState<string | null>(null)

  // ── Reset reveal state when leaving Telegram tab ──
  useEffect(() => {
    if (activeSection !== 'telegram') {
      setTokenRevealed(false)
    }
  }, [activeSection])

  // ── Logique d'état Telegram ──
  // Priorité : rôle → chatId → active
  const telegramTab: TelegramTabState =
    !ELIGIBLE_ROLES.includes(user.role as typeof ELIGIBLE_ROLES[number])
      ? 'not-eligible'
      : user.telegramChatId == null
        ? 'not-connected'
        : user.telegramActive === true
          ? 'connected'
          : 'suspended'

  // ── Fermer sur Escape ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // ── Bloquer le scroll du body ──
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const validationError = validateName(name)
    if (validationError) {
      setNameError(validationError)
      return
    }
    setNameError(null)

    setSaveState('saving')
    try {
      const updated = await updateProfile(name.trim(), avatarUrl.trim() || null)
      onUpdateSuccess(updated)
      onClose()
    } catch (err) {
      setSaveState('error')
      console.error('[UserProfileModal] Failed to update profile:', err)
    }
  }

  async function handleDisconnect() {
    setDisconnectLoading(true)
    setDisconnectError(null)
    try {
      const res = await fetch('/api/telegram/disconnect', { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? 'Erreur de deconnexion')
      }
      // Refresh local state to reflect disconnected status
      const updatedUser: AuthUser = {
        ...user,
        telegramChatId: null,
        telegramActive: false,
      }
      onUpdateSuccess(updatedUser)
    } catch (err) {
      setDisconnectError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setDisconnectLoading(false)
    }
  }

  const handleCopyToken = useCallback(async () => {
    const token = user.telegramToken ?? ''
    if (!token) return
    try {
      await navigator.clipboard.writeText(token)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [user.telegramToken])

  const isSaving = saveState === 'saving'
  const telegramBotUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || 'Haurus_Bot'

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
          aria-labelledby="profile-modal-title"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] shrink-0">
            <h2 id="profile-modal-title" className="text-sm font-semibold text-[var(--text-1)]">
              Modifier le profil
            </h2>
            <button
              onClick={onClose}
              disabled={isSaving}
              className="w-7 h-7 flex items-center justify-center rounded-md
                         hover:bg-white/[0.06] text-[var(--text-3)] hover:text-[var(--text-2)]
                         transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Fermer"
            >
              <X size={14} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-0 px-5 border-b border-[var(--border)] shrink-0">
            <button
              onClick={() => setActiveSection('profile')}
              className={cn(
                'h-10 px-3 text-sm transition-colors duration-150 border-b-2 -mb-px flex items-center justify-center',
                activeSection === 'profile'
                  ? 'text-[var(--text-1)] border-[var(--accent)]'
                  : 'text-[var(--text-3)] border-transparent hover:text-[var(--text-2)]',
              )}
            >
              Profil
            </button>
            <button
              onClick={() => setActiveSection('telegram')}
              className={cn(
                'h-10 px-3 text-sm transition-colors duration-150 border-b-2 -mb-px flex items-center justify-center',
                activeSection === 'telegram'
                  ? 'text-[var(--text-1)] border-[var(--accent)]'
                  : 'text-[var(--text-3)] border-transparent hover:text-[var(--text-2)]',
              )}
            >
              Telegram
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            {/* ── Profil section ── */}
            {activeSection === 'profile' && (
              <form onSubmit={handleSubmit} id="profile-form">
                <div className="px-5 py-5 flex flex-col gap-5">
                  {/* Avatar */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-20 h-20 rounded-full bg-[var(--surface-3)] border border-[var(--border-md)] overflow-hidden flex items-center justify-center shrink-0">
                      {avatarUrl.trim() ? (
                        <img
                          src={avatarUrl.trim()}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                          onError={() => setAvatarUrl('')}
                        />
                      ) : (
                        <span className="text-lg font-semibold text-[var(--text-2)] select-none">
                          {getInitials((name || user.name) ?? '')}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[var(--text-3)]">Avatar — initiales affichées par defaut</p>
                  </div>

                  {/* Photo URL */}
                  <Input
                    label="Photo de profil (URL)"
                    type="url"
                    placeholder="https://example.com/avatar.jpg"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    disabled={isSaving}
                  />

                  {/* Nom */}
                  <Input
                    label="Nom"
                    type="text"
                    placeholder="Votre nom"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      if (nameError) setNameError(null)
                    }}
                    error={nameError ?? undefined}
                    disabled={isSaving}
                    autoFocus
                  />

                  {/* Email — lecture seule */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium select-none text-[var(--text-3)]">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={user.email}
                        readOnly
                        disabled
                        className={cn(
                          'h-10 w-full rounded-lg px-3 pr-16 text-sm text-[var(--text-1)]',
                          'bg-[var(--surface-2)] border border-[var(--border-md)]',
                          'opacity-50 cursor-not-allowed outline-none',
                        )}
                      />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-medium text-[var(--text-3)] whitespace-nowrap">
                        Non modifiable
                      </span>
                    </div>
                  </div>

                  {/* Erreur persistante */}
                  {saveState === 'error' && (
                    <p className="text-xs text-[var(--red)] leading-tight">
                      Une erreur est survenue lors de l&apos;enregistrement. Veuillez reessayer.
                    </p>
                  )}
                </div>
              </form>
            )}

            {/* ── Telegram section ── */}
            {activeSection === 'telegram' && (
              <div className="px-5 py-5 flex flex-col gap-5">

                {/* ══ ETAT 4 — not-eligible ══ */}
                {telegramTab === 'not-eligible' && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap
                                       bg-[var(--text-3)]/10 text-[var(--text-3)] border border-[var(--text-3)]/20">
                        &#128274;&nbsp;Fonctionnalite non disponible
                      </span>
                    </div>

                    <p className="text-xs text-[var(--text-3)] leading-relaxed">
                      Les notifications Telegram sont disponibles a partir du plan Analyse.
                    </p>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        href="/pricing"
                      >
                        Mettre a niveau
                      </Button>
                    </div>
                  </div>
                )}

                {/* ══ ETAT 2 — connected ══ */}
                {telegramTab === 'connected' && (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap
                                       bg-[var(--green)]/10 text-[var(--green)] border border-[var(--green)]/20">
                        &#10004;&#65039;&nbsp;Telegram connecte
                      </span>
                    </div>

                    <p className="text-xs text-[var(--text-3)] leading-relaxed">
                      Vous recevrez une notification a chaque nouveau match ajoute.
                    </p>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDisconnect}
                        disabled={disconnectLoading}
                        className="text-[var(--red)]"
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
                            Deconnexion...
                          </>
                        ) : (
                          'Deconnecter'
                        )}
                      </Button>
                    </div>

                    {disconnectError && (
                      <p className="text-xs text-[var(--red)] leading-tight">{disconnectError}</p>
                    )}
                  </div>
                )}

                {/* ══ ETAT 3 — suspended ══ */}
                {telegramTab === 'suspended' && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap
                                       bg-[var(--yellow)]/10 text-[var(--yellow)] border border-[var(--yellow)]/20">
                        &#9888;&nbsp;Notifications suspendues
                      </span>
                    </div>

                    <p className="text-xs text-[var(--text-3)] leading-relaxed">
                      Votre plan actuel ne donne pas acces aux notifications Telegram.
                      Mettez a jour votre abonnement pour les reactiver.
                    </p>

                    {user.telegramToken && (
                      <div className="flex flex-col gap-1.5">
                        <p className="text-xs font-medium text-[var(--text-3)]">Token de connexion</p>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 min-w-0 px-3 py-2 rounded-lg text-xs font-mono text-[var(--text-1)]
                                           bg-[var(--surface-2)] border border-[var(--border-md)] truncate">
                            {getDisplayToken(user.telegramToken, tokenRevealed)}
                          </code>
                          <button
                            onClick={() => setTokenRevealed((r: boolean) => !r)}
                            title={tokenRevealed ? 'Masquer la cle' : 'Afficher la cle'}
                            className="w-7 h-7 flex items-center justify-center rounded-md shrink-0
                                       text-[var(--text-3)] hover:text-[var(--text-2)] hover:bg-white/[0.05]
                                       transition-colors duration-150"
                          >
                            {tokenRevealed
                              ? <EyeOff size={13} strokeWidth={1.5} />
                              : <Eye size={13} strokeWidth={1.5} />
                            }
                          </button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleCopyToken}
                            disabled={copied}
                            iconLeft={
                              copied ? (
                                <Check size={12} className="text-[var(--green)]" strokeWidth={2.5} />
                              ) : (
                                <Copy size={12} strokeWidth={1.5} />
                              )
                            }
                          >
                            {copied ? 'Copie !' : 'Copier'}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ══ ETAT 1 — not-connected ══ */}
                {telegramTab === 'not-connected' && (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-sm font-semibold text-[var(--text-1)]">Connecter Telegram</h3>
                      <p className="text-xs text-[var(--text-3)] leading-relaxed">
                        Recevez une notification a chaque nouveau match ajoute.
                      </p>
                    </div>

                    {user.telegramToken ? (
                      <div className="flex flex-col gap-1.5">
                        <p className="text-xs font-medium text-[var(--text-3)]">Token de connexion</p>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 min-w-0 px-3 py-2 rounded-lg text-xs font-mono text-[var(--text-1)]
                                           bg-[var(--surface-2)] border border-[var(--border-md)] truncate">
                            {getDisplayToken(user.telegramToken, tokenRevealed)}
                          </code>
                          <button
                            onClick={() => setTokenRevealed((r: boolean) => !r)}
                            title={tokenRevealed ? 'Masquer la cle' : 'Afficher la cle'}
                            className="w-7 h-7 flex items-center justify-center rounded-md shrink-0
                                       text-[var(--text-3)] hover:text-[var(--text-2)] hover:bg-white/[0.05]
                                       transition-colors duration-150"
                          >
                            {tokenRevealed
                              ? <EyeOff size={13} strokeWidth={1.5} />
                              : <Eye size={13} strokeWidth={1.5} />
                            }
                          </button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleCopyToken}
                            disabled={copied}
                            iconLeft={
                              copied ? (
                                <Check size={12} className="text-[var(--green)]" strokeWidth={2.5} />
                              ) : (
                                <Copy size={12} strokeWidth={1.5} />
                              )
                            }
                          >
                            {copied ? 'Copie !' : 'Copier'}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-[var(--text-3)]">Token non disponible.</p>
                    )}

                    <div className="flex flex-col gap-1">
                      <p className="text-xs text-[var(--text-3)] leading-relaxed">
                        Ouvrez{' '}
                        <span className="font-mono text-[var(--text-2)]">@{telegramBotUsername}</span>{' '}
                        sur Telegram et envoyez&nbsp;:
                      </p>
                      <code className="inline-flex items-center px-3 py-2 rounded-md text-xs font-mono text-[var(--text-1)]
                                       bg-[var(--surface-2)] border border-[var(--border-md)]">
                        /connect [votre_cle]
                      </code>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://t.me/${telegramBotUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-8 px-4 flex items-center justify-center gap-1.5 rounded-md
                                   bg-[var(--accent)] hover:bg-[var(--accent-hi)] text-white text-xs font-medium
                                   transition-colors duration-150"
                      >
                        Ouvrir le bot
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer — profil only */}
          {activeSection === 'profile' && (
            <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-[var(--border)] shrink-0">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onClose}
                disabled={isSaving}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                form="profile-form"
                variant="primary"
                size="sm"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin shrink-0"
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Enregistrement...
                  </>
                ) : (
                  'Enregistrer'
                )}
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
