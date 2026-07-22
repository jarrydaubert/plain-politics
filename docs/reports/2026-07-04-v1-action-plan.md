# Plain Politics: Action Plan

> Historical v1 delivery plan preserved from 2026-07-04. It does not set current priorities. See `docs/project/backlog.md` for unfinished outcomes and order.

Last updated: 2026-07-04

## Objective

Ship a barebones, public, beginner-first UK politics site that people can actually use, then grow it through source-backed feature branches.

v1.0.0 is not the full party-policy comparison product. It is the foundation: home, local MP lookup, glossary, live Parliament records, sources, about/contact, deployment, and basic quality gates.

## Product Rule

1. Launch the clean v1 foundation first.
2. Keep policy areas, manifesto ingestion, polling, donations, alignment scoring, change feeds, and public APIs out of the go-live path.
3. Build each larger product area on a feature branch after v1 is live and reviewable.
4. Track unfinished work in `docs/project/backlog.md`, not in status reports or duplicate planning docs.

## V1 Workstream

1. Make the homepage explain Plain Politics within ten seconds.
2. Keep routes simple and complete: home, my area, Parliament, parties, glossary, explainers, sources, status, privacy, and about.
3. Make postcode lookup useful without storing raw postcodes by default.
4. Make Parliament data readable on desktop and mobile.
5. Keep source links visible without making the whole site about methodology.
6. Configure Vercel deployment, Cloudflare DNS, and Cloudflare Email Routing.
7. Protect `main` with required CI checks before treating the repo as launch-ready.

## Source And Data Workstream

1. Keep current live Parliament hooks typed and source-labelled.
2. Convert live hooks into snapshot-first ingestion after the public app shell is stable.
3. Persist source documents, source snapshots, source excerpts, displayed facts, and ingestion runs in Supabase.
4. Replace process-local last-good fallbacks with durable persisted records before increasing reliance on live APIs.
5. Persist source-health history and add operator email alerts after ingestion runs are stored.

## Quality Workstream

1. Keep Bun, Biome, TypeScript, unit tests, production build, and deterministic Playwright checks blocking in CI.
2. Keep live third-party source smoke tests separate and non-blocking.
3. Add accessibility and source-reference checks as public factual pages expand.
4. Keep generated output, local env files, build artifacts, and private platform state out of Git.

## Post-v1 Feature Branches

Create focused branches after v1.0.0 is public:

1. `feature/first-policy-area` for the first reviewed party-policy comparison slice.
2. `feature/evidence-drawer` for reusable claim-to-source UI.
3. `feature/source-snapshots` for persisted ingestion and parser fixtures.
4. `feature/change-feed` for semantic diffs and public feeds after snapshots exist.
5. `feature/polling` only after source/licence/metadata rules are settled.

## Launch Gate

v1.0.0 is ready when a politics beginner can visit the live URL, understand what the site is for, find their MP, decode basic terms, browse live Parliament records, follow source links, find contact/corrections, and leave without the site storing political views or raw postcode data by default.
