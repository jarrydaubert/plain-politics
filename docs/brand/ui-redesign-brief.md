# UI Redesign Brief

Last updated: 2026-07-02

## Direction

Plain Politics should feel like a guided civic starter for people who do not usually follow politics, not a campaign site, media dashboard, SaaS landing page, children's game, GOV-style service page, or methodology manifesto.

The product should feel like a warm explainer tool with receipts: friendly like a study-buddy notebook, credible enough for adults and researchers, but not trying to prove trust through repeated trust copy. The source layer should be quiet: record links, timestamps where useful, compact metadata, careful empty states, and evidence drawers. The main journey should say: this is British politics in plain English, start where you are, learn the words, and see what Parliament is doing today.

Research basis: `docs/brand/youth-ux-research.md`.

## V1 Homepage Shape

1. Header with logo and simple nav. No visible clock on the homepage.
2. Hero headline: `British politics, without the fog.`
3. One support sentence for beginners.
4. A compact `Today, translated.` panel with two public-record rows and `What it means` notes.
5. Three clear first-screen route cards: Start where you live, Decode the jargon, Watch what happens.
6. A small `No shame if you're starting from zero` starter path that uses local-only progress cues.
7. Short evergreen explainer cards for civic traditions and basics.
8. Compact links to sources/about, not a full methodology section.
9. Footer with About, Sources, Corrections, and analytics settings.

## Design Rules

1. Reduce repeated trust, neutrality, and methodology copy on public pages.
2. Prefer concise labels such as Source, Last checked, Official record, and Unavailable over explanatory paragraphs.
3. Keep source confidence available progressively through links, drawers, footnotes, and compact metadata rows.
4. Use warmer learning-app patterns: notebook lines, highlighter marks, route markers, soft paper surfaces, and friendly iconography, but keep the page calm.
5. Keep political neutrality visual: no party-colour-dominant treatment, winner or loser framing, prediction language, or persuasion mechanics.
6. Keep accessibility strong: visible focus states, good contrast, keyboard-friendly controls, readable type, and stable responsive layouts.
7. Use light progress cues to make exploration inviting, but avoid childish challenge, unlock, or ideological scoring mechanics.
8. Do not use fake youth slang, memes, neon chaos, visible clocks, dashboard widgets, or methodology-led hero content.
9. Keep bigger post-v1 ideas out of the visible product until they are wired: Issues, Do something, action templates, local council/mayor/devolved coverage, and policy timelines.

## Claude Design Prompt

~~~text
Redesign the Plain Politics web app using the imported design system from this codebase.

Context:
Plain Politics is a beginner-friendly UK politics starter. It helps someone who knows little about politics find their MP, understand basic terms, and see live public Parliament records. It must feel like a calm social-learning civic app: friendly like a study buddy, credible like a source notebook, and inviting enough for younger users to explore without becoming childish, fake-slangy, or gimmicky.

Goal:
Create a warmer, more inviting product UI for v1.0.0. Move away from GOV-style public-service design, dense dashboards, and methodology-first copy. Keep record confidence present through small affordances rather than big explanatory blocks. Use subtle progress and discovery cues, but avoid game-like unlock mechanics or ideological scoring.

Design direction:
- Calm civic starter, not campaign, media site, dashboard toy, children's game, GOV-style service page, or SaaS marketing page.
- First screen should make the product obvious in under 10 seconds.
- Prioritize three beginner routes: Start where you live, Decode the jargon, Watch what happens.
- Use a warm explainer-tool visual language: notebook lines, highlighter swipes, route markers, soft paper layers, visible receipts, and expressive but tidy icons.
- Avoid oversized trust panels, repeated source claims, and neutral-by-declaration copy everywhere.
- Use concise copy. Prefer labels like Open record, Last checked, Source, and Unavailable over paragraphs.
- Make source/provenance details available progressively through links, drawers, or compact metadata rows.
- Keep political neutrality visually: no party-colour-dominant treatment, no winner/loser framing.
- Keep accessibility strong: clear focus states, good contrast, keyboard-friendly layout, readable type.
- Use light local-only progress cues where they help exploration, without points for political preference.
- Do not put a visible clock in the homepage header.
- Do not use memes, forced Gen Z slang, neon chaos, or fake social proof.
- Treat Issues, Do something, action templates, and policy timelines as post-v1 unless the underlying routes and source coverage are built.

Pages to redesign:
1. Home page
2. My area / postcode lookup
3. Parliament page
4. Glossary page
5. Sources page
6. About page

What to produce:
- Three distinct visual directions first, each with a name and one-sentence rationale.
- Then create a polished prototype for the best direction.
- Include desktop and mobile layouts.
- Include component guidance for: header, primary action group, compact source metadata, table/list rows, empty states, error states, evidence drawer, glossary term link, and page footer.
- Show how the home page can introduce one obvious starter journey plus two supporting routes.
- Show how Parliament tables can feel less dense without hiding important records.
- Show how source trust is present but quiet.

Content constraints:
- Do not add unsourced political claims.
- Do not include party policy summaries.
- Do not use prediction, ranking, persuasion, or who-is-winning language.
- Do not over-explain the methodology on the homepage.
- Keep wording plain and beginner-friendly.
~~~
