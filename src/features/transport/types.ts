export type VehicleType =
  | "e-rickshaw"
  | "auto-rickshaw"
  | "sedan"
  | "suv"
  | "tempo-traveller"
  | "mini-bus"
  | "accessible-vehicle";
export type TripStatus =
  | "draft"
  | "quoted"
  | "pending-payment"
  | "confirmed"
  | "driver-assigned"
  | "arriving"
  | "ready"
  | "in-progress"
  | "completed"
  | "cancelled"
  | "incident-open";
export interface TransportSearch {
  readonly pickup: string;
  readonly drop: string;
  readonly date: string;
  readonly time: string;
  readonly passengers: number;
  readonly luggage: number;
  readonly seniorCitizens: number;
  readonly wheelchairRequired: boolean;
  readonly journeyType: "one-way" | "round-trip" | "local" | "multi-day";
}
export interface VehicleOption {
  readonly id: string;
  readonly operatorId: string;
  readonly type: VehicleType;
  readonly capacity: number;
  readonly luggageCapacity: number;
  readonly wheelchairSupport: "verified" | "unavailable" | "unknown";
  readonly verificationStatus: "verified" | "pending" | "expired";
}
export interface FareInput {
  readonly baseFareMinor: number;
  readonly distanceMeters: number;
  readonly ratePerKmMinor: number;
  readonly durationMinutes: number;
  readonly includedMinutes: number;
  readonly waitingRatePerMinuteMinor: number;
  readonly tollMinor: number;
  readonly parkingMinor: number;
  readonly nightChargeMinor: number;
  readonly taxRateBps: number;
}
export interface FareQuote {
  readonly currency: "INR";
  readonly baseFareMinor: number;
  readonly distanceFareMinor: number;
  readonly waitingFareMinor: number;
  readonly tollMinor: number;
  readonly parkingMinor: number;
  readonly nightChargeMinor: number;
  readonly taxMinor: number;
  readonly totalMinor: number;
}
export interface DriverAssignmentPublic {
  readonly displayName: string;
  readonly verificationStatus: "verified";
  readonly profilePhotoUrl: string | null;
  readonly vehicleDisplay: string;
  readonly maskedPhone: string | null;
}
export interface IncidentReport {
  readonly tripId: string;
  readonly category:
    "safety" | "vehicle" | "driver" | "delay" | "lost-item" | "other";
  readonly description: string;
  readonly requiresEmergencyEscalation: boolean;
}
