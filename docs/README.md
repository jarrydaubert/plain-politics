# Documentation

This directory separates current product truth and operating procedure from delivery priorities and historical observations.

## Evergreen documentation policy

| Document type | Owns |
| --- | --- |
| Runtime data | Current factual truth. Documentation does not duplicate changing political facts. |
| Methodology | How truth is established, reviewed and presented. |
| Runbooks | The current procedure for recurring work. |
| ADRs | Decisions and consequences. Supersede an ADR rather than rewriting its history. |
| `BACKLOG` | The only list of unfinished priorities, phase order, activation conditions and outcomes. |
| Dated reports | Point-in-time observations and historical delivery records. |
| Issues and PRs | Implementation detail, source evidence, discussion and verification. |
| `README` | Product entry point, current public capability and setup. |
| Generated status | Derived output that is never independently edited. |

Evergreen documents change with the behaviour, decision or procedure they describe. Dated reports remain historical. No other document may maintain a competing roadmap or todo list.

## Sections

- `product/` - durable product requirements, audience framing and success measures.
- `project/` - the authoritative evergreen backlog plus retirement pointers for historical plans.
- `engineering/` - current technical baseline, architecture decisions, data model and maintenance guidance.
- `ops/` - current operator runbooks.
- `methodology/` - source trust, citation, neutrality, polling and privacy standards.
- `quality/` - reusable release and feature-readiness gates.
- `brand/` - current identity and visual-system guidance plus dated research inputs.
- `market/` - competitive research and observations, never delivery priority.
- `strategy/` - durable product direction, source inventories and decision notes, never delivery order.
- `reports/` - dated assessments and historical delivery plans.

## Canonical entry points

- Product requirements: `product/prd-v2.md`
- Idea brief: `product/idea-brief.md`
- Unfinished priorities and order: `project/backlog.md`
- Technical baseline: `engineering/tech-stack.md`
- Documentation ownership: this file

## Root convention

The repository root is reserved for entrypoint documentation, app/tooling configuration, lockfiles, environment examples and deploy configuration. Product, planning, methodology, strategy, quality, market, brand, report and engineering documentation belongs under `docs/`.
