'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { UserPlus } from 'lucide-react'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { validateName, validateEmail, validatePassword, signup } from '@/lib/auth'

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
      router.push('/')
    } catch (err) {
      setFormState('error')
      setGlobalError(
        err instanceof Error ? err.message : 'Une erreur est survenue.'
      )
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
  )
}
