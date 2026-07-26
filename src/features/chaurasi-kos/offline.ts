import type { AccommodationPoint, ChaurasiStage, SafetyPoint } from "./types";
export function createChaurasiOfflinePack(input: {
  stages: readonly ChaurasiStage[];
  safetyPoints: readonly SafetyPoint[];
  accommodationPoints: readonly AccommodationPoint[];
  syncedAt: string;
}) {
  if (
    !input.stages.length ||
    input.stages.some((stage) => stage.verificationStatus !== "verified")
  )
    throw new Error("Only a complete verified stage set can be saved offline.");
  return {
    schemaVersion: 1 as const,
    ...input,
    warning:
      "Offline route pack. Paths, safety resources, access, weather and accommodation may have changed. Reconnect and verify before continuing.",
  };
}
