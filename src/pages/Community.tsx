import { ChevronLeft, Heart } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { AppBar, Scroll } from '../components/AppBar'
import { RallyClip, postBadge } from '../components/RallyClip'
import { Card } from '../components/ui'
import { useDemo } from '../context/DemoContext'

export function Community() {
  const nav = useNavigate()
  const { posts, likedIds, likePost, isFriend } = useDemo()

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <AppBar
        title="北航羽球社群"
        left={
          <button type="button" onClick={() => nav(-1)} className="p-1 text-white">
            <ChevronLeft />
          </button>
        }
      />
      <Scroll className="px-4 pt-3 pb-6 space-y-3">
        <div className="rounded-2xl p-4 bg-navy text-white shadow-[0_6px_20px_rgba(0,82,155,0.18)]">
          <div className="text-[12px] text-white/70">校园社群 · 回合会因为点赞和好友关系被推荐</div>
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
        <div className="grid grid-cols-3 gap-2">
          <button type="button" onClick={() => nav('/venues')} className="h-11 rounded-xl bg-app text-navy font-semibold text-[12px]">
            预约场地
          </button>
          <button type="button" onClick={() => nav('/coach')} className="h-11 rounded-xl bg-app text-navy font-semibold text-[12px]">
            找教练
          </button>
          <button type="button" onClick={() => nav('/sessions')} className="h-11 rounded-xl bg-shuttle text-navy font-semibold text-[12px]">
            去组球局
          </button>
        </div>
        <Link to="/" className="block text-center text-[12px] text-accent pb-2">
          回首页看被推荐的回合
        </Link>
      </Scroll>
    </div>
  )
}
