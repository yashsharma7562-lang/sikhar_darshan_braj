import { AlertCircle, BadgeCheck, Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  templeStatusLabels,
  verificationLabels,
} from "@/features/temples/status";
import type {
  TempleStatus,
  VerificationStatus,
} from "@/features/temples/types";

export function TempleStatusBadge({ status }: { status: TempleStatus }) {
  const isUnavailable =
    status === "schedule-unverified" || status === "update-pending";
  const Icon = isUnavailable ? AlertCircle : Clock3;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-extrabold",
        isUnavailable
          ? "bg-warning/10 text-[#8A4D00]"
          : "bg-peacock/10 text-peacock-deep",
      )}
    >
      <Icon size={14} aria-hidden="true" />
      {templeStatusLabels[status]}
    </span>
  );
}
export function VerificationBadge({ status }: { status: VerificationStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-bold",
        status === "verified" ? "text-success" : "text-muted",
      )}
    >
      <BadgeCheck size={15} aria-hidden="true" />
      {verificationLabels[status]}
    </span>
  );
}
