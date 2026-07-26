import "server-only";
import { getCustomerSession } from "./session";
import type { CustomerSession } from "./types";
export async function getPortalPrincipal(
  role: string,
  permission: string,
): Promise<CustomerSession | null> {
  const session = await getCustomerSession();
  if (
    !session ||
    !session.roles.includes(role) ||
    !session.organisationId ||
    !session.permissions.includes(permission)
  )
    return null;
  return session;
}
export async function getStaffPrincipal(
  roles: readonly string[],
  permission: string,
): Promise<CustomerSession | null> {
  const session = await getCustomerSession();
  if (
    !session ||
    !roles.some((role) => session.roles.includes(role)) ||
    !session.permissions.includes(permission)
  )
    return null;
  return session;
}
