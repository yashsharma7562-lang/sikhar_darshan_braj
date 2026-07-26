import { z } from "zod";
const schema = z.object({
  packageId: z.string().min(1).max(120),
  departureId: z.string().min(1).max(120),
  notes: z.string().trim().min(10).max(1500),
  accessibilityNeeds: z.string().trim().max(1000),
});
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json(
      { message: "Invalid customisation request." },
      { status: 400 },
    );
  return Response.json(
    {
      message:
        "Authenticated booking access and verified departure inventory are required. No request was saved.",
    },
    { status: 401 },
  );
}
