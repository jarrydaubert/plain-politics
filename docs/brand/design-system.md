# Plain Politics Design System

Last updated: 2026-07-05

This is the canonical visual direction for Plain Politics. It supersedes the notebook and highlighter treatment in the earlier redesign brief.

## Two Grounds

Plain Politics uses two deliberate grounds rather than one all-purpose theme.

### Ink

Ink is the brand and orientation ground. It is used for the sticky header, homepage hero, live orientation panel, footer, and social preview.

| Token | Value | Role |
| --- | --- | --- |
| `--ink-bg` | `#071F3A` | Main Ink ground |
| `--ink-panel` | `#0D2942` | Raised panels on Ink |
| `--ink-border` | `rgba(248, 250, 252, 0.16)` | Borders on Ink |
| `--paper-on-ink` | `#F8FAFC` | Primary text on Ink |
| `--muted-on-ink` | `#9DB0C7` | Secondary text on Ink |
| `--stop-red-on-ink` | `#E4425C` | Full stops and editorial marks on Ink |
| `--focus-on-ink` | `#8BD3FF` | Links and focus rings on Ink |

The `.ground-ink` scope remaps shared surface, text, border, and accent tokens. Components should continue to consume semantic tokens such as `--surface`, `--foreground`, `--muted`, and `--border`.

### Paper

Paper is the reading and data ground. It is used for glossary entries, explainers, forms, tables, source records, status details, and long-form copy.

Paper remains warm and quiet: `--background` is `#FBF8EE`, `--surface` is `#FFFDF8`, and body text is navy ink.

## Typography

- Literata 600: brand wordmarks, page titles, section headings, and reading moments.
- Atkinson Hyperlegible Next: navigation, controls, body text, labels, and tables.
- IBM Plex Mono: timestamps, source receipts, status metadata, read times, and editorial eyebrows.
- Hero and wordmark full stops use brand red. Ordinary body punctuation remains the text colour.

## Colour Semantics

- Brand red is punctuation and restrained editorial emphasis.
- `--ok-*`, `--warn-*`, and `--bad-*` are reserved for data health and operational state.
- Record blue is the Paper-ground action colour.
- Focus sky is the Ink-ground action and focus colour.
- Party colours may appear only when they reproduce an attributed public record.

## Component Rules

- The header and footer are Ink bookends.
- The homepage hero and live panel use Ink; the first question section begins the Paper horizon.
- Section pages use the shared `PageHeader`: mono eyebrow, Literata title, plain lede, and a 3px editorial rule.
- Question and journey tiles share one editorial card shell. Do not introduce pastel variants or icon-chip rows.
- Reading and data cards remain Paper surfaces with restrained borders.
- Tables keep semantic captions, headers, and local horizontal scrolling.
- Status badges keep their own semantic backgrounds on either ground.

## Retired Treatments

Do not reintroduce ruled-paper margins, notebook grids, highlighter swipes, pastel journey cards, decorative icon chips, gradient backgrounds, or hover-lift motion.

## Accessibility

- Paper text and controls must meet WCAG AA.
- Ink text uses `--paper-on-ink` or `--muted-on-ink`.
- Ink focus uses `--focus-on-ink`; Paper focus uses `--record-blue`.
- Respect `prefers-reduced-motion`.
- Every fixed-width table must scroll inside its own positioned wrapper without increasing root page width.

## Assets

The Full Stop mark and wordmark rules live in `docs/brand/logo.md`. Social previews and install surfaces use Ink so the first brand impression matches the live product.
