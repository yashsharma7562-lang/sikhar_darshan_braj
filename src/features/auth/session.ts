import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { getFirebaseAdminAuth } from "@/infrastructure/firebase/admin";
import { SESSION_COOKIE, type CustomerSession } from "./types";
export const getCustomerSession = cache(
  async (): Promise<CustomerSession | null> => {
    const token = (await cookies()).get(SESSION_COOKIE)?.value;
    const auth = getFirebaseAdminAuth();
    if (!token || !auth) return null;
    try {
      const value = await auth.verifySessionCookie(token, true);
      const roles = Array.isArray(value.roles)
        ? value.roles.filter((role): role is string => typeof role === "string")
        : [];
      const permissions = Array.isArray(value.permissions)
        ? value.permissions.filter(
            (permission): permission is string =>
              typeof permission === "string",
          )
        : [];
      return {
        uid: value.uid,
        name: typeof value.name === "string" ? value.name : null,
        email: typeof value.email === "string" ? value.email : null,
        phoneNumber:
          typeof value.phone_number === "string" ? value.phone_number : null,
        roles,
        permissions,
        organisationId:
          typeof value.organisationId === "string"
            ? value.organisationId
            : null,
      };
    } catch {
      return null;
    }
  },
);
