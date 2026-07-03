"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { DataHealthState, DataStatusReport } from "@/status/data-status";

type BadgeState =
  | {
      report: DataStatusReport;
      state: "ready";
    }
  | {
      state: "loading";
    }
  | {
      state: "error";
    };

export function DataStatusBadge() {
  const [badgeState, setBadgeState] = useState<BadgeState>({ state: "loading" });
  const statusState = badgeState.state === "ready" ? badgeState.report.overall : "degraded";
  const label =
    badgeState.state === "ready"
      ? formatDataStatusLabel(statusState)
      : badgeState.state === "error"
        ? "Degraded"
        : "Checking";
  const checkedTime =
    badgeState.state === "ready"
      ? `checked ${formatTime(badgeState.report.lastAttemptedCheckAt)}`
      : badgeState.state === "error"
        ? "check unavailable"
        : "checking";

  useEffect(() => {
    let cancelled = false;

    async function loadStatus() {
      try {
        const response = await fetch("/api/data-status", {
          cache: "no-store"
        });

        if (!response.ok) {
          throw new Error("Data status request failed.");
        }

        const report = (await response.json()) as DataStatusReport;

        if (!cancelled) {
          setBadgeState({ report, state: "ready" });
        }
      } catch {
        if (!cancelled) {
          setBadgeState({ state: "error" });
        }
      }
    }

    void loadStatus();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Link
      className={`inline-flex min-h-9 items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-semibold transition hover:bg-white ${statusClasses(statusState)}`}
      href="/status"
    >
      <span className="flex h-2.5 w-2.5 rounded-full bg-current" />
      <span>
        Data status: {label} · {checkedTime}
      </span>
    </Link>
  );
}

function statusClasses(state: DataHealthState) {
  if (state === "healthy") {
    return "border-[#9dd3aa] bg-[#e7f6e9] text-[#0d6141]";
  }

  if (state === "offline") {
    return "border-[#f0a0aa] bg-[#fff0f2] text-[#9f1230]";
  }

  return "border-[#e3c46f] bg-[#fff7d6] text-[#755000]";
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London"
  }).format(new Date(value));
}

function formatDataStatusLabel(status: DataHealthState) {
  return status[0].toUpperCase() + status.slice(1);
}
