# First Policy Area Decision: Housing

Last updated: 2026-07-19
Status: decided on `feature/first-policy-area`; implementation not started
Access dates: all source URLs verified live on 2026-07-19 unless noted

## Decision

The first Plain Politics party-and-policy area is **Housing**.

The first comparison covers five parties — Labour, the Conservatives, the Liberal Democrats, Reform UK, and the Green Party of England and Wales — using the 2024 general-election manifestos as the comparable baseline, current official policy pages where they exist, and parliamentary records for what has actually happened since.

NHS and health, and Tax and the economy, were assessed as full candidates and should wait. The reasons are recorded below so the next decision does not repeat this work.

## First Subtopic Set (Tightly Bounded)

1. **Housebuilding targets and planning reform** — how many homes, by when, and what each party says about the planning system.
2. **Private renting** — tenancy reform, eviction rules, and rent measures.
3. **Home ownership support** — first-time buyer, stamp duty, and mortgage measures.
4. **Social and affordable housing** — social housebuilding, Right to Buy, and affordability definitions.

Out of scope for the first slice: homelessness and rough sleeping, leasehold reform, building safety, temporary accommodation, and housing benefit. These are real subtopics; they wait until the four above render fairly.

Geographic scope must be labelled: most housing, planning, and renting policy is England-only or England-and-Wales; housing is devolved in Scotland, Wales, and Northern Ireland. Every comparison surface must carry this caveat.

## Parties And Source Types That Can Be Included

| Party | 2024 GE manifesto | Current official policy page | Later official documents | Parliamentary records |
| --- | --- | --- | --- | --- |
| Labour | Yes — HTML chapters | Partial — manifesto site retained; in government, policy now expressed through legislation and gov.uk | Government bills and plans (label as government, not party, where sourced from gov.uk) | Yes — full |
| Conservatives | Yes — PDF | Yes — `conservatives.com/plan` and `policy.conservatives.com` under current leadership (May 2026 content observed) | Yes — Alternative King's Speech PDF | Yes — full |
| Liberal Democrats | Yes — HTML chapters + accessible PDF + costings | Yes — `libdems.org.uk/policy` policy papers | Conference policy papers | Yes — full |
| Reform UK | Yes — "Our Contract with You" PDF (text-extractable) | Site blocks non-browser access (HTTP 403 to fetch tools); PDF remains directly accessible | Not verified | Yes — full |
| Green Party (E&W) | Yes — HTML manifesto pages | **No** — `policy.greenparty.org.uk` (Policies for a Sustainable Society) now redirects to a members-only Auth0 login (verified 2026-07-19) | Not verified | Yes — limited Commons presence (4 MPs) |

Source types for the first slice, in trust order:

1. 2024 general-election manifesto (all five parties; the only fully symmetric baseline).
2. Current official party policy pages (Conservatives, Liberal Democrats; Labour partially; label retrieval date prominently).
3. Official parliamentary records the app already consumes via API — bills, divisions, written questions (asymmetric by seat count; used as "what happened", never as "what the party believes").
4. Government publications (gov.uk) — context only, always labelled as government output, never attributed as Labour party policy.

## Representative Official Source URLs (verified 2026-07-19)

- Labour manifesto hub: `https://labour.org.uk/change/` (HTTP 200)
- Labour housing commitments (inside the growth chapter — note: Labour has no dedicated housing chapter): `https://labour.org.uk/change/kickstart-economic-growth/` (HTTP 200; contains "1.5 million new homes" and planning-reform text)
- Conservative GE2024 manifesto PDF: `https://public.conservatives.com/static/documents/GE2024/Conservative-Manifesto-GE2024.pdf` (HTTP 200)
- Conservative current policy: `https://www.conservatives.com/plan` (HTTP 200; May 2026 content) and `https://policy.conservatives.com` (HTTP 200)
- Liberal Democrat manifesto: `https://www.libdems.org.uk/manifesto` (HTTP 200; dedicated Housing chapter 14; accessible PDF set and costings under `/fileadmin/.../Manifesto_2024/`)
- Liberal Democrat policy papers: `https://www.libdems.org.uk/policy` (HTTP 200)
- Reform UK "Our Contract with You" PDF: `https://assets.nationbuilder.com/reformuk/pages/253/attachments/original/1718625371/Reform_UK_Our_Contract_with_You.pdf` (HTTP 200; dedicated Housing section p.15; text extraction verified)
- Green Party 2024 manifesto: `https://greenparty.org.uk/about/our-manifesto/` (HTTP 200 with a browser user agent; blocks generic fetch tools with 403)
- Green Party long-term policy site: `https://policy.greenparty.org.uk/` (redirects to members-only login — treat as unavailable)
- Renters' Rights Bill record: `https://bills.parliament.uk/bills/3764` (403 to fetch tools; loads in a browser; division data available via the Commons Votes API the app already uses)
- Commons Votes API (already integrated): `https://commonsvotes-api.parliament.uk/data` (HTTP 200)

