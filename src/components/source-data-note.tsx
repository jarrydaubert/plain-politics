import { formatUkDateTime } from "@/lib/format";
import type { SourceRecordStatus } from "@/sources/uk-parliament";

export function SourceDataNote({ status }: Readonly<{ status: SourceRecordStatus }>) {
  if (status.state === "fresh") {
    return null;
  }

  return (
    <p className="mt-3 rounded-md border border-[var(--warn-border)] bg-[var(--warn-bg)] px-3 py-2 text-sm font-medium leading-6 text-[var(--warn-ink)]">
      Data note: showing an earlier successful copy from{" "}
      {formatUkDateTime(status.lastSuccessfulCheckAt)} after a failed check at{" "}
      {formatUkDateTime(status.lastAttemptedCheckAt)}. Durable last-good storage is not live yet.
    </p>
  );
}
