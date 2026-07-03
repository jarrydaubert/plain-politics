"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ANALYTICS_CONSENT_UPDATED_EVENT,
  getAnalyticsConsentPreference,
  isAnalyticsConsentPreferences
} from "@/lib/analytics-consent";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;
const ANALYTICS_ENABLED = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== "false";

type ConsentState = "granted" | "denied";
type GtagPrimitive = string | number | boolean;

type GtagConfig = {
  anonymize_ip?: boolean;
  cookie_domain?: string;
  page_path?: string;
  send_page_view?: boolean;
  transport_type?: "beacon";
  [key: string]: GtagPrimitive | undefined;
};

type GtagConsent = {
  ad_personalization?: ConsentState;
  ad_storage?: ConsentState;
  ad_user_data?: ConsentState;
  analytics_storage?: ConsentState;
  functionality_storage?: ConsentState;
  personalization_storage?: ConsentState;
  security_storage?: ConsentState;
};

type GtagFunction = {
  (command: "config", targetId: string, config?: GtagConfig): void;
  (command: "consent", subCommand: "default" | "update", consent: GtagConsent): void;
  (command: "js", date: Date): void;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFunction;
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hasConsent, setHasConsent] = useState(false);
  const [isScriptReady, setIsScriptReady] = useState(false);
  const sentPageViews = useRef(new Set<string>());

  const getCurrentPath = useCallback(() => {
    const search = searchParams?.toString();
    return search ? `${pathname}?${search}` : pathname;
  }, [pathname, searchParams]);

  const markAnalyticsReady = useCallback(() => {
    if (typeof window !== "undefined" && window.gtag) {
      setIsScriptReady(true);
    }
  }, []);

  const updateGoogleConsent = useCallback((analytics: boolean) => {
    if (!analytics) {
      clearGoogleAnalyticsCookies();
    }

    if (typeof window === "undefined" || !window.gtag) {
      return;
    }

    window.gtag("consent", "update", {
      ad_personalization: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      analytics_storage: analytics ? "granted" : "denied"
    });
  }, []);

  useEffect(() => {
    setHasConsent(getAnalyticsConsentPreference() === true);

    function handleConsentUpdate(event: Event) {
      const detail: unknown = (event as CustomEvent<unknown>).detail;
      setHasConsent(
        isAnalyticsConsentPreferences(detail)
          ? detail.analytics
          : getAnalyticsConsentPreference() === true
      );
    }

    document.addEventListener(ANALYTICS_CONSENT_UPDATED_EVENT, handleConsentUpdate);

    return () => {
      document.removeEventListener(ANALYTICS_CONSENT_UPDATED_EVENT, handleConsentUpdate);
    };
  }, []);

  useEffect(() => {
    if (!isScriptReady) {
      return;
    }

    updateGoogleConsent(hasConsent);
  }, [hasConsent, isScriptReady, updateGoogleConsent]);

  useEffect(() => {
    if (!(hasConsent && isScriptReady && GA_MEASUREMENT_ID && window.gtag)) {
      return;
    }

    const pagePath = getCurrentPath();

    if (sentPageViews.current.has(pagePath)) {
      return;
    }

    sentPageViews.current.add(pagePath);
    window.gtag("config", GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      page_path: pagePath,
      send_page_view: true,
      transport_type: "beacon"
    });
  }, [getCurrentPath, hasConsent, isScriptReady]);

  if (!(ANALYTICS_ENABLED && GA_MEASUREMENT_ID && hasConsent)) {
    return null;
  }

  return (
    <>
      <Script
        id="plain-politics-ga-script"
        onLoad={markAnalyticsReady}
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />
      <Script id="plain-politics-ga-init" onReady={markAnalyticsReady} strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'functionality_storage': 'denied',
            'personalization_storage': 'denied',
            'security_storage': 'granted'
          });
          gtag('config', '${GA_MEASUREMENT_ID}', {
            send_page_view: false,
            anonymize_ip: true,
            cookie_domain: 'plainpolitics.co.uk',
            transport_type: 'beacon'
          });
        `}
      </Script>
    </>
  );
}

function clearGoogleAnalyticsCookies() {
  if (typeof document === "undefined") {
    return;
  }

  const cookieNames = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0]?.trim())
    .filter((name): name is string => Boolean(name?.startsWith("_ga")));

  for (const name of cookieNames) {
    expireCookie(name);
  }
}

function expireCookie(name: string) {
  const expires = "Thu, 01 Jan 1970 00:00:00 GMT";
  const base = `${name}=; expires=${expires}; max-age=0; path=/; SameSite=Lax`;
  // biome-ignore lint/suspicious/noDocumentCookie: Clearing legacy GA cookies requires document.cookie.
  document.cookie = base;
  // Production GA cookies are set for the apex domain; preview domains are covered by the host-only clear above.
  // biome-ignore lint/suspicious/noDocumentCookie: Clearing legacy GA cookies requires document.cookie.
  document.cookie = `${base}; domain=plainpolitics.co.uk`;
  // biome-ignore lint/suspicious/noDocumentCookie: Clearing legacy GA cookies requires document.cookie.
  document.cookie = `${base}; domain=.plainpolitics.co.uk`;
}
