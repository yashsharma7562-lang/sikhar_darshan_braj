"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  defaultAccessibilityPreferences,
  parseAccessibilityPreferences,
} from "@/features/accessibility/preferences";
import type { AccessibilityPreferences } from "@/features/accessibility/types";
const storageKey = "shikhar-accessibility-preferences";
const Context = createContext<{
  preferences: AccessibilityPreferences;
  update: (next: AccessibilityPreferences) => void;
}>({ preferences: defaultAccessibilityPreferences, update: () => undefined });
export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState(
    defaultAccessibilityPreferences,
  );
  useEffect(() => {
    const hydration = window.setTimeout(
      () =>
        setPreferences(
          parseAccessibilityPreferences(localStorage.getItem(storageKey)),
        ),
      0,
    );
    return () => window.clearTimeout(hydration);
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("large-text", preferences.largeText);
    root.classList.toggle("reduce-motion", preferences.reducedMotion);
    root.classList.toggle("high-contrast", preferences.highContrast);
    root.classList.toggle("larger-controls", preferences.largerControls);
  }, [preferences]);
  function update(next: AccessibilityPreferences) {
    setPreferences(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  }
  return (
    <Context.Provider value={{ preferences, update }}>
      {children}
    </Context.Provider>
  );
}
export function useAccessibilityPreferences() {
  return useContext(Context);
}
