# Backlog

Last updated: 2026-07-01

This is the living backlog for UK Policy Explainer. It captures product ideas, data hooks, technical work, and research tasks before they disappear into chat history.

## Status Legend

- `Next`: ready to pick up soon.
- `Planned`: valuable, but not next.
- `Research`: needs source, policy, legal, or product validation.
- `In progress`: started in the repo but not complete.
- `Done`: shipped and verified.

## Global Definition Of Done

Every implementation task should meet these before it is considered done:

1. Public factual content is backed by a source path.
2. Source-backed records follow `source_document -> source_snapshot -> source_excerpt -> display_fact/table_row/chart_datapoint`.
3. UI shows freshness or `last checked` where it affects interpretation.
4. Empty, loading, stale, failed, and unavailable states are handled.
5. Political neutrality and accessibility have been checked.
6. Privacy-sensitive features do not store political opinions without explicit consent.
7. Relevant unit, integration, E2E, or source-contract tests pass.
8. Docs are updated when behaviour, sources, methodology, or data model changes.

## P0 - Keep The Foundation Honest

### 1. Persist Live Source Hooks To Supabase

Status: `Next`

Depends on: `#5 Snapshot-First Parser Architecture`

Why: The app currently proves live hooks can render, but the long-term product needs history, diffs, freshness, and failure tracking.

Definition of done:

1. Parliament seat counts, current members, recent divisions, and upcoming business are written to Supabase.
2. Parliament hooks implement the snapshot-first ingestion pipeline defined in `#5`.
3. Each run creates or reuses source documents, snapshots, excerpts, display facts, and ingestion run records.
4. Writes are idempotent by source URL, source hash, and source record ID.
5. Public pages read from Supabase rather than only direct live fetches.
6. Failed runs preserve the last good published data and show a stale/failure state.
7. Tests cover at least one successful run, one unchanged-source run, and one failed-source run.

### 2. Scheduled Data Refresh Cadences

Status: `Next`

Why: The site should feel current without hammering public services.

Definition of done:

1. A source cadence config exists by dataset type.
2. Parliament votes and upcoming business can refresh every 30-60 minutes during sitting periods.
3. Party seats and member lists refresh at least twice daily.
4. Manifestos and party policy pages refresh daily or on manual trigger.
5. Polling and finance cadences are documented separately because source availability differs.
6. Ingestion runs record start time, end time, status, record counts, errors, and next expected run.
7. Freshness badges appear when a dataset exceeds its threshold.

### 3. Evidence Drawer

Status: `Next`

Depends on: `#1 Persist Live Source Hooks To Supabase`

Why: The core trust moment is a user opening a claim, table row, or chart point and seeing the source behind it.

Definition of done:

1. Any displayed fact/table row can open a source panel or drawer.
2. Drawer shows publisher, source tier, URL, retrieved date, source date where available, snapshot hash, and parser version.
3. Drawer shows exact excerpt text or structured JSON path that supports the displayed claim.
4. Unsupported or partial claims render a clear coverage-gap state.
5. E2E test verifies at least one Parliament row opens a source drawer.

### 4. Global UK Date And Time

Status: `In progress`

Why: Date and time matter for sitting days, polling days, deadlines, data freshness, and election-night context.

Definition of done:

1. Navbar shows UK date and time across all routes.
2. Clock uses `Europe/London` formatting and handles BST/GMT correctly.
3. Clock links to an official UK time reference, preferably NPL.
4. The component is accessible to screen readers.
5. E2E smoke test confirms the clock appears on the home page.

### 5. Snapshot-First Parser Architecture

Status: `Next`

Why: The product is only replayable and auditable if parsing is deterministic: stored snapshot bytes in, typed records out.

Definition of done:

1. Source adapters are split into fetch, snapshot, parse, normalize, and publish stages.
2. Fetch stage writes raw snapshot content and metadata without deriving public records.
3. Parse stage is a pure function over stored snapshot content and parser configuration.
4. Snapshot writes are content-addressed by hash, and unchanged hashes do not create duplicate snapshots.
5. Normalize stage converts parsed records into canonical entities and display-ready records.
6. Diff stage compares consecutive normalized outputs and produces typed change records.
7. Change summary stage produces short, source-backed summaries from typed diffs, not from raw hash changes.
8. Parser and diff versions are stored with each parse output, change event, and affected display record.
9. Golden fixtures exist for each live source hook.
10. Parser and diff tests fail loudly when source shape or semantic output changes unexpectedly.
11. Historical snapshots can be re-parsed and re-diffed with newer parser versions for backfills.

