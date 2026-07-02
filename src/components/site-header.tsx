import Link from "next/link";
import { PlainPoliticsMark } from "@/components/plain-politics-logo";

const navItems = [
  { href: "/my-area", label: "My area" },
  { href: "/parliament", label: "Parliament" },
  { href: "/glossary", label: "Glossary" },
  { href: "/sources", label: "Sources" },
  { href: "/about", label: "About" }
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-[#d8d3c7] bg-[#fffdf8]/94 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link
          aria-label="Plain Politics home"
          className="flex items-center gap-3 text-lg font-semibold tracking-tight"
          href="/"
        >
          <PlainPoliticsMark className="h-10 w-10 shrink-0" />
          <span>Plain Politics</span>
        </Link>

        <div className="flex w-full flex-wrap items-center gap-1 text-sm font-semibold text-[#071f3a] sm:w-auto sm:gap-2">
          {navItems.map((item) => (
            <Link
              className="rounded-lg px-2 py-2 transition hover:bg-[#e7f1ff] hover:text-[#0756c7] sm:px-3"
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
