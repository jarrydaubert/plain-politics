import { BookOpenText, ExternalLink, GraduationCap } from "lucide-react";
import Link from "next/link";
import { StructuredData } from "@/components/structured-data";
import { glossaryCategories, glossaryTermSlug, glossaryTerms } from "@/data/glossary";
import {
  buildBreadcrumbJsonLd,
  buildDefinedTermSetJsonLd,
  buildWebPageJsonLd,
  createMetadata,
  getRouteMetadata
} from "@/lib/seo";

const pageMetadata = getRouteMetadata("/glossary");

export const metadata = createMetadata(pageMetadata);

const sourceLinks = [
  {
    name: "UK Parliament glossary",
    url: "https://www.parliament.uk/site-information/glossary/"
  },
  {
    name: "How Parliament works",
    url: "https://www.parliament.uk/about/how/"
  },
  {
    name: "Electoral Commission voting and elections",
    url: "https://www.electoralcommission.org.uk/voting-and-elections"
  }
] as const;

export default function GlossaryPage() {
  const termsWithSlugs = glossaryTerms.map((term) => ({
    ...term,
    slug: glossaryTermSlug(term)
  }));

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <StructuredData
        data={[
          buildWebPageJsonLd(pageMetadata),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Glossary", path: "/glossary" }
          ]),
          buildDefinedTermSetJsonLd(termsWithSlugs)
        ]}
      />
      <Link className="text-sm font-medium text-[var(--accent)]" href="/">
        Home
      </Link>

      <section className="mt-6 grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
        <div>
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[var(--accent)] text-white">
            <BookOpenText aria-hidden="true" size={23} />
          </div>
          <h1 className="mt-5 text-4xl font-semibold">Political glossary</h1>
          <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
            Plain-English explanations for the jargon, procedures and traditions that appear across
            UK politics.
          </p>
        </div>

        <aside className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="flex items-start gap-3">
            <GraduationCap aria-hidden="true" className="mt-1 text-[var(--accent)]" size={22} />
            <div>
              <h2 className="text-lg font-semibold">Beginner-first rule</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Any page that uses parliamentary jargon should either explain it inline or link
                here, so users can go deep without getting trapped.
              </p>
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Browse by area</h2>
        <ul className="mt-4 flex flex-wrap gap-3" aria-label="Glossary categories">
          {glossaryCategories.map((category) => (
            <li key={category}>
              <a
                className="inline-flex rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold transition hover:border-[var(--accent)]"
                href={`#${category.toLowerCase()}`}
              >
                {category}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10 grid gap-10">
        {glossaryCategories.map((category) => {
          const terms = glossaryTerms.filter((term) => term.category === category);

          return (
            <section id={category.toLowerCase()} key={category}>
              <h2 className="text-2xl font-semibold">{category}</h2>
              <div className="mt-4 grid gap-4 xl:grid-cols-2">
                {terms.map((entry) => {
                  const slug = glossaryTermSlug(entry);

                  return (
                    <article
                      className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5"
                      key={entry.term}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase text-[var(--muted)]">
                            {entry.category}
                          </p>
                          <h3 className="mt-1 text-xl font-semibold">
                            <Link
                              className="transition hover:text-[var(--accent)]"
                              href={`/glossary/${slug}`}
                            >
                              {entry.term}
                            </Link>
                          </h3>
                        </div>
                        <a
                          aria-label={`Open source for ${entry.term}: ${entry.sourceName}`}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[var(--border)] text-[var(--accent)] transition hover:border-[var(--accent)]"
                          href={entry.sourceUrl}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <ExternalLink aria-hidden="true" size={17} />
                        </a>
                      </div>

                      <p className="mt-4 leading-7">{entry.plainEnglish}</p>
                      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                        {entry.whyItMatters}
                      </p>
                      <p className="mt-4 border-t border-[var(--border)] pt-3 text-sm text-[var(--muted)]">
                        Source: {entry.sourceName}
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <section className="mt-10 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
        <h2 className="text-xl font-semibold">Primary sources for this page</h2>
        <div className="mt-4 grid gap-3">
          {sourceLinks.map((source) => (
            <a
              className="flex items-center justify-between gap-4 border-t border-[var(--border)] pt-3 text-sm font-medium transition hover:text-[var(--accent)]"
              href={source.url}
              key={source.url}
              rel="noreferrer"
              target="_blank"
            >
              <span>{source.name}</span>
              <ExternalLink aria-hidden="true" size={16} />
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
