# UK Policy Explainer: Action Plan

## Objective
Launch a UK-focused, source-first political information MVP with plain-English party/policy pages, live public-source tracking, strong provenance, and privacy-safe defaults.

## Current Strategic Read

The repo has strong planning, methodology, and governance standards. The main gap is not more principles; it is a working proof that turns those standards into a usable product.

Before attempting the full MVP, build a narrow proof-of-thesis slice. See `docs/strategy/phase-0-proof-of-thesis.md`.

## Phase 0: Proof Of Thesis

1. Choose one policy area and a small set of parties.
2. Define two to three authoritative source families.
3. Build source ingestion, provenance storage, source excerpts, and freshness states for that tiny corpus.
4. Ship Party Profiles, a Compare view, plain-English explainers, and source panels over only that corpus.
5. Treat `cannot verify from available public sources` as a valid product state.

Deliverables:
1. Source list and source contracts
2. Minimal provenance schema
3. Source panel with exact source excerpts
4. Source-backed Search/Explainers prototype
5. Methodology page for the slice

## Execution Plan

### Phase 1: Foundation and Ingestion
1. Finalize source trust framework, taxonomy v1, and provenance schema.
2. Stand up ingestion jobs for primary UK sources and snapshot storage.
3. Ship baseline quality controls: broken-link checks, freshness checks, parser version tracking.

Deliverables:
1. Methodology draft v1
2. Canonical data model + migration scripts
3. Ingestion pipeline v1 with scheduled sequential runs and idempotent retries

### Phase 2: Core Trust Engine
1. Build `Policies` tracker with versioning, diff, and correction workflow hooks.
2. Build `Compare` with canonical taxonomy selection and coverage indicators (discrepancy flagging deferred).
3. Build `Search and Explainers` with structured source references and coverage-gap handling.

Deliverables:
1. Policies and Compare MVP views
2. Search and Explainers UI with source references and uncertainty handling
3. Source-reference validation and no-unsupported-claim guardrails

### Phase 3: Quality, Security, and Beta Hardening
1. Add observability dashboards, golden dataset checks, and retrieval benchmarks.
2. Implement abuse controls, rate limits, and privacy workflows baseline.
3. Run closed beta; triage critical findings and correction backlog.

Deliverables:
1. FEAT-010 quality suite
2. FEAT-009 baseline workflows (form + inbox + SLA tracking)
3. Closed beta report with remediation plan

### Phase 4: Expansion and Launch Prep
1. Add `Money` explorer and `Calendar` v1.
2. Add `Dashboard` aggregation and SEO metadata hardening.
3. Finalize launch gates, legal sign-off artifacts, and go-live runbook.

Deliverables:
1. Money and Calendar MVP views
2. Dashboard v1
3. Launch checklist and incident response runbook

## Feature Sequencing Rule
1. Ingestion and source quality gates are mandatory before front-end feature launch.
2. Compare and Policies must be stable before Dashboard dependency rollout.
3. Search/Explainers release requires passing source-reference and coverage-gap checks.
4. Discrepancy indicators (vote vs stated policy) are Phase 2 stretch work after vote-policy mapping quality is validated.

## Launch Gates (Must Pass)
1. Data freshness checks passing across active datasets.
2. Source-reference validation tests passing.
3. Abuse/security controls enabled.
4. Legal and privacy review complete for sensitive flows.
5. Editorial neutrality standards validated.
6. Closed beta completed with critical issues triaged.

## Post-Beta Priorities
1. Quiz hardening with explicit consent pathways.
2. Vote-to-policy discrepancy indicators with methodology and QA thresholds.
3. Improve donor entity resolution and trend quality.
4. Expand source coverage and taxonomy depth.
5. Optimize caching and ingestion scheduling for cost control.

## Operational Upgrade Triggers
1. Introduce queue-backed workers if retry failure/backlog/freshness thresholds are breached.
2. Evaluate dedicated lexical search engine if retrieval benchmark targets are repeatedly missed.
