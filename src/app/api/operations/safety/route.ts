import { z } from "zod";
import { getStaffPrincipal } from "@/features/auth/authorization";
import {
  operationsRepository,
  OperationsPersistenceUnavailableError,
} from "@/features/operations/repository";
import {
  canTransitionSafety,
  requiresImmediateEscalation,
} from "@/features/operations/workflow";
const schema = z.discriminatedUnion("operation", [
  z.object({
    operation: z.literal("report"),
    bookingId: z.string().min(1).max(128).nullable(),
    severity: z.enum(["low", "medium", "high", "critical"]),
    summary: z.string().trim().min(10).max(1000),
    emergencyServicesContacted: z.boolean(),
  }),
  z.object({
    operation: z.literal("transition"),
    escalationId: z.string().min(1).max(128),
    fromStatus: z.enum([
      "reported",
      "acknowledged",
      "responding",
      "stabilised",
      "closed",
    ]),
    toStatus: z.enum([
      "reported",
      "acknowledged",
      "responding",
      "stabilised",
      "closed",
    ]),
    note: z.string().trim().min(5).max(2000),
  }),
]);
export async function POST(request: Request) {
  const principal = await getStaffPrincipal(
    ["operations-manager", "safety-reviewer"],
    "operations.safety.write",
  );
  if (!principal)
    return Response.json(
      { message: "Safety permission is required." },
      { status: 403 },
    );
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json(
      { message: "Invalid safety escalation." },
      { status: 400 },
    );
  if (
    parsed.data.operation === "transition" &&
    !canTransitionSafety(parsed.data.fromStatus, parsed.data.toStatus)
  )
    return Response.json(
      { message: "Safety status transition is not allowed." },
      { status: 409 },
    );
  if (
    parsed.data.operation === "report" &&
    requiresImmediateEscalation(parsed.data.severity) &&
    !parsed.data.emergencyServicesContacted
  )
    return Response.json(
      {
        message:
          "Record the approved emergency-channel hand-off before submitting a critical incident.",
      },
      { status: 409 },
    );
  try {
    const escalation =
      parsed.data.operation === "report"
        ? await operationsRepository.createSafetyEscalation(parsed.data)
        : await operationsRepository.updateSafetyEscalation(
            principal.uid,
            parsed.data,
          );
    return Response.json(
      { escalation },
      { status: parsed.data.operation === "report" ? 201 : 200 },
    );
  } catch (error) {
    if (error instanceof OperationsPersistenceUnavailableError)
      return Response.json(
        {
          message:
            "Safety storage is unavailable. Escalate by the approved emergency channel.",
        },
        { status: 503 },
      );
    throw error;
  }
}
