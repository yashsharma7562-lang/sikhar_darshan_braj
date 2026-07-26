import type { CommissionEntry, ReconciliationEntry } from "./types";
export function calculateCommission(input: {
  bookingId: string;
  grossMinor: number;
  commissionRateBps: number;
  taxRateBps: number;
}): CommissionEntry {
  if (!Number.isInteger(input.grossMinor) || input.grossMinor < 0)
    throw new Error("Gross amount must be non-negative minor units.");
  for (const rate of [input.commissionRateBps, input.taxRateBps])
    if (!Number.isInteger(rate) || rate < 0 || rate > 10_000)
      throw new Error("Finance rates must be valid basis points.");
  const commissionMinor = Math.round(
    (input.grossMinor * input.commissionRateBps) / 10_000,
  );
  const taxMinor = Math.round((commissionMinor * input.taxRateBps) / 10_000);
  return {
    bookingId: input.bookingId,
    grossMinor: input.grossMinor,
    commissionMinor,
    taxMinor,
    vendorNetMinor: input.grossMinor - commissionMinor - taxMinor,
    currency: "INR",
  };
}
export function reconcilePayment(input: {
  providerPaymentId: string;
  providerAmountMinor: number;
  internalPaymentId: string | null;
  internalAmountMinor: number | null;
}): ReconciliationEntry {
  const state =
    input.internalPaymentId === null || input.internalAmountMinor === null
      ? "missing-internal"
      : input.providerAmountMinor === input.internalAmountMinor
        ? "matched"
        : "amount-mismatch";
  return {
    providerPaymentId: input.providerPaymentId,
    internalPaymentId: input.internalPaymentId,
    amountMinor: input.providerAmountMinor,
    state,
  };
}
