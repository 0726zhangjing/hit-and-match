import { PLAYERS } from '../data/mock'
import type { PlayerId, Point, Shot } from '../types'

const NET = 670

function markerId(color: string, dashed?: boolean) {
  return `m-${color.replace('#', '')}${dashed ? 'd' : ''}`
}

function Arrow({
  from,
  to,
  color,
  dashed,
}: {
  from: Point
  to: Point
  color: string
  dashed?: boolean
}) {
  return (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={color}
      strokeWidth={8}
      strokeLinecap="round"
      strokeDasharray={dashed ? '18 14' : undefined}
      markerEnd={`url(#${markerId(color, dashed)})`}
    />
  )
}

export function Court({ shot, showRec }: { shot: Shot; showRec: boolean }) {
  const onCourt: PlayerId[] = ['zhang', 'wang', 'li', 'chen']
  return (
    <svg viewBox="0 0 610 1340" className="w-full h-full" role="img" aria-label="双打战术球场">
      <defs>
        {[
          ['#F6C445', false],
          ['#F6C445', true],
          ['#3B82F6', false],
        ].map(([c, d]) => (
          <marker
            key={String(c) + String(d)}
            id={markerId(String(c), Boolean(d))}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M0,1 L10,5 L0,9 z" fill={String(c)} />
          </marker>
        ))}
      </defs>
      <rect width="610" height="1340" fill="#1B7A4A" />
      <rect y="670" width="610" height="670" fill="#196F44" />
      <rect x="4" y="4" width="602" height="1332" fill="none" stroke="#EAF6EF" strokeWidth="8" />
      <line x1="46" y1="4" x2="46" y2="1336" stroke="#EAF6EF" strokeWidth="3" opacity="0.55" />
      <line x1="564" y1="4" x2="564" y2="1336" stroke="#EAF6EF" strokeWidth="3" opacity="0.55" />
      <line x1="0" y1="76" x2="610" y2="76" stroke="#EAF6EF" strokeWidth="4" />
      <line x1="0" y1="1264" x2="610" y2="1264" stroke="#EAF6EF" strokeWidth="4" />
      <line x1="0" y1="472" x2="610" y2="472" stroke="#EAF6EF" strokeWidth="4" />
      <line x1="0" y1="868" x2="610" y2="868" stroke="#EAF6EF" strokeWidth="4" />
      <line x1="305" y1="76" x2="305" y2="472" stroke="#EAF6EF" strokeWidth="4" />
      <line x1="305" y1="868" x2="305" y2="1264" stroke="#EAF6EF" strokeWidth="4" />
      <line x1="0" y1={NET} x2="610" y2={NET} stroke="#F6C445" strokeWidth="7" />
      <text x="305" y="662" textAnchor="middle" fill="#F6C445" fontSize="28" fontWeight="700">
        网
      </text>
      <text x="16" y="36" fill="#EAF6EF" fontSize="24">
        李明 / 马浩
      </text>
      <text x="16" y="1318" fill="#EAF6EF" fontSize="24">
        张悦 / 王晨
      </text>

      {shot.moves.map((m) => (
        <Arrow key={`mv-${m.playerId}`} from={m.from} to={m.to} color="#3B82F6" />
      ))}
      <Arrow from={shot.shuttle.from} to={shot.shuttle.to} color="#F6C445" />
      {showRec && shot.recShuttle ? (
        <Arrow from={shot.recShuttle.from} to={shot.recShuttle.to} color="#F6C445" dashed />
      ) : null}

      {onCourt.map((id) => {
        const p = shot.positions[id]
        const player = PLAYERS[id]
        return (
          <g key={id}>
            <circle cx={p.x} cy={p.y} r="28" fill={player.color} stroke="#fff" strokeWidth="4" />
            <text x={p.x} y={p.y + 8} textAnchor="middle" fill="#fff" fontSize="22" fontWeight="700">
              {player.initial}
            </text>
            <text x={p.x} y={p.y - 38} textAnchor="middle" fill="#fff" fontSize="20" fontWeight="600">
              {player.name}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
