import type { PriceQuote, PriceQuoteInput } from "./types";

export function calculateStayQuote(input: PriceQuoteInput): PriceQuote {
  if (!Number.isInteger(input.rooms) || input.rooms < 1 || input.rooms > 20)
    throw new Error("Rooms must be an integer between 1 and 20.");
  if (
    input.nightlyRatesMinor.length < 1 ||
    input.nightlyRatesMinor.some((rate) => !Number.isInteger(rate) || rate < 0)
  )
    throw new Error(
      "Nightly rates must contain non-negative integer minor units.",
    );
  if (
    !Number.isInteger(input.taxRateBps) ||
    input.taxRateBps < 0 ||
    input.taxRateBps > 10_000
  )
    throw new Error("Tax rate must be valid basis points.");
  if (!Number.isInteger(input.platformFeeMinor) || input.platformFeeMinor < 0)
    throw new Error("Platform fee must be a non-negative integer minor unit.");
  const roomSubtotalMinor =
    input.nightlyRatesMinor.reduce((sum, rate) => sum + rate, 0) * input.rooms;
  const taxMinor = Math.round((roomSubtotalMinor * input.taxRateBps) / 10_000);
  return {
    currency: "INR",
    roomSubtotalMinor,
    taxMinor,
    platformFeeMinor: input.platformFeeMinor,
    totalMinor: roomSubtotalMinor + taxMinor + input.platformFeeMinor,
  };
}
export function formatInr(minorUnits: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(minorUnits / 100);
}
