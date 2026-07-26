import type { BookingDocument } from "./types";
export function pendingBookingDocuments(
  bookingId: string,
): readonly BookingDocument[] {
  return (["confirmation", "invoice", "voucher"] as const).map((kind) => ({
    bookingId,
    kind,
    status: "pending-generation",
    url: null,
  }));
}
