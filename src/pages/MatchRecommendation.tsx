import { ChevronLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppBar, Scroll } from '../components/AppBar'
import { Avatar } from '../components/Avatar'
import { Card, PrimaryButton } from '../components/ui'
import { useDemo } from '../context/DemoContext'
import { PLAYERS, SESSIONS } from '../data/mock'

export function MatchRecommendation() {
  const nav = useNavigate()
  const { id } = useParams()
  const { joined, join } = useDemo()
  const session = SESSIONS.find((s) => s.id === id) ?? SESSIONS[0]
  const looking = PLAYERS[session.looking]

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <AppBar
        title="AI推荐球局"
        left={
          <button type="button" onClick={() => nav(-1)} className="p-1 text-white">
            <ChevronLeft />
          </button>
        }
      />
      <Scroll className="px-4 py-4 space-y-3">
        <Card className="p-4">
          <div className="text-[18px] font-bold text-navy">
            {session.when} {session.time}
          </div>
          <div className="text-[13px] text-slate-500 mt-1">
            {session.venue} · {session.type} · {session.distanceKm}km · ¥{session.price}/人
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {session.tags.map((t) => (
              <span key={t} className="text-[11px] bg-app text-navy px-2 py-0.5 rounded-md">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-3 text-shuttle font-semibold">
            当前 {joined && session.id === 's1' ? 4 : session.filled} / {session.cap} 人
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-[13px] font-semibold text-navy mb-2">已有球员</div>
          <div className="space-y-2">
            {session.players.map((pid) => (
              <div key={pid} className="flex items-center gap-2">
                <Avatar id={pid} size={32} />
                <span className="text-[13px] text-navy">{PLAYERS[pid].name}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-[13px] font-semibold text-navy">AI 正在寻找第 4 名</div>
          <div className="flex items-center gap-3 mt-3">
            <Avatar id={looking.id} size={44} />
            <div>
              <div className="text-[14px] font-semibold text-navy">推荐：{looking.name}</div>
              <div className="text-[12px] text-slate-500">双方综合实力接近</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-[13px] font-semibold text-navy mb-2">预计分组</div>
          <div className="grid grid-cols-2 gap-2 text-[12px]">
            <div className="bg-app rounded-xl p-3">
              A队
              <div className="font-semibold text-navy mt-1">
                {PLAYERS[session.teamA[0]].name} + {PLAYERS[session.teamA[1]].name}
              </div>
            </div>
            <div className="bg-app rounded-xl p-3">
              B队
              <div className="font-semibold text-navy mt-1">
                {PLAYERS[session.teamB[0]].name} + {PLAYERS[session.teamB[1]].name}
              </div>
            </div>
          </div>
          <div className="text-center mt-3">
            <div className="text-[11px] text-slate-400">AI预测综合实力</div>
            <div className="text-[28px] font-bold text-navy tabular-nums">
              {session.predict[0]} : {session.predict[1]}
            </div>
            <p className="text-[12px] text-slate-500 mt-1">{session.reason}</p>
          </div>
        </Card>
        {joined ? (
          <Card className="p-5 text-center">
            <div className="text-[18px] font-bold text-good">加入成功</div>
            <div className="text-[16px] text-navy mt-1">周六见！</div>
            <button type="button" onClick={() => nav(`/venue/${session.venueId}`)} className="mt-3 text-[13px] text-accent">
              看看{session.venue}
            </button>
          </Card>
        ) : (
          <PrimaryButton onClick={join}>加入球局</PrimaryButton>
        )}
      </Scroll>
    </div>
  )
}
