import { describe, expect, it } from "vitest";
import { transitionSubmission } from "@/features/content/workflow";
import { calculateGroupQuote } from "./quotes";
describe("group quotes", () => {
  it("calculates only from verified minor-unit inputs", () => {
    expect(
      calculateGroupQuote({
        verifiedUnitPricesMinor: [10_000, 2_000],
        travellerCount: 10,
        taxRateBps: 500,
      }),
    ).toMatchObject({
      subtotalMinor: 120_000,
      taxMinor: 6_000,
      totalMinor: 126_000,
    });
  });
  it("rejects missing verified prices", () => {
    expect(() =>
      calculateGroupQuote({
        verifiedUnitPricesMinor: [],
        travellerCount: 10,
        taxRateBps: 500,
      }),
    ).toThrow();
  });
});
describe("content workflow", () => {
  it("requires review before publication", () => {
    expect(() => transitionSubmission("submitted", "published")).toThrow();
    expect(transitionSubmission("approved", "published")).toBe("published");
  });
});
