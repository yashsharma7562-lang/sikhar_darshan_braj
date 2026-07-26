import type { OfflineItinerary, SavedItinerary } from "./types";
export function createOfflineSnapshot(
  itinerary: SavedItinerary,
  syncedAt: string,
): OfflineItinerary {
  if (!itinerary.id || !itinerary.title || !itinerary.days.length)
    throw new Error("A saved itinerary is required.");
  return {
    schemaVersion: 1,
    itineraryId: itinerary.id,
    title: itinerary.title,
    days: itinerary.days,
    lastSyncedAt: syncedAt,
    staleWarning:
      "Offline copy. Timings, closures, routes, availability and safety information may have changed. Reconnect and verify before travel.",
  };
}
