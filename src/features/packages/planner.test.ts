import { describe, expect, it } from "vitest";
import { calculateEffortTags, createDraftItinerary } from "./planner";
const preferences = {
  days: 3,
  travellers: 2,
  seniorCitizens: 1,
  children: 0,
  destinationSlugs: ["mathura", "vrindavan", "govardhan"],
  walkingTolerance: "low" as const,
  pace: "slow" as const,
  wheelchairRequired: true,
  budgetMinor: null,
  language: "en" as const,
  avoidCrowds: true,
};
describe("yatra planner", () => {
  it("creates a catalogue-only draft without invented operational facts", () => {
    const draft = createDraftItinerary(preferences);
    expect(draft.generatedFrom).toBe("catalogue-only");
    expect(draft.estimatedCostMinor).toBeNull();
    expect(draft.days).toHaveLength(3);
    expect(
      draft.days.every((day) =>
        day.unresolvedFacts.includes("Temple schedules"),
      ),
    ).toBe(true);
  });
  it("flags senior and wheelchair considerations", () => {
    expect(calculateEffortTags(preferences)).toEqual(
      expect.arrayContaining(["easy", "senior-friendly", "wheelchair-limited"]),
    );
  });
  it("rejects unknown destinations", () => {
    expect(() =>
      createDraftItinerary({
        ...preferences,
        destinationSlugs: ["invented-place"],
      }),
    ).toThrow();
  });
});
