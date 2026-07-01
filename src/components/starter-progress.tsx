"use client";

import { CheckCircle2, Circle, RotateCcw } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const STARTER_PROGRESS_KEY = "plain-politics-starter-progress-v1";

const starterSteps = [
  {
    description: "Use a postcode to find your Westminster seat and current MP.",
    href: "/my-area",
    id: "my-area",
    title: "Find your MP"
  },
  {
    description: "Learn the words that make Parliament easier to follow.",
    href: "/glossary",
    id: "glossary",
    title: "Decode the terms"
  },
  {
    description: "See recent votes, seats and upcoming business.",
    href: "/parliament",
    id: "parliament",
    title: "See Parliament"
  },
  {
    description: "Check where the public records come from.",
    href: "/sources",
    id: "sources",
    title: "Check a source"
  }
] as const;

type StarterStepId = (typeof starterSteps)[number]["id"];
type ProgressState = Record<StarterStepId, boolean>;

function createEmptyProgress(): ProgressState {
  const progress = {} as ProgressState;

  for (const step of starterSteps) {
    progress[step.id] = false;
  }

  return progress;
}

function readProgress(): ProgressState {
  if (typeof window === "undefined") {
    return createEmptyProgress();
  }

  try {
    const stored = window.localStorage.getItem(STARTER_PROGRESS_KEY);

    if (!stored) {
      return createEmptyProgress();
    }

    const parsed = JSON.parse(stored) as Partial<Record<StarterStepId, unknown>>;

    const progress = {} as ProgressState;

    for (const step of starterSteps) {
      progress[step.id] = parsed[step.id] === true;
    }

    return progress;
  } catch {
    return createEmptyProgress();
  }
}

function writeProgress(progress: ProgressState) {
  try {
    window.localStorage.setItem(STARTER_PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // Progress is a nicety. If storage is unavailable, the page should still work.
  }
}

export function StarterProgress({
  compact = false,
  currentStep
}: Readonly<{
  compact?: boolean;
  currentStep?: StarterStepId;
}>) {
  const [progress, setProgress] = useState<ProgressState>(() => createEmptyProgress());

  useEffect(() => {
    const storedProgress = readProgress();
    const nextProgress = currentStep ? { ...storedProgress, [currentStep]: true } : storedProgress;

    setProgress(nextProgress);
    writeProgress(nextProgress);
  }, [currentStep]);

  const completedCount = useMemo(
    () => starterSteps.filter((step) => progress[step.id]).length,
    [progress]
  );

  function resetProgress() {
    const emptyProgress = createEmptyProgress();
    setProgress(emptyProgress);
    writeProgress(emptyProgress);
  }

  return (
    <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase text-[var(--muted)]">Starter path</p>
          <h2 className={compact ? "mt-1 text-lg font-semibold" : "mt-1 text-2xl font-semibold"}>
            {completedCount} of {starterSteps.length} complete
          </h2>
        </div>
        {completedCount > 0 ? (
          <button
            aria-label="Reset starter path progress"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[var(--border)] text-[var(--accent)] transition hover:border-[var(--accent)]"
            onClick={resetProgress}
            type="button"
          >
            <RotateCcw aria-hidden="true" size={16} />
          </button>
        ) : null}
      </div>

      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
        A tiny checklist for learning your way around UK politics. Saved only in this browser.
      </p>

      <div className="mt-4 grid gap-3">
        {starterSteps.map((step) => {
          const isComplete = progress[step.id];

          return (
            <Link
              className="flex items-start gap-3 border-t border-[var(--border)] pt-3 transition hover:text-[var(--accent)]"
              href={step.href as Route}
              key={step.id}
            >
              {isComplete ? (
                <CheckCircle2
                  aria-label="Complete"
                  className="mt-0.5 shrink-0 text-[var(--accent)]"
                  size={19}
                />
              ) : (
                <Circle
                  aria-label="Not complete"
                  className="mt-0.5 shrink-0 text-[var(--muted)]"
                  size={19}
                />
              )}
              <span>
                <span className="block text-sm font-semibold">{step.title}</span>
                {compact ? null : (
                  <span className="mt-1 block text-sm leading-6 text-[var(--muted)]">
                    {step.description}
                  </span>
                )}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
