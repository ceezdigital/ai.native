import type { CommunityTier } from "@prisma/client";
import { createPendingMembership, findMembershipByIdempotencyKey } from "./repository";
import type { MemberInfo } from "./types";

// idempotencyKey is generated client-side (one per form load) so a
// double-click or a retried submit can't create two memberships for the
// same attempt — the second call just finds and returns the first one.
export async function getOrCreateMembership(member: MemberInfo, idempotencyKey: string, tier: CommunityTier) {
  const existing = await findMembershipByIdempotencyKey(idempotencyKey);
  if (existing) return existing;

  return createPendingMembership(idempotencyKey, member.name, member.email, member.phone, tier);
}
