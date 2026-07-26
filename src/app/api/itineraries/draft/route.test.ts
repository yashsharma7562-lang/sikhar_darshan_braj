import { describe, expect, it } from "vitest";
import { POST } from "./route";
describe("draft itinerary API", () => {
  it("validates traveller counts", async () => {
    const response = await POST(
      new Request("http://localhost/api/itineraries/draft", {
        method: "POST",
        body: JSON.stringify({
          days: 2,
          travellers: 1,
          seniorCitizens: 1,
          children: 1,
          destinationSlugs: ["mathura"],
          walkingTolerance: "low",
          pace: "slow",
          wheelchairRequired: false,
          budgetMinor: null,
          language: "en",
          avoidCrowds: true,
        }),
      }),
    );
    expect(response.status).toBe(400);
  });
});
