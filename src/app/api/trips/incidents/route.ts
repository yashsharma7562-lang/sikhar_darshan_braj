import { z } from "zod";
const schema = z.object({
  tripId: z.string().trim().min(1).max(120),
  category: z.enum([
    "safety",
    "vehicle",
    "driver",
    "delay",
    "lost-item",
    "other",
  ]),
  description: z.string().trim().min(20).max(2000),
  requiresEmergencyEscalation: z.boolean(),
});
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json(
      {
        message: "Invalid incident report.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  return Response.json(
    {
      message:
        "Authenticated trip access and persistent incident storage are required. No report was saved.",
    },
    { status: 401 },
  );
}
