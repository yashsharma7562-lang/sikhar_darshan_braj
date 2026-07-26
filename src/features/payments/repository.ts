import "server-only";
import type { PaymentOrder, RefundRecord } from "./types";
export interface VerifiedPaymentBooking {
  readonly id: string;
  readonly ownerId: string;
  readonly inventoryHoldId: string;
  readonly amountMinor: number;
  readonly currency: "INR";
  readonly status: "inventory-held" | "payment-pending";
}
export interface PaymentRepository {
  getVerifiedBooking(
    bookingId: string,
    ownerId: string,
  ): Promise<VerifiedPaymentBooking | null>;
  hasProcessedEvent(eventId: string): Promise<boolean>;
  recordOrder(order: PaymentOrder, idempotencyKey: string): Promise<void>;
  processWebhook(
    eventId: string,
    eventType: string,
    payload: unknown,
  ): Promise<void>;
  createRefund(
    ownerId: string,
    paymentId: string,
    amountMinor: number,
    reason: string,
    idempotencyKey: string,
  ): Promise<RefundRecord>;
  verifyCheckout(
    ownerId: string,
    orderId: string,
    paymentId: string,
  ): Promise<void>;
}
export class PaymentPersistenceUnavailableError extends Error {
  constructor() {
    super("Transactional payment persistence is not configured.");
    this.name = "PaymentPersistenceUnavailableError";
  }
}
class UnavailablePaymentRepository implements PaymentRepository {
  async getVerifiedBooking(): Promise<VerifiedPaymentBooking | null> {
    throw new PaymentPersistenceUnavailableError();
  }
  async hasProcessedEvent(): Promise<boolean> {
    throw new PaymentPersistenceUnavailableError();
  }
  async recordOrder(): Promise<void> {
    throw new PaymentPersistenceUnavailableError();
  }
  async processWebhook(): Promise<void> {
    throw new PaymentPersistenceUnavailableError();
  }
  async createRefund(): Promise<RefundRecord> {
    throw new PaymentPersistenceUnavailableError();
  }
  async verifyCheckout(): Promise<void> {
    throw new PaymentPersistenceUnavailableError();
  }
}
export const paymentRepository: PaymentRepository =
  new UnavailablePaymentRepository();
