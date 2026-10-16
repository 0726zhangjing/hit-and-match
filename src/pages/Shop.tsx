import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Scroll } from '../components/AppBar'
import { Card } from '../components/ui'
import { useDemo } from '../context/DemoContext'
import { GEAR_ITEMS } from '../data/mock'
import { memberPrice, TIER_RATE, tierLabel } from '../data/membership'

export function Shop() {
  const nav = useNavigate()
  const { membership } = useDemo()
  const off = TIER_RATE[membership].gear
  const [bought, setBought] = useState<string | null>(null)

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <AppBar
        title="装备推荐"
        left={
          <button type="button" onClick={() => nav(-1)} className="p-1 text-white">
            <ChevronLeft />
          </button>
        }
      />
      <Scroll className="px-4 py-4 space-y-3">
        <Card className="p-4">
          <div className="text-[12px] text-navy/60">复盘后补装备 · {tierLabel(membership)}享受{off < 1 ? `${off * 10}折` : '原价'}</div>
          <div className="text-[16px] font-bold text-navy mt-1">合作装备馆</div>
        </Card>
        {GEAR_ITEMS.map((g) => {
          const paid = memberPrice(g.price, off)
          return (
            <Card key={g.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[16px] font-bold text-navy">{g.name}</div>
                  <div className="text-[12px] text-slate-500 mt-0.5">{g.tag}</div>
                </div>
                <div className="text-right">
                  <div className="text-[15px] font-bold text-navy">¥{paid}</div>
                  {paid < g.price ? <div className="text-[11px] text-slate-400 line-through">¥{g.price}</div> : null}
                </div>
              </div>
              {bought === g.id ? (
                <div className="mt-3 text-[13px] text-good font-semibold">已下单 · 分佣演示入账</div>
              ) : (
                <button
                  type="button"
                  onClick={() => setBought(g.id)}
                  className="mt-3 w-full h-10 rounded-xl bg-shuttle text-navy font-semibold text-[13px]"
                >
                  会员价购买
                </button>
              )}
            </Card>
          )
        })}
      </Scroll>
    </div>
  )
}
