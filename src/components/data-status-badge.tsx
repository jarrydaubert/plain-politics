"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatUkTime } from "@/lib/format";
import {
  type DataHealthState,
  type DataStatusReport,
  formatDataStatusLabel
} from "@/status/data-status";

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
      ? `checked ${formatUkTime(badgeState.report.lastAttemptedCheckAt)}`
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
      className={`inline-flex min-h-9 items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-semibold transition hover:brightness-95 ${statusClasses(statusState)}`}
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
    return "border-[var(--ok-border)] bg-[var(--ok-bg)] text-[var(--ok-ink)]";
  }

  if (state === "offline") {
    return "border-[var(--bad-border)] bg-[var(--bad-bg)] text-[var(--bad-ink)]";
  }

  return "border-[var(--warn-border)] bg-[var(--warn-bg)] text-[var(--warn-ink)]";
}
