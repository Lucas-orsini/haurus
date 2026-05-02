'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { validateName, validatePassword, updateProfile } from '@/lib/auth'
import type { AuthUser } from '@/lib/auth'

interface EditProfileFormProps {
  user: AuthUser
}

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function EditProfileForm({ user }: EditProfileFormProps) {
  const [name, setName] = useState(user.name)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nameError, setNameError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [confirmError, setConfirmError] = useState<string | null>(null)
  const [globalError, setGlobalError] = useState<string | null>(null)
  const [formState, setFormState] = useState<FormState>('idle')

  // Reset success after 3 seconds
  useEffect(() => {
    if (formState === 'success') {
      const timer = setTimeout(() => setFormState('idle'), 3000)
      return () => clearTimeout(timer)
    }
  }, [formState])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setGlobalError(null)

    // Client-side validation
    const nameValidation = validateName(name)
    if (nameValidation) {
      setNameError(nameValidation)
      return
    }
    setNameError(null)

    const passwordValidation = validatePassword(password)
    if (password && passwordValidation) {
      setPasswordError(passwordValidation)
      return
    }
    setPasswordError(null)

    if (password && password !== confirmPassword) {
      setConfirmError('Les mots de passe ne correspondent pas.')
      return
    }
    setConfirmError(null)

    setFormState('submitting')

    try {
      await updateProfile(name, password || undefined)
      setFormState('success')
      setPassword('')
      setConfirmPassword('')
    } catch (err) {
      setFormState('error')
      setGlobalError(err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.')
    }
  }

  const isSubmitting = formState === 'submitting'

  return (
    <div className="max-w-lg">
      {/* Card */}
      <div className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[var(--border)]">
          <h2 className="text-sm font-semibold text-[var(--text-1)]">
            Informations du compte
          </h2>
          <p className="text-xs text-[var(--text-3)] mt-0.5">
            Modifiez votre nom d&apos;affichage ou votre mot de passe.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-5 py-5 flex flex-col gap-5">
          {/* Nom */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="name"
              className="text-xs font-medium text-[var(--text-2)]"
            >
              Nom d&apos;affichage
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (nameError) setNameError(null)
              }}
              disabled={isSubmitting}
              className={cn(
                'h-10 w-full rounded-lg px-3 text-sm text-[var(--text-1)] placeholder:text-[var(--text-3)]',
                'bg-[var(--surface-2)] border border-[var(--border-md)]',
                'outline-none transition-all duration-150',
                'focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)]',
                nameError
                  ? 'border-[var(--red)] focus:ring-[var(--red)] focus:border-[var(--red)]'
                  : 'hover:border-[var(--border-hi)]',
                isSubmitting && 'opacity-50 cursor-not-allowed',
              )}
            />
            {nameError && (
              <p className="text-xs text-[var(--red)] leading-tight flex items-center gap-1">
                <AlertCircle size={11} className="shrink-0" />
                {nameError}
              </p>
            )}
          </div>

          {/* Email — disabled, non modifiable en self-service */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-medium text-[var(--text-2)]"
            >
              Adresse email
            </label>
            <input
              id="email"
              type="email"
              value={user.email}
              disabled
              className={cn(
                'h-10 w-full rounded-lg px-3 text-sm text-[var(--text-2)]',
                'bg-[var(--surface-2)] border border-[var(--border-md)]',
                'opacity-50 cursor-not-allowed',
              )}
            />
            <p className="text-[11px] text-[var(--text-3)]">
              Pour modifier votre email, contactez le support.
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-[var(--border)]" />

          {/* Nouveau mot de passe */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-xs font-medium text-[var(--text-2)]"
            >
              Nouveau mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (passwordError) setPasswordError(null)
                if (confirmError) setConfirmError(null)
              }}
              disabled={isSubmitting}
              placeholder="Laissez vide pour ne pas changer"
              className={cn(
                'h-10 w-full rounded-lg px-3 text-sm text-[var(--text-1)] placeholder:text-[var(--text-3)]',
                'bg-[var(--surface-2)] border border-[var(--border-md)]',
                'outline-none transition-all duration-150',
                'focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)]',
                passwordError
                  ? 'border-[var(--red)] focus:ring-[var(--red)] focus:border-[var(--red)]'
                  : 'hover:border-[var(--border-hi)]',
                isSubmitting && 'opacity-50 cursor-not-allowed',
              )}
            />
            {passwordError && (
              <p className="text-xs text-[var(--red)] leading-tight flex items-center gap-1">
                <AlertCircle size={11} className="shrink-0" />
                {passwordError}
              </p>
            )}
          </div>

          {/* Confirmer mot de passe */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="confirmPassword"
              className="text-xs font-medium text-[var(--text-2)]"
            >
              Confirmer le mot de passe
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                if (confirmError) setConfirmError(null)
              }}
              disabled={isSubmitting || !password}
              placeholder="Confirmer le nouveau mot de passe"
              className={cn(
                'h-10 w-full rounded-lg px-3 text-sm text-[var(--text-1)] placeholder:text-[var(--text-3)]',
                'bg-[var(--surface-2)] border border-[var(--border-md)]',
                'outline-none transition-all duration-150',
                'focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)]',
                confirmError
                  ? 'border-[var(--red)] focus:ring-[var(--red)] focus:border-[var(--red)]'
                  : 'hover:border-[var(--border-hi)]',
                (!password || isSubmitting) && 'opacity-50 cursor-not-allowed',
              )}
            />
            {confirmError && (
              <p className="text-xs text-[var(--red)] leading-tight flex items-center gap-1">
                <AlertCircle size={11} className="shrink-0" />
                {confirmError}
              </p>
            )}
          </div>

          {/* Erreur globale */}
          {globalError && formState === 'error' && (
            <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-[var(--red)]/[0.07] border border-[var(--red)]/20">
              <AlertCircle size={14} className="text-[var(--red)] shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-xs text-[var(--red)] leading-relaxed">{globalError}</p>
            </div>
          )}

          {/* Succès */}
          {formState === 'success' && (
            <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-[var(--green)]/[0.07] border border-[var(--green)]/20">
              <CheckCircle size={14} className="text-[var(--green)] shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-xs text-[var(--green)] leading-relaxed">
                Profil mis à jour avec succès.
              </p>
            </div>
          )}

          {/* Submit button */}
          <div className="flex items-center justify-end pt-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'h-9 px-5 flex items-center justify-center gap-2 rounded-lg text-sm font-medium',
                'bg-[var(--accent)] text-white transition-all duration-150',
                'hover:bg-[var(--accent-hi)] hover:scale-[1.02] hover:shadow-[0_0_16px_rgba(242,203,56,0.25)]',
                'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none',
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={13} className="animate-spin shrink-0" />
                  <span>Enregistrement...</span>
                </>
              ) : (
                <span>Enregistrer</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
