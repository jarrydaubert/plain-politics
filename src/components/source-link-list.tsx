import { ExternalLink } from "lucide-react";

type SourceLink = {
  name: string;
  url: string;
};

export function SourceLinkList({ sources }: Readonly<{ sources: readonly SourceLink[] }>) {
  return (
    <div className="mt-4 grid gap-3">
      {sources.map((source) => (
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
  );
}
