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
    description: "Pick a word and get a short, clear explanation.",
    href: "/glossary",
    id: "glossary",
    title: "Learn a term"
  },
  {
    description: "See how MPs voted and what the vote was about.",
    href: "/parliament",
    id: "parliament",
    title: "Read a vote"
  },
  {
    description: "Go to the original record and read it for yourself.",
    href: "/sources",
    id: "sources",
    title: "Open a record"
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
  const completionPercent = (completedCount / starterSteps.length) * 100;

  function resetProgress() {
    const emptyProgress = createEmptyProgress();
    setProgress(emptyProgress);
    writeProgress(emptyProgress);
  }

  if (compact) {
    return (
      <section className="rounded-lg border border-[#ded7ca] bg-white px-4 py-3 shadow-[0_8px_18px_rgba(7,31,58,0.05)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-xs font-semibold text-[#0756c7]">Starter path</p>
            <h2 className="mt-1 text-base font-semibold">
              {completedCount} of {starterSteps.length} explored
            </h2>
          </div>
          {completedCount > 0 ? (
            <button
              aria-label="Reset starter guide progress"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#ded7ca] text-[#0756c7] transition hover:border-[#0756c7]"
              onClick={resetProgress}
              type="button"
            >
              <RotateCcw aria-hidden="true" size={15} />
            </button>
          ) : null}
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#eef3ed]">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#76d08b,#8bd3ff,#ff767e)] transition-all"
            style={{ width: `${completionPercent}%` }}
          />
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-4">
          {starterSteps.map((step) => {
            const isComplete = progress[step.id];

            return (
              <Link
                className="flex min-h-10 items-center gap-2 rounded-md px-2 py-1.5 text-sm font-semibold transition hover:bg-[#e7f1ff] hover:text-[#0756c7]"
                href={step.href as Route}
                key={step.id}
              >
                {isComplete ? (
                  <CheckCircle2
                    aria-label="Explored"
                    className="shrink-0 text-[#0d6141]"
                    size={17}
                  />
                ) : (
                  <Circle aria-label="Not explored" className="shrink-0 text-[#8a94a6]" size={17} />
                )}
                <span>{step.title}</span>
              </Link>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-[#ded7ca] bg-white p-5 shadow-[0_10px_24px_rgba(7,31,58,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-semibold text-[#0756c7]">Starter path</p>
          <h2 className="mt-1 text-2xl font-semibold">
            {completedCount} of {starterSteps.length} explored
          </h2>
        </div>
        {completedCount > 0 ? (
          <button
            aria-label="Reset starter guide progress"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#ded7ca] text-[#0756c7] transition hover:border-[#0756c7]"
            onClick={resetProgress}
            type="button"
          >
            <RotateCcw aria-hidden="true" size={16} />
          </button>
        ) : null}
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#eef3ed]">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#76d08b,#8bd3ff,#ff767e)] transition-all"
          style={{ width: `${completionPercent}%` }}
        />
      </div>

      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
        Small steps, real understanding, your pace. Everything stays open, and progress is saved
        only in this browser.
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
                  aria-label="Explored"
                  className="mt-0.5 shrink-0 text-[#0d6141]"
                  size={19}
                />
              ) : (
                <Circle
                  aria-label="Not explored"
                  className="mt-0.5 shrink-0 text-[#8a94a6]"
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
