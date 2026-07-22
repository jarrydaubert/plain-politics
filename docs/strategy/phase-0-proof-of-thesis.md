# Phase 0 Proof Of Thesis

Last updated: 2026-07-04

Status: Historical proof-of-thesis framing; not a current delivery plan. See `docs/project/backlog.md` for unfinished outcomes and order.

## Purpose

Phase 0 exists to prove the core trust experience before attempting the full MVP. v1.0.0 is the first barebones public release inside Phase 0, and policy-area comparison follows after that on a feature branch. It should answer one question:

Can Plain Politics turn a small set of public political sources into a useful, neutral, plain-English politics starter that beginners can use and trust?

## Scope

Keep Phase 0 deliberately small.

Recommended scope:

1. One postcode-led `my area` journey.
2. Beginner cards for MP, constituency, party, and one recent public record.
3. Glossary, explainers, sources, About, Privacy, and data-status pages.
4. Two to three authoritative source families.
5. Plain-English explainer pages over only records that are actually supported.
6. One source panel or source detail pattern.
7. One deployed public preview.

After v1.0.0, add the first policy-area feature branch:

1. One policy area.
2. Four to five parties.
3. Party profile cards.
4. One Compare view.
5. Source excerpts for every policy position.

Polling is optional in Phase 0. Include it only if source access, licence/terms, and required metadata are straightforward.

## Candidate Policy Areas

Pick one after v1.0.0:

1. Housing
2. NHS and health
3. Immigration
4. Tax and cost of living
5. Climate and energy

Selection criteria:

1. Clear public interest.
2. Public source availability.
3. Enough party variation to make comparison useful.
4. Manageable scope for source references and policy taxonomy.

## Candidate Source Families

Tier 1 first:

1. Official party policy pages and manifestos.
2. Hansard debate records.
3. UK Parliament votes.
4. UK Parliament bills.
5. Electoral Commission political finance records, if donations are included.

Polling metadata should follow British Polling Council disclosure expectations where available.

## Minimum Experience

The v1.0.0 prototype should include:

1. A postcode starter that shows constituency, current MP, party, membership start date, and recent source-backed public records.
2. Clear beginner routes such as `find your MP`, `decode a vote`, `check a source`, and `learn a term`.
3. Glossary and civic tradition explanations.
4. Live Parliament records and upcoming business where official APIs support them.
5. Explainer pages that never make unsupported claims.
6. A source detail pattern with publisher, URL, tier, retrieved date, published date, and freshness state.
7. About, Sources, Privacy, and Status pages explaining what is covered, how data is checked, and where the limits are.

## Success Criteria

Phase 0 succeeds if:

1. 100% of factual summary sections have source references.
2. Unsupported topics produce a clear cannot-verify or coverage-gap response.
3. Users can understand why evidence is strong, partial, stale, or missing.
4. A politics beginner can complete the first journey without knowing terms such as division, sitting, whip, or manifesto beforehand.
5. The system can be refreshed without manual rewrites of the UI.
6. The team can add the first policy area on a feature branch using the same source pattern.

## Non-Goals

Do not include in Phase 0:

1. Full UK-wide political coverage.
2. Election prediction.
3. Full seat modelling.
4. Polling as a critical-path dependency.
5. Personalised quiz storage.
6. User accounts.
7. Paid/public-affairs workflow features.
8. Broad scraping of unreviewed source domains.
9. Gamified persuasion or ideological scoring.
10. Policy-area comparison as a v1.0.0 blocker.

## Historical Build Order

This sequence records the dependency reasoning at the time of the note. The evergreen backlog controls whether and when any outcome is active.

1. Finish the barebones v1 public app shell.
2. Deploy a public preview and test it with beginners.
3. Add snapshot-first persistence for the live Parliament hooks.
4. Add a reusable source panel or evidence drawer pattern.
5. Add source-reference validation before expanding factual summaries.
6. Open the first policy-area feature branch only after the v1 foundation is live.
7. Add Party Profiles, Compare, and policy explainers on that branch with source excerpts for every position.

## Why This Slice

This slice proves the hard part. If users trust the local starter, glossary, Parliament records, and source links, the product has a foundation to expand from. If the foundation feels confusing or unsupported, adding policy comparison will only add noise.
