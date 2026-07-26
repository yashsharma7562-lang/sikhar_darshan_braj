import { z } from "zod";
import { getStaffPrincipal } from "@/features/auth/authorization";
import {
  operationsRepository,
  OperationsPersistenceUnavailableError,
} from "@/features/operations/repository";
const schema = z.object({
  permission: z.enum([
    "admin.users.write",
    "admin.vendors.write",
    "admin.bookings.write",
    "admin.finance.write",
    "admin.content.write",
  ]),
  action: z.string().trim().min(3).max(100),
  targetType: z.enum([
    "user",
    "vendor",
    "booking",
    "finance-record",
    "content-record",
  ]),
  targetId: z.string().min(1).max(128),
  reason: z.string().trim().min(10).max(1000),
});
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return Response.json(
      { message: "Invalid administrative action." },
      { status: 400 },
    );
  const principal = await getStaffPrincipal(
    ["super-admin", "admin"],
    parsed.data.permission,
  );
  if (!principal)
    return Response.json(
      { message: "Specific administrative permission is required." },
      { status: 403 },
    );
  try {
    return Response.json({
      auditEntry: await operationsRepository.performAdminAction({
        actorId: principal.uid,
        ...parsed.data,
      }),
    });
  } catch (error) {
    if (error instanceof OperationsPersistenceUnavailableError)
      return Response.json(
        {
          message:
            "Administrative storage is unavailable. No action was performed.",
        },
        { status: 503 },
      );
    throw error;
  }
}
