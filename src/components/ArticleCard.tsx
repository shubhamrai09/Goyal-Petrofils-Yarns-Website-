import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type ArticleSummary = {
  href: string;
  title: string;
  summary: string;
  date: string;
  dateIso: string;
  blogLabel: string;
  minutes: number;
};

export function ArticleCard({ a, headingLevel = "h3" }: { a: ArticleSummary; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className="group relative flex h-full flex-col border-t border-ink pt-5">
      <p className="eyebrow flex flex-wrap gap-x-3 gap-y-1 text-muted">
        <span className="text-brand">{a.blogLabel}</span>
        <time dateTime={a.dateIso}>{a.date}</time>
        <span>{a.minutes} min read</span>
      </p>
      <H className="mt-3 font-display text-[1.375rem] leading-snug text-ink">
        <Link href={a.href} className="after:absolute after:inset-0 group-hover:text-brand-strong focus-visible:outline-none">
          {a.title}
        </Link>
      </H>
      <p className="mt-3 line-clamp-3 text-[0.95rem] text-ink-2">{a.summary}</p>
      <span aria-hidden="true" className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-brand">
        Read article <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
      <span aria-hidden="true" className="pointer-events-none absolute -inset-2 hidden outline-2 outline-brand group-has-[a:focus-visible]:block" />
    </article>
  );
}
