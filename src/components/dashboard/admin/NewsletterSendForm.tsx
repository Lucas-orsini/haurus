'use client'

import { useState } from 'react'
import { Mail, Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

type FormState = 'idle' | 'loading' | 'success' | 'error'

interface SuccessData {
  sent: number
  failed: number
}

interface NewsletterSendFormProps {
  onSubjectChange?: (value: string) => void
  onBodyChange?: (value: string) => void
}

export default function NewsletterSendForm({
  onSubjectChange,
  onBodyChange,
}: NewsletterSendFormProps) {
  const [state, setState] = useState<FormState>('idle')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [subjectError, setSubjectError] = useState('')
  const [bodyError, setBodyError] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successData, setSuccessData] = useState<SuccessData | null>(null)

  const isLoading = state === 'loading'

  function validateFields(): boolean {
    let valid = true

    if (!subject.trim()) {
      setSubjectError('Le sujet est requis.')
      valid = false
    } else {
      setSubjectError('')
    }

    if (!body.trim()) {
      setBodyError('Le corps du message est requis.')
      valid = false
    } else {
      setBodyError('')
    }

    return valid
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!validateFields()) return

    setState('loading')
    setErrorMessage('')
    setSuccessData(null)

    try {
      const res = await fetch('/api/admin/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: subject.trim(), body: body.trim() }),
      })

      const data = await res.json()

      if (!res.ok) {
        setState('error')
        setErrorMessage(data?.error ?? 'Une erreur est survenue.')
        return
      }

      setSuccessData({ sent: data.sent, failed: data.failed })
      setState('success')
    } catch {
      setState('error')
      setErrorMessage('Impossible de contacter le serveur. Vérifiez votre connexion.')
    }
  }

  function handleReset() {
    setState('idle')
    setSubject('')
    setBody('')
    setSubjectError('')
    setBodyError('')
    setErrorMessage('')
    setSuccessData(null)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Subject field */}
      <Input
        label="Sujet"
        type="text"
        placeholder="Objet de l'email"
        value={subject}
        onChange={(e) => {
          setSubject(e.target.value)
          if (subjectError) setSubjectError('')
          onSubjectChange?.(e.target.value)
        }}
        error={subjectError}
        disabled={isLoading}
        autoComplete="off"
      />

      {/* Body textarea */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="newsletter-body"
          className="text-xs font-medium select-none"
        >
          Corps du message
        </label>
        <textarea
          id="newsletter-body"
          rows={8}
          placeholder="Contenu de l'email..."
          value={body}
          onChange={(e) => {
            setBody(e.target.value)
            if (bodyError) setBodyError('')
            onBodyChange?.(e.target.value)
          }}
          disabled={isLoading}
          className={[
            'w-full px-3 py-2.5 rounded-lg text-sm resize-none',
            'bg-[var(--surface-2)] border',
            'text-[var(--text-1)] placeholder:text-[var(--text-3)]',
            'outline-none transition-all duration-150',
            'focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)]',
            bodyError
              ? 'border-[var(--red)] focus:ring-[var(--red)] focus:border-[var(--red)]'
              : 'border-[var(--border-md)] hover:border-[var(--border-hi)]',
            isLoading && 'opacity-50 cursor-not-allowed',
          ].join(' ')}
        />
        {bodyError && (
          <p className="text-xs text-[var(--red)] leading-tight">{bodyError}</p>
        )}
      </div>

      {/* Error alert */}
      {state === 'error' && errorMessage && (
        <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-[var(--red)]/[0.07] border border-[var(--red)]/20">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            className="mt-0.5 shrink-0"
            aria-hidden="true"
          >
            <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M7.5 4.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="7.5" cy="10.5" r="0.75" fill="currentColor" />
          </svg>
          <p className="text-sm text-[var(--red)]/90">{errorMessage}</p>
        </div>
      )}

      {/* Success feedback */}
      {state === 'success' && successData && (
        <div className="flex flex-col gap-2">
          {/* Green badge — always shown on success */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--green)]/10 border border-[var(--green)]/20">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="shrink-0"
              aria-hidden="true"
            >
              <circle cx="7" cy="7" r="6" fill="var(--green)" fillOpacity="0.15" />
              <path
                d="M4.5 7L6.5 9L9.5 5"
                stroke="var(--green)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-sm font-medium text-[var(--green)]">
              {successData.sent} email{successData.sent !== 1 ? 's' : ''} envoyé{successData.sent !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Orange warning — only when some failed */}
          {successData.failed > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--orange)]/10 border border-[var(--orange)]/20">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="shrink-0"
                aria-hidden="true"
              >
                <path
                  d="M7 2L12.5 11.5H1.5L7 2Z"
                  fill="var(--orange)"
                  fillOpacity="0.15"
                  stroke="var(--orange)"
                  strokeWidth="1.25"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 5.5V8"
                  stroke="var(--orange)"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
                <circle cx="7" cy="9.5" r="0.6" fill="var(--orange)" />
              </svg>
              <p className="text-sm text-[var(--orange)]">
                {successData.failed} échec{successData.failed !== 1 ? 's' : ''} — vérifiez les adresses invalides sur Resend.
              </p>
            </div>
          )}

          {/* Reset button */}
          <button
            type="button"
            onClick={handleReset}
            className="self-start h-7 px-3 flex items-center justify-center gap-1.5 rounded-md
                       border border-[var(--border-md)] bg-white/[0.03] hover:bg-white/[0.06]
                       text-[var(--text-2)] text-xs font-medium transition-colors duration-150"
          >
            Envoyer un autre email
          </button>
        </div>
      )}

      {/* Submit button — hidden when success */}
      {state !== 'success' && (
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={isLoading || !subject.trim() || !body.trim()}
          iconLeft={
            isLoading ? (
              <Loader2 size={13} strokeWidth={1.5} className="animate-spin shrink-0" />
            ) : (
              <Mail size={13} strokeWidth={1.5} className="shrink-0" />
            )
          }
        >
          {isLoading ? 'Envoi en cours...' : 'Envoyer la newsletter'}
        </Button>
      )}
    </form>
  )
}
