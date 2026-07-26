import { z } from "zod";
import { getCustomerSession } from "@/features/auth/session";
import {
  engagementRepository,
  EngagementPersistenceUnavailableError,
} from "@/features/engagement/repository";
const schema = z.object({
  benefitId: z.string().min(1).max(128),
  bookingId: z.string().min(1).max(128),
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
    return Response.json(
      { message: "Invalid reward redemption." },
      { status: 400 },
    );
  try {
    return Response.json(
      {
        transaction: await engagementRepository.redeemBenefit(
          session.uid,
          parsed.data.benefitId,
          parsed.data.bookingId,
        ),
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof EngagementPersistenceUnavailableError)
      return Response.json(
        { message: "Rewards are unavailable. No points were deducted." },
        { status: 503 },
      );
    throw error;
  }
}
