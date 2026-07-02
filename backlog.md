# Backlog

Last updated: 2026-07-02

This file is only for unfinished todo items. It is not a status report, product spec, or changelog.

For context, use:

- v1 scope: `docs/strategy/v1.0.0-scope.md`
- strategy/current assessment: `docs/strategy/current-assessment.md`
- source hooks: `docs/strategy/source-hooks.md`
- technical stack: `TECH_STACK.md`
- decisions: `DECISIONS.md`

## V1 Launch Blockers

- [ ] Attach `plainpolitics.co.uk` and `www.plainpolitics.co.uk` to the Vercel project.
- [ ] Configure Cloudflare DNS for the Vercel deployment and verify the `www -> apex` redirect.
- [ ] Configure Cloudflare Email Routing for `hello@plainpolitics.co.uk` and `corrections@plainpolitics.co.uk`.
- [ ] Add the production URL and preview URL notes to `README.md` after domain setup.
- [ ] Protect GitHub `main` with required CI checks before treating the repo as launch-ready.
- [ ] Decide whether the current generated Westminster hero should be replaced with a licensed real Parliament photo before public launch.
- [ ] Review `/parties/[slug]` and either make party detail pages source-backed or hide them from public navigation until the policy-profile branch.
- [ ] Add one final beginner walkthrough pass: homepage -> glossary -> Parliament -> my area -> source links -> contact/corrections.

## V1 Nice-To-Have

- [ ] Add a small evidence popover or drawer for at least one homepage snapshot card.
- [ ] Add a small evidence drawer for at least one Parliament table row.
- [ ] Add inline glossary links from `/my-area` and `/parliament`.
- [ ] Add the first evergreen explainer page, likely PMQs or State Opening.
- [ ] Add a lightweight public corrections page that points to the corrections email until a full workflow exists.
- [ ] Add a lightweight source-health page or endpoint for operator checks.
- [ ] Add privacy-safe analytics, preferably cookieless and without postcode/query capture.

## Source And Data Foundation

- [ ] Convert current live Parliament fetches into a snapshot-first ingestion pipeline.
- [ ] Persist source documents, snapshots, excerpts, display facts, and ingestion runs to Supabase.
- [ ] Ensure public pages can read last-good data from Supabase when a live source fails.
- [ ] Add source cadence config for Parliament seats, members, divisions, and upcoming business.
- [ ] Add golden fixture tests for each parser.
- [ ] Add source registry metadata for every active and candidate source.
- [ ] Add parser version tracking to persisted records.
- [ ] Add source hash dedupe so unchanged snapshots do not create duplicate records.

## Change Tracking

- [ ] Add semantic diffing between consecutive source snapshots.
- [ ] Add a public `What changed` feed after snapshots and diffs exist.
- [ ] Add Atom/RSS feeds for change events after the public feed exists.
- [ ] Add filtered feeds for party, policy, bill, constituency, source family, and corrections when those entities exist.

## Beginner Product

- [ ] Expand `/my-area` with clearer explanations for recent votes and written questions.
- [ ] Add constituency pages after postcode lookup has persisted source data.
- [ ] Add MP detail pages after member records are persisted.
- [ ] Add local navigation so users can go deep and come back out without losing the beginner path.
- [ ] Add a local, no-account learning trail if it can stay privacy-safe.
- [ ] Add more beginner glossary terms as they appear in real pages.

## Parties, Policies, And Comparison

- [ ] Create a feature branch for the first policy area after v1.0.0 is live.
- [ ] Choose the first policy area on that feature branch.
- [ ] Capture official party manifesto or policy pages as source snapshots.
- [ ] Map reviewed excerpts to party positions for the first policy area.
- [ ] Build source-backed party profile sections with identical structure across parties.
- [ ] Build the first Compare view only after evidence drawer/source excerpts work.
- [ ] Add coverage-gap states for missing or unverified party-policy evidence.
- [ ] Keep any public-record side-by-side context non-judgemental unless reviewed manually.

## Parliament And Civic Calendar

- [ ] Add a dedicated upcoming dates/calendar page powered by reviewed sources.
- [ ] Separate upcoming Parliament business from recent GOV.UK or No. 10 activity.
- [ ] Add civic explainer hooks for State Opening, PMQs, recess, Budget, elections, and party conferences.
- [ ] Add bill and Hansard context after the evidence drawer can show exact source records.

## Polling, Money, And Wider Context

- [ ] Decide the first reliable free/public polling source strategy.
- [ ] Implement polling only after fieldwork dates, sample size, pollster, client, method, geography, question wording, and source links can be captured.
- [ ] Add cautious polling language and no-forecast labels before showing polling movement.
- [ ] Research Electoral Commission donation data ingestion.
- [ ] Add political finance only after entity resolution and source caveats are understood.
- [ ] Design a public honesty dashboard for coverage, freshness, source gaps, corrections, and ingestion health.

## Guided Civic Check

- [ ] Decide whether the guided civic check is a learning path only or may later include party-alignment scoring.
- [ ] Write methodology before building any party-match or alignment result.
- [ ] Build a source-backed question bank if the feature survives methodology review.
- [ ] Keep answers anonymous by default and deletable locally.
- [ ] Complete DPIA before storing political opinions, quiz answers, or personalisation.

## Platform And Quality

- [ ] Make Playwright smoke tests blocking once live source flakiness is controlled.
- [ ] Add broken-link checks for source links and public navigation.
- [ ] Add accessibility smoke checks for core pages.
- [ ] Add source-reference validation for public factual pages.
- [ ] Add neutrality lint or review checks for reviewed party/policy content.
- [ ] Add API/source health email alerts after ingestion runs are persisted.
- [ ] Add alert dedupe and cooldown before sending repeated health emails.
- [ ] Add deployment notes for Vercel, Cloudflare DNS, Email Routing, and required env vars.
- [ ] Keep `.env.example` aligned with any Supabase or public runtime configuration.
- [ ] Revisit repo docs after each feature lands, but keep this backlog as todos only.
