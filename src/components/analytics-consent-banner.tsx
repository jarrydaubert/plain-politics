"use client";

import { useEffect, useState } from "react";
import {
  getAnalyticsConsentPreference,
  OPEN_ANALYTICS_SETTINGS_EVENT,
  setAnalyticsConsentPreference
} from "@/lib/analytics-consent";

const ANALYTICS_ENABLED = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== "false";
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

export function AnalyticsConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!(ANALYTICS_ENABLED && GA_MEASUREMENT_ID)) {
      return;
    }

    setIsVisible(getAnalyticsConsentPreference() === null);

    function handleOpenSettings() {
      setIsVisible(true);
    }

    document.addEventListener(OPEN_ANALYTICS_SETTINGS_EVENT, handleOpenSettings);

    return () => {
      document.removeEventListener(OPEN_ANALYTICS_SETTINGS_EVENT, handleOpenSettings);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  function setConsent(analytics: boolean) {
    setAnalyticsConsentPreference(analytics);
    setIsVisible(false);
  }

  return (
    <aside
      aria-label="Analytics preferences"
      className="fixed inset-x-4 bottom-4 z-50 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_20px_60px_rgba(7,31,58,0.2)] sm:left-auto sm:max-w-md"
    >
      <h2 className="text-sm font-semibold">Analytics preferences</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
        Optional analytics help us understand broad site use. We do not send postcodes, raw searches
        or political views.
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          className="min-h-10 rounded-md border border-[var(--border)] px-4 text-sm font-semibold text-[var(--accent)] transition hover:border-[var(--accent)]"
          onClick={() => setConsent(false)}
          type="button"
        >
          Essential only
        </button>
        <button
          className="min-h-10 rounded-md bg-[var(--accent)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
          onClick={() => setConsent(true)}
          type="button"
        >
          Allow analytics
        </button>
      </div>
    </aside>
  );
}
