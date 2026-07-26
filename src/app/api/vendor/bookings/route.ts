import { z } from "zod";
import { getVendorPrincipal } from "@/features/vendors/authorization";
import {
  vendorRepository,
  VendorPersistenceUnavailableError,
} from "@/features/vendors/repository";
const schema = z.object({
  bookingId: z.string().min(1).max(120),
  action: z.enum(["accept", "decline", "mark-ready"]),
  reason: z.string().trim().max(500).nullable(),
  idempotencyKey: z.uuid(),
});
export async function PATCH(request: Request) {
  const principal = await getVendorPrincipal("vendor.bookings.write");
  if (!principal)
    return Response.json(
      { message: "Booking permission is required." },
      { status: 403 },
    );
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json(
      { message: "Invalid booking action." },
      { status: 400 },
    );
  try {
    await vendorRepository.updateBooking(
      principal.organisationId!,
      parsed.data,
    );
    return Response.json({ updated: true });
  } catch (error) {
    if (error instanceof VendorPersistenceUnavailableError)
      return Response.json(
        { message: "Booking operations are unavailable. Nothing changed." },
        { status: 503 },
      );
    throw error;
  }
}
