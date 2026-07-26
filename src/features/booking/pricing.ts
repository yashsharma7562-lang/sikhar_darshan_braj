import type { BookingPrice, Coupon, MoneyLine } from "./types";
export function calculateBookingPrice(input: {
  lines: readonly MoneyLine[];
  taxRateBps: number;
  feeMinor: number;
  coupon: Coupon | null;
  now: string;
}): BookingPrice {
  if (
    !input.lines.length ||
    input.lines.some(
      (line) => !Number.isInteger(line.amountMinor) || line.amountMinor < 0,
    )
  )
    throw new Error("Price lines must use non-negative integer minor units.");
  if (
    !Number.isInteger(input.taxRateBps) ||
    input.taxRateBps < 0 ||
    input.taxRateBps > 10_000
  )
    throw new Error("Tax rate must be valid basis points.");
  if (!Number.isInteger(input.feeMinor) || input.feeMinor < 0)
    throw new Error("Fee must be a non-negative integer minor unit.");
  const subtotalMinor = input.lines.reduce(
    (sum, line) => sum + line.amountMinor,
    0,
  );
  const discountMinor = calculateCouponDiscount(
    input.coupon,
    subtotalMinor,
    input.now,
  );
  const taxableMinor = subtotalMinor - discountMinor;
  const taxMinor = Math.round((taxableMinor * input.taxRateBps) / 10_000);
  return {
    currency: "INR",
    subtotalMinor,
    discountMinor,
    taxMinor,
    feeMinor: input.feeMinor,
    totalMinor: taxableMinor + taxMinor + input.feeMinor,
    lines: input.lines,
  };
}
export function calculateCouponDiscount(
  coupon: Coupon | null,
  subtotalMinor: number,
  now: string,
) {
  if (!coupon) return 0;
  if (
    coupon.status !== "active" ||
    now < coupon.validFrom ||
    now > coupon.validUntil ||
    subtotalMinor < coupon.minimumSubtotalMinor ||
    (coupon.usageLimit !== null && coupon.usageCount >= coupon.usageLimit)
  )
    return 0;
  const raw =
    coupon.kind === "fixed"
      ? coupon.value
      : Math.floor((subtotalMinor * coupon.value) / 10_000);
  return Math.min(raw, coupon.maximumDiscountMinor ?? raw, subtotalMinor);
}
