import { Bell, Search } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function SearchBell() {
  return (
    <div className="flex items-center gap-2">
      <Link to="/search" aria-label="搜索" className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
        <Search size={16} className="text-white" />
      </Link>
      <Link to="/messages" aria-label="消息" className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center relative">
        <Bell size={16} className="text-white" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-shuttle rounded-full" />
      </Link>
    </div>
  )
}

export function AppBar({
  title,
  left,
  right,
  brand,
}: {
  title?: ReactNode
  left?: ReactNode
  right?: ReactNode
  brand?: ReactNode
}) {
  return (
    <header className="h-12 px-3 flex items-center justify-between bg-navy text-white shrink-0 z-20">
      {brand ? (
        <>
          <div className="min-w-0">{brand}</div>
          <div className="flex items-center justify-end gap-1">{right}</div>
        </>
      ) : (
        <>
          <div className="min-w-14 flex items-center">{left}</div>
          <div className="flex-1 text-center font-semibold text-white text-[15px] truncate px-2">{title}</div>
          <div className="min-w-14 flex items-center justify-end gap-1">{right}</div>
        </>
      )}
    </header>
  )
}

export function Scroll({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`flex-1 min-h-0 overflow-y-auto no-scrollbar ${className}`}>{children}</div>
}
