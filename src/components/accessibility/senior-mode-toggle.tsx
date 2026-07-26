"use client";

import { Accessibility } from "lucide-react";
import { useAccessibilityPreferences } from "./accessibility-provider";

export function SeniorModeToggle() {
  const { preferences, update } = useAccessibilityPreferences();
  const enabled = preferences.largeText && preferences.largerControls;
  return (
    <button
      type="button"
      aria-pressed={enabled}
      onClick={() =>
        update({
          ...preferences,
          largeText: !enabled,
          largerControls: !enabled,
          reducedMotion: enabled ? preferences.reducedMotion : true,
        })
      }
      className="border-peacock/20 text-peacock-deep hover:border-peacock inline-flex min-h-12 items-center gap-3 rounded-xl border bg-white px-5 font-bold shadow-sm"
    >
      <Accessibility size={21} aria-hidden="true" />
      {enabled ? "Senior mode on" : "Enable senior mode"}
    </button>
  );
}
