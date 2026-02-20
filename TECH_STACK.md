# UK Policy Explainer: Technical Stack

Last updated: February 20, 2026

## Architecture Goals
1. Retrieval-first answers with strict source grounding
2. Fast response times (<15s median)
3. Clear provenance, versioning, and auditability
4. Safe handling of high-risk legal/political queries

## Recommended Stack (v1)

### Frontend
1. Next.js (App Router) + TypeScript
2. Tailwind CSS for rapid UI iteration
3. Server-side rendering for SEO-heavy question pages

### API Layer
1. FastAPI (Python) for answer orchestration and retrieval
2. REST endpoints for client app and future partner integrations
3. OpenAPI schema published from day one

### Data + Search
1. PostgreSQL as system of record
2. `pgvector` for semantic retrieval
3. OpenSearch (or Elasticsearch) for BM25 lexical retrieval
4. Redis for hot-answer and session caching

### Ingestion + Jobs
1. Python workers for source ingestion and normalization
2. Temporal (preferred) or Celery for scheduled/update workflows
3. Daily and event-driven refresh jobs with stale-content alerts

### LLM Layer
1. Provider abstraction with primary + fallback model
2. Retrieval-augmented generation only
3. Citation-gated answer policy:
   - Missing source evidence blocks final answer

### Infrastructure
1. Dockerized services
2. AWS baseline:
   - ECS/Fargate for services
   - RDS Postgres
   - OpenSearch service
   - ElastiCache Redis
   - S3 for document snapshots and raw source archives
3. Terraform for infrastructure as code

### Observability + Quality
1. OpenTelemetry tracing end-to-end
2. Sentry for errors
3. Prometheus + Grafana for service metrics
4. Structured logs with request ID and answer version ID

## Core Data Sources
1. legislation.gov.uk API (laws, updates, metadata)
2. UK Parliament Bills API (bill status/stages/publications)
3. GOV.UK guidance pages
4. ONS statistical releases
5. Official party policy/manifesto documents

## Data Model (Minimum)
1. `source_document`
2. `source_snapshot`
3. `document_chunk`
4. `question`
5. `answer_version`
6. `answer_citation`
7. `correction_event`
8. `review_audit`

## Answer Pipeline
1. Classify intent and topic
2. Retrieve lexical + semantic candidates
3. Re-rank by source authority and freshness
4. Generate draft response with explicit schema sections
5. Validate citation coverage and source-type labels
6. Apply safety policy checks
7. Return answer with version ID, citations, and timestamp

## Reliability and Safety Controls
1. No-citation no-answer policy
2. Source freshness SLA and automated stale checks
3. High-risk query escalation queue for human review
4. Full answer and prompt audit trail
5. Rollback-capable answer versioning

## Security and Compliance Baseline
1. Data minimization by default
2. No inferred political-profile personalization
3. Encryption at rest and in transit
4. Role-based access control for admin/review tools
5. Retention and deletion policies for user query logs

## API Surface (v1)
1. `POST /v1/ask`
2. `GET /v1/answers/{answer_id}`
3. `GET /v1/answers/{answer_id}/sources`
4. `GET /v1/topics/{topic}/changes`
5. `POST /v1/feedback`
6. `POST /v1/follow-topic`

## Testing Strategy
1. Unit tests for retrieval, ranking, and policy guards
2. Integration tests for end-to-end answer generation
3. Golden-set evaluation with 100+ audited questions
4. Regression suite for known failure cases
5. Load testing for peak traffic during policy events

## Team to Execute v1
1. 2 full-stack/product engineers
2. 1 data/platform engineer
3. 1 legal QA/editor (part-time to full-time)
4. 1 product lead/founder handling policy and trust ops

## Delivery Timeline (Aligned to Plan)
1. Weeks 1-2: methodology + schema + audit framework
2. Weeks 3-7: ingestion/retrieval/citation enforcement
3. Weeks 8-11: closed pilot with legal QA and metrics
4. Weeks 12-16: public beta and distribution

## Non-Negotiable Exit Criteria for Beta
1. >=90% materially correct audited answers
2. <15s median response
3. >=30% source click-through
4. >=25% 7-day repeat usage
5. Zero severe trust or legal incidents
