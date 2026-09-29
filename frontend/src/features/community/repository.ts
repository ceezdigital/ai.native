import { db } from "@/lib/db";
import type { CommunityTier } from "@prisma/client";

export function createPendingMembership(
  tallySubmissionId: string,
  memberName: string,
  memberEmail: string,
  memberPhone: string,
  tier: CommunityTier
) {
  return db.communityMembership.create({
    data: {
      tallySubmissionId,
      memberName,
      memberEmail,
      memberPhone,
      tier,
      status: "pending_payment",
    },
  });
}

export function findMembershipBySubmissionId(tallySubmissionId: string) {
  return db.communityMembership.findUnique({ where: { tallySubmissionId } });
}

export function findMembershipById(id: string) {
  return db.communityMembership.findUnique({
    where: { id },
    include: { payment: true }
  });
}
