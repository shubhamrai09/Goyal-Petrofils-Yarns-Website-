import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleCard } from "@/components/ArticleCard";
import { ButtonLink, JsonLd } from "@/components/ui";
import { blogs, formatDate, getArticle, getArticles, isBlogId, readingMinutes } from "@/lib/articles";
import { toSummary } from "@/lib/article-summary";
import { SITE_URL } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticles().map((a) => ({ blog: a.blog, handle: a.handle }));
}

function trimDescription(s: string) {
  const clean = s.replace(/\s+/g, " ").trim();
  if (clean.length <= 158) return clean;
  return clean.slice(0, clean.lastIndexOf(" ", 155)) + "…";
}

export async function generateMetadata({ params }: PageProps<"/blogs/[blog]/[handle]">) {
  const { blog, handle } = await params;
  const a = getArticle(blog, handle);
  if (!a || !isBlogId(blog)) return {};
  return pageMeta({
    title: a.title,
    description: trimDescription(a.summary),
    path: `/blogs/${blog}/${handle}`,
    image: blogs[blog].photo.src,
    type: "article",
    publishedTime: a.published,
  });
}

export default async function ArticlePage({ params }: PageProps<"/blogs/[blog]/[handle]">) {
  const { blog, handle } = await params;
  const a = getArticle(blog, handle);
  if (!a || !isBlogId(blog)) notFound();

  const b = blogs[blog];
  const related = getArticles(blog)
    .filter((x) => x.handle !== a.handle)
    .slice(0, 3)
    .map(toSummary);
  const url = `${SITE_URL}/blogs/${blog}/${handle}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: a.title,
          description: trimDescription(a.summary),
          datePublished: a.published,
          author: { "@type": "Person", name: a.author },
          publisher: { "@id": `${SITE_URL}/#organization` },
          mainEntityOfPage: url,
          url,
          inLanguage: "en-IN",
        }}
      />

      <article>
        <header className="border-b border-line">
          <div className="container-page pt-8 pb-12 md:pb-16">
            <Breadcrumbs
              items={[
                { name: b.title, href: `/blogs/${blog}` },
                { name: a.title, href: `/blogs/${blog}/${handle}` },
              ]}
            />
            <div className="mt-10 max-w-4xl md:mt-14">
              <p className="eyebrow text-brand">{b.navLabel}</p>
              <h1 className="mt-4 font-display text-h1 font-normal tracking-[-0.015em] text-ink">{a.title}</h1>
              <p className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-[0.95rem] text-muted">
                <span>
                  By <span className="text-ink">{a.author}</span>
                </span>
                <time dateTime={a.published}>{formatDate(a.published)}</time>
                <span>{readingMinutes(a.html)} min read</span>
              </p>
            </div>
          </div>
        </header>

        <div className="container-page grid gap-12 py-12 md:py-16 lg:grid-cols-12">
          {/* Body HTML is sanitised to an allowlist at import time (scripts/build_articles.py). */}
          <div className="prose-article min-w-0 lg:col-span-8 lg:max-w-[70ch]" dangerouslySetInnerHTML={{ __html: a.html }} />

          <aside aria-label="Work with GeeTex" className="lg:col-span-4">
            <div className="border border-ink bg-surface p-6 lg:sticky lg:top-28">
              <p className="eyebrow text-brand">GeeTex Knitting Yarns</p>
              <p className="mt-3 font-display text-2xl leading-snug text-ink">
                Yarn from Ludhiana by Goyal Petrofils Yarns — established 1977.
              </p>
              <ul className="mt-5 divide-y divide-line border-y border-line text-[0.95rem]">
                {[
                  { label: "Product range", href: "/pages/product-range" },
                  { label: "Manufacturing & quality", href: "/pages/manufacturing-quality" },
                  { label: "Handicraft yarns", href: "/collections/handicraft-yarns" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="group flex min-h-11 items-center justify-between py-2 text-ink hover:text-brand-strong">
                      {l.label}
                      <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
              <ButtonLink href="/pages/contact#enquiry" className="mt-6 w-full">
                Send an enquiry
              </ButtonLink>
            </div>
          </aside>
        </div>
      </article>

      {related.length ? (
        <section aria-labelledby="related-title" className="border-t border-line bg-sand py-16 md:py-20">
          <div className="container-page">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 id="related-title" className="font-display text-h2 font-normal text-ink">
                More {b.navLabel.toLowerCase()} insights
              </h2>
              <ButtonLink href={`/blogs/${blog}`} variant="ghost">
                All articles
              </ButtonLink>
            </div>
            <div className="mt-10 grid gap-10 md:grid-cols-3">
              {related.map((r) => (
                <ArticleCard key={r.href} a={r} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
