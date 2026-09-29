import { db } from "@/lib/db";
import type { Prisma, JobType } from "@prisma/client";

export function enqueueJob(type: JobType, payload: Prisma.InputJsonValue) {
  return db.job.create({ data: { type, payload, status: "pending" } });
}

const MAX_ATTEMPTS = 5;

export function claimPendingJobs(limit: number) {
  return db.job.findMany({
    where: { status: "pending", runAfter: { lte: new Date() } },
    orderBy: { createdAt: "asc" },
    take: limit,
  });
}

export function markJobProcessing(id: string) {
  return db.job.update({ where: { id }, data: { status: "processing" } });
}

export function markJobDone(id: string) {
  return db.job.update({ where: { id }, data: { status: "done" } });
}

// Backs off exponentially (1m, 2m, 4m, 8m, 16m) and gives up after
// MAX_ATTEMPTS — a permanently-broken job (bad payload, revoked API scope)
// shouldn't retry forever and hide the failure from a Sheets/Gmail alert.
export async function markJobFailed(id: string, error: string) {
  const job = await db.job.findUniqueOrThrow({ where: { id } });
  const attempts = job.attempts + 1;
  const gaveUp = attempts >= MAX_ATTEMPTS;

  return db.job.update({
    where: { id },
    data: {
      attempts,
      lastError: error,
      status: gaveUp ? "failed" : "pending",
      runAfter: gaveUp ? job.runAfter : new Date(Date.now() + 2 ** attempts * 60_000),
    },
  });
}
