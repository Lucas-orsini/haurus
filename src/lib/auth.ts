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
  name: string
  email: string
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
 * Safe to call from Client Components only.
 */
export async function getSession(): Promise<AuthUser | null> {
  const supabase = createClient()
  if (!supabase) return null

  const { data } = await supabase.auth.getSession()
  const session = data.session

  if (!session?.user) return null

  const user = session.user
  return {
    id: user.id,
    name: user.user_metadata?.name ?? '',
    email: user.email ?? '',
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
    name: user.user_metadata?.name ?? '',
    email: user.email ?? '',
  }
}

/**
 * Sign up with email + password + name via Supabase Auth.
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

  // Role 'beta' is assigned by the PostgreSQL trigger on auth.users (handle_new_user).
  // No client-side upsert needed — the trigger runs atomically in the same transaction.

  return {
    id: user.id,
    name: user.user_metadata?.name ?? '',
    email: user.email ?? '',
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
