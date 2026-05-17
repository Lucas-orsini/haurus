export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function NewsletterPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Verify admin role — RLS allows only admins to read this table
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    redirect('/dashboard')
  }

  // Fetch all subscribers (active only) — RLS blocks non-admins anyway
  const { data: subscribers } = await supabase
    .from('newsletter_subscribers')
    .select('id, email, created_at, subscribed')
    .order('created_at', { ascending: false })

  const activeCount = (subscribers ?? []).filter((s) => s.subscribed).length

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-lg font-semibold text-[var(--text-1)]">
          Newsletter
        </h1>
        <p className="text-sm text-[var(--text-3)] mt-1">
          Gestion des abonnés — {activeCount} actif{(activeCount !== 1) ? 's' : ''} / {(subscribers ?? []).length} total
        </p>
      </div>

      {/* Subscriber table */}
      <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-lg overflow-hidden">
        {(subscribers ?? []).length === 0 ? (
          <div className="px-4 py-16 text-center">
            <p className="text-sm text-[var(--text-3)]">Aucun abonné pour le moment.</p>
          </div>
        ) : (
          <div className="md:overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="px-4 py-2.5 text-left text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-2.5 text-left text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-4 py-2.5 text-left text-[11px] font-medium text-[var(--text-3)] uppercase tracking-wider">
                    Inscrit le
                  </th>
                </tr>
              </thead>
              <tbody>
                {(subscribers ?? []).map((sub, i) => (
                  <tr
                    key={sub.id}
                    className="border-b border-[var(--border)]/50 last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-4 py-3 text-[var(--text-1)] font-mono text-xs">
                      {sub.email}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${
                          sub.subscribed
                            ? 'bg-[var(--green)]/10 text-[var(--green)]'
                            : 'bg-white/[0.05] text-[var(--text-3)]'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            sub.subscribed ? 'bg-[var(--green)]' : 'bg-[var(--text-3)]'
                          }`}
                        />
                        {sub.subscribed ? 'Actif' : 'Désabonné'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[var(--text-3)] text-xs tabular-nums">
                      {new Date(sub.created_at).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
