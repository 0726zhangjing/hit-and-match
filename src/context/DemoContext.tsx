import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { COMMUNITY_POSTS, FRIENDS, MATCH, RALLY } from '../data/mock'
import type { CommunityPost, MembershipTier, PlayerId } from '../types'

const FRIEND_IDS = new Set(FRIENDS.filter((f) => f.layer === 1).map((f) => f.id))

type DemoContextValue = {
  claimedId: PlayerId | null
  joined: boolean
  posts: CommunityPost[]
  likedIds: Set<string>
  sharedRallyIds: Set<string>
  membership: MembershipTier
  subscribed: Set<string>
  claim: (id: PlayerId) => void
  join: () => void
  likePost: (id: string) => void
  shareRally: (rallyId: string) => boolean
  isFriend: (id?: PlayerId) => boolean
  setMembership: (tier: MembershipTier) => void
  toggleSubscribe: (id: string) => void
}

const DemoContext = createContext<DemoContextValue | null>(null)

export function DemoProvider({ children }: { children: ReactNode }) {
  const [claimedId, setClaimedId] = useState<PlayerId | null>(null)
  const [joined, setJoined] = useState(false)
  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS)
  const [likedIds, setLikedIds] = useState<Set<string>>(() => new Set())
  const [sharedRallyIds, setSharedRallyIds] = useState<Set<string>>(() => new Set())
  const [membership, setMembership] = useState<MembershipTier>('basic')
  const [subscribed, setSubscribed] = useState<Set<string>>(() => new Set(['t1']))

  const value = useMemo(
    () => ({
      claimedId,
      joined,
      posts,
      likedIds,
      sharedRallyIds,
      membership,
      subscribed,
      claim: (id: PlayerId) => setClaimedId(id),
      join: () => setJoined(true),
      setMembership,
      toggleSubscribe: (id: string) => {
        setSubscribed((prev) => {
          const next = new Set(prev)
          if (next.has(id)) next.delete(id)
          else next.add(id)
          return next
        })
      },
      isFriend: (id?: PlayerId) => !!id && FRIEND_IDS.has(id),
      likePost: (id: string) => {
        setLikedIds((prev) => {
          const next = new Set(prev)
          const was = next.has(id)
          if (was) next.delete(id)
          else next.add(id)
          setPosts((list) => list.map((p) => (p.id === id ? { ...p, likes: p.likes + (was ? -1 : 1) } : p)))
          return next
        })
      },
      shareRally: (rallyId: string) => {
        if (sharedRallyIds.has(rallyId)) return false
        const rally = MATCH.keyRallies.find((r) => r.id === rallyId) ?? MATCH.keyRallies[1]
        const post: CommunityPost = {
          id: `share-${rallyId}`,
          author: '张悦',
          authorId: 'zhang',
          title: `${rally.code} · ${rally.shots}拍${rally.title}`,
          text: `分享了本场关键回合，战术：${RALLY.tactic}。欢迎来看AI复盘。`,
          time: '刚刚',
          likes: 0,
          kind: 'rally',
          matchId: MATCH.id,
          rallyId,
          rallyCode: rally.code,
          shots: rally.shots,
          tactic: RALLY.tactic,
        }
        setPosts((list) => [post, ...list])
        setSharedRallyIds((prev) => new Set(prev).add(rallyId))
        return true
      },
    }),
    [claimedId, joined, posts, likedIds, sharedRallyIds, membership, subscribed],
  )
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

export function useDemo() {
  const ctx = useContext(DemoContext)
  if (!ctx) throw new Error('useDemo must be used within DemoProvider')
  return ctx
}

export function recommendedRallies(posts: CommunityPost[], isFriend: (id?: PlayerId) => boolean) {
  return posts
    .filter((p) => p.kind === 'rally')
    .map((p) => {
      const friend = isFriend(p.authorId)
      const mine = p.authorId === 'zhang'
      const hot = p.likes >= 40
      return { ...p, friend, mine, hot, score: p.likes + (friend ? 50 : 0) + (mine ? 100 : 0) }
    })
    .filter((p) => p.hot || p.friend || p.mine)
    .sort((a, b) => b.score - a.score)
}
