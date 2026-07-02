"use client";

import { OPEN_ANALYTICS_SETTINGS_EVENT } from "@/lib/analytics-consent";

const ANALYTICS_ENABLED = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== "false";
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

export function AnalyticsSettingsButton() {
  if (!(ANALYTICS_ENABLED && GA_MEASUREMENT_ID)) {
    return null;
  }

  return (
    <button
      className="text-left text-[var(--accent)] hover:text-[var(--accent-strong)]"
      onClick={() => document.dispatchEvent(new Event(OPEN_ANALYTICS_SETTINGS_EVENT))}
      type="button"
    >
      Analytics settings
    </button>
  );
}
