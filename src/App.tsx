import { HashRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { BottomNav } from './components/BottomNav'
import { PhoneShell } from './components/PhoneShell'
import { DemoProvider } from './context/DemoContext'
import { ClaimPlayer } from './pages/ClaimPlayer'
import { Coach } from './pages/Coach'
import { Home } from './pages/Home'
import { MatchAnalysis } from './pages/MatchAnalysis'
import { MatchRecommendation } from './pages/MatchRecommendation'
import { Me } from './pages/Me'
import { Messages } from './pages/Messages'
import { PairAnalysis } from './pages/PairAnalysis'
import { Play } from './pages/Play'
import { PlayerProfile } from './pages/PlayerProfile'
import { Prepare } from './pages/Prepare'
import { RallyAnalysis } from './pages/RallyAnalysis'
import { Review } from './pages/Review'
import { Search } from './pages/Search'
import { Shop } from './pages/Shop'
import { Venue } from './pages/Venue'

function Tabs() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 min-h-0 relative flex flex-col">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  )
}

function Stack() {
  return (
    <div className="h-full flex flex-col relative">
      <Outlet />
    </div>
  )
}

export default function App() {
  return (
    <DemoProvider>
      <HashRouter>
        <PhoneShell>
          <div className="h-full text-navy">
            <Routes>
              <Route element={<Tabs />}>
                <Route path="/" element={<Home />} />
                <Route path="/prepare" element={<Prepare />} />
                <Route path="/play" element={<Play />} />
                <Route path="/review" element={<Review />} />
                <Route path="/me" element={<Me />} />
              </Route>
              <Route element={<Stack />}>
                <Route path="/match/:id" element={<MatchAnalysis />} />
                <Route path="/match/:id/rally/:rallyId" element={<RallyAnalysis />} />
                <Route path="/player/:id" element={<PlayerProfile />} />
                <Route path="/pair/:id" element={<PairAnalysis />} />
                <Route path="/claim/:matchId" element={<ClaimPlayer />} />
                <Route path="/session/:id" element={<MatchRecommendation />} />
                <Route path="/venue/:id" element={<Venue />} />
                <Route path="/coach" element={<Coach />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/search" element={<Search />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/sessions" element={<Navigate to="/play?tab=sessions" replace />} />
                <Route path="/friends" element={<Navigate to="/play?tab=friends" replace />} />
                <Route path="/venues" element={<Navigate to="/play?tab=venues" replace />} />
                <Route path="/community" element={<Navigate to="/review" replace />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </PhoneShell>
      </HashRouter>
    </DemoProvider>
  )
}
