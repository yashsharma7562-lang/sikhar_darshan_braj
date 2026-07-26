import { describe, expect, it } from "vitest";
import { parseAccessibilityPreferences } from "./preferences";
import { filterVerifiedAccessibleStays } from "./stay-filter";
describe("accessibility preferences", () => {
  it("fails malformed storage closed", () => {
    expect(parseAccessibilityPreferences("{bad")).toMatchObject({
      largeText: false,
      reducedMotion: false,
    });
  });
});
describe("accessible stay filtering", () => {
  it("requires explicit verified facilities", () => {
    const property = {
      id: "p1",
      slug: "p",
      vendorId: "v",
      name: "Stay",
      type: "hotel" as const,
      destinationSlug: "mathura",
      locality: "Test",
      verificationStatus: "verified" as const,
      verifiedAt: "2026-07-22",
      summary: "",
      roomTypes: [],
      facilities: [
        {
          key: "wheelchair-access",
          label: "Wheelchair access",
          state: "unknown" as const,
        },
      ],
      policies: {
        checkIn: null,
        checkOut: null,
        cancellationSummary: null,
        houseRules: [],
      },
    };
    expect(
      filterVerifiedAccessibleStays([property], ["wheelchair-access"]),
    ).toEqual([]);
    expect(
      filterVerifiedAccessibleStays(
        [
          {
            ...property,
            facilities: [
              {
                ...property.facilities[0]!,
                state: "verified-available" as const,
              },
            ],
          },
        ],
        ["wheelchair-access"],
      ),
    ).toHaveLength(1);
  });
});
