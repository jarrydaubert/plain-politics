import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/structured-data";
import { findGlossaryTermBySlug, glossaryTermSlug, glossaryTerms } from "@/data/glossary";
import {
  buildBreadcrumbJsonLd,
  buildDefinedTermJsonLd,
  buildWebPageJsonLd,
  createMetadata
} from "@/lib/seo";

export function generateStaticParams() {
  return glossaryTerms.map((term) => ({ slug: glossaryTermSlug(term) }));
}

export async function generateMetadata({
  params
}: Readonly<{ params: Promise<{ slug: string }> }>): Promise<Metadata> {
  const { slug } = await params;
  const term = findGlossaryTermBySlug(slug);

  if (!term) {
    return createMetadata({
      description: "Plain-English UK politics glossary term.",
      index: false,
      path: "/glossary",
      title: "Glossary term - Plain Politics"
    });
  }

  return createMetadata({
    description: term.plainEnglish,
    path: `/glossary/${glossaryTermSlug(term)}`,
    title: `${term.term} meaning - Plain Politics`
  });
}

export default async function GlossaryTermPage({
  params
}: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;
  const term = findGlossaryTermBySlug(slug);

  if (!term) {
    notFound();
  }

  const termSlug = glossaryTermSlug(term);
  const pageMetadata = {
    description: term.plainEnglish,
    path: `/glossary/${termSlug}`,
    title: `${term.term} meaning - Plain Politics`
  };
  const relatedTerms = glossaryTerms
    .filter((item) => item.category === term.category && item.term !== term.term)
    .slice(0, 5);

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <StructuredData
        data={[
          buildWebPageJsonLd(pageMetadata),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Glossary", path: "/glossary" },
            { name: term.term, path: `/glossary/${termSlug}` }
          ]),
          buildDefinedTermJsonLd({ ...term, slug: termSlug })
        ]}
      />
      <Link className="text-sm font-medium text-[var(--accent)]" href="/glossary">
        Back to glossary
      </Link>

      <article className="mt-6">
        <p className="text-xs font-semibold uppercase text-[var(--muted)]">{term.category}</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold">{term.term}</h1>
        <section className="mt-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="font-serif text-xl font-semibold">What it means</h2>
          <p className="mt-3 font-serif leading-7 text-[var(--ink-soft)]">{term.plainEnglish}</p>
        </section>
        <section className="mt-5 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="font-serif text-xl font-semibold">Why it matters</h2>
          <p className="mt-3 font-serif leading-7 text-[var(--ink-soft)]">{term.whyItMatters}</p>
        </section>
      </article>

      {relatedTerms.length > 0 ? (
        <section className="mt-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="text-xl font-semibold">Related terms</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {relatedTerms.map((relatedTerm) => (
              <Link
                className="rounded-md border border-[var(--border)] px-3 py-2 text-sm font-semibold transition hover:border-[var(--accent)]"
                href={`/glossary/${glossaryTermSlug(relatedTerm)}`}
                key={relatedTerm.term}
              >
                {relatedTerm.term}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
        <h2 className="text-xl font-semibold">Source</h2>
        <a
          className="mt-4 flex items-center justify-between gap-4 border-t border-[var(--border)] pt-3 text-sm font-medium transition hover:text-[var(--accent)]"
          href={term.sourceUrl}
          rel="noreferrer"
          target="_blank"
        >
          <span>{term.sourceName}</span>
          <ExternalLink aria-hidden="true" size={16} />
        </a>
      </section>
    </main>
  );
}
