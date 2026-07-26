import type { TransportSearch, VehicleOption } from "./types";
export interface TransportRepository {
  search(input: TransportSearch): Promise<readonly VehicleOption[]>;
}
class EmptyVerifiedTransportRepository implements TransportRepository {
  async search() {
    return [];
  }
}
export const transportRepository: TransportRepository =
  new EmptyVerifiedTransportRepository();
