import { z } from "zod";
import { getCustomerSession } from "@/features/auth/session";
import {
  accessibilityRepository,
  AccessibilityPersistenceUnavailableError,
} from "@/features/accessibility/repository";
const schema = z.object({
  serviceId: z.string().min(1).max(120),
  kind: z.enum([
    "wheelchair",
    "mobility-aid",
    "station-assistance",
    "accessible-vehicle",
    "ground-floor-room",
    "caregiver-support",
  ]),
  details: z.string().trim().min(3).max(1000),
  consent: z.literal(true),
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
      { message: "Invalid assistance request." },
      { status: 400 },
    );
  try {
    const value = await accessibilityRepository.createAssistanceRequest({
      ownerId: session.uid,
      serviceId: parsed.data.serviceId,
      kind: parsed.data.kind,
      details: parsed.data.details,
    });
    return Response.json(
      { request: value, message: "Assistance is requested, not confirmed." },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof AccessibilityPersistenceUnavailableError)
      return Response.json(
        {
          message:
            "Assistance requests are unavailable. No request was saved and no assistance is confirmed.",
        },
        { status: 503 },
      );
    throw error;
  }
}
