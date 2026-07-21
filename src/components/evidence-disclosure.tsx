import { ExternalLink } from "lucide-react";
import { formatUkDateTime } from "@/lib/format";

export type EvidenceDisclosureTone = "ink" | "paper";

export type EvidenceDisclosureProps = {
  caveat: string;
  checkedAt: string | null;
  checkedAtLabel?: string;
  evidenceQuote?: string;
  label?: string;
  locator?: string;
  rawRecordContext?: string;
  snapshotHash?: string;
  sourceName: string;
  sourceTier?: string;
  sourceUrl: string;
  tone?: EvidenceDisclosureTone;
};

const toneStyles = {
  ink: {
    body: "text-[var(--muted-on-ink)]",
    link: "text-[var(--focus-on-ink)] hover:text-[var(--paper-on-ink)]",
    panel: "border-[var(--ink-border)]",
    strong: "text-[var(--paper-on-ink)]",
    summary:
      "text-[var(--muted-on-ink)] hover:text-[var(--paper-on-ink)] focus-visible:outline-[var(--focus-on-ink)]"
  },
  paper: {
    body: "text-[var(--muted)]",
    link: "text-[var(--accent)] hover:text-[var(--accent-strong)]",
    panel: "border-[var(--border)]",
    strong: "text-[var(--foreground)]",
    summary:
      "text-[var(--muted)] hover:text-[var(--foreground)] focus-visible:outline-[var(--accent)]"
  }
} as const;

export function EvidenceDisclosure({
  caveat,
  checkedAt,
  checkedAtLabel = "Checked through the app cache",
  evidenceQuote,
  label = "Where this comes from",
  locator,
  rawRecordContext,
  snapshotHash,
  sourceName,
  sourceTier,
  sourceUrl,
  tone = "paper"
}: Readonly<EvidenceDisclosureProps>) {
  const styles = toneStyles[tone];

  return (
    <details className="group mt-3">
      <summary
        className={`inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded-sm font-mono text-xs font-semibold leading-5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 [&::-webkit-details-marker]:hidden ${styles.summary}`}
      >
        <span aria-hidden="true" className="transition group-open:rotate-90">
          &#9656;
        </span>
        {label}
      </summary>
      <div className={`mt-2 rounded-md border px-3 py-3 text-xs leading-5 ${styles.panel}`}>
        <dl className="space-y-2">
          <div>
            <dt className={`font-semibold ${styles.strong}`}>Source</dt>
            <dd className={`mt-0.5 ${styles.body}`}>
              <a
                className={`inline-flex min-w-0 items-center gap-1 break-words font-medium underline underline-offset-2 [overflow-wrap:anywhere] ${styles.link}`}
                href={sourceUrl}
                rel="noreferrer"
                target="_blank"
              >
                {sourceName}
                <ExternalLink aria-hidden="true" size={12} />
              </a>
            </dd>
          </div>
          <div>
            <dt className={`font-semibold ${styles.strong}`}>Checked</dt>
            <dd className={`mt-0.5 ${styles.body}`}>
              {checkedAt
                ? `${checkedAtLabel} ${formatUkDateTime(checkedAt)}.`
                : "A successful check time is not available for this record."}
            </dd>
          </div>
          {sourceTier ? (
            <div>
              <dt className={`font-semibold ${styles.strong}`}>Source tier</dt>
              <dd className={`mt-0.5 ${styles.body}`}>{sourceTier}</dd>
            </div>
          ) : null}
          {evidenceQuote ? (
            <div>
              <dt className={`font-semibold ${styles.strong}`}>Reviewed evidence</dt>
              <dd
                className={`mt-0.5 max-w-prose break-words text-sm leading-6 [overflow-wrap:anywhere] ${styles.body}`}
              >
                <blockquote>“{evidenceQuote}”</blockquote>
                {locator ? <p className="mt-1">Locator: {locator}</p> : null}
              </dd>
            </div>
          ) : null}
          {snapshotHash ? (
            <div>
              <dt className={`font-semibold ${styles.strong}`}>Snapshot SHA-256</dt>
              <dd className={`mt-0.5 break-all font-mono ${styles.body}`}>{snapshotHash}</dd>
            </div>
          ) : null}
          <div>
            <dt className={`font-semibold ${styles.strong}`}>What this can and cannot prove</dt>
            <dd className={`mt-0.5 max-w-prose text-sm leading-6 ${styles.body}`}>{caveat}</dd>
          </div>
          {rawRecordContext ? (
            <div>
              <dt className={`font-semibold ${styles.strong}`}>Raw record</dt>
              <dd className={`mt-0.5 ${styles.body}`}>{rawRecordContext}</dd>
            </div>
          ) : null}
        </dl>
      </div>
    </details>
  );
}
