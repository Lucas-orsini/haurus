'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LogIn } from 'lucide-react'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { validateEmail, validatePassword, mockLogin } from '@/lib/auth'

type FormState = 'idle' | 'loading' | 'error'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [globalError, setGlobalError] = useState<string | null>(null)
  const [formState, setFormState] = useState<FormState>('idle')

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
      await mockLogin(email, password)
      router.push('/')
    } catch {
      setFormState('error')
      setGlobalError('Identifiants incorrects. Veuillez réessayer.')
    }
  }

  return (
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
          disabled={formState === 'loading'}
          className="w-full mt-1"
        >
          {formState === 'loading' ? (
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full border-2 border-black/30 border-t-black animate-spin" />
              Connexion...
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
  )
}
