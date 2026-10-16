import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { useNavigate, useParams } from 'react-router-dom'
import { AppBar, Scroll } from '../components/AppBar'
import { Avatar } from '../components/Avatar'
import { BottomSheet } from '../components/BottomSheet'
import { RadarCard } from '../components/RadarCard'
import { RelationTags } from '../components/RelationTags'
import { Card } from '../components/ui'
import { PLAYERS, FRIENDS } from '../data/mock'
import type { Dimension } from '../types'

export function PlayerProfile() {
  const { id } = useParams()
  const nav = useNavigate()
  const player = PLAYERS[id as keyof typeof PLAYERS] ?? PLAYERS.zhang
  const rec = FRIENDS.find((f) => f.id === player.id)
  const [dim, setDim] = useState<Dimension | null>(null)
  const trend = player.trend.map((v, i) => ({ i: i + 1, v }))

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <AppBar
        title="羽球档案"
        left={
          <button type="button" onClick={() => nav(-1)} className="p-1 text-white">
            <ChevronLeft />
          </button>
        }
      />
      <Scroll className="no-scrollbar pb-8 px-4 pt-3 space-y-3">
        <Card className="p-4 flex items-center gap-3">
          <Avatar id={player.id} size={56} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[18px] font-bold text-navy">{player.name}</span>
              {rec ? <RelationTags layer={rec.layer} via={rec.via} /> : null}
            </div>
            <div className="text-[12px] text-slate-500">{player.style}</div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-slate-400">综合评分</div>
            <div className="text-[32px] font-bold text-navy leading-none tabular-nums">{player.overall}</div>
          </div>
        </Card>

        {rec ? (
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-[13px] font-semibold text-navy">推荐理由</div>
              <div className="text-[20px] font-bold text-navy tabular-nums">{rec.matchScore}</div>
            </div>
            <div className="text-[12px] text-slate-500 mt-1">
              共同球局 {rec.commons} 场 · 共同球友 {rec.commonFriends} 人
            </div>
            <p className="text-[13px] text-navy mt-2 leading-relaxed">{rec.reason}</p>
            <button
              type="button"
              onClick={() => nav('/session/s1')}
              className="mt-3 w-full h-10 rounded-xl bg-shuttle text-navy font-semibold text-[13px]"
            >
              约一场
            </button>
          </Card>
        ) : null}

        <Card className="p-4">
          <div className="text-[13px] font-semibold text-navy mb-1">六维能力 · 点击分数看依据</div>
          <RadarCard dims={player.dims} onPick={(i) => setDim(player.dims[i])} />
        </Card>

        <Card className="p-4">
          <div className="text-[13px] font-semibold text-navy mb-2">标签</div>
          <div className="flex flex-wrap gap-2">
            {player.tags.map((t) => (
              <span key={t} className="text-[12px] bg-shuttle/30 text-navy px-2 py-1 rounded-lg">
                {t}
              </span>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-2">
          <Card className="p-3">
            <div className="text-[12px] text-good font-semibold mb-1">优势</div>
            {player.strengths.map((s) => (
              <div key={s} className="text-[12px] text-navy py-0.5">
                {s}
              </div>
            ))}
          </Card>
          <Card className="p-3">
            <div className="text-[12px] text-amber-600 font-semibold mb-1">待提升</div>
            {player.weaknesses.map((s) => (
              <div key={s} className="text-[12px] text-navy py-0.5">
                {s}
              </div>
            ))}
          </Card>
        </div>

        <Card className="p-4">
          <div className="text-[13px] font-semibold text-navy mb-2">最近10场综合评分</div>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend}>
                <XAxis dataKey="i" tick={{ fontSize: 10 }} />
                <YAxis domain={[70, 90]} width={24} tick={{ fontSize: 10 }} />
                <Line type="monotone" dataKey="v" stroke="#00529B" strokeWidth={2} dot={{ r: 3, fill: '#F6C445' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {player.id === 'zhang' ? (
          <button
            type="button"
            onClick={() => nav('/pair/zhang-wang')}
            className="w-full h-11 rounded-xl bg-navy text-white font-semibold"
          >
            查看与王晨的组合适配
          </button>
        ) : null}
      </Scroll>

      <BottomSheet
        open={!!dim}
        title={dim ? `${dim.name} ${dim.score}` : ''}
        onClose={() => setDim(null)}
      >
        {dim ? (
          <div className="space-y-2">
            <p className="text-[12px] text-slate-500">评分来自底层比赛指标加权，不是一次性生成的数字。</p>
            {dim.metrics.map((m) => (
              <div key={m.name} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="text-[13px] text-navy">{m.name}</div>
                  <div className="text-[11px] text-slate-400">{m.raw}</div>
                </div>
                <div className="w-24 h-1.5 bg-app rounded-full overflow-hidden">
                  <div className="h-full bg-shuttle" style={{ width: `${m.score}%` }} />
                </div>
                <div className="w-8 text-right font-semibold text-navy tabular-nums">{m.score}</div>
              </div>
            ))}
          </div>
        ) : null}
      </BottomSheet>
    </div>
  )
}
