import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="relative isolate flex min-h-dvh items-center">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid" />
      <div className="container-page flex flex-col items-start gap-6">
        <p className="font-mono text-eyebrow uppercase text-accent-strong">Error 404</p>
        <h1 className="max-w-xl text-title font-semibold text-fg">
          This page <span className="font-serif font-normal italic text-fg-muted">doesn&apos;t exist.</span>
        </h1>
        <p className="max-w-md text-lead text-fg-muted">
          The link may be out of date, or the page may have moved.
        </p>
        <Link
          href="/"
          className="mt-2 inline-flex h-11 items-center gap-2 rounded-control border border-line-strong bg-surface-2 px-5 text-[0.9375rem] font-medium text-fg transition-colors hover:bg-surface-3"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to home
        </Link>
      </div>
    </main>
  );
}
