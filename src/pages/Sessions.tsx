import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Scroll } from '../components/AppBar'
import { Avatar } from '../components/Avatar'
import { Card, FilterChips } from '../components/ui'
import { useDemo } from '../context/DemoContext'
import { PLAYERS, SESSIONS } from '../data/mock'

export function Sessions() {
  const { joined } = useDemo()
  const [dist, setDist] = useState('全部距离')
  const [price, setPrice] = useState('全部费用')
  const [tag, setTag] = useState('全部标签')

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
    <div className="flex-1 flex flex-col min-h-0">
      <AppBar title="球局" />
      <div className="shrink-0 px-4 py-2 space-y-1.5 bg-app border-b border-navy/8">
        <FilterChips value={dist} onChange={setDist} options={['全部距离', '1km内', '3km内']} />
        <FilterChips value={price} onChange={setPrice} options={['全部费用', '¥50内', '¥80内']} />
        <FilterChips value={tag} onChange={setTag} options={['全部标签', '男双', '混双', '有摄像', '中级', '高级']} />
      </div>
      <Scroll className="px-4 pt-3 pb-4 space-y-3">
        {list.length === 0 ? (
          <Card className="p-4 text-[13px] text-slate-500">没有符合筛选的球局，试试放宽条件。</Card>
        ) : null}
        {list.map((s) => (
          <Link key={s.id} to={`/session/${s.id}`} className="block">
            <Card className="p-4">
              <div className="flex justify-between gap-2">
                <div>
                  <div className="text-[15px] font-semibold text-navy">
                    {s.when} {s.time} · {s.type}
                  </div>
                  <div className="text-[12px] text-slate-500 mt-1">
                    {s.venue} · {s.distanceKm}km · ¥{s.price}/人
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
        ))}
        <Link to="/venues" className="block">
          <Card className="p-4">
            <div className="text-[14px] font-semibold text-navy">先看球馆，再组局</div>
            <div className="text-[12px] text-slate-500 mt-1">按距离和价格筛选学院路附近场馆</div>
          </Card>
        </Link>
      </Scroll>
    </div>
  )
}
