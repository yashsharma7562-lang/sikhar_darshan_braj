export type EffortTag =
  | "easy"
  | "moderate"
  | "high-walking"
  | "long-travel-hours"
  | "stairs-involved"
  | "uneven-route"
  | "senior-friendly"
  | "wheelchair-limited"
  | "medical-consultation-recommended";
export interface PackageRecord {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly durationDays: number;
  readonly destinationSlugs: readonly string[];
  readonly verificationStatus: "verified" | "pending" | "expired";
  readonly effortTags: readonly EffortTag[];
  readonly inclusions: readonly string[];
  readonly exclusions: readonly string[];
  readonly basePriceMinor: number | null;
  readonly departures: readonly PackageDeparture[];
}
export interface PackageDeparture {
  readonly id: string;
  readonly startsOn: string;
  readonly capacity: number;
  readonly remaining: number;
  readonly status: "available" | "full" | "cancelled";
}
export interface YatraPreferences {
  readonly days: number;
  readonly travellers: number;
  readonly seniorCitizens: number;
  readonly children: number;
  readonly destinationSlugs: readonly string[];
  readonly walkingTolerance: "low" | "medium" | "high";
  readonly pace: "slow" | "balanced" | "active";
  readonly wheelchairRequired: boolean;
  readonly budgetMinor: number | null;
  readonly language: "en" | "hi";
  readonly avoidCrowds: boolean;
}
export interface DraftItineraryDay {
  readonly day: number;
  readonly destinationSlugs: readonly string[];
  readonly planningNote: string;
  readonly unresolvedFacts: readonly string[];
}
export interface DraftItinerary {
  readonly status: "planning-draft";
  readonly days: readonly DraftItineraryDay[];
  readonly effortTags: readonly EffortTag[];
  readonly warnings: readonly string[];
  readonly estimatedCostMinor: null;
  readonly generatedFrom: "catalogue-only";
}
