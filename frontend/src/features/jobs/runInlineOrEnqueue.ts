import type { JobType, Prisma } from "@prisma/client";
import { enqueueJob } from "./repository";
import { runJobPayload } from "./processJob";

// The actual "inline-first" entry point: try the Google Workspace call
// right away so the attendee's confirmation email isn't waiting on a cron
// tick. Only on failure does this fall back to the Job table, where the
// retry sweep in /api/cron/retry-jobs picks it up later.
export async function runInlineOrEnqueue(type: JobType, payload: Prisma.InputJsonValue) {
  try {
    await runJobPayload(type, payload);
  } catch (error) {
    console.error(`Inline ${type} job failed, queued for retry:`, error);
    await enqueueJob(type, payload);
  }
}
