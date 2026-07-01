# Beginner-First Product Direction

Last updated: 2026-07-01

## Product Shift

The product should feel less like a static research database and more like a guided politics starter for people who know little or nothing about UK politics.

The core promise:

```text
Start with my postcode or an issue, explain the basics, show the public evidence, and let me go deeper without getting lost.
```

## Core Journey

1. User starts from a postcode, an issue, or `I do not know where to start`.
2. The site shows the user's constituency, current MP, party, and Commons membership start date.
3. The page explains the basic vocabulary in-line: MP, constituency, party, division, sitting day, written question, manifesto.
4. The user sees recent source-backed public activity: votes, written questions, debate activity, upcoming Parliament business, and coverage gaps.
5. The user can open the evidence behind any factual claim.
6. The user can jump sideways to the party, constituency, policy area, or source page.
7. The user always has an obvious way back to the previous level.
8. The user can open a glossary page for political jargon, procedures, and traditions without losing their place.
9. The user can move from a glossary term to a fuller evergreen explainer when the subject deserves more than a short definition.

## Light Gamification

Gamification should make exploration feel rewarding without turning the site into political persuasion.

Allowed mechanics:

1. Progress through beginner modules such as `Find your MP`, `Decode a vote`, `Check a source`, `Learn a term`, and `Compare two parties`.
2. Local-only progress state where possible, without an account.
3. Badges or completion states for learning and source-checking.
4. Streak-like prompts for `What changed this week`, without shaming or addiction loops.
5. Short quizzes that test civic understanding or help users explore policy trade-offs.
6. Glossary progress such as `learn five Parliament terms`, with local-only state.

Avoid:

1. Points for moving toward a party.
2. Ideological leaderboards.
3. Party-coded rewards.
4. Language that implies the site knows how the user should vote.
5. Any stored political preference profile without explicit consent and DPIA coverage.

## International Patterns Behind This

Useful patterns from other countries:

1. Policy.nz: start from the voter's local election, compare candidates/policies in plain language, and allow favourites without pretending to decide the vote.
2. Represent by OpenNorth: treat postcode/address lookup as core civic infrastructure, not a side widget.
3. Wahl-O-Mat and smartvote: questionnaires can make civic learning feel playful, but only when the method is transparent and the result is framed as information rather than instruction.
4. They Vote For You and GovTrack: change history, follows, alerts, public data, and API access turn a reference site into a recurring habit.
5. OpenAustralia and Open States: public civic data becomes more valuable when it is reusable, downloadable, and open to correction.

Implication for this UK product:

```text
Borrow the engagement mechanics, not the persuasion framing.
```

The UK version should feel like a guided civic learning map: local first, source-backed, easy to leave and return to, and playful enough that a beginner keeps exploring.

## Data Reality Check

Feasible first:

1. Postcode to constituency using postcodes.io: <https://api.postcodes.io/>
2. Postcode or location to current MP using the UK Parliament Members API: <https://members-api.parliament.uk/>
3. Recent member votes using the UK Parliament Members API and Commons Votes API: <https://commonsvotes-api.parliament.uk/>
4. Upcoming Parliament business using the What's On API: <https://whatson-api.parliament.uk/calendar/events/list.json>
5. Recent written questions where member endpoints expose them.

Harder and should be labelled carefully:

1. `What has my MP done for my area?` because parliamentary activity is not always direct local impact.
2. `What did they propose locally?` because candidate promises, local newsletters, and campaign pages are fragmented and may require manual source review.
3. `Did they deliver?` because delivery claims often need local authority, department, budget, and outcome data.

Safer v1 wording:

1. `Recent public record`
2. `Local link verified`
3. `Constituency mentioned`
4. `Member activity`
5. `No local link verified from available sources`

## Design Principles

1. Use a Union Jack-inspired civic palette: navy for structure, white/off-white for the canvas, red for attention and corrections rather than primary actions.
2. Keep party colours inside charts and labelled swatches, never as unexplained UI meaning.
3. Make navigation layered: plain answer, deeper context, evidence, then a clear route back out.
4. Use the same page structure for parties, MPs, constituencies, policies, and sources to avoid favouritism.
5. Keep the tone plain and friendly without becoming childish or condescending.
6. Show gaps openly. `Cannot verify from available public sources` is a trust feature.
7. Treat the glossary as part of navigation, not as a separate dictionary: link terms from pages where users encounter them.
8. Use recurring civic explainers as annual return points: State Opening, PMQs, sessions, recess, Budget, party conferences, election deadlines, and major parliamentary traditions.
