import { z } from "zod";
import {
  getVerifiedRoute,
  MapsConfigurationError,
} from "@/features/itinerary/maps";
const point = z.object({
  placeId: z.string().min(1).max(200),
  label: z.string().min(1).max(200),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});
const schema = z.object({ origin: point, destination: point });
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json(
      { message: "Invalid route request." },
      { status: 400 },
    );
  try {
    return Response.json({
      route: await getVerifiedRoute(
        parsed.data.origin,
        parsed.data.destination,
      ),
    });
  } catch (error) {
    if (error instanceof MapsConfigurationError)
      return Response.json(
        {
          message:
            "Verified route distance and duration are unavailable. No estimate was invented.",
        },
        { status: 503 },
      );
    throw error;
  }
}
