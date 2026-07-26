import { z } from "zod";
import { getVendorPrincipal } from "@/features/vendors/authorization";
import {
  vendorRepository,
  VendorPersistenceUnavailableError,
} from "@/features/vendors/repository";
const schema = z.object({
  propertyId: z.string().min(1).max(120),
  roomTypeId: z.string().min(1).max(120),
  date: z.iso.date(),
  availableRooms: z.number().int().min(0).max(1000),
  rateMinor: z.number().int().nonnegative(),
  idempotencyKey: z.uuid(),
});
export async function PUT(request: Request) {
  const principal = await getVendorPrincipal("vendor.inventory.write");
  if (!principal)
    return Response.json(
      { message: "Inventory permission is required." },
      { status: 403 },
    );
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json(
      { message: "Invalid inventory update." },
      { status: 400 },
    );
  try {
    await vendorRepository.updateInventory(
      principal.organisationId!,
      parsed.data,
    );
    return Response.json({ updated: true });
  } catch (error) {
    if (error instanceof VendorPersistenceUnavailableError)
      return Response.json(
        { message: "Transactional inventory is unavailable. Nothing changed." },
        { status: 503 },
      );
    throw error;
  }
}
