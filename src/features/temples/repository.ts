import { destinations, temples } from "./data/catalogue";
import type { DestinationRecord, TempleRecord } from "./types";

export interface TempleRepository {
  listTemples(): Promise<readonly TempleRecord[]>;
  getTemple(slug: string): Promise<TempleRecord | null>;
  listDestinations(): Promise<readonly DestinationRecord[]>;
  getDestination(slug: string): Promise<DestinationRecord | null>;
}

class SeedTempleRepository implements TempleRepository {
  async listTemples() {
    return temples;
  }
  async getTemple(slug: string) {
    return temples.find((temple) => temple.slug === slug) ?? null;
  }
  async listDestinations() {
    return destinations;
  }
  async getDestination(slug: string) {
    return (
      destinations.find((destination) => destination.slug === slug) ?? null
    );
  }
}

export const templeRepository: TempleRepository = new SeedTempleRepository();
