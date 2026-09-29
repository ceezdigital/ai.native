import { env } from "@/lib/env";
import { findMembershipBySubmissionId } from "@/features/community/repository";
import { startCommunityCheckout } from "@/features/community/service";

async function waitForMembership(submissionId: string, attempts = 6, delayMs = 700) {
  for (let attempt = 0; attempt < attempts; attempt++) {
    const mem = await findMembershipBySubmissionId(submissionId);
    if (mem) return mem;
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  return null;
}

export async function GET(request: Request) {
  const submissionId = new URL(request.url).searchParams.get("submissionId");
  if (!submissionId) {
    return new Response("Missing submissionId", { status: 400 });
  }

  const membership = await waitForMembership(submissionId);
  if (!membership) {
    return new Response(
      "We're still processing your submission — check your email in a few minutes, or contact us if it doesn't arrive.",
      { status: 404 },
    );
  }

  if (membership.status !== "pending_payment") {
    return Response.redirect(`${env.appUrl}/#community`, 302);
  }

  const redirectUrl = await startCommunityCheckout(membership.id);
  return Response.redirect(redirectUrl, 302);
}
