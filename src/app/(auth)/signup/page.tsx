'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { UserPlus } from 'lucide-react'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { validateName, validateEmail, validatePassword, signup, signupWithGoogle } from '@/lib/auth'

type FormState = 'idle' | 'loading' | 'error'

export default function SignupPage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
  }>({})
  const [globalError, setGlobalError] = useState<string | null>(null)
  const [formState, setFormState] = useState<FormState>('idle')
  const [googleLoading, setGoogleLoading] = useState(false)

  function getRedirectTo(): string {
    if (typeof window === 'undefined') return '/dashboard'
    const params = new URLSearchParams(window.location.search)
    return params.get('redirectTo') ?? '/dashboard'
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setGlobalError(null)

    const nameError = validateName(name)
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)
    let confirmError: string | undefined

    if (password !== confirmPassword) {
      confirmError = 'Les mots de passe ne correspondent pas.'
    }

    if (nameError || emailError || passwordError || confirmError) {
      setErrors({
        name: nameError ?? undefined,
        email: emailError ?? undefined,
        password: passwordError ?? undefined,
        confirmPassword: confirmError,
      })
      return
    }

    setErrors({})
    setFormState('loading')

    try {
      await signup(name, email, password)
      router.push(getRedirectTo())
    } catch (err) {
      setFormState('idle')
      setGlobalError(
        err instanceof Error ? err.message : 'Une erreur est survenue.'
      )
    }
  }

  async function handleGoogleSignup() {
    setGlobalError(null)
    setGoogleLoading(true)
    try {
      const error = await signupWithGoogle()
      if (error) {
        setGlobalError(error)
        setGoogleLoading(false)
      }
      // On success, Supabase redirects the browser — loading state is never cleared
    } catch (err) {
      setGlobalError(err instanceof Error ? err.message : 'Une erreur est survenue.')
      setGoogleLoading(false)
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-sm px-4"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--surface-2)] border border-[var(--border-md)] mb-4">
            <UserPlus size={20} className="text-[var(--accent)]" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-semibold text-[var(--text-1)] tracking-tight">
            Créer un compte
          </h1>
          <p className="mt-2 text-sm text-[var(--text-2)]">
            Rejoignez Haurus et accédez à vos métriques
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <Input
            label="Nom"
            type="text"
            placeholder="Alex Dupont"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            disabled={formState === 'loading'}
            autoComplete="name"
          />

          <Input
            label="Adresse email"
            type="email"
            placeholder="alex@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            disabled={formState === 'loading'}
            autoComplete="email"
          />

          <Input
            label="Mot de passe"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            disabled={formState === 'loading'}
            autoComplete="new-password"
          />

          <Input
            label="Confirmer le mot de passe"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            disabled={formState === 'loading'}
            autoComplete="new-password"
          />

          {globalError && (
            <div className="rounded-lg px-4 py-3 bg-[var(--red)]/10 border border-[var(--red)]/25 text-sm text-[var(--red)]">
              {globalError}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={formState === 'loading'}
            className="w-full mt-1"
          >
            {formState === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                Création...
              </span>
            ) : (
              'Créer mon compte'
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <hr className="flex-1 border-t border-[var(--border-md)]" />
          <span className="text-xs text-[var(--text-2)] select-none">ou</span>
          <hr className="flex-1 border-t border-[var(--border-md)]" />
        </div>

        {/* Google OAuth Button */}
        <Button
          variant="secondary"
          size="lg"
          disabled={googleLoading}
          onClick={handleGoogleSignup}
          className="w-full"
        >
          {googleLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full border-2 border-[var(--text-3)] border-t-[var(--text-1)] animate-spin" />
              Redirection...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Créer un compte avec Google
            </span>
          )}
        </Button>

        {/* Footer link */}
        <p className="text-center text-sm text-[var(--text-2)] mt-6">
          Déjà un compte ?{' '}
          <Link
            href="/login"
            className="text-[var(--accent)] hover:text-[var(--accent-hi)] transition-colors duration-150 font-medium"
          >
            Se connecter
          </Link>
        </p>
      </motion.div>
    </>
  )
}
