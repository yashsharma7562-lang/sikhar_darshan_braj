import type { BookingService, InventoryHold } from "./types";
export interface BookingInventoryPort {
  hold(input: {
    ownerId: string;
    service: BookingService;
    resourceId: string;
    quantity: number;
    startsOn: string;
    endsOn: string | null;
    idempotencyKey: string;
  }): Promise<InventoryHold>;
  release(
    holdId: string,
    reason: "expired" | "cancelled" | "payment-failed",
  ): Promise<void>;
}
export class BookingInventoryUnavailableError extends Error {
  constructor() {
    super("Verified transactional booking inventory is not configured.");
    this.name = "BookingInventoryUnavailableError";
  }
}
class UnavailableBookingInventory implements BookingInventoryPort {
  async hold(): Promise<InventoryHold> {
    throw new BookingInventoryUnavailableError();
  }
  async release(): Promise<void> {
    throw new BookingInventoryUnavailableError();
  }
}
export const bookingInventory: BookingInventoryPort =
  new UnavailableBookingInventory();
