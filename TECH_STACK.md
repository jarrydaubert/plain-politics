# Political Intelligence Platform: Technical Stack

## Architecture Goals
1. Retrieval-first answers with strict source grounding.
2. Low-latency UX with streaming where applicable.
3. Strong provenance, auditability, and correction workflows.
4. Budget-efficient operation through model routing and caching.

## Recommended Stack (v2)

### Frontend
1. Next.js 16.x (App Router, React Server Components) + TypeScript.
2. Tailwind CSS + accessible component primitives.
3. SSR/ISR and scheduled revalidation for fast, indexable pages.

### Backend and Data
1. Supabase Postgres as system of record.
2. `pgvector` for semantic retrieval embeddings.
3. Hybrid retrieval: Postgres full-text + vector similarity.
4. Source snapshot storage for auditability and link-rot resilience.

### AI Layer
1. Vercel AI SDK with structured output contracts.
2. Provider abstraction (no hard lock to one model vendor).
3. Model routing by query complexity:
   - lower-cost models by default
   - higher-cost reasoning models only when needed.
4. Default embedding model: `BAAI/bge-small-en-v1.5` (384 dimensions), with provider-backed fallback via common interface.
5. Response schema baseline:
   - `answer`
   - `confidence`
   - `claims[]`
   - `citations[]`
   - `uncertainty_reason`

### Retrieval and Grounding
1. Source trust framework enforced at retrieval time.
2. Semantic chunking with overlap for policy/manifesto documents.
3. Claim-to-citation mapping; no orphan factual claims.
4. Freshness-aware retrieval thresholds by query type.

### Ingestion and Jobs
1. MVP execution model: scheduled ingestion via GitHub Actions cron with sequential jobs and idempotent retries.
2. Ingestion modes: API, compliant scraping, manual curation fallback.
3. Idempotent pipeline: fetch -> normalize -> provenance attach -> quality checks -> publish.
4. Robots policy checks and parser-version tracking on all source jobs.
5. Queue-backed workers are introduced only when retry/freshness thresholds breach upgrade triggers.

### Caching and Cost Control
1. Semantic answer cache for repeated public queries.
2. Cache key normalization with minimal/stripped user-identifiable text.
3. TTL + invalidation tied to source freshness and correction events.
4. Token usage and cost telemetry per request class.

### Observability and Quality
1. App/API error and latency monitoring.
2. Ingestion job health + freshness alerts.
3. Retrieval quality benchmarks (top-k relevance, support rate).
4. Parser drift alerts and golden dataset checks.
5. Trace-level debugging for retrieval context and selected citations.

## Known Trade-Offs and Upgrade Triggers
1. Lexical retrieval on Postgres full-text is a cost-efficient default but can under-rank complex legal/policy phrasing.
2. Trigger for dedicated lexical engine evaluation: benchmark relevance/support targets are repeatedly missed.
3. Trigger for queue infrastructure: sustained retry failures, schedule-window backlog growth, or repeated freshness breaches.

## Security and Compliance Baseline
1. Rate limits, abuse filters, and domain allowlists.
2. Encryption in transit and at rest.
3. Audit logs for admin/editorial actions.
4. Consent-first handling for special-category risk flows.

## CI/CD and Release Gates
1. Unit + integration test suite.
2. Playwright E2E smoke tests.
3. Lighthouse CI for performance and basic SEO health.
4. AI contract tests for schema/citation/fallback behavior.
5. RAG evaluation benchmarks (groundedness/faithfulness) required before release.
