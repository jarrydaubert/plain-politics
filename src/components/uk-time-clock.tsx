"use client";

import { Clock3 } from "lucide-react";
import { useEffect, useState } from "react";

const UK_TIME_ZONE = "Europe/London";
const NPL_TIME_URL = "https://www.npl.co.uk/products-services/time-frequency/msf-radio-time-signal";

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  hour12: false,
  hourCycle: "h23",
  minute: "2-digit",
  second: "2-digit",
  timeZone: UK_TIME_ZONE,
  timeZoneName: "short"
});

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  timeZone: UK_TIME_ZONE,
  weekday: "short"
});

export function UkTimeClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();

    const timerId = window.setInterval(tick, 1000);

    return () => window.clearInterval(timerId);
  }, []);

  const display = now
    ? getUkClockDisplay(now)
    : {
        date: "Loading",
        time: "--:--:--",
        zone: "UK"
      };

  return (
    <a
      aria-label={
        now
          ? `UK date and time ${display.date}, ${display.time} ${display.zone}, official reference NPL`
          : "UK date and time loading, official reference NPL"
      }
      className="inline-flex min-h-10 items-center gap-3 rounded-md border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2 text-sm transition hover:border-[var(--accent)]"
      href={NPL_TIME_URL}
      rel="noreferrer"
      target="_blank"
      title="UK civil time reference: NPL MSF radio time signal"
    >
      <Clock3 aria-hidden="true" className="text-[var(--accent)]" size={17} />
      <span className="grid leading-none">
        <span className="text-xs font-semibold uppercase text-[var(--muted)]">{display.date}</span>
        <span className="mt-1 font-mono text-sm font-semibold tabular-nums">
          {display.time} {display.zone}
        </span>
      </span>
    </a>
  );
}

function getUkClockDisplay(date: Date) {
  const timeParts = timeFormatter.formatToParts(date);
  const hour = timeParts.find((part) => part.type === "hour")?.value ?? "00";
  const minute = timeParts.find((part) => part.type === "minute")?.value ?? "00";
  const second = timeParts.find((part) => part.type === "second")?.value ?? "00";
  const zone = timeParts.find((part) => part.type === "timeZoneName")?.value ?? "UK";

  return {
    date: dateFormatter.format(date),
    time: `${hour}:${minute}:${second}`,
    zone
  };
}
