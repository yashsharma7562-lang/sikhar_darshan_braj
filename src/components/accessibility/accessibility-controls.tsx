"use client";
import {
  Accessibility,
  Contrast,
  MousePointer2,
  PersonStanding,
} from "lucide-react";
import { useAccessibilityPreferences } from "./accessibility-provider";
export function AccessibilityControls() {
  const { preferences, update } = useAccessibilityPreferences();
  const items = [
    {
      key: "largeText",
      label: "Larger text",
      description: "Increase base text size and line spacing.",
      Icon: Accessibility,
    },
    {
      key: "reducedMotion",
      label: "Reduced motion",
      description: "Minimise animation and smooth scrolling.",
      Icon: PersonStanding,
    },
    {
      key: "highContrast",
      label: "Higher contrast",
      description: "Strengthen borders and muted text contrast.",
      Icon: Contrast,
    },
    {
      key: "largerControls",
      label: "Larger controls",
      description: "Increase minimum button and link target size.",
      Icon: MousePointer2,
    },
  ] as const;
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map(({ key, label, description, Icon }) => (
        <button
          key={key}
          type="button"
          aria-pressed={preferences[key]}
          onClick={() => update({ ...preferences, [key]: !preferences[key] })}
          className={
            preferences[key]
              ? "border-peacock rounded-2xl border-2 bg-white p-5 text-left"
              : "rounded-2xl border bg-white p-5 text-left"
          }
        >
          <Icon className="text-primary-deep" aria-hidden="true" />
          <span className="mt-3 block text-lg font-black">{label}</span>
          <span className="text-muted mt-1 block text-sm">{description}</span>
          <span className="mt-3 block text-sm font-bold">
            {preferences[key] ? "On" : "Off"}
          </span>
        </button>
      ))}
    </div>
  );
}
