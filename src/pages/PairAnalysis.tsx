import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Scroll } from '../components/AppBar'
import { Avatar } from '../components/Avatar'
import { BottomSheet } from '../components/BottomSheet'
import { RadarCard } from '../components/RadarCard'
import { Card } from '../components/ui'
import { PAIR, PLAYERS } from '../data/mock'
import type { Dimension } from '../types'

export function PairAnalysis() {
  const nav = useNavigate()
  const [dim, setDim] = useState<Dimension | null>(null)
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <AppBar
        title="组合适配"
        left={
          <button type="button" onClick={() => nav(-1)} className="p-1 text-white">
            <ChevronLeft />
          </button>
        }
      />
      <Scroll className="px-4 pt-3 pb-8 space-y-3">
        <Card className="p-4">
          <div className="flex items-center justify-center gap-3">
            <Avatar id="zhang" size={48} />
            <div className="text-navy font-bold">×</div>
            <Avatar id="wang" size={48} />
          </div>
          <div className="text-center mt-2 text-[16px] font-semibold text-navy">
            {PLAYERS.zhang.name} × {PLAYERS.wang.name}
          </div>
          <div className="text-center text-[12px] text-slate-500">{PAIR.type}</div>
          <div className="text-center mt-2">
            <div className="text-[11px] text-slate-400">组合适配度</div>
            <div className="text-[40px] font-bold text-navy leading-none tabular-nums">{PAIR.score}</div>
          </div>
        </Card>
        <Card className="p-4">
          <RadarCard dims={PAIR.dims} onPick={(i) => setDim(PAIR.dims[i])} />
        </Card>
        <Card className="p-4">
          <div className="text-[13px] font-semibold text-navy mb-1">AI解释</div>
          <p className="text-[13px] text-slate-600 leading-relaxed">{PAIR.quote}</p>
        </Card>
        <div className="grid grid-cols-2 gap-2">
          {[
            ['共同比赛', `${PAIR.together}场`],
            ['胜率', `${PAIR.winRate}%`],
            ['平均连续进攻', `${PAIR.avgAttack}拍`],
            ['轮转冲突', PAIR.rotation],
          ].map(([k, v]) => (
            <Card key={k} className="p-3">
              <div className="text-[11px] text-slate-400">{k}</div>
              <div className="text-[18px] font-semibold text-navy mt-1">{v}</div>
            </Card>
          ))}
        </div>
        <button
          type="button"
          onClick={() => nav('/claim/m1')}
          className="w-full h-11 rounded-xl bg-shuttle text-navy font-semibold"
        >
          这场比赛里，有你吗？去认领
        </button>
      </Scroll>
      <BottomSheet open={!!dim} title={dim ? `${dim.name} ${dim.score}` : ''} onClose={() => setDim(null)}>
        {dim?.metrics.map((m) => (
          <div key={m.name} className="flex items-center py-2">
            <div className="flex-1">
              <div className="text-[13px] text-navy">{m.name}</div>
              <div className="text-[11px] text-slate-400">{m.raw}</div>
            </div>
            <div className="font-semibold text-navy">{m.score}</div>
          </div>
        ))}
      </BottomSheet>
    </div>
  )
}
