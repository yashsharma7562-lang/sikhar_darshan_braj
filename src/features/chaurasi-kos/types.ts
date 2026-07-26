export type StageVerification = "verified" | "pending" | "expired";
export interface ChaurasiStage {
  readonly id: string;
  readonly order: number;
  readonly name: string;
  readonly summary: string;
  readonly verificationStatus: StageVerification;
  readonly verifiedAt: string | null;
  readonly sourceUrl: string | null;
  readonly path: readonly { latitude: number; longitude: number }[];
  readonly distanceMeters: number | null;
  readonly effort: "easy" | "moderate" | "strenuous" | "unverified";
  readonly safetyPointIds: readonly string[];
  readonly accommodationPointIds: readonly string[];
}
export interface SafetyPoint {
  readonly id: string;
  readonly stageId: string;
  readonly kind: "medical" | "police" | "water" | "rest" | "emergency";
  readonly name: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly verificationStatus: StageVerification;
  readonly verifiedAt: string;
}
export interface AccommodationPoint {
  readonly id: string;
  readonly stageId: string;
  readonly name: string;
  readonly kind: "hotel" | "dharamshala" | "ashram" | "camp";
  readonly verificationStatus: StageVerification;
  readonly availability: "unknown";
  readonly bookingUrl: string | null;
}
export type JourneyStatus =
  "not-started" | "in-progress" | "paused" | "completed" | "abandoned";
export interface JourneyRecord {
  readonly id: string;
  readonly ownerId: string;
  readonly status: JourneyStatus;
  readonly completedStageIds: readonly string[];
  readonly activeStageId: string | null;
  readonly startedAt: string | null;
  readonly updatedAt: string;
  readonly completedAt: string | null;
}
export interface JourneyLocation {
  readonly journeyId: string;
  readonly ownerId: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly accuracyMeters: number;
  readonly recordedAt: string;
  readonly retentionExpiresAt: string;
}
export interface FamilyJourneyGrant {
  readonly journeyId: string;
  readonly ownerId: string;
  readonly familyMemberId: string;
  readonly locationSharing: boolean;
  readonly expiresAt: string;
  readonly revokedAt: string | null;
}
