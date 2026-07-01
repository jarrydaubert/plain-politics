import Link from "next/link";
import { PollingChart } from "@/components/polling-chart";
import { pollingSeries } from "@/data/demo-politics";

export default function PollsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <Link className="text-sm font-medium text-[var(--accent)]" href="/">
        Back to dashboard
      </Link>
      <h1 className="mt-6 text-4xl font-semibold">Polling and popularity</h1>
      <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
        Polling will stay out of the Phase 0 critical path unless source access and metadata are
        straightforward. This page establishes the chart and table pattern for future ingestion.
      </p>
      <section className="mt-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="h-80">
          <PollingChart data={pollingSeries} />
        </div>
      </section>
      <section className="mt-6 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">Demo polling trend table</caption>
          <thead className="bg-[var(--surface-soft)]">
            <tr>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Labour</th>
              <th className="px-4 py-3 font-semibold">Conservative</th>
              <th className="px-4 py-3 font-semibold">Reform</th>
              <th className="px-4 py-3 font-semibold">Lib Dem</th>
            </tr>
          </thead>
          <tbody>
            {pollingSeries.map((row) => (
              <tr className="border-t border-[var(--border)]" key={row.date}>
                <td className="px-4 py-3 font-medium">{row.date}</td>
                <td className="px-4 py-3">{row.labour}</td>
                <td className="px-4 py-3">{row.conservative}</td>
                <td className="px-4 py-3">{row.reform}</td>
                <td className="px-4 py-3">{row.libDem}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
