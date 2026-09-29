import { db } from "@/lib/db";
import type { CommunityTier } from "@prisma/client";

// The backend's own source of truth for what each tier costs — deliberately
// separate from the display prices in the frontend's content.ts. Payment
// amounts must never be trusted from client input or re-derived from
// presentation copy; this is what actually gets charged.
export const COMMUNITY_TIER_PRICING_KES: Record<Exclude<CommunityTier, "included_trial">, number> = {
  monthly: 1_000,
  six_month: 5_000,
  annual: 9_000,
};

export function createPendingMembership(
  idempotencyKey: string,
  memberName: string,
  memberEmail: string,
  memberPhone: string,
  tier: CommunityTier,
) {
  return db.communityMembership.create({
    data: {
      idempotencyKey,
      memberName,
      memberEmail,
      memberPhone,
      tier,
      status: "pending_payment",
    },
  });
}

export function findMembershipByIdempotencyKey(idempotencyKey: string) {
  return db.communityMembership.findUnique({ where: { idempotencyKey } });
}

export function findMembershipById(id: string) {
  return db.communityMembership.findUnique({
    where: { id },
    include: { payment: true },
  });
}

function renewalPeriodMonths(tier: CommunityTier): number {
  if (tier === "six_month") return 6;
  if (tier === "annual") return 12;
  return 1; // monthly, included_trial
}

// A pure repository function — deliberately has no dependency on the
// payments feature, so payments/service.ts can call this directly without
// creating a circular import between the two features.
export function confirmMembership(membershipId: string, tier: CommunityTier) {
  const startedAt = new Date();
  const renewsAt = new Date(startedAt);
  renewsAt.setMonth(renewsAt.getMonth() + renewalPeriodMonths(tier));

  return db.communityMembership.update({
    where: { id: membershipId },
    data: { status: "active", startedAt, renewsAt },
  });
}
