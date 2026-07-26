import { z } from "zod";
import { getCustomerSession } from "@/features/auth/session";
import {
  engagementRepository,
  EngagementPersistenceUnavailableError,
} from "@/features/engagement/repository";
const schema = z.object({
  emailTransactional: z.boolean(),
  smsTransactional: z.boolean(),
  pushTransactional: z.boolean(),
  inAppTransactional: z.boolean(),
  emailPromotional: z.boolean(),
  smsPromotional: z.boolean(),
  pushPromotional: z.boolean(),
  inAppPromotional: z.boolean(),
  marketingConsent: z.boolean(),
  pushConsent: z.boolean(),
});
export async function PATCH(request: Request) {
  const session = await getCustomerSession();
  if (!session)
    return Response.json(
      { message: "Authentication is required." },
      { status: 401 },
    );
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json(
      { message: "Invalid notification preferences." },
      { status: 400 },
    );
  try {
    return Response.json({
      preferences: await engagementRepository.updateNotificationPreferences(
        session.uid,
        parsed.data,
      ),
    });
  } catch (error) {
    if (error instanceof EngagementPersistenceUnavailableError)
      return Response.json(
        { message: "Preferences are unavailable. No settings were changed." },
        { status: 503 },
      );
    throw error;
  }
}
