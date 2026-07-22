import Link from "next/link";
import { PlainPoliticsMark } from "@/components/plain-politics-logo";

const navItems = [
  { href: "/how-politics-works", label: "Basics" },
  { href: "/my-area", label: "My area" },
  { href: "/parliament", label: "Parliament" },
  { href: "/glossary", label: "Glossary" },
  { href: "/sources", label: "Sources" },
  { href: "/about", label: "About" }
] as const;

export function SiteHeader() {
  return (
    <header className="ground-ink sticky top-0 z-40 border-b border-[var(--border)]">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          aria-label="Plain Politics home"
          className="flex items-center gap-2 font-serif text-xl font-semibold"
          href="/"
        >
          <PlainPoliticsMark
            className="h-10 w-10 shrink-0 text-[var(--paper-on-ink)]"
            variant="bare"
          />
          <span>
            Plain Politics<span className="text-[var(--stop-red)]">.</span>
          </span>
        </Link>

        <div className="flex w-full items-center justify-between gap-0 text-xs font-semibold text-[var(--paper-on-ink)] sm:w-auto sm:gap-2 sm:text-sm">
          {navItems.map((item) => (
            <Link
              className="inline-flex min-h-11 shrink-0 items-center rounded-md px-1.5 py-2 transition hover:bg-[var(--ink-panel)] hover:text-[var(--focus-on-ink)] sm:px-3"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
