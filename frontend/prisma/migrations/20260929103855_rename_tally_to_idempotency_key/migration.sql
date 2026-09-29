-- RenameColumn (preserves data — these values remain valid idempotency
-- keys regardless of which system originated them)
ALTER TABLE "bookings" RENAME COLUMN "tally_submission_id" TO "idempotency_key";
ALTER TABLE "community_memberships" RENAME COLUMN "tally_submission_id" TO "idempotency_key";

-- RenameIndex (Postgres allows renaming a unique index directly, which
-- also renames the constraint backed by it)
ALTER INDEX "bookings_tally_submission_id_key" RENAME TO "bookings_idempotency_key_key";
ALTER INDEX "community_memberships_tally_submission_id_key" RENAME TO "community_memberships_idempotency_key_key";
