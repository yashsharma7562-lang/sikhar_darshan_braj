import type { TripStatus } from "./types";
const transitions: Readonly<Record<TripStatus, readonly TripStatus[]>> = {
  draft: ["quoted", "cancelled"],
  quoted: ["pending-payment", "cancelled"],
  "pending-payment": ["confirmed", "cancelled"],
  confirmed: ["driver-assigned", "cancelled"],
  "driver-assigned": ["arriving", "incident-open", "cancelled"],
  arriving: ["ready", "incident-open", "cancelled"],
  ready: ["in-progress", "incident-open", "cancelled"],
  "in-progress": ["completed", "incident-open"],
  completed: [],
  cancelled: [],
  "incident-open": [
    "driver-assigned",
    "arriving",
    "ready",
    "in-progress",
    "cancelled",
  ],
};
export function canTransitionTrip(from: TripStatus, to: TripStatus): boolean {
  return transitions[from].includes(to);
}
export function assertTripTransition(from: TripStatus, to: TripStatus): void {
  if (!canTransitionTrip(from, to))
    throw new Error(`Invalid trip transition: ${from} to ${to}.`);
}
