import { z } from "zod";
import { getCustomerSession } from "@/features/auth/session";
import { verifiedChaurasiStages } from "@/features/chaurasi-kos/catalogue";
import {
  completeStage,
  transitionJourney,
} from "@/features/chaurasi-kos/progress";
import {
  journeyRepository,
  JourneyPersistenceUnavailableError,
} from "@/features/chaurasi-kos/repository";
const schema = z.object({
  journeyId: z.string().min(1).max(120),
  action: z.enum([
    "start",
    "pause",
    "resume",
    "complete",
    "abandon",
    "complete-stage",
  ]),
  stageId: z.string().max(120).nullable(),
  occurredAt: z.iso.datetime(),
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
      { message: "Invalid journey update." },
      { status: 400 },
    );
  try {
    const record = await journeyRepository.getOwned(
      parsed.data.journeyId,
      session.uid,
    );
    if (!record)
      return Response.json({ message: "Journey not found." }, { status: 404 });
    const next =
      parsed.data.action === "complete-stage" && parsed.data.stageId
        ? completeStage(
            record,
            parsed.data.stageId,
            new Set(verifiedChaurasiStages.map((stage) => stage.id)),
            parsed.data.occurredAt,
          )
        : transitionJourney(
            record,
            (
              {
                start: "in-progress",
                pause: "paused",
                resume: "in-progress",
                complete: "completed",
                abandon: "abandoned",
                "complete-stage": record.status,
              } as const
            )[parsed.data.action],
            parsed.data.occurredAt,
          );
    await journeyRepository.save(next);
    return Response.json({ journey: next });
  } catch (error) {
    if (error instanceof JourneyPersistenceUnavailableError)
      return Response.json(
        {
          message: "Journey storage is unavailable. No progress was recorded.",
        },
        { status: 503 },
      );
    if (error instanceof Error)
      return Response.json({ message: error.message }, { status: 409 });
    throw error;
  }
}
