import { Link } from 'react-router-dom'
import { AppBar, Scroll } from '../components/AppBar'
import { Avatar } from '../components/Avatar'
import { RelationTags } from '../components/RelationTags'
import { Card } from '../components/ui'
import { FRIENDS, PLAYERS } from '../data/mock'

export function SocialGraph() {
  const list = [...FRIENDS].sort((a, b) => b.matchScore - a.matchScore)

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <AppBar title="球友" />
      <Scroll className="px-4 pt-3 pb-4 space-y-3">
        <p className="text-[12px] text-slate-500 px-1">按匹配程度排序。点进去看档案、标签和关系。</p>
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
    </div>
  )
}
