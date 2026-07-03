import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import { StructuredData } from "@/components/structured-data";
import { explainers } from "@/data/explainers";
import {
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
  createMetadata,
  getRouteMetadata
} from "@/lib/seo";

const pageMetadata = getRouteMetadata("/explainers");

export const metadata = createMetadata(pageMetadata);

export default function ExplainersPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <StructuredData
        data={[
          buildWebPageJsonLd(pageMetadata),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Explainers", path: "/explainers" }
          ])
        ]}
      />
      <Link className="text-sm font-medium text-[var(--accent)]" href="/">
        Back to dashboard
      </Link>

      <section className="mt-6 grid gap-8 xl:grid-cols-[0.8fr_1.2fr]">
        <div>
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[var(--accent)] text-white">
            <FileText aria-hidden="true" size={23} />
          </div>
          <h1 className="mt-5 text-4xl font-semibold">Quick explainers</h1>
          <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
            Short, source-linked answers to beginner questions about UK politics and Parliament.
          </p>
        </div>
        <aside className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="text-lg font-semibold">Plain-English rule</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Each explainer should answer one question, link to its source, and avoid guessing motive
            or political advice.
          </p>
        </aside>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {explainers.map((explainer) => (
          <Link
            className="group rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[var(--shadow-soft)]"
            href={`/explainers/${explainer.slug}`}
            key={explainer.slug}
          >
            <span className="inline-flex rounded-md bg-[var(--surface-soft)] px-2.5 py-1 font-mono text-xs font-semibold text-[var(--muted)]">
              {explainer.readTime}
            </span>
            <h2 className="mt-4 text-xl font-semibold">{explainer.title}</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{explainer.description}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">
              Read explainer
              <ArrowRight
                aria-hidden="true"
                className="transition group-hover:translate-x-0.5"
                size={15}
              />
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
