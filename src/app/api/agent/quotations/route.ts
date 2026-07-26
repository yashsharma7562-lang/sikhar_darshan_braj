import { z } from "zod";
import { getPortalPrincipal } from "@/features/auth/authorization";
import {
  agentRepository,
  AgentPersistenceUnavailableError,
} from "@/features/agents/repository";
const schema = z.object({
  leadId: z.string().min(1).max(120),
  travellerCount: z.number().int().min(1).max(500),
  validUntil: z.iso.datetime(),
  requestedServiceIds: z.array(z.string().min(1).max(120)).min(1).max(50),
});
export async function POST(request: Request) {
  const principal = await getPortalPrincipal(
    "travel-agent",
    "agent.quotes.write",
  );
  if (!principal)
    return Response.json(
      { message: "Quotation permission is required." },
      { status: 403 },
    );
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json({ message: "Invalid quotation." }, { status: 400 });
  try {
    return Response.json(
      {
        quotation: await agentRepository.createQuote(
          principal.organisationId!,
          parsed.data,
        ),
        message:
          "Pricing remains pending until server-verified rates are attached.",
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof AgentPersistenceUnavailableError)
      return Response.json(
        { message: "Quotation storage is unavailable. No quote was created." },
        { status: 503 },
      );
    throw error;
  }
}
