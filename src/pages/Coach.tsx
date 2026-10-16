import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Scroll } from '../components/AppBar'
import { Card, PrimaryButton } from '../components/ui'
import { useDemo } from '../context/DemoContext'
import { COACHES } from '../data/mock'
import { memberPrice, TIER_RATE, tierLabel } from '../data/membership'

export function Coach() {
  const nav = useNavigate()
  const { membership } = useDemo()
  const [booked, setBooked] = useState<string | null>(null)
  const off = TIER_RATE[membership].coach
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <AppBar
        title="教练平台"
        left={
          <button type="button" onClick={() => nav(-1)} className="p-1 text-white">
            <ChevronLeft />
          </button>
        }
      />
      <Scroll className="px-4 py-4 space-y-3">
        <Card className="p-4">
          <div className="text-[12px] text-navy/60">
            {tierLabel(membership)}
            {off < 1 ? ` · 课程 ${off * 10} 折` : ' · 金卡可享课程优惠'}
          </div>
          <div className="text-[16px] font-bold text-navy mt-1">北航合作教练</div>
        </Card>
        {COACHES.map((c) => {
          const paid = memberPrice(c.priceNum, off)
          return (
            <Card key={c.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[16px] font-bold text-navy">{c.name}</div>
                  <div className="text-[12px] text-slate-500 mt-0.5">
                    {c.specialty} · {c.years}年 · {c.rating}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[13px] font-semibold text-shuttle">¥{paid}/次</div>
                  {paid < c.priceNum ? <div className="text-[11px] text-slate-400 line-through">¥{c.priceNum}</div> : null}
                </div>
              </div>
              <p className="text-[12px] text-slate-600 mt-2 leading-relaxed">{c.reason}</p>
              {booked === c.id ? (
                <div className="mt-3 text-[13px] text-good font-semibold">已预约体验课 · 周三 20:00 北航馆</div>
              ) : (
                <button
                  type="button"
                  onClick={() => setBooked(c.id)}
                  className="mt-3 w-full h-10 rounded-xl bg-shuttle text-navy font-semibold text-[13px]"
                >
                  预约体验课
                </button>
              )}
            </Card>
          )
        })}
        <PrimaryButton onClick={() => nav('/play?tab=venues')}>顺便预约场地</PrimaryButton>
      </Scroll>
    </div>
  )
}
