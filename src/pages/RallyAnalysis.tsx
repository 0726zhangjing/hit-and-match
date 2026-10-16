import { ChevronLeft, Pause, Play, Share2, SkipBack, SkipForward } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppBar, Scroll } from '../components/AppBar'
import { Court } from '../components/Court'
import { Card } from '../components/ui'
import { useDemo } from '../context/DemoContext'
import { MATCH, RALLY } from '../data/mock'

export function RallyAnalysis() {
  const nav = useNavigate()
  const { rallyId } = useParams()
  const { shareRally, sharedRallyIds } = useDemo()
  const [i, setI] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [showRec, setShowRec] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const shot = RALLY.demo[i]
  const max = RALLY.demo.length - 1
  const rallyMeta = MATCH.keyRallies.find((r) => r.id === rallyId) ?? MATCH.keyRallies[1]
  const already = sharedRallyIds.has(rallyMeta.id)

  useEffect(() => {
    if (!playing) return
    const t = window.setInterval(() => {
      setI((cur) => {
        if (cur >= max) {
          setPlaying(false)
          return cur
        }
        return cur + 1
      })
    }, 1600)
    return () => window.clearInterval(t)
  }, [playing, max])

  function confirmShare() {
    shareRally(rallyMeta.id)
    setShareOpen(false)
    nav('/review')
  }

  useEffect(() => {
    if (!playing) return
    const t = window.setInterval(() => {
      setI((cur) => {
        if (cur >= max) {
          setPlaying(false)
          return cur
        }
        return cur + 1
      })
    }, 1600)
    return () => window.clearInterval(t)
  }, [playing, max])

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white">
      <AppBar
        title={`${rallyMeta.code} · ${rallyMeta.shots}拍`}
        left={
          <button type="button" onClick={() => nav(-1)} className="p-1 text-white">
            <ChevronLeft />
          </button>
        }
        right={
          <button type="button" onClick={() => setShareOpen(true)} className="p-1 text-white">
            <Share2 size={18} />
          </button>
        }
      />
      <div className="shrink-0 px-3 py-2 bg-navy text-white">
        <div className="flex items-center justify-between">
          <div className="text-[12px] text-white/70">决胜局 · {rallyMeta.code}</div>
          <div className="text-[18px] font-bold tabular-nums tracking-wide">
            {RALLY.scoreA} : {RALLY.scoreB}
          </div>
          <span className="text-[11px] bg-shuttle text-navy font-semibold px-2 py-0.5 rounded-md">{RALLY.situation}</span>
        </div>
        <div className="mt-1 text-[11px] text-white/80 leading-relaxed">
          {shot.formation ?? RALLY.rotation}
        </div>
        <div className="text-[11px] text-shuttle/90">{RALLY.serveRecv}</div>
      </div>
      <div className="px-3 py-1 bg-white text-[12px] text-slate-500 flex justify-between border-b border-slate-100 shrink-0">
        <span>{rallyMeta.title}</span>
        <span>战术：{RALLY.tactic}</span>
      </div>
      <div className="h-[250px] shrink-0 px-3 py-2 bg-navy-deep">
        <div className="h-full rounded-2xl overflow-hidden bg-[#196F44]">
          <Court shot={shot} showRec={showRec} />
        </div>
      </div>
      <div className="shrink-0 px-4 pt-2 pb-2 bg-white border-b border-slate-100">
        <div className="flex items-center justify-center gap-4 text-[12px] text-navy mb-2">
          <span className="flex items-center gap-1">
            <i className="w-6 border-t-[3px] border-shuttle" />
            黄色 → 回球线路
          </span>
          <span className="flex items-center gap-1">
            <i className="w-6 border-t-[3px] border-accent" />
            蓝色 → 球员移动
          </span>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="w-11 h-11 rounded-full bg-app flex items-center justify-center text-navy"
            onClick={() => {
              setPlaying(false)
              setI((v) => Math.max(0, v - 1))
            }}
          >
            <SkipBack size={18} />
          </button>
          <button
            type="button"
            className="w-14 h-14 rounded-full bg-shuttle text-navy flex items-center justify-center"
            onClick={() => setPlaying((v) => !v)}
          >
            {playing ? <Pause size={22} /> : <Play size={22} />}
          </button>
          <button
            type="button"
            className="w-11 h-11 rounded-full bg-app flex items-center justify-center text-navy"
            onClick={() => {
              setPlaying(false)
              setI((v) => Math.min(max, v + 1))
            }}
          >
            <SkipForward size={18} />
          </button>
          <div className="text-[18px] font-semibold text-navy tabular-nums w-16 text-right">
            {shot.n} / {RALLY.demo.length}
          </div>
        </div>
      </div>
      <Scroll className="bg-white px-4 pt-3 pb-5 space-y-3">
        <Card className="p-3">
          <div className="text-[13px] font-semibold text-navy">
            第{shot.n}拍 · {shot.title}
          </div>
          <p className="text-[12px] text-slate-600 mt-1 leading-relaxed">{shot.desc}</p>
          {shot.tacticalNote ? (
            <p className="text-[12px] text-navy mt-2 leading-relaxed bg-app rounded-lg px-2 py-1.5">{shot.tacticalNote}</p>
          ) : null}
        </Card>
        <Card className="p-3">
          <div className="text-[13px] font-semibold text-navy">AI战术分析</div>
          <div className="text-[12px] text-slate-500 mt-1">
            战术识别：{RALLY.tactic} · 关键转折：第{RALLY.turningShot}拍
          </div>
          <p className="text-[12px] text-slate-600 mt-2 leading-relaxed">{RALLY.ai}</p>
          <button
            type="button"
            onClick={() => {
              setShowRec((v) => !v)
              setI(2)
              setPlaying(false)
            }}
            className={`mt-3 w-full h-10 rounded-xl text-[13px] font-semibold ${
              showRec ? 'bg-navy text-white' : 'bg-app text-navy'
            }`}
          >
            {showRec ? '隐藏AI推荐线路' : '查看AI推荐线路'}
          </button>
          {showRec && shot.recShuttle ? (
            <p className="text-[12px] text-slate-500 mt-2">{shot.recShuttle.why} 黄色虚线为建议球路。</p>
          ) : (
            <p className="text-[11px] text-slate-400 mt-2">实线=实际球路 · 虚线=AI建议球路</p>
          )}
        </Card>
        <button
          type="button"
          onClick={() => setShareOpen(true)}
          className="w-full h-11 rounded-xl bg-navy text-white font-semibold text-[13px]"
        >
          {already ? '已分享到社群' : '分享这个回合'}
        </button>
        <p className="text-[11px] text-slate-400 text-center">{MATCH.venue} · 本回合只复盘战术，不跳转个人档案</p>
      </Scroll>
      {shareOpen ? (
        <div className="absolute inset-0 z-50">
          <button type="button" className="absolute inset-0 bg-black/40" onClick={() => setShareOpen(false)} />
          <div className="absolute left-4 right-4 bottom-10 bg-white rounded-2xl p-5">
            <div className="text-[16px] font-semibold text-navy">分享这个回合</div>
            <p className="text-[13px] text-slate-500 mt-2 leading-relaxed">
              {rallyMeta.code} · {rallyMeta.shots}拍 · {rallyMeta.title}。发到北航羽球圈后，好友和点赞高的回合会出现在首页。
            </p>
            <button
              type="button"
              onClick={confirmShare}
              className="mt-4 w-full h-11 rounded-xl bg-shuttle text-navy font-semibold"
            >
              {already ? '已分享，去社群看看' : '分享到北航羽球圈'}
            </button>
            <button type="button" onClick={() => setShareOpen(false)} className="mt-1 w-full h-10 text-[13px] text-slate-400">
              取消
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
