import Link from "next/link";

const principles = [
  "No source means no factual claim.",
  "Plain-English summaries are presentation, not the source of truth.",
  "Every displayed fact should trace back to source documents, snapshots and excerpts.",
  "Polling movement must show fieldwork dates and uncertainty caveats.",
  "Coverage gaps are valid product states."
];

export default function MethodologyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <Link className="text-sm font-medium text-[var(--accent)]" href="/">
        Back to dashboard
      </Link>
      <h1 className="mt-6 text-4xl font-semibold">Methodology</h1>
      <p className="mt-4 leading-7 text-[var(--muted)]">
        UK Policy Explainer is built around public-source traceability. The initial technical
        scaffold stores source documents, immutable snapshots, source excerpts and displayed facts
        as separate concepts.
      </p>
      <div className="mt-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
        <h2 className="text-xl font-semibold">Source chain</h2>
        <p className="mt-3 rounded-md bg-[var(--surface-soft)] p-4 font-mono text-sm">
          source_document -&gt; source_snapshot -&gt; source_excerpt -&gt; display_fact
        </p>
      </div>
      <ul className="mt-6 grid gap-3">
        {principles.map((principle) => (
          <li
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
            key={principle}
          >
            {principle}
          </li>
        ))}
      </ul>
    </main>
  );
}
