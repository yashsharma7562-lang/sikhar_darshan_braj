import { z } from "zod";
import { getCustomerSession } from "@/features/auth/session";
import {
  bookingInventory,
  BookingInventoryUnavailableError,
} from "@/features/booking/inventory";
const schema = z
  .object({
    service: z.enum(["stay", "transport", "package"]),
    resourceId: z.string().trim().min(1).max(120),
    quantity: z.number().int().min(1).max(20),
    startsOn: z.iso.date(),
    endsOn: z.iso.date().nullable(),
    idempotencyKey: z.uuid(),
  })
  .refine((value) => value.endsOn === null || value.endsOn > value.startsOn, {
    path: ["endsOn"],
    message: "End date must follow start date.",
  });
export async function POST(request: Request) {
  const session = await getCustomerSession();
  if (!session)
    return Response.json(
      { message: "Authentication is required. No booking was created." },
      { status: 401 },
    );
  if (request.headers.get("content-type")?.split(";")[0] !== "application/json")
    return Response.json(
      { message: "Content type must be application/json." },
      { status: 415 },
    );
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json(
      {
        message: "Invalid booking request.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  try {
    const hold = await bookingInventory.hold({
      ownerId: session.uid,
      ...parsed.data,
    });
    return Response.json(
      { status: "inventory-held", hold, next: "payment" },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof BookingInventoryUnavailableError)
      return Response.json(
        {
          message:
            "Verified transactional inventory is unavailable. No inventory was held, no booking was created, and payment must not start.",
        },
        { status: 503 },
      );
    throw error;
  }
}
