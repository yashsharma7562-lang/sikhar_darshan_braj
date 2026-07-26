import { verifiedEmergencyResources } from "@/features/accessibility/emergency";
export function GET() {
  return Response.json({
    resources: verifiedEmergencyResources,
    message: verifiedEmergencyResources.length
      ? null
      : "No destination-specific emergency contacts have passed source verification. In immediate danger, contact the appropriate local emergency service directly.",
  });
}
