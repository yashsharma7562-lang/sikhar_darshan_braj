import type {
  SafetySeverity,
  SafetyStatus,
  SupportTicketStatus,
} from "./types";
const ticketTransitions: Record<
  SupportTicketStatus,
  readonly SupportTicketStatus[]
> = {
  open: ["in-progress", "closed"],
  "in-progress": ["waiting-on-customer", "resolved"],
  "waiting-on-customer": ["in-progress", "resolved"],
  resolved: ["in-progress", "closed"],
  closed: [],
};
const safetyTransitions: Record<SafetyStatus, readonly SafetyStatus[]> = {
  reported: ["acknowledged"],
  acknowledged: ["responding"],
  responding: ["stabilised"],
  stabilised: ["closed", "responding"],
  closed: [],
};
export function canTransitionTicket(
  from: SupportTicketStatus,
  to: SupportTicketStatus,
): boolean {
  return ticketTransitions[from].includes(to);
}
export function canTransitionSafety(
  from: SafetyStatus,
  to: SafetyStatus,
): boolean {
  return safetyTransitions[from].includes(to);
}
export function requiresImmediateEscalation(severity: SafetySeverity): boolean {
  return severity === "critical";
}
