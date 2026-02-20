# Decision Log

## DEC-001: Canonical Product Spec
- Decision: `PRD_V2.md` is the canonical product specification.
- Rationale: Consolidates reviewer-verified corrections into one source of truth.
- Impact: Other docs (`IDEA_BRIEF.md`, `TECH_STACK.md`, `UK_POLICY_EXPLAINER_ACTION_PLAN.md`) must remain aligned to PRD v2.

## DEC-002: MVP Architecture Baseline
- Decision: Use Next.js 16.x + Supabase Postgres/pgvector + Vercel AI SDK + GitHub Actions.
- Rationale: Low operational overhead, budget-friendly launch path, and strong support for citation-grounded RAG workflows.
- Alternatives considered: Prior FastAPI/AWS/OpenSearch-heavy path.
- Why not chosen: Higher ops complexity and cost for initial MVP.

## DEC-003: Retrieval Strategy
- Decision: Start with hybrid retrieval (Postgres full-text + pgvector).
- Rationale: Minimizes infrastructure and simplifies early delivery.
- Known trade-off: Postgres lexical ranking can underperform on complex legal/policy phrasing.
- Revisit trigger: If retrieval benchmark relevance/support misses target repeatedly, evaluate dedicated lexical engine.

## DEC-004: Ingestion Execution Model
- Decision: MVP uses sequential scheduled jobs with idempotent retries (no dedicated queue at launch).
- Rationale: Reduces moving parts while source volume is still manageable.
- Revisit trigger: Introduce queue-backed workers if retry failure/backlog/freshness thresholds are breached.

## DEC-005: Embedding Default
- Decision: Default embedding model is `BAAI/bge-small-en-v1.5` (384 dimensions), behind provider-agnostic interface.
- Rationale: Good quality/cost profile for MVP and easy migration path to managed alternatives.
- Revisit trigger: Switch/upgrade if benchmark relevance fails target or latency/cost profile degrades.

## DEC-006: Success Metrics Prioritization
- Decision: Use 5 primary decision metrics (citation CTR, answer support, citation relevance QA, freshness SLA, return rate); keep remaining metrics as secondary diagnostics.
- Rationale: Small team needs clear go/no-go signals without over-instrumenting early execution.

## DEC-007: Compare Discrepancy Scope
- Decision: Vote-vs-policy discrepancy indicators are Phase 2 stretch scope.
- Rationale: High user value but high methodology and data quality complexity.
- Revisit trigger: Promote when vote ingestion and vote-policy mapping quality are stable in production benchmarks.
