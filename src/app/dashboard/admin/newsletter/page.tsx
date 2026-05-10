'use client'

import { useState } from 'react'
import NewsletterSendForm from '@/components/dashboard/admin/NewsletterSendForm'
import NewsletterEmailPreview from '@/components/dashboard/admin/NewsletterEmailPreview'

export default function NewsletterAdminPage() {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [ctaText, setCtaText] = useState('')
  const [ctaLink, setCtaLink] = useState('')

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Page header */}
      <div className="shrink-0 border-b border-[var(--border)] px-6 py-4">
        <h1 className="text-sm font-semibold text-[var(--text-1)]">
          Envoyer la newsletter
        </h1>
        <p className="text-xs text-[var(--text-3)] mt-0.5">
          Rédigez et envoyez un email à tous les abonnés.
        </p>
      </div>

      {/* Content — form + preview side by side */}
      <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">
        {/* Form panel */}
        <div className="w-full lg:w-[420px] shrink-0 border-r border-[var(--border)] overflow-y-auto">
          <div className="p-6">
            <NewsletterSendForm
              onSubjectChange={setSubject}
              onBodyChange={setBody}
              onCtaChange={(text, link) => {
                setCtaText(text)
                setCtaLink(link)
              }}
            />
          </div>
        </div>

        {/* Preview panel */}
        <div className="flex-1 min-w-0 overflow-hidden flex flex-col">
          <NewsletterEmailPreview
            subject={subject}
            body={body}
            ctaText={ctaText}
            ctaLink={ctaLink}
          />
        </div>
      </div>
    </div>
  )
}
