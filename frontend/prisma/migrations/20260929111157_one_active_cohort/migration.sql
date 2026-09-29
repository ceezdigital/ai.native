-- Enforces "at most one active cohort" at the database level. Application
-- code assumed this (getActiveCohort() takes the first by event_date), but
-- nothing stopped a second row from being created with is_active = true —
-- which happened in practice (a leftover test-data script) and silently
-- misattributed real bookings to the wrong cohort. A partial unique index
-- is the right tool here; Prisma's schema syntax doesn't express a
-- filtered index, so this exists only in the migration, not schema.prisma.
CREATE UNIQUE INDEX "cohorts_one_active_idx" ON "cohorts" ("is_active") WHERE "is_active" = true;
