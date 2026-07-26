import type { AccessibilityPreferences } from "./types";
export const defaultAccessibilityPreferences: AccessibilityPreferences = {
  largeText: false,
  reducedMotion: false,
  highContrast: false,
  largerControls: false,
};
export function parseAccessibilityPreferences(
  value: string | null,
): AccessibilityPreferences {
  if (!value) return defaultAccessibilityPreferences;
  try {
    const parsed = JSON.parse(value) as Partial<
      Record<keyof AccessibilityPreferences, unknown>
    >;
    return {
      largeText: parsed.largeText === true,
      reducedMotion: parsed.reducedMotion === true,
      highContrast: parsed.highContrast === true,
      largerControls: parsed.largerControls === true,
    };
  } catch {
    return defaultAccessibilityPreferences;
  }
}
