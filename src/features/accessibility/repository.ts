import "server-only";
import type { AssistanceRequest, FamilyTraveller } from "./types";
export interface AccessibilityRepository {
  createAssistanceRequest(
    value: Omit<AssistanceRequest, "id" | "status" | "createdAt">,
  ): Promise<AssistanceRequest>;
  addFamilyTraveller(
    value: Omit<FamilyTraveller, "id">,
  ): Promise<FamilyTraveller>;
}
export class AccessibilityPersistenceUnavailableError extends Error {
  constructor() {
    super("Accessibility request persistence is not configured.");
    this.name = "AccessibilityPersistenceUnavailableError";
  }
}
class UnavailableAccessibilityRepository implements AccessibilityRepository {
  async createAssistanceRequest(): Promise<AssistanceRequest> {
    throw new AccessibilityPersistenceUnavailableError();
  }
  async addFamilyTraveller(): Promise<FamilyTraveller> {
    throw new AccessibilityPersistenceUnavailableError();
  }
}
export const accessibilityRepository: AccessibilityRepository =
  new UnavailableAccessibilityRepository();
