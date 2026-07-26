export type SupportTicketStatus =
  "open" | "in-progress" | "waiting-on-customer" | "resolved" | "closed";
export type SafetySeverity = "low" | "medium" | "high" | "critical";
export type SafetyStatus =
  "reported" | "acknowledged" | "responding" | "stabilised" | "closed";
export type SupportTicket = {
  id: string;
  customerId: string;
  bookingId: string | null;
  category:
    "booking" | "refund" | "vendor" | "accessibility" | "safety" | "other";
  summary: string;
  status: SupportTicketStatus;
  assignedTo: string | null;
  createdAt: string;
};
export type SafetyEscalation = {
  id: string;
  bookingId: string | null;
  severity: SafetySeverity;
  status: SafetyStatus;
  summary: string;
  emergencyServicesContacted: boolean;
  assignedTo: string | null;
  createdAt: string;
};
export type AuditEntry = {
  id: string;
  actorId: string;
  permission: string;
  action: string;
  targetType: string;
  targetId: string;
  reason: string;
  occurredAt: string;
};
