# Plain Politics Decision Log

## DEC-001: Canonical Product Spec
- Decision: `PRD_V2.md` is the canonical product specification.
- Rationale: Consolidates reviewer-verified corrections into one source of truth.
- Impact: Other docs (`IDEA_BRIEF.md`, `TECH_STACK.md`, `PLAIN_POLITICS_ACTION_PLAN.md`) must remain aligned to PRD v2.

## DEC-002: MVP Architecture Baseline
- Decision: Use Next.js + Supabase Postgres + scheduled TypeScript ingestion jobs + GitHub Actions or equivalent scheduling.
- Rationale: Low operational overhead, budget-friendly launch path, and strong support for source-backed public information pages.
- Alternatives considered: Prior FastAPI/AWS/OpenSearch-heavy path.
- Why not chosen: Higher ops complexity and cost for initial MVP.

## DEC-003: Search Strategy
- Decision: Start with Postgres full-text search plus structured filters.
- Rationale: Minimizes infrastructure and fits a public information site with known entities, topics, and source types.
- Known trade-off: Full-text search may need tuning as source documents and records grow.
- Revisit trigger: If users cannot reliably find parties, policies, sources, or polling records, evaluate a dedicated search engine.

## DEC-004: Ingestion Execution Model
- Decision: MVP uses sequential scheduled jobs with idempotent retries (no dedicated queue at launch).
- Rationale: Reduces moving parts while source volume is still manageable.
- Revisit trigger: Introduce queue-backed workers if retry failure/backlog/freshness thresholds are breached.

## DEC-005: Informational Site Scope
- Decision: Keep the current product scope to source-backed public information pages, search, charts, maps, tables, and editorial/template summaries.
- Rationale: The user need is a live informational website using public sources, plain-English editorial/template summaries, charts, maps, and tables.
- Revisit trigger: Only revisit if the product has reliable source ingestion, provenance, editorial QA, and a clearly justified user need that cannot be met with structured search and templates.

## DEC-006: Success Metrics Prioritization
- Decision: Use 5 primary decision metrics (source-link CTR, source coverage, source relevance QA, freshness SLA, return rate); keep remaining metrics as secondary diagnostics.
- Rationale: Small team needs clear go/no-go signals without over-instrumenting early execution.

## DEC-007: Compare Discrepancy Scope
- Decision: Vote-vs-policy discrepancy indicators are Phase 2 stretch scope.
- Rationale: High user value but high methodology and data quality complexity.
- Revisit trigger: Promote when vote ingestion and vote-policy mapping quality are stable in production benchmarks.

## DEC-008: Product Positioning
- Decision: Position the product as a free UK politics information tracker.
- Rationale: Competitive research shows polling, parliamentary, donor, fact-checking, and paid monitoring products exist in fragments. The opportunity is to connect them with source-backed plain-English summaries, charts, maps, tables, freshness, and visible uncertainty.
- Impact: Product pages should emphasise tracked change, evidence, freshness, and confidence rather than generic political summaries.

## DEC-009: Phase 0 Before Full MVP
- Decision: Build a narrow proof-of-thesis slice before attempting the full 10-feature MVP.
- Rationale: The hardest product risk is whether users trust source-backed political information in practice. A small vertical slice proves this faster than broad feature coverage.
- Impact: Early implementation should focus on a postcode-led beginner journey, one policy area, a few parties, authoritative sources, source excerpts, Party Profiles, Compare, plain-English explainers, and source panels.

## DEC-010: Beginner-First Product Surface
- Decision: Treat "I know nothing about politics, help me start" as the primary public product journey.
- Rationale: A static database of parties, changes, and source records is useful but not enough for general voters. The strongest on-ramp is a guided route from postcode or issue to plain-English basics, source-backed public records, and deeper research paths.
- Impact: Home, navigation, copy, and feature prioritization should privilege `Start Here`, postcode lookup, glossary support, and easy routes back out of deep research pages.

## DEC-011: Postcode-Led Local Context
- Decision: Prioritize a `my area` starter that resolves postcode to constituency, current MP, party, Commons membership start date, and recent public parliamentary activity.
- Rationale: Local relevance is the clearest beginner hook and can be powered by public sources such as postcodes.io, the UK Parliament Members API, and the Commons Votes API.
- Impact: Raw postcodes should be processed transiently by default. Public pages must distinguish parliamentary activity from verified local impact unless a source directly supports the local claim.

## DEC-012: Learning Gamification, Not Persuasion
- Decision: Use light gamification only to reward learning, source-checking, and exploration.
- Rationale: Game mechanics can make the product more approachable, but political preference nudges, ideological scores, and party-coded rewards would undermine neutrality and trust.
- Impact: Acceptable mechanics include beginner modules, progress states, source-checking badges, glossary unlocks, and weekly `what changed` prompts. Do not reward movement toward a party or imply voting advice.

## DEC-013: Vercel App Hosting, Cloudflare Domain And Email
- Decision: Host the Next.js application on Vercel. Use Cloudflare for domain/DNS, Email Routing, and optional lightweight operator health-alert helpers.
- Rationale: Vercel is the simplest and most native runtime for the Next.js App Router stack already in the repo. Cloudflare remains valuable for DNS, domain management, inbound email aliases, verified admin alert delivery, and small Worker/Cron checks.
- Impact: Do not treat Cloudflare Pages/Workers as the primary app host unless this decision is explicitly revisited. Deployment docs should optimise for Vercel previews first.

## DEC-014: v1.0.0 Barebones Before Policy Areas
- Decision: v1.0.0 is a barebones public foundation release, not the first policy-area comparison release.
- Rationale: The fastest useful launch is a beginner-first, postcode-led site with glossary, live Parliament records, sources, methodology, contact/corrections, and deployable infrastructure. Policy areas, manifestos, polling, donations, and alignment scoring add source and editorial complexity that should not block the first public URL.
- Impact: The first policy area stays in the backlog and should be built on a feature branch after v1.0.0 is live and reviewable.
