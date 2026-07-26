import { describe, expect, it } from "vitest";
import {
  canRequestVerifiedReview,
  eligibleNotificationChannels,
  validateReferral,
} from "./policy";
const preferences = {
  emailTransactional: true,
  smsTransactional: false,
  pushTransactional: true,
  inAppTransactional: true,
  emailPromotional: true,
  smsPromotional: true,
  pushPromotional: true,
  inAppPromotional: true,
  marketingConsent: false,
  pushConsent: true,
};
describe("engagement policy", () => {
  it("rejects self-referrals", () => {
    expect(
      validateReferral("u1", "u1", 0, new Date("2026-01-01"), {
        expiresAt: "2027-01-01T00:00:00.000Z",
        deviceReferralLimit: 3,
        maximumRewardPoints: 100,
      }),
    ).toBe("self-referral");
  });
  it("enforces referral expiry and device limits", () => {
    const policy = {
      expiresAt: "2026-02-01T00:00:00.000Z",
      deviceReferralLimit: 2,
      maximumRewardPoints: 100,
    };
    expect(
      validateReferral("u1", "u2", 2, new Date("2026-01-01"), policy),
    ).toBe("device-limit");
    expect(
      validateReferral("u1", "u2", 0, new Date("2026-02-01"), policy),
    ).toBe("expired");
  });
  it("keeps promotional channels off without marketing consent", () => {
    expect(eligibleNotificationChannels("promotional", preferences)).toEqual(
      [],
    );
  });
  it("honours push consent independently for transactional messages", () => {
    expect(
      eligibleNotificationChannels("transactional", {
        ...preferences,
        pushConsent: false,
      }),
    ).toEqual(["email", "in-app"]);
  });
  it("permits verified reviews only for owned completed bookings", () => {
    expect(canRequestVerifiedReview("completed", true, false)).toBe(true);
    expect(canRequestVerifiedReview("confirmed", true, false)).toBe(false);
    expect(canRequestVerifiedReview("completed", false, false)).toBe(false);
  });
});
