import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { CommunityPost, PlayerId } from '../types'

export function RallyClip({
  post,
  liked,
  onLike,
  badge,
  compact,
}: {
  post: CommunityPost
  liked?: boolean
  onLike?: () => void
  badge?: string
  compact?: boolean
}) {
  const to = `/match/${post.matchId ?? 'm1'}/rally/${post.rallyId ?? 'r07'}`
  return (
    <div className={compact ? 'min-w-[220px]' : ''}>
      <Link to={to} className="block">
        <div className={`relative overflow-hidden ${compact ? 'h-28 rounded-xl' : 'h-36 rounded-2xl'}`}>
          <img src={`${import.meta.env.BASE_URL}hero-court.png`} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#003A70]/90 via-black/20 to-transparent" />
          {badge ? (
            <span className="absolute top-2 left-2 text-[10px] font-semibold bg-shuttle text-navy px-1.5 py-0.5 rounded-md">
              {badge}
            </span>
          ) : null}
          <div className="absolute bottom-2 left-2 right-2 text-white">
            <div className="text-[13px] font-semibold">{post.rallyCode ?? '回合'}</div>
            <div className="text-[11px] text-white/75">
              {post.shots}拍 · {post.tactic}
            </div>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between mt-2 px-0.5">
        <Link to={to} className="min-w-0">
          <div className="text-[13px] font-semibold text-navy truncate">{post.author}</div>
          <div className="text-[11px] text-slate-400">{post.time}</div>
        </Link>
        {onLike ? (
          <button type="button" onClick={onLike} className="flex items-center gap-1 shrink-0 pl-2">
            <Heart size={16} className={liked ? 'fill-navy text-navy' : 'text-slate-400'} />
            <span className={`text-[12px] tabular-nums ${liked ? 'text-navy font-semibold' : 'text-slate-500'}`}>
              {post.likes}
            </span>
          </button>
        ) : (
          <span className="text-[12px] text-slate-500 tabular-nums">{post.likes} 赞</span>
        )}
      </div>
    </div>
  )
}

export function postBadge(post: { friend?: boolean; mine?: boolean; hot?: boolean; authorId?: PlayerId }) {
  if (post.mine) return '我分享的'
  if (post.friend) return '好友'
  if (post.hot) return '热门'
  return undefined
}
