# Plain Politics Logo

## Selected Direction

Plain Politics uses an abstract crowned `P` mark: a simple navy app tile, an off-white constructed `P`, and a restrained red crown accent. It gives the brand an obvious UK civic cue without copying official government, royal, heraldic, or party marks.

## Why This Route

- Strong at favicon and mobile-icon sizes.
- British enough to feel local, but not so ceremonial that it looks affiliated with the state or monarchy.
- Works with the existing Union Jack-inspired palette: navy for structure, off-white for clarity, red for a small attention accent.
- Keeps the mark beginner-friendly and direct; the site should feel like a clear civic guide, not a think-tank seal.

## Avoided Routes

- Realistic crowns, lions, crests, coats of arms, and official-looking seals.
- Red-dominant logo treatments, which would read too party-coded and too close to alert/error UI.
- Ballot ticks as the primary symbol, because Plain Politics is broader than voting day.
- Dense heraldic detail, because it fails at favicon size.

## Assets

- `public/icon.svg` - scalable source web and app icon.
- `public/icon-192.png` and `public/icon-512.png` - web manifest app icons.
- `public/apple-touch-icon.png` - iOS home-screen icon.
- `public/apple-icon.svg` - SVG fallback.
- `public/plain-politics-mark.svg` - reusable standalone mark.
- `public/plain-politics-mark-mono.svg` - one-colour fallback.
- `public/plain-politics-wordmark.svg` - inspection wordmark asset.
- `src/components/plain-politics-logo.tsx` - inline React mark used by the site header.

## Production Notes

The SVG is the source of truth. PNG app icons at 180, 192, and 512 pixels are exported from that SVG. Before major public launch, run a basic trademark/confusion check for the name and mark.
