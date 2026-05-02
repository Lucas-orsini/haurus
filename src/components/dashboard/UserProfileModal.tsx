'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
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

export default function UserProfileModal({ user, onClose, onUpdateSuccess }: UserProfileModalProps) {
  const [name, setName] = useState(user.name ?? '')
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl ?? '')
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [nameError, setNameError] = useState<string | null>(null)

  // Fermer sur Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Bloquer le scroll du body pendant que la modale est ouverte
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

  const isSaving = saveState === 'saving'

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

          {/* Body */}
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
                <p className="text-[11px] text-[var(--text-3)]">Avatar — initiales affichées par défaut</p>
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
                  Une erreur est survenue lors de l&apos;enregistrement. Veuillez réessayer.
                </p>
              )}
            </div>
          </form>

          {/* Footer */}
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
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
