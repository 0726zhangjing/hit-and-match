import { Heart } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { AppBar, Scroll, SearchBell } from '../components/AppBar'
import { RallyClip, postBadge } from '../components/RallyClip'
import { Card } from '../components/ui'
import { useDemo } from '../context/DemoContext'
import { COACHES, GEAR_ITEMS } from '../data/mock'
import { memberPrice, TIER_RATE } from '../data/membership'

export function Review() {
  const nav = useNavigate()
  const { posts, likedIds, likePost, isFriend, membership } = useDemo()
  const gearOff = TIER_RATE[membership].gear
  const hotGear = GEAR_ITEMS[0]
  const paid = memberPrice(hotGear.price, gearOff)

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <AppBar title="复盘" right={<SearchBell />} />
      <Scroll className="px-4 pt-3 pb-6 space-y-3">
        <div className="rounded-2xl p-4 bg-navy text-white shadow-[0_6px_20px_rgba(0,82,155,0.18)]">
          <div className="text-[12px] text-white/70">赛后社群 · 以精彩回合为主</div>
          <div className="text-[20px] font-bold mt-1">北航羽毛球俱乐部</div>
          <div className="grid grid-cols-3 gap-2 mt-3 text-center">
            {[
              ['成员', '126'],
              ['回合视频', String(posts.filter((p) => p.kind === 'rally').length)],
              ['今日点赞', String(posts.reduce((n, p) => n + p.likes, 0))],
            ].map(([k, v]) => (
              <div key={k} className="bg-white/10 rounded-xl py-2">
                <div className="text-[16px] font-semibold">{v}</div>
                <div className="text-[10px] text-white/70">{k}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link to="/shop">
            <Card className="p-3">
              <div className="text-[11px] text-slate-400">装备推荐</div>
              <div className="text-[14px] font-semibold text-navy mt-0.5">{hotGear.name}</div>
              <div className="text-[12px] text-shuttle mt-1">
                ¥{paid}
                {paid < hotGear.price ? <span className="text-slate-400 line-through ml-1">¥{hotGear.price}</span> : null}
              </div>
            </Card>
          </Link>
          <Link to="/coach">
            <Card className="p-3">
              <div className="text-[11px] text-slate-400">教练预约</div>
              <div className="text-[14px] font-semibold text-navy mt-0.5">{COACHES[0].name}</div>
              <div className="text-[12px] text-slate-500 mt-1">{COACHES[0].specialty}</div>
            </Card>
          </Link>
        </div>

        {posts.map((p) => {
          const friend = isFriend(p.authorId)
          const mine = p.authorId === 'zhang'
          const hot = p.likes >= 40
          if (p.kind === 'rally') {
            return (
              <Card key={p.id} className="p-3">
                <RallyClip
                  post={p}
                  liked={likedIds.has(p.id)}
                  onLike={() => likePost(p.id)}
                  badge={postBadge({ friend, mine, hot })}
                />
                <p className="text-[12px] text-navy mt-2 leading-relaxed px-0.5">{p.text}</p>
              </Card>
            )
          }
          return (
            <Card key={p.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-[14px] font-semibold text-navy">{p.title}</div>
                <div className="text-[11px] text-slate-400">{p.time}</div>
              </div>
              <div className="text-[12px] text-slate-500 mt-1">{p.author}</div>
              <p className="text-[13px] text-navy mt-2 leading-relaxed">{p.text}</p>
              <button type="button" onClick={() => likePost(p.id)} className="mt-2 flex items-center gap-1">
                <Heart size={14} className={likedIds.has(p.id) ? 'fill-navy text-navy' : 'text-slate-400'} />
                <span className="text-[12px] text-slate-500">{p.likes} 人觉得有用</span>
              </button>
            </Card>
          )
        })}

        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={() => nav('/shop')} className="h-11 rounded-xl bg-app text-navy font-semibold text-[12px]">
            去看装备
          </button>
          <button type="button" onClick={() => nav('/coach')} className="h-11 rounded-xl bg-shuttle text-navy font-semibold text-[12px]">
            预约教练
          </button>
        </div>
      </Scroll>
    </div>
  )
}
