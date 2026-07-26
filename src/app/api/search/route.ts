import { z } from "zod";
import { searchRepository } from "@/features/search/repository";
const categorySchema = z.enum([
  "temple",
  "destination",
  "stay",
  "package",
  "transport",
  "festival",
  "route",
]);
const querySchema = z.object({
  q: z.string().trim().max(150).default(""),
  category: z.array(categorySchema).max(7).default([]),
  destination: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]*$/)
    .max(100)
    .default(""),
  verified: z.boolean().default(false),
});
export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = querySchema.safeParse({
    q: url.searchParams.get("q") ?? "",
    category: url.searchParams.getAll("category"),
    destination: url.searchParams.get("destination") ?? "",
    verified: url.searchParams.get("verified") === "true",
  });
  if (!parsed.success)
    return Response.json(
      {
        message: "Invalid search parameters.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  const result = await searchRepository.search(parsed.data.q, {
    categories: parsed.data.category,
    destination: parsed.data.destination || null,
    verificationOnly: parsed.data.verified,
  });
  return Response.json(result, {
    headers: {
      "cache-control": "public, max-age=60, stale-while-revalidate=300",
    },
  });
}
