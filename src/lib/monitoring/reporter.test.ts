import { describe, expect, it } from "vitest";
import { createSafeErrorReport } from "./reporter";
describe("safe monitoring reports", () => {
  it("does not include error messages or stacks", () => {
    const report = createSafeErrorReport(
      new Error("customer@example.com token=secret"),
      "request-id",
      "/api/bookings",
    );
    expect(report).toEqual({
      name: "Error",
      digest: null,
      requestId: "request-id",
      route: "/api/bookings",
    });
    expect(JSON.stringify(report)).not.toContain("customer@example.com");
  });
});
