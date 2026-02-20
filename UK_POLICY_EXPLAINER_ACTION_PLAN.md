# UK Policy Explainer: One Actionable Plan

Start date: February 23, 2026
Target: Public beta by June 2026

## Objective
Build a trust-first UK law and policy explainer that provides plain-English answers backed by primary sources, with fast verification and clear uncertainty labels.

## 16-Week Execution Plan

### Phase 1: Trust Architecture (Weeks 1-2, Feb 23-Mar 6)
1. Publish methodology: source hierarchy, correction policy, escalation policy, and versioning.
2. Lock response schema:
   - Direct answer
   - Source type (law / guidance / data / party policy)
   - What is unclear or disputed
   - Primary sources
3. Add baseline legal and compliance controls:
   - "Not legal advice" labeling
   - Topic following only (no inferred political profiling)
   - Per-answer audit logs and timestamps

Deliverables:
- Public methodology page
- Internal editorial playbook v1
- Response schema spec v1

### Phase 2: Retrieval + Evidence Engine (Weeks 3-7, Mar 9-Apr 10)
1. Ingest primary sources first:
   - legislation.gov.uk API
   - UK Parliament Bills API
   - GOV.UK guidance pages
   - ONS statistical releases
2. Implement version tracking and "what changed" answer diffs.
3. Enforce citation gating:
   - If evidence is missing, decline or return "insufficient evidence."
4. Build verification-first UX:
   - Clause snippets
   - Source links
   - Last-reviewed timestamp

Deliverables:
- Ingestion pipeline v1
- Retrieval + citation middleware
- Evidence-first answer view

### Phase 3: Closed Pilot (Weeks 8-11, Apr 13-May 8)
1. Launch pilot on one lower-heat domain: employment rights.
2. Collect 100 real user questions.
3. Run legal QA sampling and error classification.
4. Measure trust and usage behavior.

Pilot KPIs:
- >=90% materially correct source-backed answers
- Median time-to-answer <15s
- >=30% source click-through
- >=25% 7-day repeat usage
- No severe trust or legal incident

Deliverables:
- Pilot results report
- Corrections and drift log
- Risk register update

### Phase 4: Public Beta + Distribution (Weeks 12-16, May 11-Jun 5)
1. Launch public beta with search and share cards.
2. Add weekly digest email for followed topics.
3. Prioritize distribution:
   - SEO landing pages by question intent
   - Journalist/newsletter embeds
   - Shareable explainers for high-interest topics
4. Keep scope tight (do not ship yet):
   - No claim-check verdict engine
   - No community moderation layer
   - No partisan recommendation features

Deliverables:
- Public beta release
- Distribution dashboard
- Incident response runbook

### Phase 5: Go/No-Go Gate (Week 17, Jun 8-12)
Go forward only if all core thresholds hold:
1. Accuracy >=90% on audited responses
2. Median response time <15s
3. Source click-through >=30%
4. 7-day repeat usage >=25%
5. No major trust or legal incident

If thresholds are missed:
- Reposition to B2B/API civic infrastructure rather than consumer-first.

## Product Scope for v1

In scope:
1. Ask a question in plain English
2. Source-backed answer with explicit source-type labels
3. "Show exact clause" source verification
4. "What changed" answer version diff
5. Topic follow via weekly digest

Out of scope:
1. Claim-check verdict taxonomy
2. Community flagging and moderation marketplace
3. Push alerts and personalization based on political inference
4. Party scorecards or ideological ranking

## Operating Principles
1. Trust is the moat, not model novelty.
2. Primary sources before commentary.
3. Separate law, policy, and data in every answer.
4. Correct quickly and publicly when wrong.
5. Design for legal defensibility and auditability from day one.

## Team and Funding Recommendations
1. Team for first 4 months:
   - 2 engineers (retrieval + product)
   - 1 engineer (data ingestion/platform)
   - 1 legal QA/editor (part-time to full-time)
2. Structure:
   - Mission-first hybrid (CIC/social enterprise posture first)
3. Initial runway target:
   - 6-9 months with grant + impact-aligned capital mix

## First Risks to Manage
1. Legal liability from materially wrong answers
2. Perceived bias from framing choices
3. Accuracy drift as laws/guidance change
4. Distribution dependence on controversy spikes
5. Competitive pressure from major AI platforms and GOV.UK chat tools

## Immediate Next Actions (Next 10 Days)
1. Draft and publish methodology + corrections policy.
2. Stand up ingestion for legislation.gov.uk and Parliament Bills API.
3. Build citation-gated answer endpoint.
4. Recruit legal QA reviewer for pilot.
5. Prepare 100-question pilot bank for employment rights.
