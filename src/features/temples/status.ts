import type { CrowdLevel, TempleStatus, VerificationStatus } from "./types";

export const templeStatusLabels: Record<TempleStatus, string> = {
  open: "Open",
  closed: "Closed",
  "opening-soon": "Opening soon",
  "closing-soon": "Closing soon",
  "schedule-unverified": "Schedule unverified",
  "special-festival-schedule": "Special festival schedule",
  "temporary-closure": "Temporary closure",
  "update-pending": "Information update pending",
};
export const verificationLabels: Record<VerificationStatus, string> = {
  verified: "Verified",
  pending: "Verification pending",
  expired: "Verification expired",
  rejected: "Not approved",
};
export const crowdLabels: Record<CrowdLevel, string> = {
  low: "Low",
  moderate: "Moderate",
  busy: "Busy",
  "very-busy": "Very busy",
  "festival-rush": "Festival rush",
  "data-unavailable": "Data unavailable",
};
