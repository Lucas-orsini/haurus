export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import EditProfileForm from '@/components/dashboard/EditProfileForm'

export const metadata = {
  title: 'Modifier mon profil — Haurus',
}

export default async function ProfileSettingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const currentUser = {
    id: user.id,
    name: user.user_metadata?.name ?? '',
    email: user.email ?? '',
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-[var(--text-3)] mb-6 min-w-0">
        <a
          href="/dashboard"
          className="hover:text-[var(--text-2)] transition-colors duration-150 truncate"
        >
          Dashboard
        </a>
        <span className="shrink-0">/</span>
        <a
          href="/settings"
          className="hover:text-[var(--text-2)] transition-colors duration-150 truncate"
        >
          Paramètres
        </a>
        <span className="shrink-0">/</span>
        <span className="text-[var(--text-2)] truncate">Profil</span>
      </nav>

      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-base font-semibold text-[var(--text-1)] tracking-tight">
          Modifier mon profil
        </h1>
        <p className="text-xs text-[var(--text-3)] mt-1">
          Mettez à jour vos informations personnelles.
        </p>
      </div>

      {/* Form */}
      <EditProfileForm user={currentUser} />
    </div>
  )
}
