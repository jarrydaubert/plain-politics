# Plain Politics: Technical Stack

## Architecture Goals

1. Live, source-backed public information pages.
2. Strong provenance from displayed facts back to source snapshots.
3. Fast, accessible charts, maps, tables, and plain-English summaries.
4. Scheduled ingestion from public APIs, public datasets, and compliant source pages.
5. Simple infrastructure that can be audited and operated cheaply.

## Recommended Stack

### Hosting And Domain

1. Vercel hosts the Next.js application and preview deployments.
2. Cloudflare handles domain registration or DNS, Email Routing, and email aliases such as `contact@`, `corrections@`, and `health@`.
3. Cloudflare Workers/Cron may be used for lightweight operator health checks and verified-admin alert emails, but not as the primary app runtime.
4. Revisit Cloudflare app hosting only if there is a deliberate runtime migration plan and the Next.js/Supabase behaviour is revalidated.

### Frontend

1. Next.js App Router with TypeScript.
2. React Server Components where they simplify data-backed pages.
3. Tailwind CSS for styling.
4. Accessible component primitives.
5. URL state and server-rendered data first; add client state libraries only when a workflow clearly needs them.

### Data And Backend

1. Supabase Postgres as the system of record.
2. Postgres full-text search for site search.
3. Structured tables for parties, policy areas, policy positions, manifestos, source documents, source snapshots, source excerpts, displayed facts, donations, votes, bills, debates, events, pollsters, polls, poll results, polling averages, constituencies, ingestion runs, and parser versions.
4. Source snapshots or immutable excerpts for auditability and link-rot resilience.
5. Zod schemas for source contracts, parser outputs, and public API responses.

### Ingestion And Jobs

1. Scheduled TypeScript ingestion jobs via GitHub Actions, Vercel Cron, or Supabase scheduled functions.
2. Ingestion modes: official APIs, public data downloads, compliant scraping, and manual curation fallback.
3. Idempotent pipeline: fetch -> snapshot -> parse -> normalize -> attach provenance -> validate -> publish.
4. Robots policy checks, licence/terms notes, and parser-version tracking on relevant source jobs.
5. Polling ingestion stores fieldwork dates, pollster, client where available, sample size, population, method, geography, question wording, and full-tables links where available.
6. Queue-backed workers are introduced only when retry, backlog, or freshness thresholds require them.

### Charts, Maps, And Tables

1. Use a chart library such as Nivo, Recharts, or Tremor for common charts.
2. Use MapLibre for interactive maps when geographic views are needed.
3. Use accessible table equivalents for chart and map data.
4. Keep chart data stored as structured records, not screenshots or static prose.

### Search And Content Rendering

1. Use Postgres full-text search and structured filters for parties, policies, sources, votes, donations, events, and polling records.
2. Plain-English summaries should be editorially written or template-rendered from reviewed structured data.
3. Each summary block should map to source references or show a coverage gap.
4. Search snippets must not introduce facts that are not present in indexed records.

### Caching And Performance

1. Use static generation or scheduled revalidation for public data pages where possible.
2. Tie cache invalidation to ingestion runs and source freshness.
3. Keep API responses compact and typed.
4. Track p75 page load and core route latency.

### Observability And Quality

1. Ingestion job health, duration, and failure alerts.
2. Freshness monitors by dataset type.
3. Parser drift checks.
4. Broken-source link checks.
5. Golden dataset checks for expected records.
6. Source-reference validation for public pages.
7. Operator email alerts for source failures, freshness breaches, parser drift, recovery events, and daily health digests.
8. Cloudflare-compatible alert path: Email Routing for operator addresses, optional Workers/Cron for lightweight health checks, KV or Postgres for cooldown state, and verified destination email sends where the Cloudflare plan allows it.

### Testing And Tooling

1. Bun for package/runtime workflow.
2. Bun test or Vitest for unit and integration tests.
3. Playwright for smoke and accessibility-critical flows.
4. Biome for formatting and linting.
5. TypeScript strict mode.
6. Source-reference tests for public pages and summaries.

## Known Trade-Offs And Upgrade Triggers

1. Postgres full-text search is a simple starting point but may need tuning as records grow.
2. Trigger for dedicated search evaluation: users cannot reliably find parties, policies, sources, or polling records through structured filters and full-text search.
3. Trigger for queue infrastructure: sustained retry failures, schedule-window backlog growth, or repeated freshness breaches.
4. Trigger for client state library: complex comparison/filtering workflows become hard to express with URL state and server-rendered data.

## Security And Compliance Baseline

1. Rate limits and abuse controls on public endpoints and forms.
2. Encryption in transit and at rest.
3. Audit logs for admin/editorial actions.
4. Consent-first handling for political-opinion signals.
5. No server environment variables exposed to client components.

## CI/CD And Release Gates

1. Unit and integration test suite.
2. Playwright smoke tests.
3. Accessibility checks for core views.
4. Source-reference validation.
5. Ingestion contract tests.
6. Performance checks for core public pages.
