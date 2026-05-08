export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import NewsletterSendForm from '@/components/dashboard/admin/NewsletterSendForm'

export const metadata = {
  title: 'Newsletter — Haurus',
  description: 'Envoi de newsletter aux abonnés.',
}

export default async function NewsletterAdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Not logged in → /login
  if (!user) {
    redirect('/login')
  }

  // Fetch role from profiles table
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle()

  // Connected but not admin → /dashboard
  if (profile?.role !== 'admin') {
    redirect('/dashboard')
  }

  const { count } = await supabase
    .from('newsletter_subscribers')
    .select('*', { count: 'exact', head: true })

  const subscriberCount = count ?? 0

  return (
    <div className="max-w-xl">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-base font-semibold text-[var(--text-1)] tracking-tight">
          Newsletter
        </h1>
        <p className="text-sm text-[var(--text-3)] mt-1">
          {subscriberCount > 0
            ? `${subscriberCount} abonné${subscriberCount !== 1 ? 's' : ''} inscrit${subscriberCount !== 1 ? 's' : ''} à la newsletter`
            : 'Aucun abonné inscrit pour le moment'}
        </p>
      </div>

      {/* Form card */}
      <div className="bg-[var(--surface-1)] border border-[var(--border-md)] rounded-lg p-5">
        <NewsletterSendForm />
      </div>
    </div>
  )
}
