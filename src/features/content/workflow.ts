import type { SubmissionStatus } from "./types";
const allowed: Readonly<Record<SubmissionStatus, readonly SubmissionStatus[]>> =
  {
    draft: ["submitted"],
    submitted: ["in-review", "rejected"],
    "in-review": ["changes-requested", "approved", "rejected"],
    "changes-requested": ["submitted"],
    approved: ["published"],
    rejected: [],
    published: [],
  };
export function transitionSubmission(
  from: SubmissionStatus,
  to: SubmissionStatus,
) {
  if (!allowed[from].includes(to))
    throw new Error("Invalid content workflow transition.");
  return to;
}
