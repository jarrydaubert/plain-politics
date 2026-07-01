# UK Policy Explainer: Idea Brief

## One-Line Concept
A free, source-backed, beginner-friendly UK politics starter that helps people understand the basics, start from their postcode, learn who represents them, see what parties stand for, and track what changed across polls, policies, donors, votes, and public records.

## Problem
Political information is fragmented across official publications, parliamentary records, and media summaries. Users can rarely:
1. Understand political basics without already knowing the vocabulary.
2. Start locally from a postcode and see their MP, constituency, and public record.
3. Compare party positions in one place.
4. Verify claims against primary sources quickly.
5. Track policy changes over time with confidence.
6. Distinguish clear evidence from weak or missing evidence.

## Why This Matters Now
1. Trust in political content remains fragmented.
2. UK political information volume is high, while source verification is costly for users.
3. Public APIs, structured source ingestion, and transparent provenance now make auditable explainers practical at MVP budget.

## v1 Scope (UK)
1. Beginner `Start Here` journey with plain-English cards and glossary support.
2. Postcode to `my area` starter: constituency, current MP, party, recent public record, and source links.
3. Compare view for side-by-side party issue comparison.
4. Policies tracker with versioning and diff views.
5. Search and plain-English explainers with source links and uncertainty handling.
6. Money explorer for donor analysis.
7. Calendar of key political events.
8. Anonymous-first alignment quiz or civic knowledge check, if retained.
9. Methodology and source directory pages.
10. Baseline observability and data quality controls.

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
1. Beginner-first journeys that make politics approachable without condescension.
2. Postcode-led local relevance before abstract national comparison.
3. Light gamification that rewards learning, source-checking, and exploration, not political preference.
4. Claim-to-source traceability for factual output.
5. Source trust tiers with explicit coverage gaps.
6. Neutrality standards applied as operational QA rules.
7. Freshness policies and visible `last verified` indicators.
8. Polling and political movement explained with source metadata and uncertainty.
9. A first-class `cannot verify from available public sources` state.

## Success Signals
1. Source-link CTR >= 25% on evidence-backed pages.
2. Source coverage rate >= 95% for factual summaries in the Phase 0 slice.
3. Source relevance QA pass rate >= 90%.
4. Freshness SLA adherence >= 95%.
5. Return rate >= 30%.

Secondary diagnostics:
1. User trust signal (`well-supported answer`).
2. Postcode starter completion rate.
3. Beginner journey completion rate.
4. Quiz or civic knowledge check completion rate, if retained.
5. Privacy request SLA.

## Core Risk
Data ingestion and normalization quality is the highest operational risk; source formatting drift and publication lag must be treated as first-class engineering work.
