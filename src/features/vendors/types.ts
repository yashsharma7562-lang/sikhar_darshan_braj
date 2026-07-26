export type VendorType =
  "stay" | "transport" | "guide" | "travel-agent" | "other";
export type VendorPermission =
  | "vendor.profile.write"
  | "vendor.inventory.write"
  | "vendor.transport.write"
  | "vendor.bookings.write"
  | "vendor.analytics.read"
  | "vendor.payouts.read";
export interface VendorApplication {
  readonly id: string;
  readonly legalName: string;
  readonly displayName: string;
  readonly type: VendorType;
  readonly contactEmail: string;
  readonly contactPhone: string;
  readonly status: "submitted" | "under-review" | "approved" | "rejected";
  readonly submittedAt: string;
}
export interface VendorVerification {
  readonly vendorId: string;
  readonly identity: "pending" | "verified" | "rejected";
  readonly business: "pending" | "verified" | "rejected";
  readonly bankAccount: "pending" | "verified" | "rejected";
  readonly safetyReview: "pending" | "verified" | "rejected";
  readonly approvedAt: string | null;
}
export interface VendorSubscription {
  readonly vendorId: string;
  readonly plan: "starter" | "growth" | "enterprise";
  readonly status: "trial" | "active" | "past-due" | "cancelled";
  readonly currentPeriodEndsAt: string;
}
export interface VendorMetric {
  readonly key:
    | "booking-count"
    | "gross-booking-value"
    | "cancellation-rate"
    | "response-time";
  readonly value: number | null;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly source: "transactional-records";
}
