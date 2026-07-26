import type { VendorMetric } from "./types";
export function calculateCancellationRate(input: {
  confirmed: number;
  cancelled: number;
  periodStart: string;
  periodEnd: string;
}): VendorMetric {
  if (
    ![input.confirmed, input.cancelled].every(
      (value) => Number.isInteger(value) && value >= 0,
    )
  )
    throw new Error("Booking counts must be non-negative integers.");
  const total = input.confirmed + input.cancelled;
  return {
    key: "cancellation-rate",
    value: total ? input.cancelled / total : null,
    periodStart: input.periodStart,
    periodEnd: input.periodEnd,
    source: "transactional-records",
  };
}