### 6. Public What Changed Feed

Status: `Next`

Depends on: `#1 Persist Live Source Hooks To Supabase`, `#3 Evidence Drawer`, `#5 Snapshot-First Parser Architecture`

Why: Change detection is the habit-forming product. Users should be able to see what changed since the last ingestion, not only look up static reference pages.

Definition of done:

1. Ingestion runs with semantic diffs create public change events.
2. Change events include changed entity, source, timestamp, change type, short source-backed summary, source URL, previous and current snapshot hashes, diff version, and affected pages.
3. Hash-only changes with no meaningful normalized diff are suppressed or labelled as technical/source-format changes.
4. Feed shows policy page edits, manifesto diffs, new or changed Parliament events, new divisions, changed party seats, new donations, and polling updates when those sources exist.
5. Each change event links to an evidence drawer or source detail page.
6. Home dashboard uses the change feed as a primary section.
7. Empty state explains when no tracked sources changed.
8. Tests cover unchanged snapshot, hash-only change, semantic change, and changed-record event creation.

### 7. Atom/RSS Subscriptions

Status: `Planned`

Depends on: `#6 Public What Changed Feed`

Why: Subscribable feeds give journalists, researchers, and interested voters a privacy-safe way to follow updates without accounts.

Definition of done:

1. Atom or RSS exists for all changes.
2. Filtered feeds exist for party, policy area, bill, constituency, source family, and correction log where data supports it.
3. Feed entries include title, updated timestamp, summary, canonical URL, source links, and stable IDs.
4. Feeds require no account and set sensible cache headers.
5. Feeds support conditional requests with `ETag` and/or `Last-Modified` headers.
6. Feed discovery links are exposed in HTML.
7. Feed output is validated with a standard feed validator or equivalent test.

## P1 - Core Public Product

### 8. Upcoming Dates And Civic Calendar

Status: `Next`

Depends on: `#1 Persist Live Source Hooks To Supabase`

Why: Users should see what is coming next: Parliament business, bill stages, election dates, by-elections, registration deadlines, and major political publication dates.

Definition of done:

1. Parliament What's On API powers an upcoming business section.
2. Calendar records store date, time, House/institution, category, description, bill link, cancellation status, source URL, and last checked.
3. GOV.UK / No. 10 Atom feed is labelled as recent activity, not an official future diary.
4. Election and civic deadline source hierarchy is documented before ingestion.
5. Calendar page supports filtering by Parliament, elections, party events, government activity, and deadlines.
6. Upcoming dates widget appears on the home dashboard.

### 9. Postcode To My Area Starter

Status: `Next`

Depends on: `#1 Persist Live Source Hooks To Supabase`

Why: Beginners often start locally: who is my MP, what seat am I in, what has my representative done publicly, and what does any of it mean?

Definition of done:

1. User can enter a postcode without creating an account.
2. Postcode is resolved to constituency using a reviewed public source such as postcodes.io or an approved civic data source.
3. UI shows constituency, current MP, party, Commons membership start date, recent votes, recent written questions or debate activity where available, upcoming relevant events, and source links.
4. Page explains terms such as MP, constituency, division, written question, and sitting day in plain English.
5. Invalid, partial, missing, and ambiguous postcode states are handled.
6. Postcode is not stored or logged unless explicitly needed for privacy-safe operational metrics.
7. Page links onward to party profile, constituency page, MP detail, and beginner explainers.
8. Page does not describe parliamentary activity as local impact unless a source directly supports the local claim.
9. Tests cover valid postcode, invalid postcode, and no-storage/privacy behaviour where applicable.

### 10. Party Profiles

Status: `Planned`

Depends on: `#3 Evidence Drawer`, `#11 Manifesto And Policy Ingestion`

Why: The basic user question is "what does this party stand for?"

Definition of done:

