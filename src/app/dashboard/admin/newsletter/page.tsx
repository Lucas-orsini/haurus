'use client'

import { useState, useEffect } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import NewsletterSendForm from '@/components/dashboard/admin/NewsletterSendForm'
import NewsletterEmailPreview from '@/components/dashboard/admin/NewsletterEmailPreview'

export default function NewsletterAdminPage() {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    async function init() {
      const supabase = createClient()
      if (!supabase) return

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        redirect('/login')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle()

      if (profile?.role !== 'admin') {
        redirect('/dashboard')
        return
      }

      const { count } = await supabase
        .from('newsletter_subscribers')
        .select('*', { count: 'exact', head: true })

      setSubscriberCount(count ?? 0)
      setChecked(true)
    }

    init()
  }, [])

  if (!checked) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-5 h-5 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-6 min-w-0">
      {/* Left column — form */}
      <div className="w-full lg:w-1/2 min-w-0">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-base font-semibold text-[var(--text-1)] tracking-tight">
            Newsletter
          </h1>
          <p className="text-sm text-[var(--text-3)] mt-1">
            {subscriberCount !== null && subscriberCount > 0
              ? `${subscriberCount} abonné${subscriberCount !== 1 ? 's' : ''} inscrit${subscriberCount !== 1 ? 's' : ''} à la newsletter`
              : 'Aucun abonné inscrit pour le moment'}
          </p>
        </div>

        {/* Form card */}
        <div className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-lg p-5">
          <NewsletterSendForm
            onSubjectChange={setSubject}
            onBodyChange={setBody}
          />
        </div>
      </div>

      {/* Right column — live preview (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 min-w-0">
        <div className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-lg p-5 flex flex-col min-h-0 flex-1 max-h-[calc(100vh-8rem)] overflow-hidden">
          <NewsletterEmailPreview subject={subject} body={body} />
        </div>
      </div>
    </div>
  )
}
