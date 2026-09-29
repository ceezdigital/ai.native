import { env } from "@/lib/env";
import { claimPendingJobs, markJobDone, markJobFailed, markJobProcessing, processJob } from "@/features/jobs";

const BATCH_SIZE = 20;

// The retry path only — see SYSTEM_DESIGN.md. Google Workspace sync runs
// inline right after a payment confirms; a job only ever lands here if
// that inline attempt failed. Vercel Cron calls this on whatever cadence
// the plan allows (daily on Hobby, per-minute on Pro) — either is fine,
// since nothing time-sensitive depends on this sweep running fast.
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${env.cronSecret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const jobs = await claimPendingJobs(BATCH_SIZE);
  const results = { processed: 0, failed: 0 };

  for (const job of jobs) {
    await markJobProcessing(job.id);
    try {
      await processJob(job);
      await markJobDone(job.id);
      results.processed += 1;
    } catch (error) {
      await markJobFailed(job.id, String(error));
      results.failed += 1;
    }
  }

  return Response.json(results);
}