1. Each major UK party has a profile page with source-backed summary blocks.
2. Profile includes current Commons seats, official website, manifesto/policy links, current MPs, recent votes, polling availability, and coverage gaps.
3. No party profile uses unsupported summary text.
4. Every material fact can open the evidence drawer.
5. Party pages use identical structure to avoid favouritism.

### 11. Manifesto And Policy Ingestion

Status: `Next`

Depends on: `#5 Snapshot-First Parser Architecture`

Why: Manifestos and official policy pages are the source base for party explanations, comparison, and the alignment check.

Definition of done:

1. First policy area is selected, preferably housing, NHS, immigration, tax/cost of living, or climate/energy.
2. Official party manifesto or policy sources are captured as source snapshots.
3. Excerpts are mapped to policy areas and party positions.
4. Changes between snapshots are stored and visible.
5. Parser confidence and manual review status are recorded.
6. At least one Compare page row is generated from real source excerpts.

### 12. Compare Policies View

Status: `Planned`

Depends on: `#3 Evidence Drawer`, `#11 Manifesto And Policy Ingestion`

Why: Users need a fair side-by-side comparison of party positions.

Definition of done:

1. User can compare at least two parties across one policy area.
2. Each party uses the same fields: summary, source status, source date, evidence links, and coverage gap.
3. Missing evidence shows `No verified source available`.
4. Wording is neutral and template-consistent.
5. E2E test covers selecting parties and opening evidence.

### 13. Public Record Side-By-Side Context

Status: `Research`

Depends on: `#3 Evidence Drawer`, `#9 Postcode To My Area Starter`, `#11 Manifesto And Policy Ingestion`, `#17 Bills, Hansard, And Parliamentary Context`

Why: Users may want to see public promises and public records side by side, but v1 should avoid automatic judgement and focus on helping beginners inspect the evidence.

Definition of done:

1. Methodology defines when two public records can be placed side by side.
2. First version prioritizes MP, constituency, and party pages over broad national manifesto-vs-quote judgement.
3. Each side-by-side view links to official party, Parliament, manifesto, local authority, or other approved public sources.
4. UI uses cautious labels such as `public record shown`, `no comparable record found`, `local link not verified`, or `needs review`.
5. No automated conclusion says a person or party broke a promise, kept a promise, or acted hypocritically.
6. Manual review is required before publishing any interpretive context.
7. Evidence drawer shows every source used in the side-by-side view.
8. Neutrality review checks party-by-party symmetry.

### 14. Search And Explainers

Status: `Planned`

Depends on: `#1 Persist Live Source Hooks To Supabase`, `#11 Manifesto And Policy Ingestion`

Why: Users should be able to search topics and find plain-English, source-backed pages.

Definition of done:

1. Search runs over only reviewed/source-backed records.
2. Search result snippets do not invent facts outside indexed records.
3. Explainer pages show source count, source tiers, last checked, and coverage gaps.
4. Unsupported queries return nearest source-backed topics or `No verified source available`.
5. Search benchmark dataset exists for core topics and parties.

## P2 - Popularity, Money, And Context

### 15. Polling And Popularity Tracker

Status: `Research`

Depends on: `#5 Snapshot-First Parser Architecture`

Why: The product should answer who is up/down without pretending polling noise is certainty.

Definition of done:

1. Reliable free/public polling source strategy is approved.
2. Poll records include pollster, client, fieldwork dates, publication date, sample size, population, method, geography, question wording, party vote share, and full tables link where available.
3. Methodology explains inclusion rules, exclusions, averages, and uncertainty.
4. Movement labels have documented thresholds.
5. UI separates fieldwork date, publication date, retrieval date, and chart update date.
6. No seat projections are added without a separately reviewed methodology.

### 16. Donations And Political Finance

Status: `Research`

Depends on: `#5 Snapshot-First Parser Architecture`

Why: Party finance is high-value public context, but the source surface needs terms and export review.

Definition of done:

1. Electoral Commission access method, terms, and export constraints are documented.
2. Donation records store recipient, donor, amount, donation type, donor status, accepted date, received date, reported date, reporting period, and source reference.
3. Entity resolution rules exist for parties, accounting units, donors, and campaigners.
4. Finance charts include accessible tables and caveats about reporting lag.
5. No finance record renders without a source path.

