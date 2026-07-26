import type { PropertyRecord } from "@/features/stays/types";
const accessibilityKeys = new Set([
  "wheelchair-access",
  "lift",
  "ground-floor-room",
  "accessible-bathroom",
]);
export function hasVerifiedAccessibility(
  property: PropertyRecord,
  requiredKeys: readonly string[],
) {
  if (
    property.verificationStatus !== "verified" ||
    !property.verifiedAt ||
    !requiredKeys.length
  )
    return false;
  return requiredKeys.every(
    (key) =>
      accessibilityKeys.has(key) &&
      property.facilities.some(
        (facility) =>
          facility.key === key && facility.state === "verified-available",
      ),
  );
}
export function filterVerifiedAccessibleStays(
  properties: readonly PropertyRecord[],
  requiredKeys: readonly string[],
) {
  return properties.filter((property) =>
    hasVerifiedAccessibility(property, requiredKeys),
  );
}
