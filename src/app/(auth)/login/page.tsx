'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LogIn } from 'lucide-react'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { validateEmail, validatePassword, login, getSession } from '@/lib/auth'

type FormState = 'idle' | 'loading' | 'redirecting'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [globalError, setGlobalError] = useState<string | null>(null)
  const [formState, setFormState] = useState<FormState>('idle')

  function getRedirectTo(): string {
    if (typeof window === 'undefined') return '/dashboard'
    const params = new URLSearchParams(window.location.search)
    const raw = params.get('redirectTo')
    // Security: only follow absolute-path redirects
    if (raw && raw.startsWith('/')) return raw
    return '/dashboard'
  }

  // Check for existing session on mount — redirect if already authenticated
  useEffect(() => {
    async function checkSession() {
      try {
        const session = await getSession()
        if (session) {
          setFormState('redirecting')
          router.push(getRedirectTo())
        }
      } catch {
        // Session check failed — stay on login page
      }
    }
    checkSession()
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setGlobalError(null)

    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)

    if (emailError || passwordError) {
      setErrors({ email: emailError ?? undefined, password: passwordError ?? undefined })
      return
    }

    setErrors({})
    setFormState('loading')

    try {
      await login(email, password)
      setFormState('redirecting')
      router.push(getRedirectTo())
    } catch (err) {
      setFormState('idle')
      setGlobalError(err instanceof Error ? err.message : 'Une erreur est survenue.')
    }
  }

  return (
    <>
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <Link href="/" className="flex items-center justify-center gap-2 group">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center transition-transform duration-200">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 122 110"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#f2cb38"
                d="M66.68,9.92c2.15,1.49,3.96,3.12,5.25,5.38l34.14,59.88c5.06,8.87,2.55,20.18-4.92,26.71-8.61,7.53-21.36,6.81-29.45-1.16-1.57-1.55-4.23-.7-5.26.93-1.21,1.93-.49,3.85,1.11,5.31,9.01,8.23,22.26,9.97,33.06,4.27,2.82-1.49,5.2-3.39,7.41-5.71,4.51-4.74,7.16-10.82,7.8-17.35.68-6.84-1.28-13.25-4.64-19.12L78.53,11.95c-7.59-13.26-25.14-15.81-36.15-6.05l-3.15,3.13,13.66,23.9c.64,1.12.47,2.14-.14,3.21l-22.12,38.66c-1.75,3.06-2.08,6.5-.25,9.68,1.54,2.69,4.51,4.68,7.88,4.56,2.15-.08,3.74-1.72,3.69-3.76s-1.57-3.61-3.66-3.63c-.66,0-1.3-.46-1.53-.91-.33-.65-.29-1.24.07-1.88l25.42-44.46-13.7-23.97c5.46-3.83,12.5-4.03,18.14-.54ZM65.72,55.42l13.4,23.43c.37.64.45,1.23.13,1.87-.21.41-.82.97-1.49.97h-21.94s-8.51,14.86-8.51,14.86c-6.69,11.69-22.83,14.2-32.85,5.05-7.65-6.99-9.33-18.27-4.19-27.28l26.46-46.27c1.09-1.91.28-4.18-1.47-5.13-1.89-1.02-3.93-.27-4.99,1.58L4.36,69.68c-7.23,12.27-5.43,27.78,5.19,37.47,13.41,12.25,35.13,8.78,43.89-6.43l6.68-11.6h17.36c3.27,0,6.16-1.51,7.82-4.1,1.74-2.72,2.18-6.37.54-9.25l-13.84-24.28c-1.05-1.84-3.38-2.33-5.08-1.3-1.78,1.08-2.3,3.29-1.19,5.23Z"
              />
            </svg>
          </div>
          <span className="text-base font-medium tracking-tight text-[var(--text-1)]">
            Haur<span className="text-[var(--accent)]">u</span>s
          </span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-sm px-4"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--surface-2)] border border-[var(--border-md)] mb-4">
            <LogIn size={20} className="text-[var(--accent)]" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-semibold text-[var(--text-1)] tracking-tight">
            Connexion
          </h1>
          <p className="mt-2 text-sm text-[var(--text-2)]">
            Accédez à votre compte Haurus
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <Input
            label="Adresse email"
            type="email"
            placeholder="alex@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            disabled={formState !== 'idle'}
            autoComplete="email"
          />

          <Input
            label="Mot de passe"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            disabled={formState !== 'idle'}
            autoComplete="current-password"
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
            disabled={formState !== 'idle'}
            className="w-full mt-1"
          >
            {formState === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                Connexion...
              </span>
            ) : formState === 'redirecting' ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                Redirection...
              </span>
            ) : (
              'Se connecter'
            )}
          </Button>
        </form>

        {/* Footer link */}
        <p className="text-center text-sm text-[var(--text-2)] mt-6">
          Pas encore de compte ?{' '}
          <Link
            href="/signup"
            className="text-[var(--accent)] hover:text-[var(--accent-hi)] transition-colors duration-150 font-medium"
          >
            Créer un compte
          </Link>
        </p>
      </motion.div>
    </>
  )
}
