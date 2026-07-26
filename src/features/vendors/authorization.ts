import "server-only";
import { getCustomerSession } from "@/features/auth/session";
import type { CustomerSession } from "@/features/auth/types";
import type { VendorPermission } from "./types";
export async function getVendorPrincipal(
  permission: VendorPermission,
): Promise<CustomerSession | null> {
  const session = await getCustomerSession();
  if (
    !session ||
    !session.roles.includes("vendor") ||
    !session.organisationId ||
    !session.permissions.includes(permission)
  )
    return null;
  return session;
}
