"use client";

import { useDeferredValue, useId, useState } from "react";
import { Search, X } from "lucide-react";
import { ArticleCard, type ArticleSummary } from "./ArticleCard";

/** Client-side title/summary filter. All articles are server-rendered in the initial HTML for crawlers. */
export function ArticleList({ articles }: { articles: ArticleSummary[] }) {
  const id = useId();
  const [q, setQ] = useState("");
  const query = useDeferredValue(q.trim().toLowerCase());
  const shown = query
    ? articles.filter((a) => a.title.toLowerCase().includes(query) || a.summary.toLowerCase().includes(query))
    : articles;

  return (
    <div>
      <div className="flex flex-col gap-3 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
        <div className="w-full max-w-md">
          <label htmlFor={id} className="block text-[0.95rem] font-medium text-ink">
            Search articles
          </label>
          <div className="relative mt-2">
            <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted" />
            <input
              id={id}
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="e.g. pilling, shade, chenille"
              className="block w-full rounded-xs border border-line-strong bg-surface py-3 pr-11 pl-10 text-base text-ink placeholder:text-muted/80 focus:outline-2 focus:outline-offset-1 focus:outline-brand"
            />
            {q ? (
              <button
                type="button"
                onClick={() => setQ("")}
                className="absolute top-1/2 right-1 inline-flex size-10 -translate-y-1/2 items-center justify-center text-muted hover:text-ink"
              >
                <X aria-hidden="true" className="size-4" />
                <span className="sr-only">Clear search</span>
              </button>
            ) : null}
          </div>
        </div>
        <p aria-live="polite" className="text-sm text-muted">
          {query ? `${shown.length} of ${articles.length} articles match “${q.trim()}”` : `${articles.length} articles`}
        </p>
      </div>

      {shown.length ? (
        <div className="mt-10 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((a) => (
            <ArticleCard key={a.href} a={a} headingLevel="h2" />
          ))}
        </div>
      ) : (
        <div className="mt-10 border border-dashed border-line-strong/50 p-10 text-center">
          <p className="font-display text-2xl text-ink">No articles match your search.</p>
          <p className="mt-2 text-ink-2">Try a broader term, or browse all articles.</p>
          <button
            type="button"
            onClick={() => setQ("")}
            className="mt-6 inline-flex min-h-11 items-center font-medium text-brand underline-offset-4 hover:underline"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
