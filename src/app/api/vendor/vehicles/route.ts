import { z } from "zod";
import { getVendorPrincipal } from "@/features/vendors/authorization";
import {
  vendorRepository,
  VendorPersistenceUnavailableError,
} from "@/features/vendors/repository";
const schema = z.object({
  vehicleId: z.string().min(1).max(120),
  type: z.enum([
    "e-rickshaw",
    "auto-rickshaw",
    "sedan",
    "suv",
    "tempo-traveller",
    "mini-bus",
    "accessible-vehicle",
  ]),
  capacity: z.number().int().min(1).max(100),
  wheelchairSupport: z.enum(["verified", "unavailable", "unknown"]),
  available: z.boolean(),
});
export async function PUT(request: Request) {
  const principal = await getVendorPrincipal("vendor.transport.write");
  if (!principal)
    return Response.json(
      { message: "Transport permission is required." },
      { status: 403 },
    );
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json(
      { message: "Invalid vehicle update." },
      { status: 400 },
    );
  try {
    await vendorRepository.updateVehicle(
      principal.organisationId!,
      parsed.data,
    );
    return Response.json({
      updated: true,
      note: "Accessibility appears publicly only after verification.",
    });
  } catch (error) {
    if (error instanceof VendorPersistenceUnavailableError)
      return Response.json(
        { message: "Vehicle operations are unavailable. Nothing changed." },
        { status: 503 },
      );
    throw error;
  }
}
