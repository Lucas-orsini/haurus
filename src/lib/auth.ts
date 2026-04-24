/**
 * Mock authentication utilities — NO REAL NETWORK CALLS.
 * Session stored in localStorage, consumed by LoginForm/SignupForm.
 */

// ── Shared type ────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string
  name: string
  email: string
}

// ── Session key ────────────────────────────────────────────────────────────────

const SESSION_KEY = 'haurus:session'

// ── Validation helpers ─────────────────────────────────────────────────────────

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

// ── Session helpers ────────────────────────────────────────────────────────────

/** Inflate a plain object to an AuthUser (avoids returning raw JSON) */
function inflateUser(raw: { id: string; name: string; email: string }): AuthUser {
  return {
    id: String(raw.id ?? ''),
    name: String(raw.name ?? '').trim(),
    email: String(raw.email ?? '').trim().toLowerCase(),
  }
}

/**
 * Read the current session from localStorage.
 * @returns AuthUser if session exists and is valid, null otherwise.
 */
export function getSession(): AuthUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    return inflateUser(parsed)
  } catch {
    return null
  }
}

/**
 * Persist a user session to localStorage.
 */
function setSession(user: AuthUser): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

/**
 * Remove the session from localStorage.
 */
export function clearSession(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(SESSION_KEY)
}

// ── Mock auth actions ──────────────────────────────────────────────────────────

/** Mock login — validates inputs, stores session, returns user or throws. */
export function mockLogin(email: string, password: string): AuthUser {
  const emailError = validateEmail(email)
  if (emailError) throw new Error(emailError)

  const passwordError = validatePassword(password)
  if (passwordError) throw new Error(passwordError)

  // Simulate a mock user — replace with real auth call when backend is connected.
  const user: AuthUser = {
    id: crypto.randomUUID(),
    name: email.trim().split('@')[0],
    email: email.trim().toLowerCase(),
  }

  setSession(user)
  return user
}

/** Mock signup — validates inputs, stores session, returns user or throws. */
export function mockSignup(name: string, email: string, password: string): AuthUser {
  const nameError = validateName(name)
  if (nameError) throw new Error(nameError)

  const emailError = validateEmail(email)
  if (emailError) throw new Error(emailError)

  const passwordError = validatePassword(password)
  if (passwordError) throw new Error(passwordError)

  const user: AuthUser = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
  }

  setSession(user)
  return user
}
