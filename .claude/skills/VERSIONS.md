# Skills Versions

Canonical inventory for Politics Platform skills, with clear separation between upstream (vanilla) content and project customization.

## Upstream Source

Skills are sourced from [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills). Use this file when syncing or auditing drift.

## Separation of Concerns

### 1) Upstream/Vanilla Layer
- Base methodology in each skill is synced from upstream.
- `references/` are upstream-first assets.

### 2) Politics Platform Custom Layer
- Every skill includes a `## Politics Platform Context` section for local rules, constraints, and file paths.
- Politics Platform context can override generic advice where needed (civic information model, source-first trust, political neutrality, GDPR/special-category data).

### 3) Project-Only Skills
- `accessibility/`
- `engineering/`

## Editing Rules

- Prefer keeping upstream content intact when possible.
- Put project-specific guidance in `## Politics Platform Context` rather than editing upstream methodology sections.
- If an upstream reference file is edited for local correctness, log it in **Recent Changes**.
- Keep naming consistent with current product language.

## Upstream-Synced Skills (4)

| Skill | Version | Last Updated |
|-------|---------|--------------|
| ai-seo | 1.2.0 | 2026-02-20 |
| analytics-tracking | 1.2.0 | 2026-02-20 |
| programmatic-seo | 1.2.0 | 2026-02-20 |
| schema-markup | 1.2.0 | 2026-02-20 |

## Project-Only Skills

| Skill | Version | Last Updated |
|-------|---------|--------------|
| accessibility | 1.1.0 | 2026-02-20 |
| engineering | 1.0.0 | 2026-02-20 |

## New Skill Alignment Standard

When adding a new upstream skill to this project:
- Use `metadata.version` in frontmatter (match upstream convention).
- Add a `## Politics Platform Context` section with:
  - what applies to this project,
  - what does not apply by default,
  - key file paths and event/metric definitions.
- Remove or correct stale references to excluded skills.
- Normalize terminology to current product naming.

## Skills Available for Future Porting

From the upstream repo (v1.2.0), these skills are available to port when needed:
- content-strategy
- copywriting
- copy-editing
- launch-strategy
- social-content
- marketing-psychology
- free-tool-strategy
- product-marketing-context
- seo-audit
- competitor-alternatives
- marketing-ideas
- email-sequence

## Recent Changes

### 2026-02-20
- Initial skill port from upstream marketingskills repo.
- Ported 6 skills: programmatic-seo, schema-markup, ai-seo, engineering, accessibility, analytics-tracking.
- All upstream methodology preserved; project-specific Context sections added as Politics Platform Context.
- Copied upstream reference files for ai-seo, programmatic-seo, schema-markup, analytics-tracking.
