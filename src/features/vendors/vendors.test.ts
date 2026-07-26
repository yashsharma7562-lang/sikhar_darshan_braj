import { describe, expect, it } from "vitest";
import { calculateCancellationRate } from "./analytics";
describe("vendor analytics", () => {
  it("does not invent a rate without bookings", () => {
    expect(
      calculateCancellationRate({
        confirmed: 0,
        cancelled: 0,
        periodStart: "2026-07-01",
        periodEnd: "2026-07-31",
      }).value,
    ).toBeNull();
  });
  it("uses transactional counts", () => {
    expect(
      calculateCancellationRate({
        confirmed: 8,
        cancelled: 2,
        periodStart: "2026-07-01",
        periodEnd: "2026-07-31",
      }).value,
    ).toBe(0.2);
  });
});
