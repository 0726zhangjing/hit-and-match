import { Link } from 'react-router-dom'
import { AppBar, Scroll, SearchBell } from '../components/AppBar'
import { Avatar } from '../components/Avatar'
import { RadarCard } from '../components/RadarCard'
import { Card } from '../components/ui'
import { useDemo } from '../context/DemoContext'
import { MEMBER_PLANS, PLAYERS, SPEND_RECORDS } from '../data/mock'

export function Me() {
  const { claimedId, joined, membership, setMembership } = useDemo()
  const me = PLAYERS[claimedId ?? 'zhang']
  const saved = SPEND_RECORDS.reduce((n, r) => n + (r.origin - r.paid), 0)

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <AppBar title="我的" right={<SearchBell />} />
      <Scroll className="px-4 pt-3 pb-6 space-y-3">
        <div className="flex items-center gap-3">
          <Avatar id={me.id} size={56} />
          <div>
            <div className="text-[18px] font-bold text-navy">{me.name}</div>
            <div className="text-[12px] text-slate-500">
              {me.style} · 综合 {me.overall}
            </div>
          </div>
        </div>

        <Card className="p-3">
          <RadarCard dims={me.dims} />
        </Card>

        <div>
          <div className="text-[15px] font-semibold text-navy px-1 mb-2">会员等级</div>
          <p className="text-[12px] text-slate-500 px-1 mb-2">
            等级越高，场地、装备、教练优惠越多。会员费 + 场馆/装备分佣 + 赛事运营。
          </p>
          <div className="space-y-2">
            {MEMBER_PLANS.map((p) => {
              const on = membership === p.id
              return (
                <button key={p.id} type="button" className="block w-full text-left" onClick={() => setMembership(p.id)}>
                  <Card className={`p-4 ${on ? 'ring-2 ring-shuttle' : ''}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-[15px] font-bold text-navy">{p.name}</div>
                        <div className="text-[12px] text-slate-500 mt-0.5">
                          {p.price} · {p.period}
                        </div>
                      </div>
                      <div className="text-[11px] font-semibold text-shuttle">{on ? '当前' : '切换'}</div>
                    </div>
                    <div className="text-[12px] text-navy mt-2">{p.highlight}</div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {[p.venueOff, p.gearOff, p.coachOff].map((t) => (
                        <span key={t} className="text-[11px] bg-app text-navy px-2 py-0.5 rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>
                    <ul className="mt-2 space-y-0.5">
                      {p.features.map((f) => (
                        <li key={f} className="text-[12px] text-slate-600">
                          · {f}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <div className="text-[15px] font-semibold text-navy px-1 mb-2">消费记录</div>
          <Card className="px-4 divide-y divide-slate-100">
            {SPEND_RECORDS.map((r) => (
              <div key={r.id} className="py-3 flex items-center justify-between gap-2">
                <div>
                  <div className="text-[13px] font-medium text-navy">{r.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {r.date} · {r.channel}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[14px] font-semibold text-navy">¥{r.paid}</div>
                  {r.paid < r.origin ? (
                    <div className="text-[11px] text-good">省 ¥{r.origin - r.paid}</div>
                  ) : null}
                </div>
              </div>
            ))}
          </Card>
          <div className="text-[12px] text-slate-500 px-1 mt-2">累计已省 ¥{saved}（场地 / 装备分佣演示）</div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link to="/play?tab=friends">
            <Card className="p-3">
              <div className="text-[11px] text-slate-400">球友档案</div>
              <div className="text-[16px] font-semibold text-navy">按匹配排序</div>
            </Card>
          </Link>
          <Link to="/claim/m1">
            <Card className="p-3">
              <div className="text-[11px] text-slate-400">比赛认领</div>
              <div className="text-[16px] font-semibold text-navy">{claimedId ? '已认领' : '去认领'}</div>
            </Card>
          </Link>
          <Link to="/shop">
            <Card className="p-3">
              <div className="text-[11px] text-slate-400">装备订单</div>
              <div className="text-[16px] font-semibold text-navy">会员折扣</div>
            </Card>
          </Link>
          <Link to="/coach">
            <Card className="p-3">
              <div className="text-[11px] text-slate-400">教练课程</div>
              <div className="text-[16px] font-semibold text-navy">
                {membership === 'gold' ? '金卡优惠' : '预约'}
              </div>
            </Card>
          </Link>
        </div>

        <Card className="p-3 text-[12px] text-slate-500">
          球局状态：{joined ? '已加入周六北航馆双打' : '暂无进行中的球局'}
        </Card>
      </Scroll>
    </div>
  )
}
