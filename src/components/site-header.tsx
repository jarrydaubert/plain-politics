import Link from "next/link";
import { PlainPoliticsMark } from "@/components/plain-politics-logo";
import { UkTimeClock } from "@/components/uk-time-clock";

const navItems = [
  { href: "/my-area", label: "My area" },
  { href: "/parliament", label: "Parliament" },
  { href: "/glossary", label: "Glossary" },
  { href: "/sources", label: "Sources" },
  { href: "/about", label: "About" }
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--surface)]">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link
          aria-label="Plain Politics home"
          className="flex items-center gap-3 text-lg font-semibold tracking-tight"
          href="/"
        >
          <PlainPoliticsMark className="h-10 w-10 shrink-0" />
          <span>Plain Politics</span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="hidden items-center gap-5 text-sm font-medium text-[var(--muted)] lg:flex">
            {navItems.map((item) => (
              <Link
                className="transition hover:text-[var(--foreground)]"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <UkTimeClock />
        </div>
      </nav>
    </header>
  );
}
