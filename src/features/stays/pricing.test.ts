import { describe, expect, it } from "vitest";
import { calculateStayQuote, formatInr } from "./pricing";
describe("stay pricing", () => {
  it("calculates multi-room totals using integer minor units", () => {
    expect(
      calculateStayQuote({
        nightlyRatesMinor: [100_00, 120_00],
        rooms: 2,
        taxRateBps: 1200,
        platformFeeMinor: 500_00,
      }),
    ).toEqual({
      currency: "INR",
      roomSubtotalMinor: 440_00,
      taxMinor: 5280,
      platformFeeMinor: 500_00,
      totalMinor: 992_80,
    });
  });
  it("rejects invalid rooms and rates", () => {
    expect(() =>
      calculateStayQuote({
        nightlyRatesMinor: [],
        rooms: 0,
        taxRateBps: 0,
        platformFeeMinor: 0,
      }),
    ).toThrow();
  });
  it("formats Indian currency", () => {
    expect(formatInr(125000)).toContain("1,250");
  });
});
