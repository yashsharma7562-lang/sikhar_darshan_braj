import "server-only";
import Razorpay from "razorpay";
import type { PaymentOrder } from "@/features/payments/types";
export class RazorpayConfigurationError extends Error {
  constructor() {
    super("Razorpay credentials are not configured.");
    this.name = "RazorpayConfigurationError";
  }
}
export async function createRazorpayOrder(input: {
  bookingId: string;
  amountMinor: number;
  receipt: string;
}): Promise<PaymentOrder> {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) throw new RazorpayConfigurationError();
  const client = new Razorpay({ key_id: keyId, key_secret: keySecret });
  const order = await client.orders.create({
    amount: input.amountMinor,
    currency: "INR",
    receipt: input.receipt,
    notes: { bookingId: input.bookingId },
  });
  return {
    provider: "razorpay",
    providerOrderId: order.id,
    bookingId: input.bookingId,
    amountMinor: Number(order.amount),
    currency: "INR",
    status: "created",
  };
}
