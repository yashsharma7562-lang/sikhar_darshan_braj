export function calculateGroupQuote(input: {
  verifiedUnitPricesMinor: readonly number[];
  travellerCount: number;
  taxRateBps: number;
}) {
  if (
    !Number.isInteger(input.travellerCount) ||
    input.travellerCount < 1 ||
    input.travellerCount > 500
  )
    throw new Error("Traveller count must be between 1 and 500.");
  if (
    !input.verifiedUnitPricesMinor.length ||
    input.verifiedUnitPricesMinor.some(
      (value) => !Number.isInteger(value) || value < 0,
    )
  )
    throw new Error("Verified unit prices are required.");
  if (
    !Number.isInteger(input.taxRateBps) ||
    input.taxRateBps < 0 ||
    input.taxRateBps > 10_000
  )
    throw new Error("Tax rate must be valid basis points.");
  const subtotalMinor =
    input.verifiedUnitPricesMinor.reduce((sum, value) => sum + value, 0) *
    input.travellerCount;
  const taxMinor = Math.round((subtotalMinor * input.taxRateBps) / 10_000);
  return {
    currency: "INR" as const,
    subtotalMinor,
    taxMinor,
    totalMinor: subtotalMinor + taxMinor,
  };
}
