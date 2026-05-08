/**
 * Resend singleton — initialise le client Resend une seule fois.
 * Le client est créé lazily pour éviter les crashs au build time
 * quand les env vars ne sont pas encore disponibles.
 */
import { Resend } from 'resend'

let _instance: Resend | null = null

function createInstance(): Resend {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error(
      'RESEND_API_KEY is not set. ' +
        'Please add RESEND_API_KEY to your environment variables.'
    )
  }
  return new Resend(apiKey)
}

/**
 * Lazy singleton — l'instance est créée au premier appel,
 * réutilisée pour tous les appels suivants.
 */
export function getResend(): Resend {
  if (!_instance) {
    _instance = createInstance()
  }
  return _instance
}

/**
 * Adresse expéditeur — doit correspondre à un domaine vérifié dans Resend Dashboard.
 * En dev sans domaine vérifié, utiliser 'onboarding@resend.dev' qui est limité
 * à l'envoi vers l'owner du compte Resend.
 */
export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
