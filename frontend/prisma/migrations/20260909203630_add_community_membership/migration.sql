-- CreateEnum
CREATE TYPE "CommunityTier" AS ENUM ('included_trial', 'monthly', 'six_month', 'annual');

-- CreateEnum
CREATE TYPE "MembershipStatus" AS ENUM ('pending_payment', 'active', 'lapsed', 'cancelled');

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_booking_id_fkey";

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "membership_id" TEXT,
ALTER COLUMN "booking_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "community_memberships" (
    "id" TEXT NOT NULL,
    "tally_submission_id" TEXT NOT NULL,
    "member_name" TEXT NOT NULL,
    "member_email" TEXT NOT NULL,
    "member_phone" TEXT NOT NULL,
    "tier" "CommunityTier" NOT NULL,
    "status" "MembershipStatus" NOT NULL DEFAULT 'pending_payment',
    "started_at" TIMESTAMP(3),
    "renews_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "community_memberships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "community_memberships_tally_submission_id_key" ON "community_memberships"("tally_submission_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_membership_id_key" ON "payments"("membership_id");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_membership_id_fkey" FOREIGN KEY ("membership_id") REFERENCES "community_memberships"("id") ON DELETE SET NULL ON UPDATE CASCADE;
