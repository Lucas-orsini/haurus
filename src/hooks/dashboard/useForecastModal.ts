'use client'

import { useState, useCallback } from 'react'

/**
 * Manages the Forecast modal open/close state.
 *
 * Usage:
 *   const { isOpen, selectedTourneyName, openModal, closeModal } = useForecastModal()
 */
export function useForecastModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTourneyName, setSelectedTourneyName] = useState<string | null>(null)

  const openModal = useCallback((tourneyName: string) => {
    setSelectedTourneyName(tourneyName)
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    // Keep selectedTourneyName so the modal can skip re-fetch on re-open for the same tournament
  }, [])

  return {
    isOpen,
    selectedTourneyName,
    openModal,
    closeModal,
  }
}
