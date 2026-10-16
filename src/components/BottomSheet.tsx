import type { ReactNode } from 'react'
import { X } from 'lucide-react'

export function BottomSheet({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}) {
  if (!open) return null
  return (
    <div className="absolute inset-0 z-50">
      <button type="button" className="absolute inset-0 bg-black/40" onClick={onClose} aria-label="关闭" />
      <div className="absolute left-0 right-0 bottom-0 bg-white rounded-t-2xl p-4 max-h-[72%] overflow-auto shadow-[0_-8px_30px_rgba(18,48,90,0.15)]">
        <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-3" />
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[16px] font-semibold text-navy">{title}</h2>
          <button type="button" onClick={onClose} className="p-1 text-slate-400">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
