# Current Product Assessment

Last updated: 2026-07-06

## Short Synopsis

Plain Politics is a free, source-backed, beginner-friendly UK politics starter and information tracker. It should help users who know little or nothing about politics start from their postcode or an issue, understand who represents them, what parties stand for, how popular they are, and what changed across polls, policies, donations, votes, and public records.

The strongest version is not a pundit, prediction engine, or campaign tool. It is a calm public reference layer over political evidence:

1. Where do I start if I know nothing about politics?
2. Who is my MP and what constituency am I in?
3. What does this party stand for?
4. What does its manifesto or official policy page say?
5. How popular is the party in public polling?
6. What changed recently?
7. Which source proves it?
8. How fresh is the evidence?
9. What evidence is missing?

## What The Repo Is Today

This is a deployed product and operating-standards repo. It contains product requirements, architecture direction, methodology, quality gates, competitive research, a Bun/Next.js app, a Supabase migration, tests, required CI checks, deployment configuration, privacy-safe analytics, and live public-source integrations.

Now present:

1. `package.json`
2. Next.js app scaffold
3. Supabase schema migration
4. Bun test and Playwright configuration
5. Typed source contracts
6. Official UK Parliament source hooks for Commons party seats, upcoming business, recent divisions, and current-member quality checks
7. Public source directory plus source/datapoint strategy docs
8. Beginner-first homepage, postcode starter, glossary, explainers, sources, About, Privacy, and footer attribution
9. Public data-status checks with healthy, degraded, and offline states
10. Deterministic blocking E2E checks plus separate non-blocking live-source smoke tests
11. GitHub Actions CI, CodeQL, Vercel deployment, and Cloudflare domain/analytics runbook notes
12. Canonical Ink and Paper visual system, Full Stop identity, responsive QA, and matching install/social assets

Still not yet present:

1. Fully reviewed v1.0.0 public launch
2. Persistent ingestion jobs
3. Database-backed rendering from Supabase
4. Editorial/reviewer UI
5. Full source excerpt drawer
6. Real manifesto, polling, donation, or change-feed ingestion
7. Durable last-good-data fallback across deployments and serverless instances
8. Persisted source-health history and operator alerting

## What Is Already Well Specified

The trust and governance layer is stronger than a quick skim suggests.

Already specified:

1. Source tiers and required provenance fields in `docs/methodology/source-trust-framework.md`.
2. Source-reference expectations in `docs/methodology/citation-policy.md`.
3. Political neutrality standards in `docs/methodology/neutrality-standard.md`.
4. Privacy defaults, DPIA trigger points, and consent boundaries in `docs/methodology/privacy-baseline.md`.
5. Polling metadata and uncertainty rules in `docs/methodology/polling-methodology.md`.
6. Release gates and pre-build checks in `docs/quality/release-gates.md`.
7. Competitive gap and source standards in `docs/market/competitive-landscape.md`.
8. Product requirements and success metrics in `docs/product/prd-v2.md`.

The main problem is no longer lack of scaffolding. The main problem is turning the first live hooks into persistent ingestion, stored provenance, and user-facing source inspection.

## Real Gaps

The highest-value gaps are implementation-grade specificity and proof:

1. Live hooks fetch and cache data through the app; they do not yet persist records through Supabase.
2. No scheduled ingestion jobs.
3. Source families do not yet have persisted cadence and freshness configuration.
4. Source-reference tests exist for schemas, but not yet for rendered pages or all public claims.
5. No source excerpt validator for parsed text spans.
6. No search benchmark dataset.
7. No editorial review state machine.
8. No reviewer workflow or correction UI.
9. Source panels show source URLs and check times, but not a full evidence drawer with exact highlighted spans.
10. No public polling average implementation.
11. Production analytics behaviour still needs its planned post-deploy privacy verification.

## Strategic Opportunity

The market is fragmented:

1. Polling trackers show who is up or down.
2. Parliament tools show votes, debates, and MPs.
3. Electoral Commission records show donations and political finance.
4. Fact-checkers explain selected claims.
5. Paid public-affairs tools monitor policy and stakeholders.

The opportunity is to connect those evidence streams into one free public information product that feels approachable for beginners and useful for people who want to go deeper.

The product should not try to be the deepest version of every category. It should be the clearest connective layer:

1. A postcode-led `my area` starting point.
2. Plain-English routes for beginners.
3. Low-pressure browsing with no progress bars, badges, or unlock mechanics.
4. Party profiles in plain English.
5. Manifesto and policy summaries with source links.
6. Polling movement with uncertainty.
7. Donations with reporting-period context.
8. Votes and parliamentary records linked to party pages and policy areas.
9. Visible gaps where evidence is weak or missing.

## Product Bet

The killer feature is a calm, inspectable information state:

1. A user sees a party, policy, poll, vote, or donation.
2. The interface shows a plain-English summary, table, chart, or map.
3. Every material claim or datapoint links to a source.
4. Each source shows publisher, date, tier, freshness, and exact excerpt where possible.
5. If the system cannot verify something from public sources, it says so clearly.

That `cannot verify from available public sources` state should be treated as a first-class product feature, not a failure.

## Recommended First Build

Build the v1 public starter before expanding into the full product.

Current v1.0.0 slice:

1. Beginner homepage that makes the product obvious within ten seconds.
2. Postcode to constituency/current MP using public sources.
3. Glossary and short civic explainers for the terms beginners meet first.
4. Live Parliament records for seats, upcoming business, and recent divisions, with current-MP lookup starting from `/my-area`.
5. Sources, About, attribution, contact/corrections, and privacy-safe analytics.
6. Basic source failure, empty, unavailable, and freshness states.
7. CI, deployment, and branch protection strong enough to iterate from a live URL.

Post-v1 proof-of-thesis branch:

1. One policy area, such as housing, NHS, immigration, or tax.
2. Four to five UK parties.
3. Two to three Tier 1 source types, such as manifesto pages, official party policy pages, Hansard, Commons votes, or written questions.
4. Party profile cards with plain-English source-backed summaries.
5. Compare view with coverage states.
6. Source panel or evidence drawer with exact excerpts.

Polling belongs in the product vision, but it should not block v1 unless source access and metadata are straightforward.

## What Would Make It Awesome

1. Every factual claim is expandable to the exact source excerpt.
2. Polling movement is shown with uncertainty, sample metadata, and fieldwork dates.
3. The dashboard distinguishes signal from noise.
4. Coverage gaps are visible and neutrally worded.
5. Users can start with their postcode, learn who represents them, and understand the public record without creating an account.
6. Users can search public political information without unsupported summaries.
7. Source freshness is visible at record and dataset level.
8. Corrections are public, dated, and linked to affected records.
9. Neutrality checks are part of QA, not an afterthought.
10. The product feels fast, clear, civic, and lightly rewarding to explore.
11. The free public product remains distinct from lobbying or campaign workflows.

## Watch-Outs

1. Avoid starting with all PRD features at once.
2. Avoid automated prose that is not tied to reviewed structured records.
3. Avoid seat projections until methodology and uncertainty communication are solid.
4. Avoid storing political alignment signals before consent and retention are implemented.
5. Avoid broad source scraping before source trust, snapshots, and robots checks are real.
6. Avoid "who is winning" language that reads like horse-race hype without uncertainty.

## Current Strategic Read

The project is worth pursuing because the problem is not lack of political content. The problem is lack of verified, comparable, current, non-spin public information in one calm interface.

The public starter now proves the basic route and trust model. The next milestone is to finish the remaining launch checks, then replace process-local source memory with persisted snapshots and durable last-good data.
