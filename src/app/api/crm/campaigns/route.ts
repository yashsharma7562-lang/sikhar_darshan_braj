import { z } from "zod";
import { getStaffPrincipal } from "@/features/auth/authorization";
import {
  engagementRepository,
  EngagementPersistenceUnavailableError,
} from "@/features/engagement/repository";
const schema = z.object({
  name: z.string().trim().min(3).max(120),
  segmentId: z.string().min(1).max(128),
  category: z.enum(["transactional", "promotional"]),
  channels: z.array(z.enum(["email", "sms", "push", "in-app"])).min(1),
  locale: z.enum(["en", "hi"]),
});
export async function POST(request: Request) {
  const principal = await getStaffPrincipal(
    ["marketing-manager"],
    "crm.campaigns.write",
  );
  if (!principal)
    return Response.json(
      { message: "Campaign permission is required." },
      { status: 403 },
    );
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json(
      { message: "Invalid campaign draft." },
      { status: 400 },
    );
  try {
    return Response.json(
      {
        campaign: await engagementRepository.createCampaignDraft(
          principal.uid,
          parsed.data,
        ),
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof EngagementPersistenceUnavailableError)
      return Response.json(
        { message: "Campaign storage is unavailable. Nothing was sent." },
        { status: 503 },
      );
    throw error;
  }
}
