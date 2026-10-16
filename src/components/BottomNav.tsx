import { CalendarDays, CircleUserRound, Dumbbell, House, Play } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', label: '首页', icon: House, end: true },
  { to: '/prepare', label: '备战', icon: Dumbbell, end: false },
  { to: '/play', label: '打球', icon: Play, end: false },
  { to: '/review', label: '复盘', icon: CalendarDays, end: false },
  { to: '/me', label: '我的', icon: CircleUserRound, end: false },
]

export function BottomNav() {
  return (
    <nav className="h-[62px] bg-white border-t border-navy/15 grid grid-cols-5 shrink-0 z-20">
      {tabs.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          end={t.end}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 text-[11px] ${
              isActive ? 'text-navy font-semibold' : 'text-slate-400'
            }`
          }
        >
          <t.icon size={20} strokeWidth={2.1} />
          {t.label}
        </NavLink>
      ))}
    </nav>
  )
}
