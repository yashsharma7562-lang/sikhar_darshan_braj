import { z } from "zod";
import { getCustomerSession } from "@/features/auth/session";
import {
  PaymentPersistenceUnavailableError,
  paymentRepository,
} from "@/features/payments/repository";
import { verifyCheckoutSignature } from "@/features/payments/signatures";
const schema = z.object({
  razorpayOrderId: z.string().min(1).max(120),
  razorpayPaymentId: z.string().min(1).max(120),
  razorpaySignature: z.string().regex(/^[a-f0-9]{64}$/),
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
      { message: "Invalid checkout verification request." },
      { status: 400 },
    );
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret)
    return Response.json(
      { message: "Payment verification is not configured." },
      { status: 503 },
    );
  if (
    !verifyCheckoutSignature({
      orderId: parsed.data.razorpayOrderId,
      paymentId: parsed.data.razorpayPaymentId,
      signature: parsed.data.razorpaySignature,
      secret,
    })
  )
    return Response.json(
      { message: "Invalid payment signature." },
      { status: 401 },
    );
  try {
    await paymentRepository.verifyCheckout(
      session.uid,
      parsed.data.razorpayOrderId,
      parsed.data.razorpayPaymentId,
    );
    return Response.json(
      { accepted: true, status: "payment-verification-pending-webhook" },
      { status: 202 },
    );
  } catch (error) {
    if (error instanceof PaymentPersistenceUnavailableError)
      return Response.json(
        {
          message:
            "Payment verification cannot be persisted. Booking was not confirmed.",
        },
        { status: 503 },
      );
    throw error;
  }
}
