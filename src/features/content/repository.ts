import "server-only";
import type { ModerationDecision, TempleInformationSubmission } from "./types";
export interface ContentRepository {
  createTempleSubmission(
    organisationId: string,
    value: unknown,
  ): Promise<TempleInformationSubmission>;
  moderate(
    reviewerId: string,
    value: Omit<ModerationDecision, "reviewerId" | "decidedAt">,
  ): Promise<TempleInformationSubmission>;
}
export class ContentPersistenceUnavailableError extends Error {
  constructor() {
    super("Content workflow persistence is not configured.");
    this.name = "ContentPersistenceUnavailableError";
  }
}
class UnavailableContentRepository implements ContentRepository {
  async createTempleSubmission(): Promise<TempleInformationSubmission> {
    throw new ContentPersistenceUnavailableError();
  }
  async moderate(): Promise<TempleInformationSubmission> {
    throw new ContentPersistenceUnavailableError();
  }
}
export const contentRepository: ContentRepository =
  new UnavailableContentRepository();
