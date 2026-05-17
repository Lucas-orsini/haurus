import type { MetricsNamespace, UnsubscribeNamespace } from './types'

export const fr: MetricsNamespace = {
  page: {
    title: 'Comprendre les métriques',
    subtitle:
      'Chaque métrique expliquée simplement — descriptions courtes pour tous, contenus experts pour approfondir.',
  },
  toolbar: {
    searchPlaceholder: 'Rechercher une métrique...',
    metricCount: {
      one: 'métrique',
      other: 'métriques',
    },
  },
  badge: {
    beta: 'Beta',
  },
  modal: {
    closeLabel: 'Fermer',
  },
  card: {
    openDetailsAria: 'Ouvrir les détails de',
  },
  empty: {
    title: 'Aucune métrique ne correspond à votre recherche',
    subtitle: 'Essayez un autre terme — nom, description ou surface.',
  },
}

export const frUnsubscribe: UnsubscribeNamespace = {
  page: {
    title: 'Se désinscrire de la newsletter ?',
    description:
      "Vous ne recevrez plus nos mises à jour de newsletter. Vous pouvez vous réabonner à tout moment.",
    footerNote: 'Cela vous désinscrira de tous les e-mails marketing.',
    emailLabel: 'Adresse concernée',
  },
  form: {
    confirmButton: 'Se désabonner',
    keepSubscription: 'Garder mon abonnement',
  },
  success: {
    title: 'Désabonnement confirmé',
    message:
      'Vous avez été retiré de notre liste de diffusion. Vous ne recevrez plus nos newsletters.',
  },
  error: {
    initFailed: 'Service temporairement indisponible. Veuillez actualiser et réessayer.',
    generic: 'Une erreur est survenue. Veuillez réessayer.',
  },
  common: {
    loading: 'Vérification...',
    retry: 'Réessayer',
    backToSite: 'Retour au site',
  },
  confirmDialog: {
    title: 'Confirmer le désabonnement',
    message:
      'Êtes-vous sûr de vouloir vous désabonner de la newsletter ? Cette action est irréversible.',
    confirmLabel: 'Confirmer',
  },
}
