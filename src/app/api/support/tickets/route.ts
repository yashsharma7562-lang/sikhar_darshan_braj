import { z } from "zod";
import { getStaffPrincipal } from "@/features/auth/authorization";
import {
  operationsRepository,
  OperationsPersistenceUnavailableError,
} from "@/features/operations/repository";
import { canTransitionTicket } from "@/features/operations/workflow";
const createSchema = z.object({
  customerId: z.string().min(1).max(128),
  bookingId: z.string().min(1).max(128).nullable(),
  category: z.enum([
    "booking",
    "refund",
    "vendor",
    "accessibility",
    "safety",
    "other",
  ]),
  summary: z.string().trim().min(10).max(1000),
});
const updateSchema = z.object({
  ticketId: z.string().min(1).max(128),
  fromStatus: z.enum([
    "open",
    "in-progress",
    "waiting-on-customer",
    "resolved",
    "closed",
  ]),
  toStatus: z.enum([
    "open",
    "in-progress",
    "waiting-on-customer",
    "resolved",
    "closed",
  ]),
  note: z.string().trim().min(5).max(2000),
});
function unavailable() {
  return Response.json(
    { message: "Support storage is unavailable. No case was changed." },
    { status: 503 },
  );
}
export async function POST(request: Request) {
  const principal = await getStaffPrincipal(
    ["customer-support-agent"],
    "support.tickets.write",
  );
  if (!principal)
    return Response.json(
      { message: "Support permission is required." },
      { status: 403 },
    );
  const parsed = createSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json({ message: "Invalid support case." }, { status: 400 });
  try {
    return Response.json(
      { ticket: await operationsRepository.createTicket(parsed.data) },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof OperationsPersistenceUnavailableError)
      return unavailable();
    throw error;
  }
}
export async function PATCH(request: Request) {
  const principal = await getStaffPrincipal(
    ["customer-support-agent"],
    "support.tickets.write",
  );
  if (!principal)
    return Response.json(
      { message: "Support permission is required." },
      { status: 403 },
    );
  const parsed = updateSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json(
      { message: "Invalid ticket update." },
      { status: 400 },
    );
  if (!canTransitionTicket(parsed.data.fromStatus, parsed.data.toStatus))
    return Response.json(
      { message: "Ticket status transition is not allowed." },
      { status: 409 },
    );
  try {
    return Response.json({
      ticket: await operationsRepository.updateTicket(
        principal.uid,
        parsed.data,
      ),
    });
  } catch (error) {
    if (error instanceof OperationsPersistenceUnavailableError)
      return unavailable();
    throw error;
  }
}
