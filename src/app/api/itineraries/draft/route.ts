import { z } from "zod";
import { createDraftItinerary } from "@/features/packages/planner";
const schema = z
  .object({
    days: z.number().int().min(1).max(30),
    travellers: z.number().int().min(1).max(100),
    seniorCitizens: z.number().int().min(0).max(100),
    children: z.number().int().min(0).max(100),
    destinationSlugs: z
      .array(z.string().regex(/^[a-z0-9-]+$/))
      .min(1)
      .max(20),
    walkingTolerance: z.enum(["low", "medium", "high"]),
    pace: z.enum(["slow", "balanced", "active"]),
    wheelchairRequired: z.boolean(),
    budgetMinor: z.number().int().nonnegative().nullable(),
    language: z.enum(["en", "hi"]),
    avoidCrowds: z.boolean(),
  })
  .refine(
    (value) => value.seniorCitizens + value.children <= value.travellers,
    {
      message: "Senior and child counts cannot exceed total travellers.",
      path: ["travellers"],
    },
  );
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json(
      {
        message: "Check the journey preferences.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  try {
    return Response.json(createDraftItinerary(parsed.data));
  } catch (error) {
    return Response.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "The planning draft could not be created.",
      },
      { status: 400 },
    );
  }
}
