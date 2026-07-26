import type { PropertyRecord, StaySearchCriteria } from "./types";
export interface StayRepository {
  search(criteria: StaySearchCriteria): Promise<readonly PropertyRecord[]>;
  getBySlug(slug: string): Promise<PropertyRecord | null>;
}
class EmptyVerifiedStayRepository implements StayRepository {
  async search() {
    return [];
  }
  async getBySlug() {
    return null;
  }
}
export const stayRepository: StayRepository = new EmptyVerifiedStayRepository();
