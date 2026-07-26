import type { FareInput, FareQuote } from "./types";
export function calculateTransportFare(input: FareInput): FareQuote {
  const values = Object.values(input);
  if (values.some((value) => !Number.isInteger(value) || value < 0))
    throw new Error("Fare inputs must be non-negative integers.");
  if (input.taxRateBps > 10_000)
    throw new Error("Tax rate must not exceed 100 percent.");
  const distanceFareMinor =
    Math.ceil(input.distanceMeters / 1000) * input.ratePerKmMinor;
  const billableWaitingMinutes = Math.max(
    0,
    input.durationMinutes - input.includedMinutes,
  );
  const waitingFareMinor =
    billableWaitingMinutes * input.waitingRatePerMinuteMinor;
  const taxableMinor =
    input.baseFareMinor +
    distanceFareMinor +
    waitingFareMinor +
    input.nightChargeMinor;
  const taxMinor = Math.round((taxableMinor * input.taxRateBps) / 10_000);
  return {
    currency: "INR",
    baseFareMinor: input.baseFareMinor,
    distanceFareMinor,
    waitingFareMinor,
    tollMinor: input.tollMinor,
    parkingMinor: input.parkingMinor,
    nightChargeMinor: input.nightChargeMinor,
    taxMinor,
    totalMinor: taxableMinor + taxMinor + input.tollMinor + input.parkingMinor,
  };
}
