const ANALYTICS_CONSENT_KEY = "plain-politics-analytics-consent";
export const ANALYTICS_CONSENT_UPDATED_EVENT = "plain-politics:analytics-consent-updated";
export const OPEN_ANALYTICS_SETTINGS_EVENT = "plain-politics:open-analytics-settings";

export type AnalyticsConsentPreferences = {
  analytics: boolean;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isAnalyticsConsentPreferences(
  value: unknown
): value is AnalyticsConsentPreferences {
  return isRecord(value) && typeof value.analytics === "boolean";
}

export function getAnalyticsConsentPreference() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    return isAnalyticsConsentPreferences(parsed) ? parsed.analytics : null;
  } catch {
    window.localStorage.removeItem(ANALYTICS_CONSENT_KEY);
    return null;
  }
}

export function setAnalyticsConsentPreference(analytics: boolean) {
  if (typeof window === "undefined") {
    return;
  }

  const preferences: AnalyticsConsentPreferences = { analytics };
  window.localStorage.setItem(ANALYTICS_CONSENT_KEY, JSON.stringify(preferences));
  document.dispatchEvent(
    new CustomEvent<AnalyticsConsentPreferences>(ANALYTICS_CONSENT_UPDATED_EVENT, {
      detail: preferences
    })
  );
}
