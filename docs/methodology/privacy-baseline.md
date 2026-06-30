# Privacy Baseline

## Purpose

UK Policy Explainer handles political information and may process user interactions that reveal political opinions. Privacy-safe defaults are required before any implementation work.

## Defaults

1. Let users browse and compare without an account.
2. Keep the alignment quiz anonymous by default.
3. Do not store political alignment, quiz answers, or inferred opinions without explicit consent.
4. Minimise analytics events and avoid unnecessary identifiers.
5. Do not log raw user questions unless there is a documented retention policy and redaction strategy.
6. Strip unnecessary user-identifiable text before semantic caching.
7. Provide access, deletion, correction, and export request paths before storing optional user data.

## Review Gates

Complete privacy review before:

1. Personalisation features.
2. Saved quiz or alignment results.
3. Account creation.
4. Newsletter or CRM integration.
5. Donor, MP, or user-facing profile enrichment.
6. Any analytics change that introduces persistent identifiers.

## Documentation Required

- Privacy notice
- Retention policy
- Consent event schema
- DPIA scope note for political opinion signals
- Privacy review note for each feature that processes political opinion signals
