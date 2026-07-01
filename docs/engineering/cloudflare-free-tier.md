# Cloudflare Free-Tier Notes

Last updated: 2026-07-01

## Purpose

This note captures what the project can reasonably leverage from Cloudflare while keeping operator email alerts cheap.

Cloudflare is not the planned app host. The Next.js application should deploy to Vercel. Cloudflare's role is domain/DNS, Email Routing, email aliases, and optional lightweight health-alert helpers.

Domain status: `plainpolitics.co.uk` is owned for the public launch.

## Relevant Cloudflare Capabilities

1. Cloudflare Email Routing is available on Free and Paid plans. It can route incoming email for addresses such as `corrections@`, `health@`, or `contact@` to verified destination addresses.
2. Cloudflare Email Service supports outbound email, but Cloudflare documents general Email Sending as available on the Workers Paid plan. It also states that sending to verified destination addresses is free on all plans, including when only Email Routing is configured.
3. Cloudflare Workers Free includes limited usage of Workers, Pages Functions, Workers KV, and Hyperdrive. Current documentation also lists Workers Logs on Free with limited daily log volume and short retention.
4. Cron Triggers can run Workers on a schedule in UTC and are intended for periodic jobs such as maintenance or calling third-party APIs.
5. Workers KV can store small cooldown or last-alert state on the Free plan, but it has daily read/write/list/delete limits.

Sources checked:

1. <https://developers.cloudflare.com/email-service/>
2. <https://developers.cloudflare.com/email-service/platform/limits/>
3. <https://developers.cloudflare.com/workers/platform/pricing/>
4. <https://developers.cloudflare.com/workers/configuration/cron-triggers/>

## Recommended Alerting Shape

Use Cloudflare for lightweight operator alerts, not app hosting or the full data pipeline.

Recommended flow:

1. Vercel hosts the Next.js app and preview deployments.
2. Ingestion jobs write source health to Supabase.
3. A small Vercel-hosted health endpoint exposes a signed, operator-only summary of source status.
4. A Cloudflare Worker Cron Trigger can check the health endpoint on a modest cadence.
5. The Worker sends email only to verified admin destination addresses.
6. KV or Supabase stores alert cooldown state so repeated failures do not create email floods.
7. Email Routing handles inbound addresses such as `corrections@` and `health@`.

Public launch aliases:

1. `hello@plainpolitics.co.uk` for general contact.
2. `corrections@plainpolitics.co.uk` for public corrections and source issues.
3. `health@plainpolitics.co.uk` for operator health alerts if Cloudflare Worker checks are enabled.

Alert email types:

1. Immediate exception: API failure, parser drift, source-contract failure, repeated empty results, or freshness breach.
2. Recovery: a previously failing source returns to healthy.
3. Daily digest: all source status, stale sources, last successful run, records changed, and next expected run.

Avoid:

1. Sending an email for every successful API call.
2. Public transactional email on Cloudflare Free unless the recipient is a verified destination address.
3. Treating Cloudflare Email Routing as a general outbound email provider.
4. Storing raw postcodes, user queries, or political preference data in alert payloads.
5. Reopening Cloudflare Pages/Workers app hosting unless Vercel becomes a real blocker.

## Upgrade Trigger

Consider Workers Paid or a dedicated transactional email provider only if:

1. Alerts must go to non-verified recipients.
2. The project needs public user-facing transactional email.
3. Health checks exceed Free plan Worker, KV, log, or email limits.
4. Alert deliverability and audit trails become operationally critical.
