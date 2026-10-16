import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AppBar, Scroll, SearchBell } from '../components/AppBar'
import { Avatar } from '../components/Avatar'
import { RelationTags } from '../components/RelationTags'
import { Card, FilterChips } from '../components/ui'
import { useDemo } from '../context/DemoContext'
import { FRIENDS, PLAYERS, SESSIONS, VENUES } from '../data/mock'
import { memberPrice, TIER_RATE, tierLabel } from '../data/membership'

const TABS = ['场馆', '球局', '球友'] as const
type PlayTab = (typeof TABS)[number]

function tabFromQuery(raw: string | null): PlayTab {
  if (raw === 'sessions') return '球局'
  if (raw === 'friends') return '球友'
  return '场馆'
}

export function Play() {
  const [params, setParams] = useSearchParams()
  const tab = tabFromQuery(params.get('tab'))
  const { membership, joined } = useDemo()
  const rate = TIER_RATE[membership]

  function setTab(next: PlayTab) {
    const q = next === '球局' ? 'sessions' : next === '球友' ? 'friends' : 'venues'
    setParams({ tab: q }, { replace: true })
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <AppBar title="打球" right={<SearchBell />} />
      <div className="shrink-0 px-4 py-2 bg-app border-b border-navy/8 space-y-1.5">
        <FilterChips value={tab} onChange={(v) => setTab(v as PlayTab)} options={[...TABS]} />
        <div className="text-[11px] text-slate-500 px-0.5">
          {tierLabel(membership)}权益：场地 {rate.venue * 10} 折
        </div>
      </div>
      {tab === '场馆' ? <VenuePane /> : null}
      {tab === '球局' ? <SessionPane joined={joined} /> : null}
      {tab === '球友' ? <FriendPane /> : null}
    </div>
  )
}

