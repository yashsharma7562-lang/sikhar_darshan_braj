import type {
  NotificationCategory,
  NotificationChannel,
  NotificationPreferences,
  ReferralPolicy,
} from "./types";
export function validateReferral(
  referrerId: string,
  referredUserId: string,
  deviceReferralCount: number,
  now: Date,
  policy: ReferralPolicy,
): "eligible" | "self-referral" | "device-limit" | "expired" {
  if (referrerId === referredUserId) return "self-referral";
  if (now.getTime() >= new Date(policy.expiresAt).getTime()) return "expired";
  if (deviceReferralCount >= policy.deviceReferralLimit) return "device-limit";
  return "eligible";
}
export function eligibleNotificationChannels(
  category: NotificationCategory,
  preferences: NotificationPreferences,
): readonly NotificationChannel[] {
  const channels: NotificationChannel[] = [];
  const promotional = category === "promotional";
  if (promotional && !preferences.marketingConsent) return channels;
  if (preferences[promotional ? "emailPromotional" : "emailTransactional"])
    channels.push("email");
  if (preferences[promotional ? "smsPromotional" : "smsTransactional"])
    channels.push("sms");
  if (
    preferences.pushConsent &&
    preferences[promotional ? "pushPromotional" : "pushTransactional"]
  )
    channels.push("push");
  if (preferences[promotional ? "inAppPromotional" : "inAppTransactional"])
    channels.push("in-app");
  return channels;
}
export function canRequestVerifiedReview(
  bookingStatus: string,
  customerOwnsBooking: boolean,
  alreadyReviewed: boolean,
): boolean {
  return (
    bookingStatus === "completed" && customerOwnsBooking && !alreadyReviewed
  );
}
