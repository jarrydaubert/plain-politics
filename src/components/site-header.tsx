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
    <header className="border-b border-[#d6e2f0] bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-3">
        <Link
          aria-label="Plain Politics home"
          className="flex items-center gap-3 text-lg font-semibold tracking-tight"
          href="/"
        >
          <PlainPoliticsMark className="h-10 w-10 shrink-0" />
          <span>Plain Politics</span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="hidden items-center gap-1 text-sm font-medium text-[var(--muted)] lg:flex">
            {navItems.map((item) => (
              <Link
                className="rounded-full px-3 py-1.5 transition hover:bg-[var(--surface-soft)] hover:text-[var(--foreground)]"
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
