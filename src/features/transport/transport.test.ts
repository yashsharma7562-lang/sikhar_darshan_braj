import { describe, expect, it } from "vitest";
import { calculateTransportFare } from "./fare";
import { toPublicDriverAssignment } from "./privacy";
import { assertTripTransition, canTransitionTrip } from "./trip-state";
describe("transport operations", () => {
  it("calculates each fare component in integer minor units", () => {
    expect(
      calculateTransportFare({
        baseFareMinor: 200_00,
        distanceMeters: 12_400,
        ratePerKmMinor: 15_00,
        durationMinutes: 90,
        includedMinutes: 60,
        waitingRatePerMinuteMinor: 2_00,
        tollMinor: 50_00,
        parkingMinor: 20_00,
        nightChargeMinor: 100_00,
        taxRateBps: 500,
      }),
    ).toEqual({
      currency: "INR",
      baseFareMinor: 200_00,
      distanceFareMinor: 195_00,
      waitingFareMinor: 60_00,
      tollMinor: 50_00,
      parkingMinor: 20_00,
      nightChargeMinor: 100_00,
      taxMinor: 2775,
      totalMinor: 652_75,
    });
  });
  it("enforces valid trip transitions", () => {
    expect(canTransitionTrip("ready", "in-progress")).toBe(true);
    expect(() => assertTripTransition("draft", "completed")).toThrow();
  });
  it("does not expose driver contact before operational need", () => {
    const driver = {
      fullName: "Radha Mohan Sharma",
      phone: "+91 9876543210",
      verificationStatus: "verified" as const,
      profilePhotoUrl: null,
      vehicleDisplay: "White sedan",
    };
    expect(toPublicDriverAssignment(driver, false)).toEqual(
      expect.objectContaining({ displayName: "Radha S.", maskedPhone: null }),
    );
    expect(toPublicDriverAssignment(driver, true).maskedPhone).toBe(
      "******3210",
    );
  });
});
