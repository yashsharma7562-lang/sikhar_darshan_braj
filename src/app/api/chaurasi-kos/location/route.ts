import { z } from "zod";
import { getCustomerSession } from "@/features/auth/session";
import { createJourneyLocation } from "@/features/chaurasi-kos/privacy";
import {
  journeyRepository,
  JourneyPersistenceUnavailableError,
} from "@/features/chaurasi-kos/repository";
const schema = z.object({
  journeyId: z.string().min(1).max(120),
  latitude: z.number(),
  longitude: z.number(),
  accuracyMeters: z.number().positive(),
  recordedAt: z.iso.datetime(),
  consent: z.literal(true),
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
      {
        message:
          "Explicit location consent and valid coordinates are required.",
      },
      { status: 400 },
    );
  try {
    const journey = await journeyRepository.getOwned(
      parsed.data.journeyId,
      session.uid,
    );
    if (!journey || journey.status !== "in-progress")
      return Response.json(
        { message: "An active owned journey is required." },
        { status: 409 },
      );
    const location = createJourneyLocation(
      {
        journeyId: journey.id,
        ownerId: session.uid,
        latitude: parsed.data.latitude,
        longitude: parsed.data.longitude,
        accuracyMeters: parsed.data.accuracyMeters,
        recordedAt: parsed.data.recordedAt,
      },
      24,
    );
    await journeyRepository.recordLocation(location);
    return Response.json(
      { recorded: true, retentionExpiresAt: location.retentionExpiresAt },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof JourneyPersistenceUnavailableError)
      return Response.json(
        {
          message:
            "Location storage is unavailable. Location was not recorded.",
        },
        { status: 503 },
      );
    throw error;
  }
}