function VenuePane() {
  const { membership } = useDemo()
  const [dist, setDist] = useState('全部距离')
  const [price, setPrice] = useState('全部价格')
  const [tag, setTag] = useState('全部标签')
  const off = TIER_RATE[membership].venue

  const list = useMemo(() => {
    return VENUES.filter((v) => {
      if (dist === '1km内' && v.distanceKm > 1) return false
      if (dist === '3km内' && v.distanceKm > 3) return false
      if (price === '¥50内' && v.price > 50) return false
      if (price === '¥80内' && v.price > 80) return false
      if (tag !== '全部标签' && !v.tags.includes(tag)) return false
      return true
    })
  }, [dist, price, tag])

  return (
    <>
      <div className="shrink-0 px-4 py-2 space-y-1.5 bg-app">
        <FilterChips value={dist} onChange={setDist} options={['全部距离', '1km内', '3km内']} />
        <FilterChips value={price} onChange={setPrice} options={['全部价格', '¥50内', '¥80内']} />
        <FilterChips value={tag} onChange={setTag} options={['全部标签', '有摄像', '木地板', '空调', '国际场']} />
      </div>
      <Scroll className="px-4 pt-3 pb-4 space-y-3">
        {list.length === 0 ? <Card className="p-4 text-[13px] text-slate-500">没有符合筛选的球馆。</Card> : null}
        {list.map((v) => {
          const paid = memberPrice(v.price, off)
          return (
            <Link key={v.id} to={`/venue/${v.id}`} className="block">
              <Card className="p-4">
                <div className="flex justify-between gap-2">
                  <div>
                    <div className="text-[15px] font-semibold text-navy">{v.name}</div>
                    <div className="text-[12px] text-slate-500 mt-1">
                      {v.area} · {v.distanceKm}km · {v.courts}片场
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[15px] font-bold text-navy">¥{paid}</div>
                    {paid < v.price ? (
                      <div className="text-[11px] text-slate-400 line-through">¥{v.price}</div>
                    ) : (
                      <div className="text-[11px] text-slate-400">/小时</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {v.tags.map((t) => (
                    <span key={t} className="text-[11px] bg-app text-navy px-2 py-0.5 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-[12px] text-slate-500">
                  <span>评分 {v.rating}</span>
                  <span>今日 {v.today} 场</span>
                </div>
              </Card>
            </Link>
          )
        })}
      </Scroll>
    </>
  )
}

function SessionPane({ joined }: { joined: boolean }) {
  const { membership } = useDemo()
  const [dist, setDist] = useState('全部距离')
  const [price, setPrice] = useState('全部费用')
  const [tag, setTag] = useState('全部标签')
  const off = TIER_RATE[membership].venue

  const list = useMemo(() => {
    return SESSIONS.filter((s) => {
      if (dist === '1km内' && s.distanceKm > 1) return false
      if (dist === '3km内' && s.distanceKm > 3) return false
      if (price === '¥50内' && s.price > 50) return false
      if (price === '¥80内' && s.price > 80) return false
      if (tag !== '全部标签' && !s.tags.includes(tag) && s.type !== tag && s.level !== tag) return false
      return true
    })
  }, [dist, price, tag])

  return (
    <>
      <div className="shrink-0 px-4 py-2 space-y-1.5 bg-app">
        <FilterChips value={dist} onChange={setDist} options={['全部距离', '1km内', '3km内']} />
        <FilterChips value={price} onChange={setPrice} options={['全部费用', '¥50内', '¥80内']} />
        <FilterChips value={tag} onChange={setTag} options={['全部标签', '男双', '混双', '有摄像', '中级', '高级']} />
      </div>
      <Scroll className="px-4 pt-3 pb-4 space-y-3">
        {list.length === 0 ? (
          <Card className="p-4 text-[13px] text-slate-500">没有符合筛选的球局，试试放宽条件。</Card>
        ) : null}
        {list.map((s) => {
          const paid = memberPrice(s.price, off)
          return (
            <Link key={s.id} to={`/session/${s.id}`} className="block">
              <Card className="p-4">
                <div className="flex justify-between gap-2">
                  <div>
                    <div className="text-[15px] font-semibold text-navy">
                      {s.when} {s.time} · {s.type}
                    </div>
                    <div className="text-[12px] text-slate-500 mt-1">
                      {s.venue} · {s.distanceKm}km · ¥{paid}/人
                      {paid < s.price ? <span className="line-through ml-1 text-slate-400">¥{s.price}</span> : null}
                    </div>
                  </div>
                  <div className="text-shuttle font-semibold text-[13px] shrink-0">
                    {joined && s.id === 's1' ? 4 : s.filled}/{s.cap}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {s.tags.map((t) => (
                    <span key={t} className="text-[11px] bg-app text-navy px-2 py-0.5 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex -space-x-2 mt-3">
                  {s.players.map((id) => (
                    <Avatar key={id} id={id} size={32} />
                  ))}
                </div>
                <div className="text-[12px] text-slate-500 mt-2">AI推荐：{PLAYERS[s.looking].name}</div>
              </Card>
            </Link>
          )
        })}
      </Scroll>
    </>
  )
}

function FriendPane() {
  const list = [...FRIENDS].sort((a, b) => b.matchScore - a.matchScore)
  return (
    <Scroll className="px-4 pt-3 pb-4 space-y-3">
      <p className="text-[12px] text-slate-500 px-1">按匹配程度预约球友。点进去约一场。</p>
      {list.map((f) => {
        const p = PLAYERS[f.id]
        return (
          <Link key={f.id} to={`/player/${f.id}`} className="block">
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <Avatar id={f.id} size={48} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[15px] font-semibold text-navy">{p.name}</span>
                        <RelationTags layer={f.layer} via={f.via} />
                      </div>
                      <div className="text-[12px] text-slate-500 mt-0.5">{p.style}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[11px] text-slate-400">匹配度</div>
                      <div className="text-[20px] font-bold text-navy leading-none tabular-nums">{f.matchScore}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {p.tags.slice(0, 3).map((t) => (
                      <span key={t} className="text-[11px] bg-app text-navy px-2 py-0.5 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-[12px] text-slate-600 mt-2 leading-relaxed">{f.reason}</p>
                </div>
              </div>
            </Card>
          </Link>
        )
      })}
    </Scroll>
  )
}
