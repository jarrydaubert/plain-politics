# Plain Politics: Idea Brief

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
1. Beginner homepage that explains the site quickly and gives three clear routes: local MP, glossary, and Parliament today.
2. Postcode to `my area` starter: constituency, current MP, party, recent public record, and source links.
3. Political glossary and a few short civic explainers.
4. Parliament page using official public hooks for seats, upcoming business, and recent Commons divisions.
5. Sources and About pages that explain limits, attribution, contact, and corrections without making the homepage about methodology.
6. Public Vercel deployment, Cloudflare DNS/email, privacy-safe analytics, and basic CI quality gates.

## Product Evolution Context

This describes the product concept's broad evolution. It is not the current roadmap; `docs/project/backlog.md` owns unfinished outcomes, activation and order.

The product grows from beginner understanding into public party leadership, source-faithful manifesto and policy discovery, and only then fair comparison and change tracking. Platform capabilities are supporting work, activated when the current or imminent product outcome requires them. Polling, political finance, guided civic checks and broader discovery remain possible extensions rather than assumed milestones.

## Trust and Compliance Principles
1. Source-first and source-gated factual content.
2. Public data treated as personal data when identifiable.
3. Anonymous-by-default flows for sensitive interactions.
4. Explicit consent before storing political-opinion signals.
5. Corrections workflow and public-facing methodology.

## Product Differentiator
1. Beginner-first journeys that make politics approachable without condescension.
2. Postcode-led local relevance before abstract national comparison.
3. Low-pressure exploration without progress bars, badges, or unlock mechanics.
4. Claim-to-source traceability for factual output.
5. Source trust tiers with explicit coverage gaps.
6. Neutrality standards applied as operational QA rules.
7. Freshness policies and visible `last verified` indicators.
8. Polling and political movement explained with source metadata and uncertainty.
9. A first-class `cannot verify from available public sources` state.

## Success Signals
1. Source-link CTR >= 25% on evidence-backed pages.
2. Source coverage rate >= 95% for factual summaries in the v1 source-backed slice.
3. Source relevance QA pass rate >= 90%.
4. Freshness SLA adherence >= 95%.
5. Return rate >= 30%.

Secondary diagnostics:
1. User trust signal (`well-supported answer`).
2. Postcode lookup success rate.
3. Beginner route click-through rate.
4. Quiz or civic knowledge check engagement, if retained.
5. Privacy request SLA.

## Core Risk
Data ingestion and normalization quality is the highest operational risk; source formatting drift and publication lag must be treated as first-class engineering work.
