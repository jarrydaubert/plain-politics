# Vercel Plugin Skill Policy

This note records which Vercel plugin skills are useful for Plain Politics and which ones are intentionally avoided. Plain Politics v1 is a beginner-first public information site with no AI product surface, no accounts, and a privacy-safe analytics posture.

## Use Now

| Skill | Why It Helps |
| --- | --- |
| `deployments-cicd` | Vercel previews, production deploys, rollbacks, and CI workflow checks. |
| `vercel-cli` | Project linking, deployment inspection, logs, domains, and env management. |
| `env-vars` | Safe Vercel environment variable setup for Supabase and public configuration. |
| `verification` | End-to-end checks across browser, API calls, data, and rendered response. |
| `nextjs` | Next.js App Router, server components, route conventions, and Vercel deployment behavior. |
| `react-best-practices` | TSX review for accessibility, performance, hooks, and component structure. |
| `turbopack` | Next 16 build/dev troubleshooting, since this repo uses Turbopack through Next. |
| `vercel-functions` | Future health endpoints, cron-triggered source checks, and server runtime choices. |
| `vercel-firewall` | Public-launch protection for public endpoints and high-traffic/error scenarios. |

## Use Later Or With Care

| Skill | Boundary |
| --- | --- |
| `next-cache-components` | Use when caching source-backed pages with explicit freshness rules. |
| `runtime-cache` | Useful for short-lived public API caching, but do not hide stale source data. |
| `vercel-storage` | Useful for comparison or small Vercel-native needs; Supabase remains the primary database. |
| `routing-middleware` | Use for redirects, headers, or request handling only when a real routing need appears. |
| `marketplace` | Use only if provisioning a Vercel integration deliberately. |
| `next-upgrade` | Use for framework upgrades and codemods. |
| `auth` | Not part of v1; revisit only for admin/editorial tools. |
| `workflow` | Possible future fit for durable ingestion, but start with simpler scheduled jobs. |
| `shadcn` | Use only if the project formally adopts shadcn/ui. Current UI can stay bespoke. |

## Avoid For V1

| Skill | Reason |
| --- | --- |
| `ai-gateway` | Pulls toward AI provider routing; not part of the product direction. |
| `ai-sdk` | No AI product surface in v1. |
| `chat-sdk` | Chatbots are out of scope. |
| `eve` | Agent framework is out of scope. |
| `vercel-agent` | May be useful for Vercel operations later, but avoid introducing AI tooling into product planning. |
| `vercel-connect` | OAuth/agent connection layer is unnecessary for v1. |
| `vercel-sandbox` | Running untrusted code is not a Plain Politics requirement. |

## Removed Locally

The following Vercel plugin skill folders were removed from the local Codex and Claude plugin caches because they are the wrong shape for this project:

- `microfrontends` - unnecessary complexity for a single public site
- `next-forge` - SaaS starter, wrong product model
- `bootstrap` - fresh-project provisioning, already past that stage
- `knowledge-update` - background Vercel context, not a project skill we actively use

Plugin updates may restore those folders. If they return, keep them out of project guidance unless the product direction changes.

## Operating Rule

When a Vercel skill suggests a capability that conflicts with Plain Politics v1, the project docs win. In particular: no AI product surface, no user accounts for v1, no political profiling, and no analytics that collect exact postcode, raw query text, or political opinion signals.
