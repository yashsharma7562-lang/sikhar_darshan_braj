import { z } from "zod";

const correctionSchema = z.object({
  templeSlug: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]+$/)
    .max(120),
  field: z.enum(["schedule", "facility", "contact", "notice", "other"]),
  correction: z.string().trim().min(20).max(1000),
  sourceUrl: z.union([z.literal(""), z.url().max(500)]),
});
export async function POST(request: Request) {
  if (request.headers.get("content-type")?.split(";")[0] !== "application/json")
    return Response.json(
      { message: "Content type must be application/json." },
      { status: 415 },
    );
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && !["same-origin", "same-site", "none"].includes(fetchSite))
    return Response.json(
      { message: "Cross-site submissions are not accepted." },
      { status: 403 },
    );
  const parsed = correctionSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!parsed.success)
    return Response.json(
      {
        message: "Check the correction details and try again.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  return Response.json(
    {
      message:
        "Correction intake is temporarily unavailable because persistent review storage is not configured. No report was saved.",
    },
    { status: 503, headers: { "retry-after": "3600" } },
  );
}
