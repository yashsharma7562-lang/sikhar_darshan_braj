import { z } from "zod";
import { getCustomerSession } from "@/features/auth/session";
import {
  accessibilityRepository,
  AccessibilityPersistenceUnavailableError,
} from "@/features/accessibility/repository";
const schema = z.object({
  name: z.string().trim().min(2).max(100),
  relationship: z.string().trim().min(2).max(60),
  seniorCitizen: z.boolean(),
  mobilityNotes: z.string().trim().max(500).nullable(),
  consentRecordedAt: z.iso.datetime(),
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
      { message: "Invalid family traveller." },
      { status: 400 },
    );
  try {
    return Response.json(
      {
        traveller: await accessibilityRepository.addFamilyTraveller({
          ownerId: session.uid,
          ...parsed.data,
        }),
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof AccessibilityPersistenceUnavailableError)
      return Response.json(
        {
          message:
            "Family management is unavailable. No personal data was saved.",
        },
        { status: 503 },
      );
    throw error;
  }
}
