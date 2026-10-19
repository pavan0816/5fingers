import React from "react"
import { CheckCircle, Info, X } from "lucide-react"

export interface ToastMessage {
  id: string
  title: string
  description?: string
  type?: "success" | "info"
}

interface ToastProps {
  toasts: ToastMessage[]
  onDismiss: (id: string) => void
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto p-4 rounded-xl bg-[var(--night)] border border-[var(--gold)]/50 shadow-2xl backdrop-blur-md flex items-start gap-3 animate-slide-up text-xs text-[var(--ivory)]"
        >
          <CheckCircle className="w-4 h-4 text-[var(--gold)] shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white">{toast.title}</p>
            {toast.description && (
              <p className="text-[11px] text-[var(--muted)] mt-0.5">
                {toast.description}
              </p>
            )}
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-[var(--muted)] hover:text-white p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  )
}
