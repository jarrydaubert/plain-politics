# Ink & Paper Design QA

Last updated: 2026-07-06

## Reference

- Accepted identity: `docs/brand/logo.md`
- Required behavior: `docs/brand/design-system.md`
- Live implementation: `https://plainpolitics.co.uk`

## Fidelity Ledger

| Reference quality | Implemented result |
| --- | --- |
| Deep navy ground with warm white type | Ink ground uses `#071f3a`; Paper and text use the shared warm-white family |
| Large editorial serif headline | Literata carries the homepage H1, page headings, card titles, and wordmark |
| Red punctuation as the restrained brand accent | The Full Stop mark, wordmark periods, and key editorial punctuation use record red |
| Quiet bordered panels on navy | The live Parliament panel uses the Ink panel and border tokens without gradients or decorative effects |
| Monospace evidence and metadata | Check times, receipts, labels, and read times use IBM Plex Mono |
| Full Stop mark works at navigation scale | The bare `P.` mark is used in the sticky header; tile artwork remains available for app icons |
| Dark identity does not overwhelm reading pages | Header, homepage orientation surface, and footer use Ink; longer reading surfaces use Paper |
| Responsive composition remains stable | Verified at 390, 768, and 1280 pixels with no root overflow or overlapping content |

## Intentional Deviations

- The public site uses a two-ground system rather than making every page dark. This preserves comfortable long-form reading while making the brand identity unmistakable.
- Eyebrows remain uppercase mono without artificial letter spacing, following the repository UI constraint that letter spacing stays at zero.
- Browser verification used repository Playwright when the in-app browser was unavailable. The preferred browser path and fallback rules are documented in `AGENTS.md`.

## Verification

- Homepage, glossary, Parliament, explainer detail, About, and Status checked at 390, 768, and 1280 pixels.
- Root width equalled viewport width in every checked route.
- Sticky header behavior, mobile navigation, focus treatment, reduced motion, and Ink/Paper contrast checked.
- `bun run test:e2e`: see the current verification result in the latest PR.
- `bun run check`: see the current verification result in the latest PR.

Final result: passed
