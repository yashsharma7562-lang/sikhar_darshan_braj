import type { DriverAssignmentPublic } from "./types";
export interface DriverPrivateRecord {
  readonly fullName: string;
  readonly phone: string;
  readonly verificationStatus: "verified";
  readonly profilePhotoUrl: string | null;
  readonly vehicleDisplay: string;
}
export function toPublicDriverAssignment(
  driver: DriverPrivateRecord,
  operationalContactAllowed: boolean,
): DriverAssignmentPublic {
  const words = driver.fullName.trim().split(/\s+/);
  const displayName =
    words.length > 1
      ? `${words[0]} ${words.at(-1)?.[0] ?? ""}.`
      : (words[0] ?? "Assigned driver");
  return {
    displayName,
    verificationStatus: driver.verificationStatus,
    profilePhotoUrl: driver.profilePhotoUrl,
    vehicleDisplay: driver.vehicleDisplay,
    maskedPhone: operationalContactAllowed ? maskPhone(driver.phone) : null,
  };
}
function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 4 ? `******${digits.slice(-4)}` : "****";
}
