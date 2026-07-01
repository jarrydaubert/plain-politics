import Link from "next/link";
import { policyAreas } from "@/data/demo-politics";

export default function PoliciesPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <Link className="text-sm font-medium text-[var(--accent)]" href="/">
        Back to dashboard
      </Link>
      <h1 className="mt-6 text-4xl font-semibold">Policies</h1>
      <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
        Policy areas should be built from reviewed source excerpts, not free-form copy. This starter
        page shows the intended coverage-state pattern.
      </p>
      <div className="mt-8 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-[var(--surface-soft)]">
            <tr>
              <th className="px-4 py-3 font-semibold">Policy area</th>
              <th className="px-4 py-3 font-semibold">Phase 0 status</th>
            </tr>
          </thead>
          <tbody>
            {policyAreas.map((area) => (
              <tr className="border-t border-[var(--border)]" key={area.name}>
                <td className="px-4 py-3 font-medium">{area.name}</td>
                <td className="px-4 py-3 text-[var(--muted)]">{area.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
