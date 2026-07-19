# Domain And Analytics

## Current Shape

1. Vercel serves `https://plainpolitics.co.uk`.
2. `https://www.plainpolitics.co.uk` redirects to the apex domain with a `308`.
3. Cloudflare manages DNS and Email Routing.
4. `info@plainpolitics.co.uk` is the public contact address.

## Analytics

Plain Politics uses privacy-safe analytics defaults:

1. Vercel Web Analytics is rendered from the root layout.
2. GA4 uses `NEXT_PUBLIC_GA_ID`.
3. `NEXT_PUBLIC_ENABLE_ANALYTICS=false` disables Vercel Analytics and GA4 rendering.
4. GA4 only loads after a user allows analytics.
5. Do not send postcodes, raw search text, quiz answers, inferred political views, or party preference signals as analytics event parameters.

Current GA4 measurement ID:

```text
G-7Q838CKSMN
```

## Vercel Settings

Enable these in the Vercel project dashboard for `plain-politics`:

1. Web Analytics.

Set these environment variables for Development, Preview, and Production:

```text
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_GA_ID=G-7Q838CKSMN
```

## Verification

After production deployment:

1. Open `https://plainpolitics.co.uk`.
2. Confirm the analytics banner appears when no preference is stored.
3. Choose `Essential only` and confirm the GA4 script is not loaded.
4. Reset the preference or open `Analytics settings`, choose `Allow analytics`, and confirm GA4 receives a page view.
5. Confirm Vercel Web Analytics receives traffic.

## Current Vercel Status

As of 2026-07-19:

1. Vercel Web Analytics was recorded as enabled for `plain-politics` on 2026-07-02, but a 2026-07-19 production network capture observed no Vercel Analytics requests (`/_vercel/insights` or `va.vercel-scripts.com`) on page views. Consent-gated GA4 worked correctly in the same capture. See the backlog item to confirm the dashboard setting or remove the component.
2. `NEXT_PUBLIC_ENABLE_ANALYTICS=true` is set for Development, Preview, and Production.
3. `NEXT_PUBLIC_GA_ID=G-7Q838CKSMN` is set for Development, Preview, and Production.
