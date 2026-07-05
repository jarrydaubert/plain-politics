# Ink & Paper Design QA

## Reference

- Accepted visual direction:
  `/var/folders/w7/smr7zw112q55_g41ntxk4bjw0000gn/T/TemporaryItems/NSIRD_screencaptureui_mRNjJ2/Screenshot 2026-07-05 at 09.38.54.png`
- Final implementation capture: `/tmp/plain-politics-final-1280.png`
- Required behavior: `docs/brand/design-system.md`

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
- Browser verification used Playwright because the installed Chrome application has an invalid macOS code signature and the Codex extension backend cannot attach. The extension setup and recovery path are documented in `AGENTS.md`.

## Verification

- Homepage, glossary, Parliament, explainer detail, About, and Status checked at 390, 768, and 1280 pixels.
- Root width equalled viewport width in every checked route.
- Focus treatment, reduced motion, and Ink/Paper contrast checked.
- `bun run test:e2e`: 20 passed.
- `bun run check`: format, lint, typecheck, 34 unit tests, and production build passed.

Final result: passed
