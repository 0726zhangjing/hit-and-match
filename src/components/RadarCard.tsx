import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts'
import type { Dimension } from '../types'

export function RadarCard({
  dims,
  onPick,
}: {
  dims: Pick<Dimension, 'name' | 'score'>[]
  onPick?: (index: number) => void
}) {
  const data = dims.map((d) => ({
    name: d.name.length > 4 ? d.name.slice(0, 2) : d.name,
    full: d.name,
    score: d.score,
  }))
  return (
    <div>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} cx="50%" cy="52%" outerRadius="68%">
            <PolarGrid stroke="#D7E0EA" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
            <PolarAngleAxis dataKey="name" tick={{ fontSize: 11, fill: '#00529B' }} />
            <Radar dataKey="score" stroke="#00529B" fill="#F6C445" fillOpacity={0.5} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-1">
        {dims.map((d, i) => (
          <button
            key={d.name}
            type="button"
            onClick={() => onPick?.(i)}
            className="text-left bg-app rounded-xl px-3 py-2"
          >
            <div className="text-[11px] text-slate-500">{d.name}</div>
            <div className="text-[18px] font-semibold text-navy tabular-nums">{d.score}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
