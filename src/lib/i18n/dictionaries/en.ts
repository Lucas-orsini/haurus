import type { MetricsNamespace, UnsubscribeNamespace } from './types'

export const en: MetricsNamespace = {
  page: {
    title: 'Understanding metrics',
    subtitle:
      'Every metric explained simply — short descriptions for everyone, expert content to dive deeper.',
  },
  toolbar: {
    searchPlaceholder: 'Search for a metric...',
    metricCount: {
      one: 'metric',
      other: 'metrics',
    },
  },
  badge: {
    beta: 'Beta',
  },
  modal: {
    closeLabel: 'Close',
  },
  card: {
    openDetailsAria: 'Open details of',
  },
  empty: {
    title: 'No metrics match your search',
    subtitle: 'Try another term — name, description, or surface.',
  },
}

export const enUnsubscribe: UnsubscribeNamespace = {
  page: {
    title: 'Unsubscribe from newsletter?',
    description:
      'You will no longer receive our newsletter updates. You can resubscribe anytime.',
    footerNote: 'This will unsubscribe you from all marketing emails.',
    emailLabel: 'Address concerned',
  },
  form: {
    confirmButton: 'Unsubscribe',
    keepSubscription: 'Keep my subscription',
  },
  success: {
    title: 'Unsubscription confirmed',
    message:
      'You have been removed from our mailing list. You will no longer receive our newsletters.',
  },
  error: {
    initFailed: 'Service temporarily unavailable. Please refresh and try again.',
    generic: 'Something went wrong. Please try again.',
  },
  common: {
    loading: 'Checking...',
    retry: 'Retry',
    backToSite: 'Back to site',
  },
  confirmDialog: {
    title: 'Confirm unsubscription',
    message:
      'Are you sure you want to unsubscribe from the newsletter? This action is irreversible.',
    confirmLabel: 'Confirm',
  },
}
