import { z } from "zod";
import { getVendorPrincipal } from "@/features/vendors/authorization";
import {
  vendorRepository,
  VendorPersistenceUnavailableError,
} from "@/features/vendors/repository";
const schema = z.object({
  name: z.string().trim().min(3).max(160),
  type: z.enum(["hotel", "dharamshala", "guest-house", "homestay", "ashram"]),
  destinationSlug: z.string().regex(/^[a-z0-9-]+$/),
  locality: z.string().trim().min(2).max(160),
  summary: z.string().trim().min(50).max(2000),
});
export async function POST(request: Request) {
  const principal = await getVendorPrincipal("vendor.profile.write");
  if (!principal)
    return Response.json(
      { message: "Vendor organisation permission is required." },
      { status: 403 },
    );
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json(
      {
        message: "Invalid property draft.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  try {
    return Response.json(
      {
        property: await vendorRepository.createPropertyDraft(
          principal.organisationId!,
          parsed.data,
        ),
        message: "Draft requires verification before publication.",
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof VendorPersistenceUnavailableError)
      return Response.json(
        {
          message: "Vendor property tools are unavailable. No draft was saved.",
        },
        { status: 503 },
      );
    throw error;
  }
}
