import { getCustomerSession } from "@/features/auth/session";
import {
  engagementRepository,
  EngagementPersistenceUnavailableError,
} from "@/features/engagement/repository";
export async function POST() {
  const session = await getCustomerSession();
  if (!session)
    return Response.json(
      { message: "Authentication is required." },
      { status: 401 },
    );
  try {
    return Response.json(
      { referral: await engagementRepository.createReferralCode(session.uid) },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof EngagementPersistenceUnavailableError)
      return Response.json(
        { message: "Referrals are unavailable. No code was created." },
        { status: 503 },
      );
    throw error;
  }
}
