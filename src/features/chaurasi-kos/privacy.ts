import type { JourneyLocation } from "./types";
export function createJourneyLocation(
  input: Omit<JourneyLocation, "retentionExpiresAt">,
  retentionHours: number,
): JourneyLocation {
  if (
    !Number.isFinite(input.latitude) ||
    input.latitude < -90 ||
    input.latitude > 90 ||
    !Number.isFinite(input.longitude) ||
    input.longitude < -180 ||
    input.longitude > 180
  )
    throw new Error("Invalid coordinates.");
  if (!Number.isFinite(input.accuracyMeters) || input.accuracyMeters <= 0)
    throw new Error("Location accuracy is required.");
  if (
    !Number.isInteger(retentionHours) ||
    retentionHours < 1 ||
    retentionHours > 168
  )
    throw new Error("Location retention must be between 1 and 168 hours.");
  return {
    ...input,
    retentionExpiresAt: new Date(
      new Date(input.recordedAt).getTime() + retentionHours * 3_600_000,
    ).toISOString(),
  };
}
export function familyLocationView(location: JourneyLocation) {
  return {
    latitude: Math.round(location.latitude * 10_000) / 10_000,
    longitude: Math.round(location.longitude * 10_000) / 10_000,
    accuracyMeters: Math.max(location.accuracyMeters, 15),
    recordedAt: location.recordedAt,
  };
}
