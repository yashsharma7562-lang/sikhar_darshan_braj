import { z } from "zod";
import {
  paymentRepository,
  PaymentPersistenceUnavailableError,
} from "@/features/payments/repository";
import { verifyWebhookSignature } from "@/features/payments/signatures";
const eventSchema = z.object({
  event: z.string().min(1).max(100),
  payload: z.unknown(),
});
export async function POST(request: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret)
    return Response.json(
      { message: "Webhook verification is not configured." },
      { status: 503 },
    );
  const signature = request.headers.get("x-razorpay-signature");
  const eventId = request.headers.get("x-razorpay-event-id");
  const body = await request.text();
  if (!signature || !verifyWebhookSignature({ body, signature, secret }))
    return Response.json(
      { message: "Invalid webhook signature." },
      { status: 401 },
    );
  if (!eventId || eventId.length > 200)
    return Response.json(
      { message: "Webhook event identifier is required." },
      { status: 400 },
    );
  let payload: unknown;
  try {
    payload = JSON.parse(body) as unknown;
  } catch {
    return Response.json({ message: "Invalid webhook JSON." }, { status: 400 });
  }
  const parsed = eventSchema.safeParse(payload);
  if (!parsed.success)
    return Response.json(
      { message: "Invalid webhook payload." },
      { status: 400 },
    );
  try {
    if (await paymentRepository.hasProcessedEvent(eventId))
      return Response.json({ ok: true, duplicate: true });
    await paymentRepository.processWebhook(
      eventId,
      parsed.data.event,
      parsed.data.payload,
    );
    return Response.json({ ok: true });
  } catch (error) {
    if (error instanceof PaymentPersistenceUnavailableError)
      return Response.json(
        { message: "Webhook persistence is unavailable; retry later." },
        { status: 503 },
      );
    throw error;
  }
}
