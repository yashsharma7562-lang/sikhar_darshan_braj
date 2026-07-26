export interface AccessibilityPreferences {
  readonly largeText: boolean;
  readonly reducedMotion: boolean;
  readonly highContrast: boolean;
  readonly largerControls: boolean;
}
export type AssistanceKind =
  | "wheelchair"
  | "mobility-aid"
  | "station-assistance"
  | "accessible-vehicle"
  | "ground-floor-room"
  | "caregiver-support";
export interface AssistanceRequest {
  readonly id: string;
  readonly ownerId: string;
  readonly serviceId: string;
  readonly kind: AssistanceKind;
  readonly details: string;
  readonly status: "requested" | "confirmed" | "unavailable" | "cancelled";
  readonly createdAt: string;
}
export interface FamilyTraveller {
  readonly id: string;
  readonly ownerId: string;
  readonly name: string;
  readonly relationship: string;
  readonly seniorCitizen: boolean;
  readonly mobilityNotes: string | null;
  readonly consentRecordedAt: string;
}
export interface EmergencyResource {
  readonly id: string;
  readonly destinationSlug: string;
  readonly label: string;
  readonly kind: "emergency" | "hospital" | "police" | "support";
  readonly phone: string;
  readonly verificationStatus: "verified";
  readonly verifiedAt: string;
  readonly sourceUrl: string;
}
