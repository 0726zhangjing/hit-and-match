import { ChevronLeft } from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppBar, Scroll } from '../components/AppBar'
import { Card } from '../components/ui'
import { CLASSIC_RALLIES, FRIENDS, MATCH, PLAYERS, SESSIONS, VENUES } from '../data/mock'

export function Search() {
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const key = q.trim()

  const result = useMemo(() => {
    if (!key) return { venues: VENUES.slice(0, 3), sessions: SESSIONS.slice(0, 2), friends: FRIENDS.slice(0, 3), classics: CLASSIC_RALLIES.slice(0, 2) }
    return {
      venues: VENUES.filter((v) => v.name.includes(key) || v.area.includes(key) || v.tags.some((t) => t.includes(key))),
      sessions: SESSIONS.filter((s) => s.venue.includes(key) || s.type.includes(key) || s.tags.some((t) => t.includes(key))),
      friends: FRIENDS.filter((f) => PLAYERS[f.id].name.includes(key) || PLAYERS[f.id].style.includes(key)),
      classics: CLASSIC_RALLIES.filter(
        (c) =>
          c.title.includes(key) ||
          c.event.includes(key) ||
          c.tactic.includes(key) ||
          c.sideA.includes(key) ||
          c.sideB.includes(key),
      ),
    }
  }, [key])

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <AppBar
        title="搜索"
        left={
          <button type="button" onClick={() => nav(-1)} className="p-1 text-white">
            <ChevronLeft />
          </button>
        }
      />
      <div className="shrink-0 px-4 py-2 bg-app">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="场馆、球局、球友、经典回合"
          className="w-full h-10 rounded-xl bg-white px-3 text-[14px] text-navy outline-none"
        />
      </div>
      <Scroll className="px-4 pt-3 pb-6 space-y-3">
        <Section label="场馆" to="/play?tab=venues">
          {result.venues.map((v) => (
            <Link key={v.id} to={`/venue/${v.id}`} className="block py-2 text-[13px] text-navy">
              {v.name} · {v.area}
            </Link>
          ))}
        </Section>
        <Section label="球局" to="/play?tab=sessions">
          {result.sessions.map((s) => (
            <Link key={s.id} to={`/session/${s.id}`} className="block py-2 text-[13px] text-navy">
              {s.when} {s.time} · {s.venue}
            </Link>
          ))}
        </Section>
        <Section label="球友" to="/play?tab=friends">
          {result.friends.map((f) => (
            <Link key={f.id} to={`/player/${f.id}`} className="block py-2 text-[13px] text-navy">
              {PLAYERS[f.id].name} · {PLAYERS[f.id].style}
            </Link>
          ))}
        </Section>
        <Section label="经典回合" to="/prepare">
          {result.classics.map((c) => (
            <Link key={c.id} to={`/match/${MATCH.id}/rally/${c.rallyId}`} className="block py-2 text-[13px] text-navy">
              {c.event} · {c.sideA} VS {c.sideB}
            </Link>
          ))}
        </Section>
      </Scroll>
    </div>
  )
}

function Section({ label, to, children }: { label: string; to: string; children: ReactNode }) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-1">
        <div className="text-[13px] font-semibold text-navy">{label}</div>
        <Link to={to} className="text-[12px] text-accent">
          全部
        </Link>
      </div>
      {children}
    </Card>
  )
}
