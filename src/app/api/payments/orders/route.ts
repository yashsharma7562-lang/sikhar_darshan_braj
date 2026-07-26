import { z } from "zod";
import { getCustomerSession } from "@/features/auth/session";
import {
  paymentRepository,
  PaymentPersistenceUnavailableError,
} from "@/features/payments/repository";
import {
  createRazorpayOrder,
  RazorpayConfigurationError,
} from "@/infrastructure/razorpay/gateway";
const schema = z.object({
  bookingId: z.string().trim().min(1).max(120),
  idempotencyKey: z.uuid(),
});
export async function POST(request: Request) {
  const session = await getCustomerSession();
  if (!session)
    return Response.json(
      { message: "Authentication is required." },
      { status: 401 },
    );
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json(
      { message: "Invalid payment-order request." },
      { status: 400 },
    );
  try {
    const booking = await paymentRepository.getVerifiedBooking(
      parsed.data.bookingId,
      session.uid,
    );
    if (!booking)
      return Response.json(
        {
          message:
            "An owned booking with a valid inventory hold was not found.",
        },
        { status: 404 },
      );
    const order = await createRazorpayOrder({
      bookingId: booking.id,
      amountMinor: booking.amountMinor,
      receipt: booking.id.slice(0, 40),
    });
    if (order.amountMinor !== booking.amountMinor)
      return Response.json(
        { message: "Provider amount mismatch. Payment was not started." },
        { status: 502 },
      );
    await paymentRepository.recordOrder(order, parsed.data.idempotencyKey);
    return Response.json({ order }, { status: 201 });
  } catch (error) {
    if (
      error instanceof PaymentPersistenceUnavailableError ||
      error instanceof RazorpayConfigurationError
    )
      return Response.json(
        { message: error.message + " No payment order was created." },
        { status: 503 },
      );
    throw error;
  }
}
