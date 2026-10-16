export type PlayerId = 'zhang' | 'wang' | 'li' | 'chen' | 'zhao' | 'lin' | 'zhou'

export type Point = { x: number; y: number }

export type Metric = {
  name: string
  score: number
  raw: string
}

export type Dimension = {
  key: string
  name: string
  score: number
  metrics: Metric[]
}

export type Player = {
  id: PlayerId
  name: string
  initial: string
  color: string
  overall: number
  style: string
  tags: string[]
  strengths: string[]
  weaknesses: string[]
  dims: Dimension[]
  trend: number[]
  registered: boolean
  matchPct?: number
  venue: string
  gamesWithZhang?: number
}

export type RallyCard = {
  id: string
  code: string
  shots: number
  title: string
  highlight: boolean
}

export type Shot = {
  n: number
  title: string
  desc: string
  positions: Record<PlayerId, Point>
  shuttle: { from: Point; to: Point }
  moves: { playerId: PlayerId; from: Point; to: Point }[]
  recShuttle?: { from: Point; to: Point; why: string }
  formation?: string
  tacticalNote?: string
}

export type Rally = {
  id: string
  code: string
  shotsTotal: number
  title: string
  tactic: string
  turningShot: number
  ai: string
  demo: Shot[]
  set: number
  scoreA: number
  scoreB: number
  situation: string
  server: PlayerId
  receiver: PlayerId
  rotation: string
  serveRecv: string
}

export type MatchInfo = {
  id: string
  date: string
  venueId: string
  venue: string
  event: string
  duration: string
  rallies: number
  longest: number
  attackPoints: number
  unforced: number
  sets: string[]
  teamA: [PlayerId, PlayerId]
  teamB: [PlayerId, PlayerId]
  summary: { label: string; value: string }[]
  keyRallies: RallyCard[]
  pairId: string
}

export type PairInfo = {
  id: string
  a: PlayerId
  b: PlayerId
  score: number
  type: string
  tags: string[]
  dims: Dimension[]
  quote: string
  together: number
  winRate: number
  avgAttack: number
  rotation: string
}

export type GraphNode = {
  id: PlayerId
  layer: 0 | 1 | 2 | 3
  angle: number
  activity: number
}

export type GraphLink = { a: PlayerId; b: PlayerId; w: number }

export type CourtSlot = {
  id: string
  time: string
  court: string
  status: 'open' | 'full' | 'mine'
}

export type Session = {
  id: string
  when: string
  time: string
  venue: string
  venueId: string
  type: string
  filled: number
  cap: number
  players: PlayerId[]
  looking: PlayerId
  teamA: [PlayerId, PlayerId]
  teamB: [PlayerId, PlayerId]
  predict: [number, number]
  reason: string
  distanceKm: number
  price: number
  tags: string[]
  level: string
}

export type VenueInfo = {
  id: string
  name: string
  area: string
  distanceKm: number
  price: number
  tags: string[]
  rating: number
  courts: number
  today: number
  people: number
  videos: number
  claimed: number
  services: string[]
  shop: { cost: number; item: string }[]
  slots: CourtSlot[]
}

export type FriendRec = {
  id: PlayerId
  matchScore: number
  layer: 1 | 2 | 3
  reason: string
  commons: number
  commonFriends: number
  via?: string
}

export type Activity = {
  id: string
  name: string
  text: string
  time: string
}

export type Message = {
  id: string
  from: string
  text: string
  time: string
  unread?: boolean
}

export type CommunityPost = {
  id: string
  author: string
  authorId?: PlayerId
  title: string
  text: string
  time: string
  likes: number
  kind: 'text' | 'rally'
  matchId?: string
  rallyId?: string
  rallyCode?: string
  shots?: number
  tactic?: string
}

export type CoachInfo = {
  id: string
  name: string
  specialty: string
  years: number
  price: string
  priceNum: number
  reason: string
  rating: number
}

export type MembershipTier = 'basic' | 'silver' | 'gold'

export type MemberPlan = {
  id: MembershipTier
  name: string
  price: string
  period: string
  venueOff: string
  gearOff: string
  coachOff: string
  features: string[]
  highlight: string
}

export type ClassicRally = {
  id: string
  event: string
  year: string
  title: string
  shots: number
  tactic: string
  rallyId: string
  note: string
  sideA: string
  sideB: string
  cover: string
}

export type TeachVideo = {
  id: string
  title: string
  coach: string
  mins: number
  tier: MembershipTier
}

export type GearItem = {
  id: string
  name: string
  price: number
  tag: string
}

export type SpendRecord = {
  id: string
  date: string
  title: string
  channel: '场地' | '装备' | '课程' | '会员'
  origin: number
  paid: number
}
