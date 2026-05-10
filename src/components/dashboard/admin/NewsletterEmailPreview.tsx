'use client'

import { buildNewsletterHtml } from '@/lib/email/newsletter'
import { Mail } from 'lucide-react'

interface NewsletterEmailPreviewProps {
  subject: string
  body: string
  ctaText?: string
  ctaLink?: string
}

export default function NewsletterEmailPreview({
  subject,
  body,
  ctaText,
  ctaLink,
}: NewsletterEmailPreviewProps) {
  const isEmpty =
    !subject.trim() && !body.trim() && !ctaText?.trim() && !ctaLink?.trim()

  const html = buildNewsletterHtml(
    subject,
    body,
    process.env.NEXT_PUBLIC_APP_URL || 'https://haurus.io',
    ctaText,
    ctaLink,
  )

  return (
    <div className="flex flex-col min-h-0 flex-1">
      {/* Preview panel header */}
      <div className="shrink-0 flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--surface-1)]">
        <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">
          Aperçu
        </p>
        {subject && (
          <p className="text-xs text-[var(--text-1)] truncate flex-1 min-w-0" title={subject}>
            — {subject}
          </p>
        )}
      </div>

      {/* Iframe container — scrollable independently */}
      <div className="flex-1 overflow-y-auto bg-[var(--surface-2)] border border-[var(--border)] rounded-b-lg min-h-[400px]">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-3 text-center px-6">
            <div className="w-10 h-10 rounded-xl bg-[var(--surface-3)] border border-[var(--border-md)] flex items-center justify-center">
              <Mail size={18} strokeWidth={1.5} className="text-[var(--text-3)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--text-2)] mb-1">
                Aucun email à prévisualiser
              </p>
              <p className="text-xs text-[var(--text-3)] max-w-xs">
                Commencez à taper un sujet et un corps de message pour voir l&rsquo;aperçu ici.
              </p>
            </div>
          </div>
        ) : (
          <iframe
            srcDoc={html}
            title="Newsletter preview"
            className="w-full h-full border-none min-h-[400px]"
            sandbox="allow-same-origin"
            style={{ maxWidth: '100%' }}
          />
        )}
      </div>
    </div>
  )
}
