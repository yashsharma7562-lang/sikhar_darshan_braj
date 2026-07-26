export type PropertyType =
  "hotel" | "dharamshala" | "guest-house" | "homestay" | "ashram";
export interface PropertyRecord {
  readonly id: string;
  readonly slug: string;
  readonly vendorId: string;
  readonly name: string;
  readonly type: PropertyType;
  readonly destinationSlug: string;
  readonly locality: string;
  readonly verificationStatus: "verified" | "pending" | "expired";
  readonly verifiedAt: string | null;
  readonly summary: string;
  readonly roomTypes: readonly RoomTypeRecord[];
  readonly facilities: readonly PropertyFacility[];
  readonly policies: PropertyPolicies;
}
export interface RoomTypeRecord {
  readonly id: string;
  readonly name: string;
  readonly capacityAdults: number;
  readonly capacityChildren: number;
  readonly bedConfiguration: string;
  readonly baseRateMinor: number;
  readonly taxRateBps: number;
  readonly inventoryMode: "live" | "request";
}
export interface PropertyFacility {
  readonly key: string;
  readonly label: string;
  readonly state: "verified-available" | "verified-unavailable" | "unknown";
}
export interface PropertyPolicies {
  readonly checkIn: string | null;
  readonly checkOut: string | null;
  readonly cancellationSummary: string | null;
  readonly houseRules: readonly string[];
}
export interface StaySearchCriteria {
  readonly destination: string;
  readonly checkIn: string;
  readonly checkOut: string;
  readonly rooms: number;
  readonly adults: number;
  readonly children: number;
  readonly propertyTypes: readonly PropertyType[];
  readonly accessibilityRequired: boolean;
  readonly verifiedOnly: boolean;
}
export interface PriceQuoteInput {
  readonly nightlyRatesMinor: readonly number[];
  readonly rooms: number;
  readonly taxRateBps: number;
  readonly platformFeeMinor: number;
}
export interface PriceQuote {
  readonly currency: "INR";
  readonly roomSubtotalMinor: number;
  readonly taxMinor: number;
  readonly platformFeeMinor: number;
  readonly totalMinor: number;
}
export interface ReservationRequest {
  readonly propertyId: string;
  readonly roomTypeId: string;
  readonly checkIn: string;
  readonly checkOut: string;
  readonly rooms: number;
  readonly idempotencyKey: string;
}
export interface InventoryReservation {
  readonly id: string;
  readonly status: "held";
  readonly expiresAt: string;
}