## Coverage Gaps And Comparison Risks

1. **Green current policy is gated.** Only the 2024 manifesto is publicly attributable. The Green column must say "2024 manifesto" wherever other parties show newer material, with a visible coverage-gap state rather than silent reuse.
2. **Labour is the governing party.** Its current housing position is partly expressed through government action (Renters' Rights Act, planning legislation). Comparing "what Labour promises" with "what the government did" across one row risks category error; the slice must keep manifesto commitments and parliamentary outcomes as separate, labelled evidence types.
3. **Two parties are PDF-first** (Conservatives GE2024, Reform). Exact excerpts need page-number locators, not HTML anchors.
4. **Bot-blocking**: reformparty.uk, greenparty.org.uk, and bills.parliament.uk block non-browser fetchers. Snapshot capture must record the access method; automated re-checks may need browser-based retrieval or manual refresh with recorded dates.
5. **Asymmetric freshness**: Conservative current-policy content is actively updated under the current leadership; Reform and Green public positions are mostly frozen at GE2024. Retrieval dates and document dates must render prominently to prevent false equivalence.
6. **Vague-language risk**: manifesto housing numbers are concrete (homes targets, stamp-duty thresholds), which is why this area was chosen — but planning-reform language is programmatic. Where a party states an aspiration without a mechanism, the comparison must quote it as an aspiration, not normalise it into a target.

## Minimum Provenance Model For The Implementation Slice

Static, repo-reviewed data (no Supabase, no ingestion jobs yet):

```
SourceDocument {
  id                  stable slug, e.g. "labour-change-2024-growth"
  party               party id or "government"
  sourceType          "manifesto-2024" | "current-policy-page" | "official-pdf" | "parliamentary-record" | "government-publication"
  title, publisher
  url                 public URL
  format              "html" | "pdf"
  documentDate        date the publisher gives the document
  retrievedAt         ISO timestamp of capture
  contentHash         sha256 of captured content
  accessMethod        "direct" | "browser-ua" | "manual"
  accessNotes         licence, paywall/login, bot-blocking notes
}

Excerpt {
  id, sourceDocumentId
  exactText           verbatim quote, unedited
  locator             HTML heading/anchor or PDF page number
  subtopic            one of the four bounded subtopics
  reviewStatus        "draft" | "reviewed"
}
```

Rules: a party-position statement may only cite a reviewed Excerpt; a party × subtopic cell with no reviewed excerpt renders a coverage-gap state; nothing on a public route until reviewed.

## Smallest End-To-End Vertical Slice

One subtopic — **housebuilding targets and planning reform** — five parties, on this feature branch:

1. Checked-in `SourceDocument` and `Excerpt` data files for the five manifesto sources (plus Conservative current-policy page), each with hash, retrieval date, and locator.
2. One identically structured comparison card per party: subtopic heading, verbatim excerpt, source link, document date, retrieved date, geographic caveat — reusing the existing `EvidenceDisclosure` component for the provenance panel.
3. Explicit coverage-gap rendering for any party without a reviewed excerpt.
4. No public navigation exposure; the route ships only when the neutrality review passes.

Acceptance criteria:

- Every displayed party position quotes a verbatim excerpt with a working source URL, document date, retrieval date, and locator.
- All five party cards use exactly the same section structure and ordering.
- Coverage gaps are visibly labelled, never silently omitted or inferred.
- No motive, ranking, scoring, delivery-judgement, or voting-advice language anywhere on the surface (checked against `docs/methodology/neutrality-standard.md`).
- Geographic scope caveat renders on the comparison surface.
- Deterministic tests assert structure parity across parties, excerpt-to-source linkage, and the coverage-gap state.
- `bun run check:repo`, `bun run test:e2e`, and `bun run build` pass.

## Why The Rejected Candidates Should Wait

**NHS and health.** Weakest on fair comparability and simplification risk. Health is the most sharply devolved of the three areas (NHS England vs Scotland/Wales/NI), the governing party's evidence is dominated by large government programmes (the 10 Year Health Plan is a gov.uk publication, not a party page), and the topic's emotional weight makes neutral framing hardest as a first proof. Opposition positions are also less numerically concrete than housing commitments, inviting paraphrase — exactly what the excerpt-first model must avoid learning to do first.

**Tax and the economy.** Weakest on stability and update burden. Positions shift at every fiscal event (two per year), thresholds and mechanisms are technically trappy (fiscal drag, allowances), and the Conservative economic offer is mid-renewal under current leadership, so a captured snapshot would age fastest of the three areas. Manifesto tax pledges are also frequently conditional, which makes an identically structured beginner-safe comparison materially harder than counting homes.

Housing wins on: concrete countable commitments from all five parties, a symmetric 2024 baseline, an active but bounded legislative record the app already reads via official APIs, moderate update burden, and daily-life beginner relevance (rent, buying, affordability).
