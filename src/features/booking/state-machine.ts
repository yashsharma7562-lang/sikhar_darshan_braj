import type { BookingStatus } from "./types";
const transitions: Readonly<Record<BookingStatus, readonly BookingStatus[]>> = {
  draft: ["inventory-pending", "cancelled"],
  "inventory-pending": ["inventory-held", "failed", "cancelled"],
  "inventory-held": ["payment-pending", "expired", "cancelled"],
  "payment-pending": ["confirmed", "failed", "expired", "cancelled"],
  confirmed: ["cancelled"],
  cancelled: [],
  expired: [],
  failed: [],
};
export function canTransitionBooking(from: BookingStatus, to: BookingStatus) {
  return transitions[from].includes(to);
}
export function transitionBooking(
  from: BookingStatus,
  to: BookingStatus,
): BookingStatus {
  if (!canTransitionBooking(from, to))
    throw new Error("Invalid booking status transition.");
  return to;
}
