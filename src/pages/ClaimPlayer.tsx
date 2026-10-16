import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Scroll } from '../components/AppBar'
import { Avatar } from '../components/Avatar'
import { RadarCard } from '../components/RadarCard'
import { Card, PrimaryButton } from '../components/ui'
import { useDemo } from '../context/DemoContext'
import { MATCH, PLAYERS } from '../data/mock'
import type { PlayerId } from '../types'

const ids: PlayerId[] = [...MATCH.teamA, ...MATCH.teamB]

export function ClaimPlayer() {
  const nav = useNavigate()
  const { claimedId, claim } = useDemo()
  const [pending, setPending] = useState<PlayerId | null>(null)
  const [done, setDone] = useState(false)
  const mine = claimedId ? PLAYERS[claimedId] : PLAYERS.zhang

  if (done) {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <AppBar title="认领成功" />
        <Scroll className="px-4 py-4 space-y-3">
          <Card className="p-5 text-center">
            <div className="text-[13px] text-good font-semibold">你的羽球档案已生成</div>
            <div className="flex justify-center mt-3">
              <Avatar id={mine.id} size={64} />
            </div>
            <div className="text-[20px] font-bold text-navy mt-2">{mine.name}</div>
            <div className="text-[12px] text-slate-500">{mine.style}</div>
            <div className="text-[40px] font-bold text-navy tabular-nums">{mine.overall}</div>
          </Card>
          <Card className="p-4">
            <RadarCard dims={mine.dims} />
          </Card>
          <Card className="p-4">
            <div className="text-[13px] font-semibold text-navy">通过这场比赛</div>
            <p className="text-[13px] text-slate-600 mt-1">
              你新增了 3 位羽球关系：{PLAYERS.wang.name}、{PLAYERS.li.name}、{PLAYERS.chen.name}。
            </p>
          </Card>
          <PrimaryButton to="/play?tab=friends">查看我的羽球圈</PrimaryButton>
        </Scroll>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <AppBar
        title="球员认领"
        left={
          <button type="button" onClick={() => nav(-1)} className="p-1 text-white">
            <ChevronLeft />
          </button>
        }
      />
        <Scroll className="px-4 py-4 space-y-3">
          <div>
            <div className="text-[18px] font-bold text-navy">这场比赛里，有你吗？</div>
            <p className="text-[12px] text-slate-500 mt-1">认领后，本场数据会写入你的羽球档案与关系网络。</p>
          </div>
          {ids.map((id) => {
            const p = PLAYERS[id]
            const claimed = p.registered
            return (
              <Card key={id} className="p-3 flex items-center gap-3">
                <Avatar id={id} size={44} />
                <div className="flex-1">
                  <div className="text-[14px] font-semibold text-navy">{p.name}</div>
                  <div className="text-[12px] text-slate-500">
                    {claimed ? `已注册 · 匹配${p.matchPct ?? 90}%` : '等待认领'}
                  </div>
                </div>
                {claimed ? (
                  <button
                    type="button"
                    onClick={() => setPending(id)}
                    className="h-9 px-3 rounded-lg bg-app text-navy text-[12px] font-semibold"
                  >
                    这是我
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPending(id)}
                    className="h-9 px-3 rounded-lg bg-shuttle text-navy text-[12px] font-semibold"
                  >
                    这是我
                  </button>
                )}
              </Card>
            )
          })}
        </Scroll>

      {pending ? (
        <div className="absolute inset-0 z-50">
          <button type="button" className="absolute inset-0 bg-black/40" onClick={() => setPending(null)} />
          <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 bg-white rounded-2xl p-5">
            <div className="text-[16px] font-semibold text-navy">确认这是你本人吗？</div>
            <p className="text-[13px] text-slate-500 mt-2">
              将把本场 {PLAYERS[pending].name} 的击球数据写入你的档案。
            </p>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button type="button" className="h-10 rounded-xl bg-app text-navy" onClick={() => setPending(null)}>
                取消
              </button>
              <button
                type="button"
                className="h-10 rounded-xl bg-shuttle text-navy font-semibold"
                onClick={() => {
                  claim(pending)
                  setPending(null)
                  setDone(true)
                }}
              >
                确认认领
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
