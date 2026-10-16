import { ChevronLeft, Share2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { AppBar, Scroll } from '../components/AppBar'
import { Avatar } from '../components/Avatar'
import { Card, PrimaryButton, SectionTitle } from '../components/ui'
import { MATCH, PAIR, PLAYERS } from '../data/mock'
import { useDemo } from '../context/DemoContext'

export function MatchAnalysis() {
  const nav = useNavigate()
  const { shareRally } = useDemo()
  const a = MATCH.teamA.map((id) => PLAYERS[id])
  const b = MATCH.teamB.map((id) => PLAYERS[id])
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <AppBar
        title="AI比赛分析"
        left={
          <button type="button" onClick={() => nav(-1)} className="p-1 text-white">
            <ChevronLeft />
          </button>
        }
        right={
          <button
            type="button"
            className="p-1 text-white"
            onClick={() => {
              shareRally('r07')
              nav('/review')
            }}
          >
            <Share2 size={18} />
          </button>
        }
      />
      <Scroll className="pb-6">
        <div className="h-44 bg-navy-deep relative">
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_70%_30%,#F6C445,transparent_40%)]" />
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="text-[12px] text-white/70">
              {MATCH.date} · {MATCH.venue}
            </div>
            <div className="text-[18px] font-semibold tabular-nums">{MATCH.sets.join('  ')}</div>
          </div>
        </div>

        <div className="px-4 -mt-6 space-y-4">
          <Card className="p-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-[10px] text-slate-400 mb-1">我方</div>
                <div className="flex gap-2">
                  {a.map((p) => (
                    <div key={p.id} className="flex items-center gap-1">
                      <Avatar id={p.id} size={28} />
                      <span className="text-[12px] text-navy">{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 mb-1">对方</div>
                <div className="flex gap-2">
                  {b.map((p) => (
                    <div key={p.id} className="flex items-center gap-1">
                      <Avatar id={p.id} size={28} />
                      <span className="text-[12px] text-navy">{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <div>
            <SectionTitle>关键回合</SectionTitle>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {MATCH.keyRallies.map((r) => (
                <Link
                  key={r.id}
                  to={`/match/${MATCH.id}/rally/${r.id}`}
                  className="min-w-[148px] bg-white rounded-2xl p-3 shadow-[0_6px_20px_rgba(0,82,155,0.08)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[16px] font-bold text-navy">{r.code}</span>
                    {r.highlight ? (
                      <span className="text-[10px] bg-shuttle text-navy px-1.5 py-0.5 rounded-md font-semibold">AI</span>
                    ) : null}
                  </div>
                  <div className="text-[20px] font-semibold text-navy tabular-nums mt-1">{r.shots}拍</div>
                  <div className="text-[12px] text-slate-500 mt-1">{r.title}</div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle>本场AI总结</SectionTitle>
            <div className="grid grid-cols-2 gap-2">
              {MATCH.summary.map((s) => (
                <Card key={s.label} className="p-3">
                  <div className="text-[11px] text-slate-400">{s.label}</div>
                  <div className="text-[18px] font-semibold text-navy mt-1">{s.value}</div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle>球员表现</SectionTitle>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {[...MATCH.teamA, ...MATCH.teamB].map((id) => {
                const p = PLAYERS[id]
                return (
                  <div key={id} className="min-w-[140px] bg-white rounded-2xl p-3 shadow-[0_6px_20px_rgba(0,82,155,0.08)]">
                    <Avatar id={id} size={40} />
                    <div className="text-[14px] font-semibold text-navy mt-2">{p.name}</div>
                    <div className="text-[12px] text-slate-500">综合 {p.overall}</div>
                    <div className="text-[11px] text-shuttle mt-1">{p.style}</div>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <SectionTitle>组合分析</SectionTitle>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[15px] font-semibold text-navy">
                    {PLAYERS.zhang.name} × {PLAYERS.wang.name}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {PAIR.tags.map((t) => (
                      <span key={t} className="text-[11px] bg-app text-navy px-2 py-0.5 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-slate-400">组合适配度</div>
                  <div className="text-[32px] font-bold text-navy leading-none tabular-nums">{PAIR.score}</div>
                </div>
              </div>
              <div className="mt-3">
                <PrimaryButton to={`/pair/${PAIR.id}`}>查看组合分析</PrimaryButton>
              </div>
            </Card>
          </div>

          <Card className="p-4">
            <div className="text-[14px] font-semibold text-navy mb-1">这场比赛里，有你吗？</div>
            <div className="text-[12px] text-slate-500 mb-3">认领球员后生成你的羽球档案，并写入关系网络。</div>
            <PrimaryButton to={`/claim/${MATCH.id}`}>去认领</PrimaryButton>
          </Card>
        </div>
      </Scroll>
    </div>
  )
}
