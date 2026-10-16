import type { ReactNode } from 'react'

export function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#001F3F] flex items-center justify-center p-4 max-[430px]:p-0">
      <div className="relative w-[402px] h-[874px] bg-app overflow-hidden rounded-[46px] shadow-[0_24px_80px_rgba(0,31,63,0.55)] ring-[10px] ring-black max-[430px]:w-full max-[430px]:h-[100dvh] max-[430px]:rounded-none max-[430px]:ring-0">
        <div className="absolute top-0 inset-x-0 h-[48px] bg-navy z-30 pointer-events-none max-[430px]:h-[env(safe-area-inset-top)]" />
        <div className="absolute bottom-0 inset-x-0 h-[22px] bg-white z-30 pointer-events-none max-[430px]:hidden" />
        <div className="absolute top-[11px] left-1/2 -translate-x-1/2 w-[118px] h-[34px] rounded-full bg-black z-50 pointer-events-none max-[430px]:hidden" />
        <div className="h-full pt-[48px] pb-[22px] flex flex-col relative z-10 max-[430px]:pt-[env(safe-area-inset-top)] max-[430px]:pb-[env(safe-area-inset-bottom)]">
          {children}
        </div>
        <div className="absolute bottom-[7px] left-1/2 -translate-x-1/2 w-[128px] h-[5px] rounded-full bg-navy/25 z-50 pointer-events-none max-[430px]:hidden" />
      </div>
    </div>
  )
}
