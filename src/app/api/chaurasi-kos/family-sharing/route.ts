import { z } from "zod";
import { getCustomerSession } from "@/features/auth/session";
import {
  journeyRepository,
  JourneyPersistenceUnavailableError,
} from "@/features/chaurasi-kos/repository";
const schema = z.object({
  journeyId: z.string().min(1).max(120),
  familyMemberId: z.string().min(1).max(120),
  locationSharing: z.boolean(),
  expiresAt: z.iso.datetime(),
});
export async function POST(request: Request) {
  const session = await getCustomerSession();
  if (!session)
    return Response.json(
      { message: "Authentication is required." },
      { status: 401 },
    );
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success || parsed.data.expiresAt <= new Date().toISOString())
    return Response.json(
      { message: "Invalid family-sharing request." },
      { status: 400 },
    );
  try {
    if (!(await journeyRepository.hasFamilySharingConsent(session.uid)))
      return Response.json(
        { message: "Family-sharing consent is required." },
        { status: 403 },
      );
    const journey = await journeyRepository.getOwned(
      parsed.data.journeyId,
      session.uid,
    );
    if (!journey)
      return Response.json({ message: "Journey not found." }, { status: 404 });
    await journeyRepository.createFamilyGrant({
      ...parsed.data,
      ownerId: session.uid,
      revokedAt: null,
    });
    return Response.json(
      { shared: true, expiresAt: parsed.data.expiresAt },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof JourneyPersistenceUnavailableError)
      return Response.json(
        { message: "Family sharing is unavailable. No access was granted." },
        { status: 503 },
      );
    throw error;
  }
}
