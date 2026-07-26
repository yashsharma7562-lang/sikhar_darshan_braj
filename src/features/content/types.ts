export type ContentPermission =
  "content.temples.submit" | "content.moderate" | "content.publish";
export type SubmissionStatus =
  | "draft"
  | "submitted"
  | "in-review"
  | "changes-requested"
  | "approved"
  | "rejected"
  | "published";
export interface TempleInformationSubmission {
  readonly id: string;
  readonly organisationId: string;
  readonly templeSlug: string;
  readonly kind: "schedule" | "notice" | "facility" | "contact" | "source";
  readonly content: string;
  readonly sourceUrl: string;
  readonly effectiveFrom: string | null;
  readonly effectiveUntil: string | null;
  readonly status: SubmissionStatus;
  readonly submittedAt: string;
}
export interface ModerationDecision {
  readonly submissionId: string;
  readonly reviewerId: string;
  readonly action: "request-changes" | "approve" | "reject" | "publish";
  readonly reason: string;
  readonly decidedAt: string;
}
