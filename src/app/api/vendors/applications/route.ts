import { z } from "zod";
import {
  vendorRepository,
  VendorPersistenceUnavailableError,
} from "@/features/vendors/repository";
const schema = z.object({
  legalName: z.string().trim().min(3).max(160),
  displayName: z.string().trim().min(3).max(160),
  type: z.enum(["stay", "transport", "guide", "travel-agent", "other"]),
  contactEmail: z.email(),
  contactPhone: z.string().regex(/^\+[1-9]\d{7,14}$/),
  consent: z.literal(true),
});
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json(
      {
        message: "Invalid vendor application.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  try {
    const { consent: _, ...value } = parsed.data;
    void _;
    return Response.json(
      {
        application: await vendorRepository.submitApplication(value),
        message: "Submission does not imply approval or verification.",
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof VendorPersistenceUnavailableError)
      return Response.json(
        {
          message:
            "Vendor applications are not connected. No application was saved.",
        },
        { status: 503 },
      );
    throw error;
  }
}
