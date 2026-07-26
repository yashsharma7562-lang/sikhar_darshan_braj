import {
  verifiedAccommodationPoints,
  verifiedChaurasiStages,
  verifiedSafetyPoints,
} from "@/features/chaurasi-kos/catalogue";
export function GET() {
  return Response.json({
    stages: verifiedChaurasiStages,
    safetyPoints: verifiedSafetyPoints,
    accommodationPoints: verifiedAccommodationPoints,
    verification: {
      status: "unavailable",
      message:
        "No complete Chaurasi Kos stage set has been source-verified. No route is published.",
    },
  });
}
