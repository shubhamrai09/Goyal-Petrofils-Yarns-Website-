import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { products } from "@/lib/products";
import { blogs, getArticles, type BlogId } from "@/lib/articles";

const staticPages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/pages/product-range", priority: 0.9, changeFrequency: "monthly" },
  { path: "/collections/handicraft-yarns", priority: 0.8, changeFrequency: "monthly" },
  { path: "/pages/about-us", priority: 0.7, changeFrequency: "yearly" },
  { path: "/pages/company-at-a-glance", priority: 0.6, changeFrequency: "yearly" },
  { path: "/pages/manufacturing-quality", priority: 0.7, changeFrequency: "yearly" },
  { path: "/pages/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/pages/careers", priority: 0.4, changeFrequency: "monthly" },
  { path: "/pages/people-culture", priority: 0.4, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getArticles();
  return [
    ...staticPages.map((p) => ({
      url: `${SITE_URL}${p.path}`,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...products.map((p) => ({
      url: `${SITE_URL}/products/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...(Object.keys(blogs) as BlogId[]).map((b) => ({
      url: `${SITE_URL}/blogs/${b}`,
      lastModified: articles.find((a) => a.blog === b)?.published,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...articles.map((a) => ({
      url: `${SITE_URL}/blogs/${a.blog}/${a.handle}`,
      lastModified: a.published,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
