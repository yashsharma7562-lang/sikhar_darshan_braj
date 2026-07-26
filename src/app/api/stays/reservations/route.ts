import { z } from "zod";
import {
  InventoryUnavailableError,
  inventoryReservationRepository,
} from "@/features/stays/inventory";
const schema = z
  .object({
    propertyId: z.string().trim().min(1).max(120),
    roomTypeId: z.string().trim().min(1).max(120),
    checkIn: z.iso.date(),
    checkOut: z.iso.date(),
    rooms: z.number().int().min(1).max(20),
    idempotencyKey: z.uuid(),
  })
  .refine((value) => value.checkOut > value.checkIn, {
    message: "Check-out must be after check-in.",
    path: ["checkOut"],
  });
export async function POST(request: Request) {
  if (request.headers.get("content-type")?.split(";")[0] !== "application/json")
    return Response.json(
      { message: "Content type must be application/json." },
      { status: 415 },
    );
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json(
      {
        message: "Invalid reservation request.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  try {
    const reservation = await inventoryReservationRepository.reserve(
      parsed.data,
    );
    return Response.json({ reservation }, { status: 201 });
  } catch (error) {
    if (error instanceof InventoryUnavailableError)
      return Response.json(
        {
          message:
            "Verified transactional inventory is not configured. No room was held and no payment should be started.",
        },
        { status: 503 },
      );
    throw error;
  }
}
