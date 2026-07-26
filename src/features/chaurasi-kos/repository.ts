import "server-only";
import type {
  FamilyJourneyGrant,
  JourneyLocation,
  JourneyRecord,
} from "./types";
export interface JourneyRepository {
  getOwned(id: string, ownerId: string): Promise<JourneyRecord | null>;
  save(record: JourneyRecord): Promise<void>;
  recordLocation(location: JourneyLocation): Promise<void>;
  createFamilyGrant(grant: FamilyJourneyGrant): Promise<void>;
  hasFamilySharingConsent(ownerId: string): Promise<boolean>;
}
export class JourneyPersistenceUnavailableError extends Error {
  constructor() {
    super("Transactional journey persistence is not configured.");
    this.name = "JourneyPersistenceUnavailableError";
  }
}
class UnavailableJourneyRepository implements JourneyRepository {
  async getOwned(): Promise<JourneyRecord | null> {
    throw new JourneyPersistenceUnavailableError();
  }
  async save(): Promise<void> {
    throw new JourneyPersistenceUnavailableError();
  }
  async recordLocation(): Promise<void> {
    throw new JourneyPersistenceUnavailableError();
  }
  async createFamilyGrant(): Promise<void> {
    throw new JourneyPersistenceUnavailableError();
  }
  async hasFamilySharingConsent(): Promise<boolean> {
    throw new JourneyPersistenceUnavailableError();
  }
}
export const journeyRepository: JourneyRepository =
  new UnavailableJourneyRepository();
