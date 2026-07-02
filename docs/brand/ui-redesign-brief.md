# UI Redesign Brief

Last updated: 2026-07-02

## Direction

Plain Politics should feel like a calm civic utility for beginners, not a campaign site, media dashboard, SaaS landing page, or methodology manifesto.

The trust layer should be quiet: source links, timestamps, compact metadata, careful empty states, and evidence drawers. The main journey should say: start here, find my MP, learn the words, see what Parliament is doing.

## V1 Homepage Shape

1. Header with logo, simple nav, and subtle UK time.
2. Hero headline: British politics, plainly explained, or a stronger concise alternative.
3. One support sentence.
4. Primary action: Find my MP.
5. Secondary actions: Learn the basics and See Parliament today.
6. Small Today in Parliament strip with two to three public-record facts where available.
7. Compact link to sources/about, not a full methodology section.
8. Footer with About, Sources, and Corrections.

## Design Rules

1. Reduce repeated trust, neutrality, and methodology copy on public pages.
2. Prefer concise labels such as Source, Last checked, Official record, and Unavailable over explanatory paragraphs.
3. Keep source confidence available progressively through links, drawers, footnotes, and compact metadata rows.
4. Use restrained hierarchy, fewer cards, more whitespace, and clearer page rhythm.
5. Keep political neutrality visual: no party-colour-dominant treatment, winner or loser framing, prediction language, or persuasion mechanics.
6. Keep accessibility strong: visible focus states, good contrast, keyboard-friendly controls, readable type, and stable responsive layouts.

## Claude Design Prompt

~~~text
Redesign the Plain Politics web app using the imported design system from this codebase.

Context:
Plain Politics is a beginner-friendly UK politics starter. It helps someone who knows little about politics find their MP, understand basic terms, and see live public Parliament records. It must feel neutral, calm, useful, and source-aware, but the current UI is too busy and repeats too much trust/source/methodology wording.

Goal:
Create a cleaner, quieter, more focused product UI for v1.0.0. Reduce visual clutter and drastically reduce trust/methodology copy. Keep source confidence present through small UI affordances rather than big explanatory blocks.

Design direction:
- Calm civic utility, not campaign, media site, dashboard toy, or SaaS marketing page.
- First screen should make the product obvious in under 10 seconds.
- Prioritize three beginner actions: Find my MP, Learn the basics, See Parliament today.
- Use restrained hierarchy, fewer cards, more whitespace, and clearer page rhythm.
- Avoid oversized trust panels, repeated source claims, and neutral-by-declaration copy everywhere.
- Use concise copy. Prefer labels like Source, Last checked, Official record, Unavailable over paragraphs.
- Make source/provenance details available progressively through links, drawers, or compact metadata rows.
- Keep political neutrality visually: no party-colour-dominant treatment, no winner/loser framing.
- Keep accessibility strong: clear focus states, good contrast, keyboard-friendly layout, readable type.

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
- Show how the home page can be simplified to one primary journey plus two secondary routes.
- Show how Parliament tables can feel less dense without hiding important records.
- Show how source trust is present but quiet.

Content constraints:
- Do not add unsourced political claims.
- Do not include party policy summaries.
- Do not use prediction, ranking, persuasion, or who-is-winning language.
- Do not over-explain the methodology on the homepage.
- Keep wording plain and beginner-friendly.
~~~
