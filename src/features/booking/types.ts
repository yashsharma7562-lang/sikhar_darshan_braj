export type BookingStatus =
  | "draft"
  | "inventory-pending"
  | "inventory-held"
  | "payment-pending"
  | "confirmed"
  | "cancelled"
  | "expired"
  | "failed";
export type BookingStep =
  "service" | "travellers" | "preferences" | "review" | "confirmation";
export type BookingService = "stay" | "transport" | "package";
export interface MoneyLine {
  readonly key: string;
  readonly label: string;
  readonly amountMinor: number;
}
export interface BookingPrice {
  readonly currency: "INR";
  readonly subtotalMinor: number;
  readonly discountMinor: number;
  readonly taxMinor: number;
  readonly feeMinor: number;
  readonly totalMinor: number;
  readonly lines: readonly MoneyLine[];
}
export interface Coupon {
  readonly code: string;
  readonly status: "active" | "inactive";
  readonly kind: "fixed" | "percentage";
  readonly value: number;
  readonly minimumSubtotalMinor: number;
  readonly maximumDiscountMinor: number | null;
  readonly validFrom: string;
  readonly validUntil: string;
  readonly usageLimit: number | null;
  readonly usageCount: number;
}
export interface InventoryHold {
  readonly id: string;
  readonly ownerId: string;
  readonly service: BookingService;
  readonly resourceId: string;
  readonly status: "held";
  readonly expiresAt: string;
}
export interface BookingDocument {
  readonly bookingId: string;
  readonly kind: "confirmation" | "invoice" | "voucher";
  readonly status: "pending-generation" | "available";
  readonly url: string | null;
}
