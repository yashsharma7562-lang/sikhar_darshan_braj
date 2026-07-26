import { z } from "zod";
import { getCustomerSession } from "@/features/auth/session";
import {
  engagementRepository,
  EngagementPersistenceUnavailableError,
} from "@/features/engagement/repository";
const schema = z.object({
  bookingId: z.string().min(1).max(128),
  bookingItemId: z.string().min(1).max(128),
  overallRating: z.number().int().min(1).max(5),
  text: z.string().trim().min(10).max(3000),
  accessibilityRating: z.number().int().min(1).max(5).optional(),
  seniorFriendlinessRating: z.number().int().min(1).max(5).optional(),
});
export async function POST(request: Request) {
  const session = await getCustomerSession();
  if (!session)
    return Response.json(
      { message: "Authentication is required." },
      { status: 401 },
    );
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json({ message: "Invalid review." }, { status: 400 });
  try {
    return Response.json(
      {
        review: await engagementRepository.createReview(
          session.uid,
          parsed.data,
        ),
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof EngagementPersistenceUnavailableError)
      return Response.json(
        { message: "Reviews are unavailable. Nothing was published." },
        { status: 503 },
      );
    throw error;
  }
}
