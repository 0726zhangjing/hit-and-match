import type { MembershipTier } from '../types'

export const TIER_RATE: Record<MembershipTier, { venue: number; gear: number; coach: number }> = {
  basic: { venue: 0.9, gear: 1, coach: 1 },
  silver: { venue: 0.85, gear: 0.9, coach: 1 },
  gold: { venue: 0.75, gear: 0.8, coach: 0.85 },
}

export const TIER_RANK: Record<MembershipTier, number> = {
  basic: 0,
  silver: 1,
  gold: 2,
}

export function memberPrice(base: number, rate: number) {
  return Math.round(base * rate)
}

export function canAccess(user: MembershipTier, need: MembershipTier) {
  return TIER_RANK[user] >= TIER_RANK[need]
}

export function tierLabel(tier: MembershipTier) {
  return { basic: '普通会员', silver: '银卡', gold: '金卡' }[tier]
}
