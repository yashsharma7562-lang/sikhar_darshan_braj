import { z } from "zod";
import { getPortalPrincipal } from "@/features/auth/authorization";
import {
  contentRepository,
  ContentPersistenceUnavailableError,
} from "@/features/content/repository";
const schema = z.object({
  submissionId: z.string().min(1).max(120),
  action: z.enum(["request-changes", "approve", "reject", "publish"]),
  reason: z.string().trim().min(5).max(1000),
});
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json(
      { message: "Invalid moderation decision." },
      { status: 400 },
    );
  const permission =
    parsed.data.action === "publish" ? "content.publish" : "content.moderate";
  const principal = await getPortalPrincipal("content-reviewer", permission);
  if (!principal)
    return Response.json(
      { message: "Required moderation permission is missing." },
      { status: 403 },
    );
  try {
    return Response.json({
      submission: await contentRepository.moderate(principal.uid, parsed.data),
    });
  } catch (error) {
    if (error instanceof ContentPersistenceUnavailableError)
      return Response.json(
        {
          message:
            "Moderation storage is unavailable. No decision was recorded.",
        },
        { status: 503 },
      );
    throw error;
  }
}
