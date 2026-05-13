'use client'

import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ConfirmDialogProps {
  title: string
  message: string
  confirmLabel: string
  cancelLabel?: string
  cancelLabelDeleting?: string
  onConfirm: () => Promise<void>
  onCancel: () => void
  loading: boolean
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15, ease: 'easeOut' as const } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: 'easeIn' as const } },
}

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 4 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' as const } },
  exit: { opacity: 0, scale: 0.96, y: 4, transition: { duration: 0.15, ease: 'easeIn' as const } },
}

export default function ConfirmDialog({
  title,
  message,
  confirmLabel,
  cancelLabel,
  cancelLabelDeleting,
  onConfirm,
  onCancel,
  loading,
}: ConfirmDialogProps) {
  const defaultCancelLabel = cancelLabel ?? 'Annuler'
  const defaultDeletingLabel = cancelLabelDeleting ?? 'Suppression...'

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="overlay"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onCancel}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        <AnimatePresence mode="wait">
          <motion.div
            key="dialog"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-sm flex flex-col bg-[var(--surface-1)] border border-[var(--border-md)] rounded-xl shadow-2xl overflow-hidden"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-5 pt-5 pb-4">
              <h2
                id="confirm-dialog-title"
                className="text-sm font-semibold text-[var(--text-1)]"
              >
                {title}
              </h2>
              <p className="text-xs text-[var(--text-3)] mt-2 leading-relaxed">
                {message}
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 px-5 pb-5 border-t border-[var(--border)] pt-4 mt-4 shrink-0">
              <button
                type="button"
                disabled={loading}
                onClick={onCancel}
                className={cn(
                  'h-8 px-4 flex items-center justify-center rounded-md text-xs font-medium',
                  'border border-[var(--border-md)] bg-transparent text-[var(--text-2)]',
                  'hover:text-[var(--text-1)] hover:bg-white/[0.04] hover:border-[var(--border-hi)]',
                  'transition-colors duration-150',
                  'disabled:opacity-40 disabled:cursor-not-allowed',
                )}
              >
                {defaultCancelLabel}
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={onConfirm}
                className={cn(
                  'h-8 px-4 flex items-center justify-center gap-2 rounded-md text-xs font-medium',
                  'border border-[var(--red)]/25 bg-[var(--red)]/[0.06] text-[var(--red)]',
                  'hover:bg-[var(--red)]/10',
                  'transition-colors duration-150',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                )}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin shrink-0"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    {defaultDeletingLabel}
                  </>
                ) : (
                  confirmLabel
                )}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}
