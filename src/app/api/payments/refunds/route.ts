import { z } from "zod";
import { getCustomerSession } from "@/features/auth/session";
import {
  PaymentPersistenceUnavailableError,
  paymentRepository,
} from "@/features/payments/repository";
const schema = z.object({
  paymentId: z.string().trim().min(1).max(120),
  amountMinor: z.number().int().positive(),
  reason: z.string().trim().min(5).max(500),
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
      { message: "Invalid refund request." },
      { status: 400 },
    );
  try {
    return Response.json(
      {
        refund: await paymentRepository.createRefund(
          session.uid,
          parsed.data.paymentId,
          parsed.data.amountMinor,
          parsed.data.reason,
          parsed.data.idempotencyKey,
        ),
      },
      { status: 202 },
    );
  } catch (error) {
    if (error instanceof PaymentPersistenceUnavailableError)
      return Response.json(
        {
          message:
            "Verified payment ownership and refundable balance cannot be confirmed. No refund was created.",
        },
        { status: 503 },
      );
    throw error;
  }
}
