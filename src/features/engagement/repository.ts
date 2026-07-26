import "server-only";
import type {
  CampaignDraft,
  NotificationPreferences,
  RewardTransaction,
} from "./types";
export interface EngagementRepository {
  redeemBenefit(
    userId: string,
    benefitId: string,
    bookingId: string,
  ): Promise<RewardTransaction>;
  createReferralCode(
    userId: string,
  ): Promise<{ code: string; expiresAt: string }>;
  updateNotificationPreferences(
    userId: string,
    value: NotificationPreferences,
  ): Promise<NotificationPreferences>;
  createCampaignDraft(
    actorId: string,
    value: Omit<CampaignDraft, "id" | "status" | "createdBy">,
  ): Promise<CampaignDraft>;
  createReviewRequest(
    actorId: string,
    bookingId: string,
  ): Promise<{ id: string; status: "scheduled" }>;
  createReview(
    userId: string,
    value: unknown,
  ): Promise<{ id: string; verifiedBooking: true }>;
}
export class EngagementPersistenceUnavailableError extends Error {
  constructor() {
    super("Engagement persistence is not configured.");
    this.name = "EngagementPersistenceUnavailableError";
  }
}
class UnavailableEngagementRepository implements EngagementRepository {
  async redeemBenefit(): Promise<RewardTransaction> {
    throw new EngagementPersistenceUnavailableError();
  }
  async createReferralCode(): Promise<{ code: string; expiresAt: string }> {
    throw new EngagementPersistenceUnavailableError();
  }
  async updateNotificationPreferences(): Promise<NotificationPreferences> {
    throw new EngagementPersistenceUnavailableError();
  }
  async createCampaignDraft(): Promise<CampaignDraft> {
    throw new EngagementPersistenceUnavailableError();
  }
  async createReviewRequest(): Promise<{ id: string; status: "scheduled" }> {
    throw new EngagementPersistenceUnavailableError();
  }
  async createReview(): Promise<{ id: string; verifiedBooking: true }> {
    throw new EngagementPersistenceUnavailableError();
  }
}
export const engagementRepository: EngagementRepository =
  new UnavailableEngagementRepository();
