import { Lock, Play } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppBar, Scroll, SearchBell } from '../components/AppBar'
import { Card, FilterChips, SectionTitle } from '../components/ui'
import { useDemo } from '../context/DemoContext'
import { CLASSIC_RALLIES, MATCH, TEACH_VIDEOS } from '../data/mock'
import { canAccess, tierLabel } from '../data/membership'
import type { MembershipTier } from '../types'

export function Prepare() {
  const nav = useNavigate()
  const { membership, subscribed, toggleSubscribe } = useDemo()
  const [tab, setTab] = useState('经典回合')
  const [compare, setCompare] = useState(false)

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <AppBar title="备战" right={<SearchBell />} />
      <div className="shrink-0 px-4 py-2 bg-app border-b border-navy/8">
        <FilterChips value={tab} onChange={setTab} options={['经典回合', '教学订阅', '跟练对比']} />
      </div>
      <Scroll className="px-4 pt-3 pb-6 space-y-3">
        {tab === '经典回合' ? (
          <>
            <p className="text-[12px] text-slate-500 px-1">国际赛事经典回合拆解，对照自己的站位和拍路。</p>
            {CLASSIC_RALLIES.map((c, i) => {
              const need: MembershipTier = i >= 3 ? 'gold' : i >= 2 ? 'silver' : 'basic'
              const open = canAccess(membership, need)
              return (
                <button
                  key={c.id}
                  type="button"
                  className="block w-full text-left"
                  onClick={() => (open ? nav(`/match/${MATCH.id}/rally/${c.rallyId}`) : nav('/me'))}
                >
                  <Card className="overflow-hidden">
                    <div className="relative h-36">
                      <img src={c.cover} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#003A70]/80 via-black/15 to-transparent" />
                      {!open ? (
                        <div className="absolute inset-0 bg-navy/35 flex items-center justify-center">
                          <Lock size={22} className="text-white" />
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="w-10 h-10 rounded-full bg-black/45 text-white flex items-center justify-center">
                            <Play size={18} fill="currentColor" className="ml-0.5" />
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-2 left-3 right-3 text-white">
                        <div className="text-[11px] text-shuttle font-semibold">
                          {c.event} · {c.year}
                        </div>
                        <div className="text-[13px] font-semibold leading-tight mt-0.5">{c.title}</div>
                      </div>
                    </div>
                    <div className="px-4 py-3">
                      <div className="text-[14px] font-semibold text-navy">
                        {c.sideA} <span className="text-slate-400 font-medium text-[12px]">VS</span> {c.sideB}
                      </div>
                      <div className="text-[12px] text-slate-500 mt-1">
                        {c.shots}拍 · {c.tactic}
                        {!open ? ` · ${tierLabel(need)}解锁` : ''}
                      </div>
                      <p className="text-[12px] text-navy/80 mt-2 leading-relaxed">{c.note}</p>
                    </div>
                  </Card>
                </button>
              )
            })}
          </>
        ) : null}

        {tab === '教学订阅' ? (
          <>
            <p className="text-[12px] text-slate-500 px-1">订阅后会出现在跟练对比里，银卡以上可看高级课。</p>
            {TEACH_VIDEOS.map((v) => {
              const open = canAccess(membership, v.tier)
              const on = subscribed.has(v.id)
              return (
                <Card key={v.id} className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[15px] font-semibold text-navy">{v.title}</div>
                      <div className="text-[12px] text-slate-500 mt-0.5">
                        {v.coach} · {v.mins}分钟 · {tierLabel(v.tier)}
                      </div>
                    </div>
                    {!open ? <Lock size={16} className="text-slate-400 mt-1" /> : null}
                  </div>
                  {open ? (
                    <button
                      type="button"
                      onClick={() => toggleSubscribe(v.id)}
                      className={`mt-3 w-full h-10 rounded-xl font-semibold text-[13px] ${
                        on ? 'bg-navy text-white' : 'bg-shuttle text-navy'
                      }`}
                    >
                      {on ? '已订阅 · 取消' : '订阅跟练'}
                    </button>
                  ) : (
                    <Link
                      to="/me"
                      className="mt-3 h-10 rounded-xl bg-app text-navy font-semibold text-[13px] flex items-center justify-center"
                    >
                      升级{tierLabel(v.tier)}观看
                    </Link>
                  )}
                </Card>
              )
            })}
          </>
        ) : null}

        {tab === '跟练对比' ? (
          <>
            <p className="text-[12px] text-slate-500 px-1">把国际经典拍路叠到你的录像上，看站位差在哪。</p>
            <Card className="p-4">
              <div className="text-[13px] font-semibold text-navy">汤杯男双 vs 你的 R07</div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="rounded-xl bg-navy text-white p-3 min-h-[120px]">
                  <div className="text-[11px] text-white/70">经典</div>
                  <div className="text-[14px] font-semibold mt-1">前封后杀</div>
                  <div className="text-[11px] text-shuttle mt-6">封网后即回 T 点</div>
                </div>
                <div className="rounded-xl bg-white border border-navy/15 p-3 min-h-[120px]">
                  <div className="text-[11px] text-slate-400">你的回合</div>
                  <div className="text-[14px] font-semibold text-navy mt-1">封网后停住</div>
                  <div className="text-[11px] text-slate-500 mt-6">回位偏慢 0.4s</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCompare(true)}
                className="mt-3 w-full h-10 rounded-xl bg-shuttle text-navy font-semibold text-[13px]"
              >
                {compare ? '已生成对比要点' : '开始跟练对比'}
              </button>
              {compare ? (
                <p className="text-[12px] text-navy mt-3 leading-relaxed">
                  第 3 拍封网后应退到发球线后，而不是贴网等待。对照经典回合再练 10 分钟网前回位。
                </p>
              ) : null}
            </Card>
            {membership === 'basic' ? (
              <Link to="/me">
                <Card className="p-4">
                  <div className="text-[14px] font-semibold text-navy">银卡解锁更多跟练</div>
                  <div className="text-[12px] text-slate-500 mt-1">高级分析、教学订阅、场地 8.5 折</div>
                </Card>
              </Link>
            ) : null}
          </>
        ) : null}

        <SectionTitle>备战完去打球</SectionTitle>
        <Link to="/play">
          <Card className="p-4">
            <div className="text-[14px] font-semibold text-navy">预约场馆 / 球局 / 球友</div>
            <div className="text-[12px] text-slate-500 mt-1">会员等级越高，场地折扣越多</div>
          </Card>
        </Link>
      </Scroll>
    </div>
  )
}
