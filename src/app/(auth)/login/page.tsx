'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { login, loginWithGoogle, validateEmail, validatePassword } from '@/lib/auth'
import { useLocale } from '@/providers/LocaleProvider'

type FormState = 'idle' | 'loading' | 'redirecting'

export default function LoginPage() {
  const router = useRouter()
  const { t } = useLocale()

  const [formState, setFormState] = useState<FormState>('idle')
  const [globalError, setGlobalError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setGlobalError(null)

    const form = e.currentTarget
    const emailInput = form.elements.namedItem('email') as HTMLInputElement
    const passwordInput = form.elements.namedItem('password') as HTMLInputElement

    const email = emailInput?.value ?? ''
    const password = passwordInput?.value ?? ''

    const emailError = validateEmail(email)
    if (emailError) {
      setGlobalError(emailError)
      return
    }

    const passwordError = validatePassword(password)
    if (passwordError) {
      setGlobalError(passwordError)
      return
    }

    setFormState('loading')

    try {
      await login(email, password)
      setFormState('redirecting')
      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setFormState('idle')
      setGlobalError(err instanceof Error ? err.message : t('auth.login.errorGeneric'))
    }
  }

  async function handleGoogleLogin() {
    setGlobalError(null)
    setFormState('loading')

    const error = await loginWithGoogle()

    // Early-return pattern: exit the block BEFORE any state mutation
    // so TypeScript control-flow narrowing does not capture the 'loading'
    // branch and incorrectly narrow formState to 'idle'.
    if (error) {
      setGlobalError(error)
      setFormState('idle')
      return
    }

    setFormState('redirecting')
  }

  const isLoading = formState === 'loading' || formState === 'redirecting'
  const isRedirecting = formState === 'redirecting'

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 bg-[var(--bg)]">
      <div className="w-full max-w-sm space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-1)]">
            {t('auth.login.title')}
          </h1>
          <p className="text-sm text-[var(--text-3)]">
            {t('auth.login.subtitle')}
          </p>
        </div>

        {/* Form card */}
        <div className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-xl p-6 space-y-5">
          {globalError && (
            <div className="px-3 py-2.5 rounded-lg bg-[var(--red)]/10 border border-[var(--red)]/20 text-xs text-[var(--red)]">
              {globalError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-medium text-[var(--text-2)]"
              >
                {t('auth.login.emailLabel')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder={t('auth.login.emailPlaceholder')}
                disabled={isLoading}
                className="w-full h-9 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border-md)]
                           text-sm text-[var(--text-1)] placeholder:text-[var(--text-3)]
                           focus:outline-none focus:ring-1 focus:ring-[var(--accent)] focus:border-[var(--accent)]
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-colors duration-150"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-medium text-[var(--text-2)]"
              >
                {t('auth.login.passwordLabel')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder={t('auth.login.passwordPlaceholder')}
                disabled={isLoading}
                className="w-full h-9 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border-md)]
                           text-sm text-[var(--text-1)] placeholder:text-[var(--text-3)]
                           focus:outline-none focus:ring-1 focus:ring-[var(--accent)] focus:border-[var(--accent)]
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-colors duration-150"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-9 flex items-center justify-center rounded-lg
                         bg-[var(--accent)] text-white text-sm font-medium
                         hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-150"
            >
              {formState === 'loading' ? (
                <Loader2 size={15} className="animate-spin" strokeWidth={1.5} />
              ) : isRedirecting ? (
                <span>{t('auth.login.submitButtonRedirecting')}</span>
              ) : (
                <span>{t('auth.login.submitButton')}</span>
              )}
            </button>
          </form>

          {/* Separator */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border)]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-[var(--surface-1)] text-[var(--text-3)]">
                {t('auth.login.separator')}
              </span>
            </div>
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full h-9 flex items-center justify-center gap-2 rounded-lg
                       border border-[var(--border-md)] bg-[var(--surface-2)]
                       text-sm font-medium text-[var(--text-1)]
                       hover:bg-white/[0.03] disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-150"
          >
            {isLoading ? (
              <Loader2 size={15} className="animate-spin" strokeWidth={1.5} />
            ) : isRedirecting ? (
              <span>{t('auth.login.googleButtonLoading')}</span>
            ) : (
              <span>{t('auth.login.googleButton')}</span>
            )}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[var(--text-3)]">
          {t('auth.login.linkToSignup')}{' '}
          <Link
            href="/signup"
            className="font-medium text-[var(--accent)] hover:underline"
          >
            {t('auth.login.linkToSignupAction')}
          </Link>
        </p>
      </div>
    </div>
  )
}