### 17. Bills, Hansard, And Parliamentary Context

Status: `Planned`

Depends on: `#1 Persist Live Source Hooks To Supabase`, `#5 Snapshot-First Parser Architecture`

Why: Bills and debates connect party claims to what Parliament is actually doing.

Definition of done:

1. Bills source route is mapped and terms are checked.
2. Bill records include stage, dates, sponsor/responsible member where available, documents, and source links.
3. Hansard/debate excerpts can be attached to policy areas without over-summarising.
4. Parliament timeline connects upcoming business, bills, votes, and debate excerpts.
5. Neutrality review catches cherry-picked debate quotes.

### 18. No. 10 And GOV.UK Activity Feed

Status: `Planned`

Depends on: `#5 Snapshot-First Parser Architecture`

Why: Prime Minister and government releases provide useful recent activity context, but should not be confused with an official future diary.

Definition of done:

1. GOV.UK Atom feed is ingested with title, URL, summary, and updated timestamp.
2. UI labels it as `Recent government activity`.
3. Feed items can link to policy timelines only after topic mapping/review.
4. Staleness and last checked are visible.
5. No forward-looking claim is inferred from a retrospective activity item.

### 19. Public Read API And Bulk Downloads

Status: `Planned`

Depends on: `#1 Persist Live Source Hooks To Supabase`, `#24 Source Hook Registry`

Why: Clean, source-backed political data becomes more valuable when journalists, civic technologists, educators, and researchers can reuse it.

Definition of done:

1. Public API exposes reviewed, source-backed records only.
2. Bulk downloads are available for parties, policies, sources, votes, events, polling records, donations, and change events where data exists.
3. API responses include source metadata and freshness fields.
4. Rate limits and abuse protections are documented.
5. Licence/terms for reuse are published.
6. API docs include example queries and caveats.
7. Tests verify no private data or unreviewed records are exposed.

### 20. Public Honesty Dashboard

Status: `Planned`

Depends on: `#1 Persist Live Source Hooks To Supabase`, `#6 Public What Changed Feed`, `#26 Public Corrections Page`

Why: The site should make its own strengths and gaps visible: coverage, freshness, corrections, parser health, and what cannot be verified.

Definition of done:

1. Dashboard shows coverage by party, policy area, and source family.
2. Freshness heatmap shows which datasets are current, stale, failed, or unavailable.
3. Ingestion health shows recent runs, failures, records changed, and last successful check.
4. Corrections log is public, permanent, and linkable.
5. Coverage gaps are visible as first-class records, not hidden empty states.
6. Dashboard explains methodology and limits in plain English.
7. E2E smoke test verifies the dashboard renders current status.

## P3 - Guided Civic Check

### 21. Guided Civic Check Methodology

Status: `Next`

Depends on: `#11 Manifesto And Policy Ingestion`

Why: Users who are unsure where to start need an approachable way to learn issues, vocabulary, trade-offs, and source-backed party positions without being told how to vote.

Definition of done:

1. Methodology document explains that this is an information and learning tool, not voting advice.
2. The first version can run as a civic knowledge path before any party-alignment scoring is enabled.
3. Any scoring is based on manifesto commitments, official policy pages, and reviewed parliamentary records.
4. Questions map to policy axes and source-backed party positions, not campaign slogans.
5. User answers include agree/disagree/neutral/unsure/skip plus optional importance weighting.
6. Results explain issue-by-issue context, source confidence, and coverage gaps before any overall match.
7. Privacy rules state answers are not stored by default.
8. Gamified mechanics reward learning, checking sources, and completing modules, not moving toward a political party.

### 22. Guided Civic Question Bank

Status: `Planned`

Depends on: `#21 Guided Civic Check Methodology`

Why: Good questions are the difference between a useful civic learning path and a vibes quiz.

Definition of done:

1. Initial quick path has 10-15 questions across major policy areas and civic basics.
2. Full version target is 35-50 questions.
3. Each question is neutral, plain English, and avoids leading party-coded wording.
4. Each answer option maps to an explicit policy scale or knowledge concept.
5. Each party score or learning explanation links to a source excerpt or shows a coverage gap.
6. Question bank has editorial review status and version history.

### 23. Anonymous Guided Civic Check UI

Status: `Planned`

