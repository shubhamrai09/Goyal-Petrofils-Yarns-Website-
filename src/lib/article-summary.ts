import "server-only";
import type { ArticleSummary } from "@/components/ArticleCard";
import { articleHref, blogs, formatDate, readingMinutes, type Article } from "./articles";

/** Strip the heavy body HTML before anything is passed to cards or client components. */
export function toSummary(a: Article): ArticleSummary {
  return {
    href: articleHref(a),
    title: a.title,
    summary: a.summary,
    date: formatDate(a.published),
    dateIso: a.published,
    blogLabel: blogs[a.blog].navLabel,
    minutes: readingMinutes(a.html),
  };
}
