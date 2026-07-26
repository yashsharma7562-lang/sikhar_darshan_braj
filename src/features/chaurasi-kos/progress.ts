import type { JourneyRecord, JourneyStatus } from "./types";
const allowed: Readonly<Record<JourneyStatus, readonly JourneyStatus[]>> = {
  "not-started": ["in-progress", "abandoned"],
  "in-progress": ["paused", "completed", "abandoned"],
  paused: ["in-progress", "abandoned"],
  completed: [],
  abandoned: [],
};
export function transitionJourney(
  record: JourneyRecord,
  next: JourneyStatus,
  at: string,
): JourneyRecord {
  if (!allowed[record.status].includes(next))
    throw new Error("Invalid journey status transition.");
  return {
    ...record,
    status: next,
    startedAt: record.startedAt ?? (next === "in-progress" ? at : null),
    updatedAt: at,
    completedAt: next === "completed" ? at : null,
  };
}
export function completeStage(
  record: JourneyRecord,
  stageId: string,
  verifiedStageIds: ReadonlySet<string>,
  at: string,
): JourneyRecord {
  if (record.status !== "in-progress")
    throw new Error("Journey must be in progress.");
  if (!verifiedStageIds.has(stageId))
    throw new Error("Only verified stages can be recorded.");
  return {
    ...record,
    completedStageIds: [...new Set([...record.completedStageIds, stageId])],
    activeStageId:
      record.activeStageId === stageId ? null : record.activeStageId,
    updatedAt: at,
  };
}
