export type PaymentStatus =
  | "created"
  | "authorized"
  | "captured"
  | "failed"
  | "refunded"
  | "partially-refunded";
export interface PaymentOrder {
  readonly provider: "razorpay";
  readonly providerOrderId: string;
  readonly bookingId: string;
  readonly amountMinor: number;
  readonly currency: "INR";
  readonly status: "created";
}
export interface RefundRecord {
  readonly id: string;
  readonly paymentId: string;
  readonly amountMinor: number;
  readonly status: "pending" | "processed" | "failed";
  readonly reason: string;
}
export interface CommissionEntry {
  readonly bookingId: string;
  readonly grossMinor: number;
  readonly commissionMinor: number;
  readonly vendorNetMinor: number;
  readonly taxMinor: number;
  readonly currency: "INR";
}
export interface PayoutSchedule {
  readonly vendorId: string;
  readonly amountMinor: number;
  readonly status: "on-hold" | "scheduled" | "paid" | "failed";
  readonly eligibleAt: string;
}
export interface ReconciliationEntry {
  readonly providerPaymentId: string;
  readonly internalPaymentId: string | null;
  readonly amountMinor: number;
  readonly state: "matched" | "amount-mismatch" | "missing-internal";
}
