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
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();

    const timerId = window.setInterval(tick, 30_000);

    return () => window.clearInterval(timerId);
  }, []);

  const display = getUkClockDisplay(now);

  return (
    <a
      aria-label={`UK date and time ${display.date}, ${display.time} ${display.zone}, official reference NPL`}
      className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#d6e2f0] bg-[#f3fbff] px-3 py-1.5 transition hover:border-[var(--accent-sky)]"
      href={NPL_TIME_URL}
      rel="noreferrer"
      target="_blank"
      title="UK civil time reference: NPL MSF radio time signal"
    >
      <Clock3 aria-hidden="true" className="text-[var(--accent)]" size={15} />
      <span className="whitespace-nowrap text-xs font-semibold text-[var(--accent-strong)]">
        {display.date}
        <span className="hidden sm:inline">
          , {display.time} {display.zone}
        </span>
      </span>
    </a>
  );
}

function getUkClockDisplay(date: Date) {
  const timeParts = timeFormatter.formatToParts(date);
  const hour = timeParts.find((part) => part.type === "hour")?.value ?? "00";
  const minute = timeParts.find((part) => part.type === "minute")?.value ?? "00";
  const zone = timeParts.find((part) => part.type === "timeZoneName")?.value ?? "UK";

  return {
    date: dateFormatter.format(date),
    time: `${hour}:${minute}`,
    zone
  };
}
