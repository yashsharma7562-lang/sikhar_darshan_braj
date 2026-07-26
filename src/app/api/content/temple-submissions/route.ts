import { z } from "zod";
import { getPortalPrincipal } from "@/features/auth/authorization";
import {
  contentRepository,
  ContentPersistenceUnavailableError,
} from "@/features/content/repository";
const schema = z
  .object({
    templeSlug: z.string().regex(/^[a-z0-9-]+$/),
    kind: z.enum(["schedule", "notice", "facility", "contact", "source"]),
    content: z.string().trim().min(5).max(5000),
    sourceUrl: z.url(),
    effectiveFrom: z.iso.datetime().nullable(),
    effectiveUntil: z.iso.datetime().nullable(),
  })
  .refine(
    (value) =>
      value.effectiveFrom === null ||
      value.effectiveUntil === null ||
      value.effectiveUntil > value.effectiveFrom,
    { path: ["effectiveUntil"], message: "End must follow start." },
  );
export async function POST(request: Request) {
  const principal = await getPortalPrincipal(
    "content-contributor",
    "content.temples.submit",
  );
  if (!principal)
    return Response.json(
      { message: "Temple contribution permission is required." },
      { status: 403 },
    );
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json(
      { message: "Invalid temple submission." },
      { status: 400 },
    );
  try {
    return Response.json(
      {
        submission: await contentRepository.createTempleSubmission(
          principal.organisationId!,
          parsed.data,
        ),
        message: "Submission is unpublished and unverified.",
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ContentPersistenceUnavailableError)
      return Response.json(
        {
          message:
            "Contribution workflow is unavailable. Nothing was submitted.",
        },
        { status: 503 },
      );
    throw error;
  }
}
