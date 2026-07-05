import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

type PageHeaderProps = {
  backHref?: Route;
  backLabel?: string;
  children?: ReactNode;
  className?: string;
  eyebrow: string;
  lede: ReactNode;
  title: ReactNode;
};

export function PageHeader({
  backHref,
  backLabel = "Home",
  children,
  className,
  eyebrow,
  lede,
  title
}: Readonly<PageHeaderProps>) {
  return (
    <header className={`${className ?? ""} border-b-[3px] border-[var(--accent)] pb-7`.trim()}>
      {backHref ? (
        <Link className="text-sm font-semibold text-[var(--accent)]" href={backHref}>
          {backLabel}
        </Link>
      ) : null}
      <p
        className={`${backHref ? "mt-6" : ""} font-mono text-xs font-semibold uppercase text-[var(--muted)]`}
      >
        {eyebrow}
      </p>
      <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--muted)] sm:text-lg">{lede}</p>
      {children ? <div className="mt-6">{children}</div> : null}
    </header>
  );
}
