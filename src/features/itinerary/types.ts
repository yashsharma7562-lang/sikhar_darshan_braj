export interface RoutePoint {
  readonly placeId: string;
  readonly label: string;
  readonly latitude: number;
  readonly longitude: number;
}
export interface RouteLeg {
  readonly from: RoutePoint;
  readonly to: RoutePoint;
  readonly distanceMeters: number;
  readonly durationSeconds: number;
  readonly source: "google-directions";
  readonly fetchedAt: string;
}
export interface SavedItinerary {
  readonly id: string;
  readonly ownerId: string;
  readonly title: string;
  readonly days: readonly ItineraryDay[];
  readonly updatedAt: string;
  readonly routeStatus: "unresolved" | "verified";
  readonly lastSyncedAt: string | null;
}
export interface ItineraryDay {
  readonly day: number;
  readonly title: string;
  readonly stops: readonly { placeId: string; label: string; note: string }[];
}
export interface OfflineItinerary {
  readonly schemaVersion: 1;
  readonly itineraryId: string;
  readonly title: string;
  readonly days: readonly ItineraryDay[];
  readonly lastSyncedAt: string;
  readonly staleWarning: string;
}
export interface ShareGrant {
  readonly tokenHash: string;
  readonly itineraryId: string;
  readonly ownerId: string;
  readonly permission: "view";
  readonly expiresAt: string;
  readonly revokedAt: string | null;
}
