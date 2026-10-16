import { ChevronLeft } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppBar, Scroll } from '../components/AppBar'
import { Card, FilterChips } from '../components/ui'
import { VENUES } from '../data/mock'

export function Venues() {
  const nav = useNavigate()
  const [dist, setDist] = useState('全部距离')
  const [price, setPrice] = useState('全部价格')
  const [tag, setTag] = useState('全部标签')

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
    <div className="flex-1 flex flex-col min-h-0">
      <AppBar
        title="球馆推荐"
        left={
          <button type="button" onClick={() => nav(-1)} className="p-1 text-white">
            <ChevronLeft />
          </button>
        }
      />
      <div className="shrink-0 px-4 py-2 space-y-1.5 bg-app border-b border-navy/8">
        <FilterChips value={dist} onChange={setDist} options={['全部距离', '1km内', '3km内']} />
        <FilterChips value={price} onChange={setPrice} options={['全部价格', '¥50内', '¥80内']} />
        <FilterChips value={tag} onChange={setTag} options={['全部标签', '有摄像', '木地板', '空调', '国际场']} />
      </div>
      <Scroll className="px-4 pt-3 pb-4 space-y-3">
        {list.length === 0 ? (
          <Card className="p-4 text-[13px] text-slate-500">没有符合筛选的球馆。</Card>
        ) : null}
        {list.map((v) => (
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
                  <div className="text-[15px] font-bold text-navy">¥{v.price}</div>
                  <div className="text-[11px] text-slate-400">/小时</div>
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
        ))}
      </Scroll>
    </div>
  )
}
