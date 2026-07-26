import { z } from "zod";
import { getStaffPrincipal } from "@/features/auth/authorization";
import {
  engagementRepository,
  EngagementPersistenceUnavailableError,
} from "@/features/engagement/repository";
const schema = z.object({ bookingId: z.string().min(1).max(128) });
export async function POST(request: Request) {
  const principal = await getStaffPrincipal(
    ["marketing-manager", "customer-support-agent"],
    "notifications.review-requests.write",
  );
  if (!principal)
    return Response.json(
      { message: "Review-request permission is required." },
      { status: 403 },
    );
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json(
      { message: "Invalid review request." },
      { status: 400 },
    );
  try {
    return Response.json(
      {
        request: await engagementRepository.createReviewRequest(
          principal.uid,
          parsed.data.bookingId,
        ),
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof EngagementPersistenceUnavailableError)
      return Response.json(
        {
          message: "Review requests are unavailable. No message was scheduled.",
        },
        { status: 503 },
      );
    throw error;
  }
}
