import { Link } from 'react-router-dom'
import { AppBar, Scroll, SearchBell } from '../components/AppBar'
import { Avatar } from '../components/Avatar'
import { RallyClip, postBadge } from '../components/RallyClip'
import { Card, PrimaryButton, SectionTitle } from '../components/ui'
import { recommendedRallies, useDemo } from '../context/DemoContext'
import { MATCH, PLAYERS, SESSION } from '../data/mock'

export function Home() {
  const { posts, likedIds, likePost, isFriend } = useDemo()
  const clips = recommendedRallies(posts, isFriend).slice(0, 4)

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <AppBar
        brand={
          <div>
            <div className="text-[18px] font-bold text-white leading-tight">一拍即合</div>
            <div className="text-[10px] text-white/65 tracking-[0.18em]">HIT & MATCH</div>
          </div>
        }
        right={<SearchBell />}
      />
      <Scroll className="pb-5">
        <div className="px-4 pt-3 space-y-4">
          <Card className="p-4">
            <div className="text-[13px] text-navy font-medium mb-3">昨晚这场球，AI 发现了 3 个关键回合</div>
            <div className="h-40 rounded-xl overflow-hidden relative mb-3">
              <img src={`${import.meta.env.BASE_URL}hero-court.png`} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003A70]/95 via-[#003A70]/35 to-black/15" />
              <div className="absolute inset-0 flex items-end p-3 text-white">
                <div>
                  <div className="text-[12px] text-white/70">
                    {MATCH.date} · {MATCH.venue}
                  </div>
                  <div className="text-[16px] font-semibold">
                    {PLAYERS.zhang.name} / {PLAYERS.wang.name}
                  </div>
                  <div className="text-[12px] text-white/70">
                    VS {PLAYERS.li.name} / {PLAYERS.chen.name}
                  </div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-[11px] text-shuttle">{MATCH.event}</div>
                  <div className="text-[13px] font-semibold tabular-nums">{MATCH.sets.join('  ')}</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-1 text-center mb-3">
              {[
                ['时长', MATCH.duration],
                ['回合', String(MATCH.rallies)],
                ['最长', `${MATCH.longest}拍`],
                ['进攻', String(MATCH.attackPoints)],
                ['失误', String(MATCH.unforced)],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="text-[14px] font-semibold text-navy tabular-nums">{v}</div>
                  <div className="text-[10px] text-slate-400">{k}</div>
                </div>
              ))}
            </div>
            <PrimaryButton to={`/match/${MATCH.id}`}>查看AI战术复盘</PrimaryButton>
          </Card>

          {clips.length > 0 ? (
            <div>
              <SectionTitle extra={<Link to="/review" className="text-[12px] text-accent">查看更多</Link>}>
                精彩回合
              </SectionTitle>
              <p className="text-[11px] text-slate-400 px-1 -mt-1 mb-2">好友分享，或社群点赞高的回合会出现在这里</p>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                {clips.map((p) => (
                  <RallyClip
                    key={p.id}
                    post={p}
                    compact
                    liked={likedIds.has(p.id)}
                    onLike={() => likePost(p.id)}
                    badge={postBadge(p)}
                  />
                ))}
              </div>
            </div>
          ) : null}

          <div>
            <SectionTitle>我最近的比赛</SectionTitle>
            <Card className="px-4 divide-y divide-slate-100">
              <Link to={`/match/${MATCH.id}`} className="py-3 block">
                <div className="text-[13px] font-medium text-navy">
                  {MATCH.date} · {MATCH.event}
                </div>
                <div className="text-[12px] text-slate-500 mt-0.5">
                  {PLAYERS.zhang.name}/{PLAYERS.wang.name} {MATCH.sets[2]} {PLAYERS.li.name}/{PLAYERS.chen.name}
                </div>
              </Link>
              <Link to={`/match/${MATCH.id}`} className="py-3 block">
                <div className="text-[13px] font-medium text-navy">2026年9月12日 · 混双练习</div>
                <div className="text-[12px] text-slate-500 mt-0.5">北航羽毛球馆 · 41min</div>
              </Link>
            </Card>
          </div>

          <div>
            <SectionTitle extra={<Link to="/play?tab=sessions" className="text-[12px] text-accent">全部</Link>}>
              推荐球局
            </SectionTitle>
            <Link to={`/session/${SESSION.id}`}>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[14px] font-semibold text-navy">
                      {SESSION.when} {SESSION.time} · {SESSION.type}
                    </div>
                    <div className="text-[12px] text-slate-500 mt-0.5">{SESSION.venue}</div>
                  </div>
                  <div className="text-shuttle font-semibold text-[13px]">
                    {SESSION.filled}/{SESSION.cap}人
                  </div>
                </div>
                <div className="flex -space-x-2 mt-3">
                  {SESSION.players.map((id) => (
                    <Avatar key={id} id={id} size={32} />
                  ))}
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </Scroll>
    </div>
  )
}
