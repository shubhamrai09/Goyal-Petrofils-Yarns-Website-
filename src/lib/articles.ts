import "server-only";
import data from "@/content/articles.json";
import { photos, type Photo } from "./images";

/** Articles migrated from the GeeTex Shopify blogs (scripts/build_articles.py). Server-only: the JSON is ~2 MB. */
export type Article = {
  blog: BlogId;
  handle: string;
  title: string;
  published: string;
  author: string;
  summary: string;
  html: string;
  sourceUrl: string;
};

export type BlogId = "geetex-blog" | "decorative-and-handicraft-yarn";

export const blogs: Record<BlogId, { title: string; navLabel: string; description: string; photo: Photo }> = {
  "geetex-blog": {
    title: "Fabric & Garment Insights",
    navLabel: "Fabric & garment",
    description:
      "Practical guides for knitwear and hosiery manufacturers on yarn quality, consistency, procurement and production.",
    photo: photos.loom,
  },
  "decorative-and-handicraft-yarn": {
    title: "Decorative & Handicraft Yarn Insights",
    navLabel: "Decorative & handicraft",
    description:
      "Guides for buyers and makers of decorative, handicraft and Mercy yarn products.",
    photo: photos.crochetSquares,
  },
};

/** Remove byline / "Quick answer" boilerplate that some source articles open with. */
function cleanSummary(s: string) {
  return s
    .replace(/^By .*?Last updated:\s*(\w+ \d{1,2}, \d{4}|\d{1,2} \w+ \d{4})\s*/i, "")
    .replace(/^(Quick answer|The short answer)\s*:?\s*/i, "")
    .trim();
}

// Dates come in two formats (Z and +05:30), so sort by actual time, not string.
const articles = (data as Article[])
  .map((a) => ({ ...a, summary: cleanSummary(a.summary) }))
  .sort((a, b) => Date.parse(b.published) - Date.parse(a.published));

export function getArticles(blog?: BlogId) {
  return blog ? articles.filter((a) => a.blog === blog) : articles;
}

export function getArticle(blog: string, handle: string) {
  return articles.find((a) => a.blog === blog && a.handle === handle);
}

export function isBlogId(v: string): v is BlogId {
  return v in blogs;
}

export function readingMinutes(html: string) {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

export function articleHref(a: Pick<Article, "blog" | "handle">) {
  return `/blogs/${a.blog}/${a.handle}`;
}
