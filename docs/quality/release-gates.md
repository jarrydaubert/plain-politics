# Release Gates

This checklist translates the PRD and methodology standards into operational gates.

## Before Building A Feature

1. Identify primary sources and fallback coverage gaps.
2. Define required provenance fields.
3. Define freshness thresholds.
4. Define neutrality QA cases.
5. Define accessibility risks and expected keyboard flow.
6. Define analytics events with privacy review.

## Before Shipping A Feature

1. Unit and integration tests pass.
2. Source contract tests pass for ingestion and parsed records.
3. Source-reference checks pass: no orphan factual claims.
4. Accessibility checks pass WCAG 2.2 AA baseline.
5. Security review covers input validation, rate limits, and secret exposure.
6. Privacy review covers retention, consent, and user-identifiable data.
7. Performance budget is measured on the relevant route or API.
8. Methodology links are present for user-facing evidence workflows.

## Launch Gates

1. Data freshness checks pass across active datasets.
2. Source-reference validation suite passes.
3. Abuse controls and rate limits are enabled.
4. Privacy notice and DPIA scope are approved.
5. Editorial neutrality standards are validated.
6. Closed beta feedback is documented and critical issues are triaged.
