import { describe, expect, it } from "vitest";
import { createChaurasiOfflinePack } from "./offline";
import { createJourneyLocation, familyLocationView } from "./privacy";
import { completeStage, transitionJourney } from "./progress";
const journey = {
  id: "j1",
  ownerId: "u1",
  status: "not-started" as const,
  completedStageIds: [],
  activeStageId: null,
  startedAt: null,
  updatedAt: "2026-07-22T00:00:00.000Z",
  completedAt: null,
};
describe("Chaurasi Kos journey", () => {
  it("enforces journey transitions and verified stages", () => {
    const active = transitionJourney(
      journey,
      "in-progress",
      "2026-07-22T01:00:00.000Z",
    );
    expect(
      completeStage(active, "s1", new Set(["s1"]), "2026-07-22T02:00:00.000Z")
        .completedStageIds,
    ).toEqual(["s1"]);
    expect(() =>
      completeStage(
        active,
        "unknown",
        new Set(["s1"]),
        "2026-07-22T02:00:00.000Z",
      ),
    ).toThrow();
  });
  it("sets short location retention and reduces shared precision", () => {
    const value = createJourneyLocation(
      {
        journeyId: "j1",
        ownerId: "u1",
        latitude: 27.123456,
        longitude: 77.123456,
        accuracyMeters: 5,
        recordedAt: "2026-07-22T00:00:00.000Z",
      },
      24,
    );
    expect(value.retentionExpiresAt).toBe("2026-07-23T00:00:00.000Z");
    expect(familyLocationView(value)).toMatchObject({
      latitude: 27.1235,
      accuracyMeters: 15,
    });
  });
  it("refuses an empty offline route", () => {
    expect(() =>
      createChaurasiOfflinePack({
        stages: [],
        safetyPoints: [],
        accommodationPoints: [],
        syncedAt: "2026-07-22T00:00:00.000Z",
      }),
    ).toThrow();
  });
});
