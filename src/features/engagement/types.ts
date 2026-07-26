export type RewardEvent =
  | "completed-booking"
  | "verified-review"
  | "valid-referral"
  | "selected-campaign"
  | "repeat-journey";
export type RewardTransaction = {
  id: string;
  userId: string;
  event: RewardEvent | "redemption";
  points: number;
  referenceId: string;
  occurredAt: string;
};
export type ReferralStatus =
  "created" | "joined" | "qualified" | "rewarded" | "expired" | "rejected";
export type ReferralPolicy = {
  expiresAt: string;
  deviceReferralLimit: number;
  maximumRewardPoints: number;
};
export type NotificationChannel = "email" | "sms" | "push" | "in-app";
export type NotificationCategory = "transactional" | "promotional";
export type NotificationPreferences = {
  emailTransactional: boolean;
  smsTransactional: boolean;
  pushTransactional: boolean;
  inAppTransactional: boolean;
  emailPromotional: boolean;
  smsPromotional: boolean;
  pushPromotional: boolean;
  inAppPromotional: boolean;
  marketingConsent: boolean;
  pushConsent: boolean;
};
export type CampaignDraft = {
  id: string;
  name: string;
  segmentId: string;
  category: NotificationCategory;
  channels: readonly NotificationChannel[];
  locale: "en" | "hi";
  status: "draft";
  createdBy: string;
};
