import type { MetricsNamespace, UnsubscribeNamespace } from './types'

export const es: MetricsNamespace = {
  page: {
    title: 'Entender las métricas',
    subtitle:
      'Cada métrica explicada de forma sencilla — descripciones cortas para todos, contenidos expertos para profundizar.',
  },
  toolbar: {
    searchPlaceholder: 'Buscar una métrica...',
    metricCount: {
      one: 'métrica',
      other: 'métricas',
    },
  },
  badge: {
    beta: 'Beta',
  },
  modal: {
    closeLabel: 'Cerrar',
  },
  card: {
    openDetailsAria: 'Abrir detalles de',
  },
  empty: {
    title: 'Ninguna métrica coincide con tu búsqueda',
    subtitle: 'Prueba otro término — nombre, descripción o superficie.',
  },
}

export const esUnsubscribe: UnsubscribeNamespace = {
  page: {
    title: '¿Cancelar la suscripción al newsletter?',
    description:
      'Ya no recibirás nuestras actualizaciones del newsletter. Puedes volver a suscribirte en cualquier momento.',
    footerNote: 'Esto cancelará tu suscripción a todos los correos de marketing.',
    emailLabel: 'Dirección afectada',
  },
  form: {
    confirmButton: 'Cancelar suscripción',
    keepSubscription: 'Mantener mi suscripción',
  },
  success: {
    title: 'Cancelación confirmada',
    message:
      'Has sido eliminado de nuestra lista de difusión. Ya no recibirás nuestros boletines.',
  },
  error: {
    initFailed: 'Servicio temporalmente no disponible. Por favor, actualiza e inténtalo de nuevo.',
    generic: 'Algo salió mal. Por favor, inténtalo de nuevo.',
  },
  common: {
    loading: 'Verificando...',
    retry: 'Reintentar',
    backToSite: 'Volver al sitio',
  },
  confirmDialog: {
    title: 'Confirmar cancelación',
    message:
      '¿Estás seguro de que quieres cancelar tu suscripción al newsletter? Esta acción es irreversible.',
    confirmLabel: 'Confirmar',
  },
}
