# Beginner-First Product Direction

Last updated: 2026-07-22

## Product Shift

The product should behave like a maintained civic answer for people who know little or nothing about UK politics: guide understanding, keep current truth in the right data source and make confidence inspectable.

The core promise:

```text
Show me how UK politics fits together, connect it to my representative, and let me inspect the public evidence without getting lost.
```

## Experience Direction

The v1 interface should feel like guided curiosity: inviting enough for younger or politics-averse users to take a look, but still calm and useful for adults, researchers, and civic users.

It should not feel like a children's game, a campaign product, a news dashboard, a methodology document, or a lesson app with progress bars. Exploration should feel open and self-directed.

The primary journey is:

1. A plain promise: `British politics, without the fog.`
2. One maintained orientation answer showing how representation, Parliament, Government, parties and elections relate.
3. Clear next actions into My Area, current Parliament records, the glossary and sources.
4. Deeper published explainers only when the beginner path needs them.
5. Quiet source confidence through labels, dates, links, conventions and limitations rather than repeated trust copy.

Live public records can support the journey, but they are not the organising model. Routine political activity does not create a publishing obligation.

## Core Journey

1. A user who does not know where to start opens the maintained Politics Basics orientation; a user with a local question can start with a postcode.
2. The orientation distinguishes the user's MP and constituency, Parliament, Government, political parties, elections and Government formation.
3. My Area shows the user's constituency, current MP, party and selected public records from current reference data.
4. The journey explains basic vocabulary inline and links to the glossary when a term needs more context.
5. The user can open the evidence behind any factual claim.
6. The user can jump sideways to the party, constituency, policy area, or source page.
7. The user always has an obvious way back to the previous level.
8. The user can open a glossary page for political jargon, procedures, and traditions without losing their place.
9. The user can move from a glossary term to a fuller evergreen explainer when the subject deserves more than a short definition.

## No Progress Mechanics For V1

Plain Politics should not try to make civic learning feel like a course, challenge, or achievement loop in v1.

Avoid:

1. Progress bars.
2. Badges or completion states.
3. Streaks.
4. Locked steps or unlock mechanics.
5. Language that frames understanding politics as homework.
6. Any stored political preference profile without explicit consent and DPIA coverage.

Use instead:

1. Clear routes.
2. Normal-life questions.
3. Inline explanations.
4. Obvious source links.
5. Easy ways to move sideways without losing context.

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

1. Use the canonical Ink and Paper system: navy for brand/orientation, warm off-white for reading/data, and red for punctuation rather than primary actions or status.
2. Keep party colours inside charts and labelled swatches, never as unexplained UI meaning.
3. Make navigation layered: plain answer, deeper context, evidence, then a clear route back out.
4. Use the same page structure for parties, MPs, constituencies, policies, and sources to avoid favouritism.
5. Keep the tone plain and friendly without becoming childish or condescending.
6. Show gaps openly. `Cannot verify from available public sources` is a trust feature.
7. Treat the glossary as part of navigation, not as a separate dictionary: link terms from pages where users encounter them.
8. Publish a bounded civic explainer only when an event helps a beginner understand the system; do not create a newsroom cadence around routine political activity.
