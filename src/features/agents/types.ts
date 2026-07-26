export type AgentPermission =
  | "agent.crm.write"
  | "agent.quotes.write"
  | "agent.packages.write"
  | "agent.groups.read";
export interface AgentLead {
  readonly id: string;
  readonly organisationId: string;
  readonly displayName: string;
  readonly contactChannel: "phone" | "email" | "whatsapp";
  readonly contactValue: string;
  readonly travellerCount: number;
  readonly status: "new" | "qualified" | "quoted" | "won" | "lost";
  readonly consentRecordedAt: string;
}
export interface GroupQuotation {
  readonly id: string;
  readonly organisationId: string;
  readonly leadId: string;
  readonly status: "draft" | "sent" | "accepted" | "expired" | "cancelled";
  readonly travellerCount: number;
  readonly currency: "INR";
  readonly subtotalMinor: number | null;
  readonly taxMinor: number | null;
  readonly totalMinor: number | null;
  readonly validUntil: string;
  readonly priceVerification: "pending" | "verified";
}
export interface AgentPackageDraft {
  readonly id: string;
  readonly organisationId: string;
  readonly name: string;
  readonly durationDays: number;
  readonly destinationSlugs: readonly string[];
  readonly status:
    "draft" | "submitted" | "changes-requested" | "approved" | "rejected";
  readonly published: boolean;
}