Depends on: `#21 Guided Civic Check Methodology`, `#22 Guided Civic Question Bank`, `#29 Privacy And DPIA For Sensitive Features`

Why: The result should help users understand trade-offs and vocabulary without collecting sensitive political data.

Definition of done:

1. Quiz runs without account creation.
2. Answers are processed client-side or stored only with explicit consent.
3. Results show completed learning modules, issue-by-issue context, closest parties only if methodology is approved, skipped topics, and low-confidence areas.
4. Every result row links to evidence.
5. User can reset/delete local answers.
6. Page includes a clear disclaimer: informational only, not voting advice.
7. Accessibility and keyboard navigation pass.

## Platform And Quality

### 24. Source Hook Registry

Status: `Planned`

Depends on: `#5 Snapshot-First Parser Architecture`

Why: Every source should have an owner, cadence, terms note, and parser contract.

Definition of done:

1. Registry lists source name, URL, publisher, tier, ingestion mode, cadence, terms note, robots status where relevant, parser version, freshness threshold, and owner.
2. Registry powers `/sources`.
3. New sources cannot be ingested without a registry entry.
4. Tests assert source hooks expose required metadata.

### 25. Editorial Review And Corrections Workflow

Status: `Planned`

Depends on: `#1 Persist Live Source Hooks To Supabase`, `#24 Source Hook Registry`

Why: Neutrality and correction history are product features, not internal chores.

Definition of done:

1. Records can be marked needs review, approved, rejected, corrected, or escalated.
2. Review reasons include low parser confidence, source conflict, new domain, polling methodology change, and parser anomaly.
3. Corrections are timestamped and linked to affected public records.
4. Public pages show correction history where interpretation changes.

### 26. Public Corrections Page

Status: `Planned`

Depends on: `#25 Editorial Review And Corrections Workflow`

Why: Publicly owning mistakes is a trust feature for a civic information product.

Definition of done:

1. Corrections page is public, permanent, and linkable.
2. Each correction includes affected page or record, date, reason, previous wording/value where appropriate, corrected wording/value, and source links.
3. Corrections can be filtered by party, policy area, source family, and correction type.
4. Corrected public pages link back to relevant correction entries.
5. RSS/Atom feed exists for corrections.
6. Corrections workflow prevents silent edits to material claims.

### 27. Visible Product Non-Goals

Status: `Planned`

Why: Users should see the product's limits before they assume bias, prediction, or voting advice.

Definition of done:

1. Methodology or about page visibly states the product does not predict elections.
2. It states the product does not tell users how to vote.
3. It states the product does not infer motives or intent without direct evidence.
4. It states polling movement is uncertain and not a forecast.
5. These limits are linked from relevant pages such as polling, alignment check, and party comparisons.
6. Copy is plain, short, and non-defensive.

### 28. Neutrality Lint And Balance Checks

Status: `Planned`

Depends on: `#25 Editorial Review And Corrections Workflow`

Why: Neutrality should be measurable enough to catch asymmetric wording, loaded language, and uneven source depth before release.

Definition of done:

1. Lint rules flag loaded or campaign-style language in reviewed content.
2. Balance checks compare source count, summary length, and field completeness across parties in comparison views.
3. Review UI or reports show warnings before publication.
4. False positives can be acknowledged with a reviewer note.
5. Release gate fails on unresolved high-severity neutrality warnings.

### 29. Privacy And DPIA For Sensitive Features

Status: `Planned`

Why: Alignment quiz answers and political interest signals are sensitive.

Definition of done:

1. Anonymous-by-default policy is implemented for quiz and preference features.
2. DPIA is completed before storing political alignment or personalisation.
3. Consent, retention, deletion, export, and correction flows exist before any saved profiles.
4. Analytics avoid collecting political opinion signals.

### 30. CI And Release Gates

Status: `Planned`

Depends on: `#24 Source Hook Registry`

Why: Source-first products need automated guardrails.

Definition of done:

1. CI runs format/lint/typecheck/unit tests/build/E2E smoke.
2. Source-reference validation runs for public pages.
3. Broken link checks run on scheduled cadence.
4. Accessibility smoke checks cover core pages.
5. Release checklist includes neutrality, privacy, source freshness, and performance checks.
