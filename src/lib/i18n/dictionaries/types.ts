export interface MetricsNamespace {
  page: {
    title: string
    subtitle: string
  }
  toolbar: {
    searchPlaceholder: string
    metricCount: {
      one: string
      other: string
    }
  }
  badge: {
    beta: string
  }
  modal: {
    closeLabel: string
  }
  card: {
    openDetailsAria: string
  }
  empty: {
    title: string
    subtitle: string
  }
}

export interface UnsubscribeNamespace {
  page: {
    title: string
    description: string
    footerNote: string
    emailLabel: string
  }
  form: {
    confirmButton: string
    keepSubscription: string
  }
  success: {
    title: string
    message: string
  }
  error: {
    initFailed: string
    generic: string
  }
  common: {
    loading: string
    retry: string
    backToSite: string
  }
  confirmDialog: {
    title: string
    message: string
    confirmLabel: string
  }
}
