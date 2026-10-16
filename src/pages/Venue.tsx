import { ChevronLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AppBar, Scroll } from '../components/AppBar'
import { Card } from '../components/ui'
import { useDemo } from '../context/DemoContext'
import { VENUES } from '../data/mock'
import { memberPrice, TIER_RATE, tierLabel } from '../data/membership'
import type { CourtSlot } from '../types'

export function Venue() {
  const nav = useNavigate()
  const { id } = useParams()
  const { membership } = useDemo()
  const venue = VENUES.find((v) => v.id === id) ?? VENUES[0]
  const paid = memberPrice(venue.price, TIER_RATE[membership].venue)
  const [slots, setSlots] = useState<CourtSlot[]>(venue.slots)
  const [toast, setToast] = useState('')

  useEffect(() => {
    setSlots(venue.slots)
  }, [venue.id, venue.slots])

  function book(slotId: string) {
    setSlots((list) => list.map((s) => (s.id === slotId ? { ...s, status: 'mine' } : s)))
    setToast('预约成功，积分 +20')
    window.setTimeout(() => setToast(''), 1800)
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <AppBar
        title={venue.name}
        left={
          <button type="button" onClick={() => nav(-1)} className="p-1 text-white">
            <ChevronLeft />
          </button>
        }
      />
      <Scroll className="px-4 py-4 space-y-3">
        <div className="text-[12px] text-slate-500">
          {venue.area} · {venue.distanceKm}km · {tierLabel(membership)} ¥{paid}/小时
          {paid < venue.price ? <span className="line-through ml-1">¥{venue.price}</span> : null} · {venue.courts}片场
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            ['今日球局', venue.today],
            ['参与球友', venue.people],
            ['产生视频', venue.videos],
            ['完成认领', venue.claimed],
          ].map(([k, v]) => (
            <Card key={String(k)} className="p-3">
              <div className="text-[11px] text-slate-400">{k}</div>
              <div className="text-[22px] font-bold text-navy tabular-nums">{v}</div>
            </Card>
          ))}
        </div>

        <Card className="p-4">
          <div className="text-[13px] font-semibold text-navy mb-2">今晚场地预约</div>
          <div className="space-y-2">
            {slots.map((s) => (
              <div key={s.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div>
                  <div className="text-[14px] text-navy font-medium">{s.time}</div>
                  <div className="text-[12px] text-slate-400">{s.court}</div>
                </div>
                {s.status === 'full' ? (
                  <span className="text-[12px] text-slate-400">已满</span>
                ) : s.status === 'mine' ? (
                  <span className="text-[12px] text-good font-semibold">已预约</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => book(s.id)}
                    className="h-8 px-3 rounded-lg bg-shuttle text-navy text-[12px] font-semibold"
                  >
                    预约
                  </button>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-[13px] font-semibold text-navy mb-2">设施标签</div>
          <div className="flex flex-wrap gap-2">
            {venue.tags.map((s) => (
              <span key={s} className="text-[12px] bg-app text-navy px-2 py-1 rounded-lg">
                {s}
              </span>
            ))}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-[13px] font-semibold text-navy mb-2">智能服务</div>
          <div className="flex flex-wrap gap-2">
            {venue.services.map((s) => (
              <span key={s} className="text-[12px] bg-app text-navy px-2 py-1 rounded-lg">
                {s}
              </span>
            ))}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-[13px] font-semibold text-navy mb-2">积分商城</div>
          {venue.shop.map((s) => (
            <div key={s.item} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
              <span className="text-[13px] text-navy">{s.item}</span>
              <span className="text-[13px] font-semibold text-shuttle">{s.cost}积分</span>
            </div>
          ))}
        </Card>
        <Link to="/coach" className="block">
          <Card className="p-4">
            <div className="text-[13px] font-semibold text-navy">练完就找教练</div>
            <div className="text-[12px] text-slate-500 mt-1">AI 根据本周失位，推荐张 / 王 / 李教练</div>
          </Card>
        </Link>
      </Scroll>
      {toast ? (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 z-40 bg-navy text-white text-[13px] px-4 py-2 rounded-full">
          {toast}
        </div>
      ) : null}
    </div>
  )
}
