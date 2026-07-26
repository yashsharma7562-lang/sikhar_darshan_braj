import "server-only";
import type { SavedItinerary, ShareGrant } from "./types";
export interface ItineraryRepository {
  getOwned(id: string, ownerId: string): Promise<SavedItinerary | null>;
  save(value: SavedItinerary): Promise<void>;
  createShare(grant: ShareGrant): Promise<void>;
}
export class ItineraryPersistenceUnavailableError extends Error {
  constructor() {
    super("Itinerary persistence is not configured.");
    this.name = "ItineraryPersistenceUnavailableError";
  }
}
class UnavailableRepository implements ItineraryRepository {
  async getOwned(): Promise<SavedItinerary | null> {
    throw new ItineraryPersistenceUnavailableError();
  }
  async save(): Promise<void> {
    throw new ItineraryPersistenceUnavailableError();
  }
  async createShare(): Promise<void> {
    throw new ItineraryPersistenceUnavailableError();
  }
}
export const itineraryRepository: ItineraryRepository =
  new UnavailableRepository();
