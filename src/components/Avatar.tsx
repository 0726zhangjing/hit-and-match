import { PLAYERS } from '../data/mock'
import type { PlayerId } from '../types'

export function Avatar({ id, size = 40 }: { id: PlayerId; size?: number }) {
  const p = PLAYERS[id]
  return (
    <div
      className="rounded-full text-white font-semibold flex items-center justify-center shrink-0"
      style={{ width: size, height: size, background: p.color, fontSize: size * 0.38 }}
    >
      {p.initial}
    </div>
  )
}
