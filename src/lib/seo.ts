import type { Metadata } from "next";
import type { StaticImageData } from "next/image";

/**
 * Per-page metadata: unique title + description, canonical URL and matching Open Graph tags.
 * Relative URLs resolve against `metadataBase` (https://geetexyarn.com) set in the root layout.
 */
export function pageMeta({
  title,
  description,
  path,
  image,
  type = "website",
  absoluteTitle = false,
  publishedTime,
}: {
  title: string;
  description: string;
  path: string;
  image?: StaticImageData;
  type?: "website" | "article";
  absoluteTitle?: boolean;
  publishedTime?: string;
}): Metadata {
  // Fallback: branded 1200×630 card generated from the hero photo (public/og-default.jpg).
  const images = image
    ? [{ url: image.src, width: image.width, height: image.height }]
    : [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Goyal Petrofils Yarns Pvt. Ltd., Ludhiana" }];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title,
      description,
      siteName: "GeeTex Knitting Yarns — Goyal Petrofils Yarns Pvt. Ltd.",
      locale: "en_IN",
      ...(images ? { images } : {}),
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description, ...(images ? { images } : {}) },
  };
}
