import Link from "next/link";
import {
  type DataHealthState,
  formatDataStatusLabel,
  getDataStatusReport
} from "@/status/data-status";

export async function DataStatusBadge() {
  const report = await getDataStatusReport();
  const label = formatDataStatusLabel(report.overall);
  const checkedTime = formatTime(report.lastAttemptedCheckAt);

  return (
    <Link
      className={`inline-flex min-h-9 items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-semibold transition hover:bg-white ${statusClasses(report.overall)}`}
      href="/status"
    >
      <span className="flex h-2.5 w-2.5 rounded-full bg-current" />
      <span>
        Data status: {label} · checked {checkedTime}
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
