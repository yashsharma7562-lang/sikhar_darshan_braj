import { z } from "zod";
import { getCustomerSession } from "@/features/auth/session";
import { createItineraryPdf } from "@/features/itinerary/pdf";
const stop = z.object({
  placeId: z.string().min(1).max(200),
  label: z.string().min(1).max(200),
  note: z.string().max(500),
});
const schema = z.object({
  id: z.string().min(1).max(120),
  title: z.string().min(1).max(120),
  days: z
    .array(
      z.object({
        day: z.number().int().min(1).max(60),
        title: z.string().min(1).max(120),
        stops: z.array(stop).max(30),
      }),
    )
    .min(1)
    .max(60),
  updatedAt: z.iso.datetime(),
  routeStatus: z.enum(["unresolved", "verified"]),
  lastSyncedAt: z.iso.datetime().nullable(),
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
      { message: "Invalid itinerary export." },
      { status: 400 },
    );
  const bytes = await createItineraryPdf({
    ...parsed.data,
    ownerId: session.uid,
  });
  return new Response(bytes as BodyInit, {
    headers: {
      "content-type": "application/pdf",
      "content-disposition": "attachment; filename=braj-itinerary.pdf",
      "cache-control": "private, no-store",
    },
  });
}
