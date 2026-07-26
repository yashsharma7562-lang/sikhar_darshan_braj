import "server-only";
import type { RouteLeg, RoutePoint } from "./types";
export class MapsConfigurationError extends Error {
  constructor() {
    super("Google Maps routing is not configured.");
    this.name = "MapsConfigurationError";
  }
}
export async function getVerifiedRoute(
  origin: RoutePoint,
  destination: RoutePoint,
): Promise<RouteLeg> {
  const key = process.env.GOOGLE_MAPS_SERVER_API_KEY;
  if (!key) throw new MapsConfigurationError();
  const response = await fetch(
    "https://routes.googleapis.com/directions/v2:computeRoutes",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-goog-api-key": key,
        "x-goog-fieldmask": "routes.legs.distanceMeters,routes.legs.duration",
      },
      body: JSON.stringify({
        origin: {
          location: {
            latLng: { latitude: origin.latitude, longitude: origin.longitude },
          },
        },
        destination: {
          location: {
            latLng: {
              latitude: destination.latitude,
              longitude: destination.longitude,
            },
          },
        },
        travelMode: "DRIVE",
      }),
      cache: "no-store",
    },
  );
  if (!response.ok) throw new Error("Google Routes did not return a route.");
  const data = (await response.json()) as {
    routes?: { legs?: { distanceMeters?: number; duration?: string }[] }[];
  };
  const leg = data.routes?.[0]?.legs?.[0];
  const duration = leg?.duration?.match(/^(\d+(?:\.\d+)?)s$/);
  if (!leg || !Number.isFinite(leg.distanceMeters) || !duration)
    throw new Error("Google Routes response was incomplete.");
  return {
    from: origin,
    to: destination,
    distanceMeters: leg.distanceMeters as number,
    durationSeconds: Math.round(Number(duration[1])),
    source: "google-directions",
    fetchedAt: new Date().toISOString(),
  };
}
