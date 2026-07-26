import { z } from "zod";
import { getCustomerSession } from "@/features/auth/session";
import {
  itineraryRepository,
  ItineraryPersistenceUnavailableError,
} from "@/features/itinerary/repository";
import { createShareSecret } from "@/features/itinerary/sharing";
const schema = z.object({
  itineraryId: z.string().min(1).max(120),
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
      { message: "Invalid sharing request." },
      { status: 400 },
    );
  try {
    const value = await itineraryRepository.getOwned(
      parsed.data.itineraryId,
      session.uid,
    );
    if (!value)
      return Response.json(
        { message: "Itinerary not found." },
        { status: 404 },
      );
    const secret = createShareSecret();
    await itineraryRepository.createShare({
      tokenHash: secret.tokenHash,
      itineraryId: value.id,
      ownerId: session.uid,
      permission: "view",
      expiresAt: parsed.data.expiresAt,
      revokedAt: null,
    });
    return Response.json(
      { token: secret.token, expiresAt: parsed.data.expiresAt },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ItineraryPersistenceUnavailableError)
      return Response.json(
        {
          message: "Secure sharing is unavailable. No share link was created.",
        },
        { status: 503 },
      );
    throw error;
  }
}
