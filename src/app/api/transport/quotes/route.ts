import { z } from "zod";
const schema = z.object({
  vehicleOptionId: z.string().trim().min(1).max(120),
  pickupPlaceId: z.string().trim().min(1).max(300),
  dropPlaceId: z.string().trim().min(1).max(300),
  date: z.iso.date(),
  time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  idempotencyKey: z.uuid(),
});
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json(
      {
        message: "Invalid quote request.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  return Response.json(
    {
      message:
        "Verified route distance and operator rate cards are not configured. No fare was quoted.",
    },
    { status: 503 },
  );
}
