import type { InventoryReservation, ReservationRequest } from "./types";
export interface InventoryReservationRepository {
  reserve(request: ReservationRequest): Promise<InventoryReservation>;
  release(
    reservationId: string,
    reason: "expired" | "payment-failed" | "cancelled",
  ): Promise<void>;
}
export class InventoryUnavailableError extends Error {
  constructor() {
    super("Transactional stay inventory is not configured.");
    this.name = "InventoryUnavailableError";
  }
}
export class UnavailableInventoryRepository implements InventoryReservationRepository {
  async reserve(request: ReservationRequest): Promise<InventoryReservation> {
    void request;
    throw new InventoryUnavailableError();
  }
  async release(
    reservationId: string,
    reason: "expired" | "payment-failed" | "cancelled",
  ): Promise<void> {
    void reservationId;
    void reason;
    throw new InventoryUnavailableError();
  }
}
export const inventoryReservationRepository: InventoryReservationRepository =
  new UnavailableInventoryRepository();
