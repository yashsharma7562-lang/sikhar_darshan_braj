import { z } from "zod";
import { getPortalPrincipal } from "@/features/auth/authorization";
import {
  agentRepository,
  AgentPersistenceUnavailableError,
} from "@/features/agents/repository";
const schema = z.object({
  name: z.string().trim().min(3).max(160),
  durationDays: z.number().int().min(1).max(60),
  destinationSlugs: z
    .array(z.string().regex(/^[a-z0-9-]+$/))
    .min(1)
    .max(30),
  inclusions: z.array(z.string().trim().min(2).max(200)).max(30),
  exclusions: z.array(z.string().trim().min(2).max(200)).max(30),
});
export async function POST(request: Request) {
  const principal = await getPortalPrincipal(
    "travel-agent",
    "agent.packages.write",
  );
  if (!principal)
    return Response.json(
      { message: "Package-builder permission is required." },
      { status: 403 },
    );
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json(
      { message: "Invalid package draft." },
      { status: 400 },
    );
  try {
    return Response.json(
      {
        package: await agentRepository.createPackage(
          principal.organisationId!,
          parsed.data,
        ),
        message: "Draft is unpublished and requires approval.",
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof AgentPersistenceUnavailableError)
      return Response.json(
        { message: "Package builder is unavailable. No draft was saved." },
        { status: 503 },
      );
    throw error;
  }
}
