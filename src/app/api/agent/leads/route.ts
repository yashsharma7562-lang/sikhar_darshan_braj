import { z } from "zod";
import { getPortalPrincipal } from "@/features/auth/authorization";
import {
  agentRepository,
  AgentPersistenceUnavailableError,
} from "@/features/agents/repository";
const schema = z.object({
  displayName: z.string().trim().min(2).max(100),
  contactChannel: z.enum(["phone", "email", "whatsapp"]),
  contactValue: z.string().trim().min(5).max(160),
  travellerCount: z.number().int().min(1).max(500),
  consentRecordedAt: z.iso.datetime(),
});
export async function POST(request: Request) {
  const principal = await getPortalPrincipal("travel-agent", "agent.crm.write");
  if (!principal)
    return Response.json(
      { message: "Agent CRM permission is required." },
      { status: 403 },
    );
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json({ message: "Invalid lead." }, { status: 400 });
  try {
    return Response.json(
      {
        lead: await agentRepository.createLead({
          organisationId: principal.organisationId!,
          ...parsed.data,
        }),
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof AgentPersistenceUnavailableError)
      return Response.json(
        { message: "Agent CRM is unavailable. No personal data was saved." },
        { status: 503 },
      );
    throw error;
  }
}
