# UK Policy Explainer: Idea Brief

## One-Line Concept
A free, source-backed UK politics information tracker that explains what parties stand for, what their manifestos say, how popular they are, and what changed across polls, policies, donors, votes, and public records.

## Problem
Political information is fragmented across official publications, parliamentary records, and media summaries. Users can rarely:
1. Compare party positions in one place.
2. Verify claims against primary sources quickly.
3. Track policy changes over time with confidence.
4. Distinguish clear evidence from weak or missing evidence.

## Why This Matters Now
1. Trust in political content remains fragmented.
2. UK political information volume is high, while source verification is costly for users.
3. Public APIs, structured source ingestion, and transparent provenance now make auditable explainers practical at MVP budget.

## v1 Scope (UK)
1. Compare view for side-by-side party issue comparison.
2. Policies tracker with versioning and diff views.
3. Search and plain-English explainers with source links and uncertainty handling.
4. Money explorer for donor analysis.
5. Calendar of key political events.
6. Anonymous-first alignment quiz with transparent scoring.
7. Methodology and source directory pages.
8. Baseline observability and data quality controls.

## Phase Plan
1. Phase 1 (core trust engine): Party Profiles, Compare, Policies, Search/Explainers, Methodology/Sources, baseline observability.
2. Phase 2 (expansion): Money, Calendar, Dashboard enhancements, Quiz hardening.

## Trust and Compliance Principles
1. Source-first and source-gated factual content.
2. Public data treated as personal data when identifiable.
3. Anonymous-by-default flows for sensitive interactions.
4. Explicit consent before storing political-opinion signals.
5. Corrections workflow and public-facing methodology.

## Product Differentiator
1. Claim-to-source traceability for factual output.
2. Source trust tiers with explicit coverage gaps.
3. Neutrality standards applied as operational QA rules.
4. Freshness policies and visible `last verified` indicators.
5. Polling and political movement explained with source metadata and uncertainty.
6. A first-class `cannot verify from available public sources` state.

## Success Signals
1. Source-link CTR >= 25% on evidence-backed pages.
2. Source coverage rate >= 95% for factual summaries in the Phase 0 slice.
3. Source relevance QA pass rate >= 90%.
4. Freshness SLA adherence >= 95%.
5. Return rate >= 30%.

Secondary diagnostics:
1. User trust signal (`well-supported answer`).
2. Quiz completion rate.
3. Privacy request SLA.

## Core Risk
Data ingestion and normalization quality is the highest operational risk; source formatting drift and publication lag must be treated as first-class engineering work.
