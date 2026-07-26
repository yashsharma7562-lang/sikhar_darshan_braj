export const templeStatuses = [
  "open",
  "closed",
  "opening-soon",
  "closing-soon",
  "schedule-unverified",
  "special-festival-schedule",
  "temporary-closure",
  "update-pending",
] as const;
export type TempleStatus = (typeof templeStatuses)[number];
export const verificationStatuses = [
  "verified",
  "pending",
  "expired",
  "rejected",
] as const;
export type VerificationStatus = (typeof verificationStatuses)[number];
export const crowdLevels = [
  "low",
  "moderate",
  "busy",
  "very-busy",
  "festival-rush",
  "data-unavailable",
] as const;
export type CrowdLevel = (typeof crowdLevels)[number];

export interface TempleRecord {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly alternativeNames: readonly string[];
  readonly destinationSlug: string;
  readonly locality: string;
  readonly deity: string | null;
  readonly summary: string;
  readonly status: TempleStatus;
  readonly verificationStatus: VerificationStatus;
  readonly lastVerifiedAt: string | null;
  readonly reviewDueAt: string | null;
  readonly sourceLabel: string | null;
  readonly schedule: readonly ScheduleEntry[];
  readonly notices: readonly TempleNotice[];
  readonly facilities: readonly FacilityRecord[];
  readonly crowd: CrowdAdvisory;
  readonly officialWebsite: string | null;
  readonly officialContact: string | null;
  readonly liveStream: LiveStreamRecord | null;
}

export interface ScheduleEntry {
  readonly label: string;
  readonly opensAt: string;
  readonly closesAt: string;
  readonly validFrom: string | null;
  readonly validUntil: string | null;
  readonly sourceLabel: string;
  readonly verifiedAt: string;
}
export interface TempleNotice {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly severity: "information" | "warning" | "closure";
  readonly publishedAt: string;
  readonly expiresAt: string | null;
  readonly sourceLabel: string;
}
export interface FacilityRecord {
  readonly label: string;
  readonly state: "verified-available" | "verified-unavailable" | "unknown";
  readonly notes: string | null;
}
export interface CrowdAdvisory {
  readonly level: CrowdLevel;
  readonly confidence: "live" | "recent" | "historical" | "community" | "none";
  readonly updatedAt: string | null;
  readonly note: string;
}
export interface LiveStreamRecord {
  readonly url: string;
  readonly platform: "youtube" | "facebook" | "official";
  readonly sourceLabel: string;
  readonly verifiedAt: string;
}

export interface DestinationRecord {
  readonly slug: string;
  readonly name: string;
  readonly region: string;
  readonly summary: string;
  readonly nearbySlugs: readonly string[];
  readonly templeSlugs: readonly string[];
}
