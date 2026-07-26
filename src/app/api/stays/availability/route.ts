import { z } from "zod";
import { stayRepository } from "@/features/stays/repository";
const schema = z
  .object({
    destination: z
      .string()
      .trim()
      .regex(/^[a-z0-9-]*$/)
      .max(100),
    checkIn: z.iso.date(),
    checkOut: z.iso.date(),
    rooms: z.coerce.number().int().min(1).max(20),
    adults: z.coerce.number().int().min(1).max(40),
    children: z.coerce.number().int().min(0).max(40),
  })
  .refine((value) => value.checkOut > value.checkIn, {
    message: "Check-out must be after check-in.",
    path: ["checkOut"],
  });
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const parsed = schema.safeParse(Object.fromEntries(params));
  if (!parsed.success)
    return Response.json(
      {
        message: "Invalid stay search.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  const properties = await stayRepository.search({
    ...parsed.data,
    propertyTypes: [],
    accessibilityRequired: false,
    verifiedOnly: true,
  });
  return Response.json({
    properties,
    count: properties.length,
    availabilityState: properties.length
      ? "server-checked"
      : "no-verified-inventory",
  });
}
