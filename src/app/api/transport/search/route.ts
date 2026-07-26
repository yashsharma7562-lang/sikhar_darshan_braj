import { z } from "zod";
import { transportRepository } from "@/features/transport/repository";
const schema = z.object({
  pickup: z.string().trim().min(2).max(200),
  drop: z.string().trim().min(2).max(200),
  date: z.iso.date(),
  time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  passengers: z.coerce.number().int().min(1).max(40),
  luggage: z.coerce.number().int().min(0).max(40),
  seniorCitizens: z.coerce.number().int().min(0).max(40).default(0),
  wheelchairRequired: z.boolean().default(false),
  journeyType: z
    .enum(["one-way", "round-trip", "local", "multi-day"])
    .default("one-way"),
});
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const parsed = schema.safeParse({
    ...Object.fromEntries(params),
    wheelchairRequired: params.get("wheelchairRequired") === "true",
  });
  if (!parsed.success)
    return Response.json(
      {
        message: "Invalid transport search.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  const vehicles = await transportRepository.search(parsed.data);
  return Response.json({
    vehicles,
    count: vehicles.length,
    availabilityState: vehicles.length ? "verified" : "no-verified-inventory",
  });
}
