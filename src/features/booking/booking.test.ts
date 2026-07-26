import { describe, expect, it } from "vitest";
import { calculateBookingPrice } from "./pricing";
import { transitionBooking } from "./state-machine";
describe("booking state machine", () => {
  it("allows the inventory-first confirmation path", () => {
    expect(transitionBooking("draft", "inventory-pending")).toBe(
      "inventory-pending",
    );
    expect(transitionBooking("payment-pending", "confirmed")).toBe("confirmed");
  });
  it("rejects confirmation without payment", () => {
    expect(() => transitionBooking("draft", "confirmed")).toThrow();
  });
});
describe("booking price", () => {
  it("calculates a bounded server-side coupon", () => {
    const price = calculateBookingPrice({
      lines: [{ key: "room", label: "Room", amountMinor: 100_000 }],
      taxRateBps: 1200,
      feeMinor: 5_000,
      now: "2026-07-22T00:00:00.000Z",
      coupon: {
        code: "TEST",
        status: "active",
        kind: "percentage",
        value: 1000,
        minimumSubtotalMinor: 50_000,
        maximumDiscountMinor: 8_000,
        validFrom: "2026-01-01T00:00:00.000Z",
        validUntil: "2026-12-31T23:59:59.999Z",
        usageLimit: 10,
        usageCount: 0,
      },
    });
    expect(price.discountMinor).toBe(8_000);
    expect(price.totalMinor).toBe(108_040);
  });
});
