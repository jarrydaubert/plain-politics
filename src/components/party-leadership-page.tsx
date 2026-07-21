import { EvidenceDisclosure } from "@/components/evidence-disclosure";
import { PageHeader } from "@/components/page-header";
import { formatUkDate } from "@/lib/format";
import type { LeadershipEvidence, PartyLeadershipPageData } from "@/political-data/page-data";

export function PartyLeadershipPage({ data }: Readonly<{ data: PartyLeadershipPageData }>) {
  return (
    <main className="mx-auto min-w-0 max-w-5xl px-6 py-10">
      <PageHeader
        backHref="/parties"
        backLabel="Parties"
        className="max-w-3xl"
        eyebrow="Canonical leadership proof"
        lede={`Verified senior roles with reviewed primary-source evidence, derived for ${formatUkDate(data.asOf)}. This page contains no biographies, ideology, performance claims or speculation.`}
        title={`${data.party.name} leadership`}
      />

      <p className="mt-6 max-w-3xl text-sm leading-6 text-[var(--muted)]">
        Party, parliamentary and government roles are kept separate. A missing section means this
        limited proof dataset has no reviewed assignment for that category; it does not imply that
        no such role exists.
      </p>

      <div className="mt-10 space-y-10">
        {data.sections.map((section) => (
          <section aria-labelledby={`leadership-${section.category}`} key={section.category}>
            <div className="border-b border-[var(--border)] pb-3">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                {section.category}
              </p>
              <h2
                className="mt-1 font-serif text-2xl font-semibold"
                id={`leadership-${section.category}`}
              >
                {section.heading}
              </h2>
            </div>

            {section.roles.length > 0 ? (
              <div className="mt-5 space-y-5">
                {section.roles.map((role) => (
                  <article
                    className="min-w-0 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)] sm:p-6"
                    key={role.id}
                  >
                    <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <h3 className="min-w-0 break-words font-serif text-xl font-semibold [overflow-wrap:anywhere]">
                        {role.title}
                      </h3>
                      <span className="w-fit shrink-0 rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1 font-mono text-xs text-[var(--muted)]">
                        {role.scopeLabel}
                      </span>
                    </div>

                    {role.description ? (
                      <div className="mt-4 border-l-2 border-[var(--record-blue)] pl-4">
                        <p className="leading-7 text-[var(--muted)]">{role.description}</p>
                        {role.descriptionEvidence ? (
                          <LeadershipEvidenceDisclosure
                            evidence={role.descriptionEvidence}
                            label="Evidence for this role explanation"
                          />
                        ) : null}
                      </div>
                    ) : null}

                    <ul className="mt-5 space-y-5">
                      {role.holders.map((holder) => (
                        <li
                          className="min-w-0 border-t border-[var(--border)] pt-5 first:border-t-0 first:pt-0"
                          key={holder.id}
                        >
                          <h4 className="break-words text-lg font-semibold [overflow-wrap:anywhere]">
                            {holder.personName}
                          </h4>
                          <p className="mt-1 text-sm text-[var(--muted)]">
                            {holder.effectiveDateBasis === "official_start"
                              ? `Effective from ${formatUkDate(holder.effectiveFrom)}`
                              : `Verified in role from ${formatUkDate(holder.effectiveFrom)}`}
                          </p>
                          {holder.evidence.map((evidence) => (
                            <LeadershipEvidenceDisclosure
                              evidence={evidence}
                              key={evidence.id}
                              label={`Evidence for ${holder.personName} as ${role.title}`}
                            />
                          ))}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            ) : (
              <div
                className="mt-5 rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface-soft)] p-5"
                data-coverage-gap={section.category}
              >
                <h3 className="font-semibold">No verified record in this proof dataset</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                  No reviewed senior assignment is available here for this category as at the
                  dataset date. The gap is shown rather than filled with an inference.
                </p>
              </div>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}

function LeadershipEvidenceDisclosure({
  evidence,
  label
}: Readonly<{ evidence: LeadershipEvidence; label: string }>) {
  return (
    <EvidenceDisclosure
      caveat={evidence.whatItSupports}
      checkedAt={evidence.checkedAt}
      checkedAtLabel="Source snapshot captured"
      evidenceQuote={evidence.exactQuote}
      label={label}
      locator={evidence.locator}
      snapshotHash={evidence.snapshotHash}
      sourceName={evidence.sourceName}
      sourceTier={evidence.sourceTier}
      sourceUrl={evidence.sourceUrl}
    />
  );
}
