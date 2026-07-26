import { describe, expect, it } from "vitest";
import { createOfflineSnapshot } from "./offline";
import { createItineraryPdf } from "./pdf";
import { createShareSecret, hashShareToken } from "./sharing";
const itinerary = {
  id: "i1",
  ownerId: "u1",
  title: "Braj plan",
  days: [
    {
      day: 1,
      title: "Vrindavan",
      stops: [{ placeId: "p1", label: "Temple stop", note: "Verify timing" }],
    },
  ],
  updatedAt: "2026-07-22T00:00:00.000Z",
  routeStatus: "unresolved" as const,
  lastSyncedAt: null,
};
describe("itinerary portability", () => {
  it("marks offline data as stale-capable", () => {
    expect(
      createOfflineSnapshot(itinerary, "2026-07-22T01:00:00.000Z").staleWarning,
    ).toContain("may have changed");
  });
  it("creates opaque share tokens", () => {
    const value = createShareSecret();
    expect(value.tokenHash).toBe(hashShareToken(value.token));
    expect(value.token).not.toContain("i1");
  });
  it("creates a real PDF", async () => {
    const bytes = await createItineraryPdf(itinerary);
    expect(new TextDecoder().decode(bytes.slice(0, 5))).toBe("%PDF-");
    expect(bytes.length).toBeGreaterThan(500);
  });
});
