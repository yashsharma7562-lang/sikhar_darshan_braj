export type CustomerSession = {
  uid: string;
  name: string | null;
  email: string | null;
  phoneNumber: string | null;
  roles: readonly string[];
  permissions: readonly string[];
  organisationId: string | null;
};
export type ConsentKey =
  | "location"
  | "familySharing"
  | "marketing"
  | "pushNotifications"
  | "analytics"
  | "accessibilityPreferences";
export type CustomerRecordKind =
  "savedItems" | "bookings" | "familyMembers" | "emergencyContacts";
export const SESSION_COOKIE = "shikhar_session";
