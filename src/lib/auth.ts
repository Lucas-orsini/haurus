/**
 * Authentication utilities — Supabase-backed.
 * Session is stored in HTTP-only cookies via @supabase/ssr (no localStorage).
 *
 * Client Components use createClient() from @/lib/supabase/client.
 */

import { createClient } from '@/lib/supabase/client'

// ── Shared type ────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string
  name: string | null
  email: string
  avatarUrl?: string | null
  role?: string | null
  plan?: string | null
  telegramToken?: string | null
  telegramChatId?: string | null
  telegramActive?: boolean | null
}

// ── Custom error type ─────────────────────────────────────────────────────────

export class ProfileUpdateError extends Error {
  constructor(
    message: string,
    public readonly code?: string
  ) {
    super(message)
    this.name = 'ProfileUpdateError'
  }
}

// ── Validation helpers ────────────────────────────────────────────────────────

/**
 * Validate email format.
 * @returns Error message string if invalid, null if valid.
 */
export function validateEmail(email: string): string | null {
  if (!email) {
    return 'Email is required.'
  }
  const trimmed = email.trim()
  if (!trimmed) {
    return 'Email cannot be empty or whitespace.'
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(trimmed)) {
    return 'Please enter a valid email address.'
  }
  return null
}

/**
 * Validate password strength.
 * @returns Error message string if invalid, null if valid.
 */
export function validatePassword(password: string): string | null {
  if (!password) {
    return 'Password is required.'
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters.'
  }
  return null
}

/**
 * Validate name is not empty.
 * @returns Error message string if invalid, null if valid.
 */
export function validateName(name: string): string | null {
  if (!name) {
    return 'Name is required.'
  }
  const trimmed = name.trim()
  if (!trimmed) {
    return 'Name cannot be empty or whitespace.'
  }
  return null
}

// ── Session helpers ───────────────────────────────────────────────────────────

/**
 * Read the current session from the browser Supabase client.
 * Returns AuthUser if session exists and is valid, null otherwise.
 *
 * Resolution order:
 *   1. user_metadata.name  (Auth — authoritative for display name)
 *   2. user_metadata.avatar_url  (Auth — authoritative for avatar URL)
 *   3. profiles.name  (database fallback — persists across token refreshes)
 *   4. profiles.avatar_url  (database fallback)
 *   5. null if neither source has data
 *
 * Safe to call from Client Components only.
 */
export async function getSession(): Promise<AuthUser | null> {
  const supabase = createClient()
  if (!supabase) return null

  const { data } = await supabase.auth.getSession()
  const session = data.session

  if (!session?.user) return null

  const user = session.user

  // Primary: values from user_metadata (Auth)
  const metaName = user.user_metadata?.name as string | null | undefined
  const metaAvatarUrl = user.user_metadata?.avatar_url as string | null | undefined

  // Fallback: values from profiles table (database)
  const { data: profile } = await supabase
    .from('profiles')
    .select('name, avatar_url, role, plan, telegram_token, telegram_chat_id, telegram_active')
    .eq('id', user.id)
    .maybeSingle()

  const dbName = profile?.name ?? null
  const dbAvatarUrl = profile?.avatar_url ?? null

  // telegram_chat_id is bigint in DB — convert to string for the frontend
  const rawChatId = profile?.telegram_chat_id
  const telegramChatId: string | null =
    rawChatId != null ? String(rawChatId) : null

  return {
    id: user.id,
    name: metaName ?? dbName,
    avatarUrl: metaAvatarUrl ?? dbAvatarUrl ?? null,
    role: profile?.role ?? null,
    plan: profile?.plan ?? null,
    email: user.email ?? '',
    telegramToken: profile?.telegram_token ?? null,
    telegramChatId,
    telegramActive: profile?.telegram_active ?? false,
  }
}

// ── Auth actions (Supabase-backed) ───────────────────────────────────────────

/**
 * Sign in with email + password via Supabase Auth.
 * @throws Error with user-friendly message on failure.
 */
