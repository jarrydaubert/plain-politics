import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/structured-data";
import { explainers, findExplainerBySlug } from "@/data/explainers";
import { glossaryTermSlug, glossaryTerms } from "@/data/glossary";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
  createMetadata
} from "@/lib/seo";

export function generateStaticParams() {
  return explainers.map((explainer) => ({ slug: explainer.slug }));
}

export async function generateMetadata({
  params
}: Readonly<{ params: Promise<{ slug: string }> }>): Promise<Metadata> {
  const { slug } = await params;
  const explainer = findExplainerBySlug(slug);

  if (!explainer) {
    return createMetadata({
      description: "Plain-English UK politics explainer.",
      index: false,
      path: "/explainers",
      title: "Explainer - Plain Politics"
    });
  }

  return createMetadata({
    description: explainer.description,
    path: `/explainers/${explainer.slug}`,
    title: `${explainer.title} - Plain Politics`
  });
}

export default async function ExplainerDetailPage({
  params
}: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;
  const explainer = findExplainerBySlug(slug);

  if (!explainer) {
    notFound();
  }

  const pageMetadata = {
    description: explainer.description,
    path: `/explainers/${explainer.slug}`,
    title: `${explainer.title} - Plain Politics`
  };
  const relatedTerms = glossaryTerms.filter((term) =>
    explainer.relatedGlossaryTerms.includes(term.term)
  );

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <StructuredData
        data={[
          buildWebPageJsonLd(pageMetadata),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Explainers", path: "/explainers" },
            { name: explainer.title, path: `/explainers/${explainer.slug}` }
          ]),
          buildArticleJsonLd(explainer)
        ]}
      />
      <Link className="text-sm font-medium text-[var(--accent)]" href="/explainers">
        Back to explainers
      </Link>

      <article className="mt-6">
        <p className="font-mono text-sm text-[var(--muted)]">
          {explainer.readTime} read - Last reviewed {formatDate(explainer.lastReviewed)}
        </p>
        <h1 className="mt-3 text-4xl font-semibold">{explainer.title}</h1>
        <p className="mt-4 text-lg leading-8 text-[var(--muted)]">{explainer.description}</p>

        <div className="mt-8 grid gap-6">
          {explainer.sections.map((section) => (
            <section
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5"
              key={section.heading}
            >
              <h2 className="text-xl font-semibold">{section.heading}</h2>
              <p className="mt-3 leading-7 text-[var(--muted)]">{section.body}</p>
            </section>
          ))}
        </div>
      </article>

      {relatedTerms.length > 0 ? (
        <section className="mt-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="text-xl font-semibold">Related glossary terms</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {relatedTerms.map((term) => (
              <Link
                className="rounded-md border border-[var(--border)] px-3 py-2 text-sm font-semibold transition hover:border-[var(--accent)]"
                href={`/glossary/${glossaryTermSlug(term)}`}
                key={term.term}
              >
                {term.term}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
        <h2 className="text-xl font-semibold">Sources for this explainer</h2>
        <div className="mt-4 grid gap-3">
          {explainer.sourceLinks.map((source) => (
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

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeZone: "Europe/London"
  }).format(new Date(value));
}
