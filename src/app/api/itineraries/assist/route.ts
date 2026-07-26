import { z } from "zod";
import { getCustomerSession } from "@/features/auth/session";
import {
  itineraryAssistant,
  ItineraryAssistantUnavailableError,
} from "@/features/itinerary/ai";
import {
  itineraryRepository,
  ItineraryPersistenceUnavailableError,
} from "@/features/itinerary/repository";
const schema = z.object({
  itineraryId: z.string().min(1).max(120),
  request: z.string().trim().min(5).max(1000),
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
      { message: "Invalid assistance request." },
      { status: 400 },
    );
  try {
    const itinerary = await itineraryRepository.getOwned(
      parsed.data.itineraryId,
      session.uid,
    );
    if (!itinerary)
      return Response.json(
        { message: "Itinerary not found." },
        { status: 404 },
      );
    const improved = await itineraryAssistant.improve(
      itinerary,
      parsed.data.request,
    );
    await itineraryRepository.save(improved);
    return Response.json({ itinerary: improved });
  } catch (error) {
    if (
      error instanceof ItineraryAssistantUnavailableError ||
      error instanceof ItineraryPersistenceUnavailableError
    )
      return Response.json(
        { message: error.message + " No itinerary was changed." },
        { status: 503 },
      );
    throw error;
  }
}