export async function login(email: string, password: string): Promise<AuthUser> {
  const supabase = createClient()
  if (!supabase) {
    throw new Error('Service temporarily unavailable. Please refresh and try again.')
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  const user = data.user
  return {
    id: user.id,
    name: user.user_metadata?.name as string | null ?? null,
    email: user.email ?? '',
    telegramToken: null,
    telegramChatId: null,
    telegramActive: false,
  }
}

/**
 * Sign up with email + password + name via Supabase Auth.
 * Creates a profile with role 'user' via client-side upsert.
 * @throws Error on validation failure, email already taken, or network error.
 */
export async function signup(
  name: string,
  email: string,
  password: string
): Promise<AuthUser> {
  const supabase = createClient()
  if (!supabase) {
    throw new Error('Service temporarily unavailable. Please refresh and try again.')
  }

  const { data, error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      data: {
        name: name.trim(),
      },
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  if (!data.user) {
    throw new Error('Signup failed. Please try again.')
  }

  const user = data.user

  // Idempotent upsert — supports re-signup by updating existing row on conflict.
  // Uses the anon client; RLS policy profiles_insert_own allows INSERT when auth.uid() = id.
  try {
    const { error: profileError } = await supabase.from('profiles').upsert(
      {
        id: user.id,
        role: 'user',
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    )
    if (profileError) {
      console.error('[auth] Failed to create profile:', profileError)
    }
  } catch (err) {
    // Non-blocking — log and continue even if profile creation fails.
    console.error('[auth] Failed to create profile:', err)
  }

  return {
    id: user.id,
    name: user.user_metadata?.name as string | null ?? null,
    email: user.email ?? '',
    telegramToken: null,
    telegramChatId: null,
    telegramActive: false,
  }
}

/**
 * Initiates Google OAuth sign-in via Supabase.
 * Redirects the browser to Google's OAuth consent screen and then to /auth/callback.
 *
 * @returns Error message string on failure, null on success (browser redirects).
 */
export async function loginWithGoogle(): Promise<string | null> {
  return _signInWithGoogle('login')
}

/**
 * Initiates Google OAuth sign-up via Supabase.
 * Redirects the browser to Google's OAuth consent screen and then to /auth/callback.
 *
 * @returns Error message string on failure, null on success (browser redirects).
 */
export async function signupWithGoogle(): Promise<string | null> {
  return _signInWithGoogle('signup')
}

/**
 * Internal helper — shared logic for Google OAuth flow.
 * Uses the browser client to open the OAuth redirect to Supabase's Google provider.
 *
 * @param _flow — 'login' or 'signup' (informational; both use the same Supabase endpoint)
 * @returns Error message string on failure, null on success (browser navigates away).
 */
async function _signInWithGoogle(_flow: 'login' | 'signup'): Promise<string | null> {
  const supabase = createClient()
  if (!supabase) {
    return 'Service temporarily unavailable. Please refresh and try again.'
  }

  if (typeof window === 'undefined') {
    return 'OAuth must be initiated from the browser.'
  }

  const origin = window.location.origin
  const redirectTo = `${origin}/auth/callback`

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
    },
  })

  if (error) {
    return error.message
  }

  // On success, Supabase redirects the browser — we never reach here.
  return null
}

/**
 * Update the authenticated user's profile — name and avatar URL.
 *
 * Flow:
 *   1. Update user_metadata.name via Supabase Auth (authoritative for display)
 *   2. Upsert profiles table with name + avatar_url (persists across token refreshes)
 *
 * Both operations must succeed. If Auth update succeeds but profiles upsert fails,
 * the error is logged but not re-thrown — auth metadata is the source of truth for
 * display; the profiles table is a performance optimisation.
 *
 * @throws ProfileUpdateError if the Auth update fails (e.g. network error,
 *   rate limit, session expired). Callers should catch this and redirect to login.
 */
export async function updateProfile(
  name: string,
  avatarUrl?: string | null
): Promise<AuthUser> {
  const supabase = createClient()
  if (!supabase) {
    throw new ProfileUpdateError(
      'Service temporarily unavailable. Please refresh and try again.',
      'SERVICE_UNAVAILABLE'
    )
  }

  // Step 1 — update Auth user_metadata (authoritative for name display)
  const { data: updateData, error: updateError } = await supabase.auth.updateUser({
    data: { name: name.trim() },
  })

  if (updateError) {
    throw new ProfileUpdateError(updateError.message, updateError.code)
  }

  const user = updateData.user

  // Step 2 — persist name + avatar_url to profiles table
  // avatarUrl === undefined means "not changed"; null means "clear avatar"
  const avatarValue = avatarUrl === undefined ? null : avatarUrl
  try {
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert(
        {
          id: user.id,
          name: name.trim(),
          avatar_url: avatarValue,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )

    if (profileError) {
      console.error('[auth] updateProfile — failed to persist to profiles:', profileError)
      // Non-blocking: auth metadata is already updated; profiles is a fallback.
    }
  } catch (err) {
    console.error('[auth] updateProfile — unexpected error persisting profile:', err)
  }

  return {
    id: user.id,
    name: user.user_metadata?.name as string | null ?? name.trim(),
    email: user.email ?? '',
    avatarUrl: avatarValue,
    telegramToken: null,
    telegramChatId: null,
    telegramActive: false,
  }
}

/**
 * Sign out the current user — clears the session cookie.
 */
export async function signOut(): Promise<void> {
  const supabase = createClient()
  if (!supabase) return

  await supabase.auth.signOut()
}
