import { z } from "zod";
const schema = z.object({
  tripId: z.string().trim().min(1).max(120),
  otp: z.string().regex(/^\d{6}$/),
});
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json(
      { message: "Invalid trip-start request." },
      { status: 400 },
    );
  return Response.json(
    {
      message:
        "Authenticated trip ownership is required. The OTP was not stored or logged.",
    },
    { status: 401 },
  );
}
