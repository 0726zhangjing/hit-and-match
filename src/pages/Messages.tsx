import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Scroll } from '../components/AppBar'
import { Card } from '../components/ui'
import { MESSAGES } from '../data/mock'

export function Messages() {
  const nav = useNavigate()
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <AppBar
        title="消息"
        left={
          <button type="button" onClick={() => nav(-1)} className="p-1 text-white">
            <ChevronLeft />
          </button>
        }
      />
      <Scroll className="px-4 pt-3 pb-4">
        <Card className="divide-y divide-slate-100">
          {MESSAGES.map((m) => (
            <div key={m.id} className="px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-semibold text-navy">{m.from}</span>
                <span className="text-[11px] text-slate-400">{m.time}</span>
              </div>
              <div className="text-[12px] text-slate-500 mt-0.5 flex items-center gap-1">
                {m.unread ? <span className="w-1.5 h-1.5 rounded-full bg-shuttle" /> : null}
                {m.text}
              </div>
            </div>
          ))}
        </Card>
      </Scroll>
    </div>
  )
}
