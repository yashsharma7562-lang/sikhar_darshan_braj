import { z } from "zod";
const schema = z.object({
  tripId: z.string().trim().min(1).max(120),
  reason: z.string().trim().min(20).max(1000),
});
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json(
      { message: "Invalid replacement request." },
      { status: 400 },
    );
  return Response.json(
    {
      message:
        "Authenticated operations access is required. No replacement was requested.",
    },
    { status: 401 },
  );
}
