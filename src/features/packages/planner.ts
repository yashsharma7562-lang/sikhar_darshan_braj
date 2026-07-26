import { destinations } from "@/features/temples/data/catalogue";
import type { DraftItinerary, EffortTag, YatraPreferences } from "./types";

export function createDraftItinerary(
  preferences: YatraPreferences,
): DraftItinerary {
  if (
    !Number.isInteger(preferences.days) ||
    preferences.days < 1 ||
    preferences.days > 30
  )
    throw new Error("Days must be between 1 and 30.");
  const known = new Set(destinations.map((destination) => destination.slug));
  if (preferences.destinationSlugs.some((slug) => !known.has(slug)))
    throw new Error("Every destination must exist in the catalogue.");
  if (preferences.destinationSlugs.length === 0)
    throw new Error("Select at least one destination.");
  const buckets = Array.from(
    { length: preferences.days },
    () => [] as string[],
  );
  preferences.destinationSlugs.forEach((slug, index) =>
    buckets[index % preferences.days]?.push(slug),
  );
  const effortTags = calculateEffortTags(preferences);
  const warnings = [
    "Temple timings, closures and crowd conditions are not assigned until verified data is available.",
    "Stay, transport and package availability are not checked in this planning draft.",
    "No cost estimate is shown without verified inventory and rate cards.",
  ];
  if (preferences.wheelchairRequired)
    warnings.push(
      "Wheelchair accessibility must be confirmed for every stop and service.",
    );
  return {
    status: "planning-draft",
    days: buckets.map((destinationSlugs, index) => ({
      day: index + 1,
      destinationSlugs,
      planningNote: destinationSlugs.length
        ? preferences.pace === "slow"
          ? "Keep this day lightly paced with generous rest breaks."
          : "Sequence stops only after verified timings and route duration are available."
        : "Reserved as a rest or contingency day.",
      unresolvedFacts: [
        "Temple schedules",
        "Travel duration",
        "Meal and rest locations",
        "Accessibility confirmation",
      ],
    })),
    effortTags,
    warnings,
    estimatedCostMinor: null,
    generatedFrom: "catalogue-only",
  };
}
export function calculateEffortTags(
  preferences: YatraPreferences,
): readonly EffortTag[] {
  const tags = new Set<EffortTag>();
  tags.add(
    preferences.walkingTolerance === "low" || preferences.pace === "slow"
      ? "easy"
      : "moderate",
  );
  if (preferences.seniorCitizens > 0 && preferences.pace === "slow")
    tags.add("senior-friendly");
  if (preferences.wheelchairRequired) tags.add("wheelchair-limited");
  if (preferences.destinationSlugs.length > preferences.days * 2)
    tags.add("long-travel-hours");
  return [...tags];
}
