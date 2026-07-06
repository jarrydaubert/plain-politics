# Plain Politics Logo

Last updated: 2026-07-06

## Selected Direction

Plain Politics uses the **Full Stop** mark: a navy app tile, a single constructed off-white `P`, and a red full stop sitting on the baseline. The wordmark is `Plain Politics.` — always ending in the red stop.

## Why This Route

- The full stop is the plain-English movement's own symbol: short sentences, claims that end, no spin trailing off. It ties the mark to the product's mission rather than to geography or UI.
- Strong at favicon and mobile-icon sizes: two geometric shapes, still unmistakably "P-dot" at 16 px.
- Politically neutral: a red dot reads as punctuation and ink, not as a rosette or party colour.
- Timeless: no stylistic era to date it; punctuation has anchored editorial identities for a century.
- Gives the whole product a punctuation system it can own — headlines, receipt lines ("Checked 14:32."), and the wordmark all end in the red stop.

## Colour Rules

- Tile: navy `#071F3A`. Letterform: off-white `#F8FAFC`.
- The full stop is **`#D62E4C` on the navy tile**, **`#E8506A` through `--stop-red` on Ink**, and **`#C8102E` through `--stop-red` on Paper**.
- The bare inline mark consumes `--stop-red`, so the surrounding ground selects the accessible red automatically.
- One-colour fallback: everything off-white on navy (`plain-politics-mark-mono.svg`), or everything ink-navy on transparent for print.
- Red is punctuation and editorial emphasis. Data-health red uses the separate `--bad-*` semantic tokens.

## Avoided Routes

- The previous crowned `P`: the three-peak ribbon read as a heart-rate spike at small sizes, the double-P joint muddied the letterform, and the crown duplicated UK-signalling the name already does in words.
- Realistic crowns, lions, crests, coats of arms, and official-looking seals.
- Red-dominant treatments, which read party-coded and too close to alert/error UI.
- Ballot ticks, because Plain Politics is broader than voting day.

## Assets

- `public/icon.svg` - scalable source web and app icon (rounded tile).
- `public/icon-192.png` and `public/icon-512.png` - web manifest app icons (full-bleed square; the manifest declares them maskable, so the platform applies its own corner mask).
- `public/apple-touch-icon.png` - iOS home-screen icon (full-bleed square; iOS applies the mask).
- `public/apple-icon.svg` - SVG fallback (full-bleed square).
- `public/plain-politics-mark.svg` - reusable standalone mark.
- `public/plain-politics-mark-mono.svg` - one-colour fallback.
- `public/plain-politics-wordmark.svg` - inspection wordmark asset.
- `src/components/plain-politics-logo.tsx` - inline React mark used by the site header.
- `docs/brand/design-system.md` - canonical guidance for Ink and Paper grounds.

## Production Notes

The SVG is the source of truth. PNG app icons at 180, 192, and 512 pixels are rendered from the full-bleed variant of that SVG (Playwright screenshot of the inline SVG works; keep the square un-rounded for maskable/iOS icons).

The brand serif is Literata (loaded on the site via `next/font`). The wordmark SVG sets its type in Literata with a Charter/Georgia fallback stack; before print or third-party use, redraw `plain-politics-wordmark.svg` with the Literata text converted to outlines so it renders identically without the font installed.

Before major public launch, run a basic trademark/confusion check for the name and mark.
