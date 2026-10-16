import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`bg-white rounded-2xl shadow-[0_6px_20px_rgba(0,82,155,0.08)] ${className}`}>{children}</div>
}

export function SectionTitle({ children, extra }: { children: ReactNode; extra?: ReactNode }) {
  return (
    <div className="flex items-center justify-between px-1 mb-2">
      <h2 className="text-[15px] font-semibold text-navy">{children}</h2>
      {extra}
    </div>
  )
}

export function RowLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="flex items-center justify-between py-3">
      <div className="min-w-0">{children}</div>
      <ChevronRight size={16} className="text-slate-300 shrink-0" />
    </Link>
  )
}

export function FilterChips({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (v: string) => void
  options: string[]
}) {
  return (
    <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`shrink-0 h-7 px-2.5 rounded-full text-[12px] font-medium ${
            value === o ? 'bg-navy text-white' : 'bg-white text-navy'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

export function PrimaryButton({
  children,
  onClick,
  to,
}: {
  children: ReactNode
  onClick?: () => void
  to?: string
}) {
  const cls =
    'w-full h-11 rounded-xl bg-shuttle text-navy font-semibold text-[15px] flex items-center justify-center active:scale-[0.99]'
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  )
}
