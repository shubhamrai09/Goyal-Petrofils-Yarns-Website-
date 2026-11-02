import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ArticleList } from "@/components/ArticleList";
import { CtaBand } from "@/components/blocks";
import { blogs, getArticles, isBlogId, type BlogId } from "@/lib/articles";
import { toSummary } from "@/lib/article-summary";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return (Object.keys(blogs) as BlogId[]).map((blog) => ({ blog }));
}

export async function generateMetadata({ params }: PageProps<"/blogs/[blog]">) {
  const { blog } = await params;
  if (!isBlogId(blog)) return {};
  const b = blogs[blog];
  return pageMeta({
    title: `${b.title} — GeeTex Blog`,
    description: `${b.description} From GeeTex Knitting Yarns, Ludhiana.`,
    path: `/blogs/${blog}`,
    image: b.photo.src,
  });
}

export default async function BlogIndexPage({ params }: PageProps<"/blogs/[blog]">) {
  const { blog } = await params;
  if (!isBlogId(blog)) notFound();
  const b = blogs[blog];
  const items = getArticles(blog).map(toSummary);
  const other = (Object.keys(blogs) as BlogId[]).find((k) => k !== blog)!;

  return (
    <>
      <PageHero
        crumbs={[{ name: b.title, href: `/blogs/${blog}` }]}
        eyebrow="GeeTex insights"
        title={b.title}
        photo={b.photo}
        intro={<p>{b.description}</p>}
      >
        <p className="text-ink-2">
          Also read:{" "}
          <Link href={`/blogs/${other}`} className="font-medium text-brand underline-offset-4 hover:underline">
            {blogs[other].title}
          </Link>
        </p>
      </PageHero>
      <section aria-label="Articles" className="container-page py-12 md:py-16">
        <ArticleList articles={items} />
      </section>
      <CtaBand />
    </>
  );
}
