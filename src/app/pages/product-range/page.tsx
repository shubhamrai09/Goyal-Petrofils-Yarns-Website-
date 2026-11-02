import Image from "next/image";
import { Download } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ProductCard, CtaBand } from "@/components/blocks";
import { JsonLd } from "@/components/ui";
import { photos } from "@/lib/images";
import { countSystemNote, families, products } from "@/lib/products";
import { SITE_URL } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Product Range — Acrylic, Blended, Dyed, Chenille, Carpet & Handicraft Yarns",
  description:
    "Explore the GeeTex yarn range by Goyal Petrofils Yarns, Ludhiana: acrylic worsted dyed, acrylic/nylon and acrylic/polyester blends, mélanges, chenille, ring-spun virgin, carpet, fancy, crochet and hand knitting yarns.",
  path: "/pages/product-range",
  image: photos.dyedRack.src,
});

export default function ProductRangePage() {
  const shadeCard = products.find((p) => p.shadeCard)?.shadeCard;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "GeeTex product range",
          itemListElement: products.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/products/${p.slug}`,
            name: p.name,
          })),
        }}
      />
      <PageHero
        crumbs={[{ name: "Product range", href: "/pages/product-range" }]}
        eyebrow="GeeTex Knitting Yarns"
        title="Our product range"
        intro={
          <p>
            Ten yarn categories — from worsted acrylic and blends to chenille, carpet and handicraft yarns. Count ranges are
            shown exactly as published; ask us for the specific count, blend and shade you need.
          </p>
        }
      />

      {/* Colour range visual */}
      <section aria-labelledby="range-visual-title" className="border-b border-line bg-sand">
        <div className="container-page grid items-center gap-10 py-14 md:py-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <figure className="relative aspect-[3/4] overflow-hidden rounded-sm bg-line shadow-[0_24px_48px_-20px_rgba(0,0,0,0.35)]">
              <Image
                src={photos.yarnConesShelf.src}
                alt={photos.yarnConesShelf.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </figure>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow text-brand">Colour · Count · Consistency</p>
            <h2 id="range-visual-title" className="mt-3 font-display text-h2 font-normal text-ink">
              Every shade, every count — wound to run.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-2">
              From deep jewel tones to muted naturals, our dyed yarn range spans 70+ shades across multiple fibre counts. Each cone is wound to consistent weight and tested to run cleanly on industrial machines — with no pilling, no breakage.
            </p>
          </div>
        </div>
      </section>

      <nav aria-label="Product families" className="sticky top-16 z-30 border-b border-line bg-paper/95 md:top-[4.5rem]">
        <ul className="container-page flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {families.map((f) => (
            <li key={f.id} className="shrink-0">
              <a
                href={`#${f.id}`}
                className="inline-flex min-h-11 items-center rounded-full border border-line-strong/40 bg-surface px-4 text-sm text-ink transition-colors hover:border-ink"
              >
                {f.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-page">
        {families.map((f) => {
          const items = products.filter((p) => p.family === f.id);
          return (
            <section key={f.id} id={f.id} aria-labelledby={`${f.id}-title`} className="scroll-mt-36 border-b border-line py-14 last:border-b-0 md:py-20">
              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                <h2 id={`${f.id}-title`} className="font-display text-h2 font-normal text-ink">
                  {f.name}
                </h2>
                <p className="text-ink-2">
                  {items.length} {items.length === 1 ? "product" : "products"} · {f.blurb}
                </p>
              </div>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <section aria-labelledby="counts-title" className="border-t border-line bg-sand">
        <div className="container-page grid gap-10 py-14 md:grid-cols-2 md:py-16">
          <div>
            <h2 id="counts-title" className="font-display text-2xl text-ink">
              Reading the count ranges
            </h2>
            <ul className="mt-4 space-y-2 text-ink-2">
              {Object.values(countSystemNote).map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
          {shadeCard ? (
            <div className="border-t border-ink pt-5 md:border-t-0 md:border-l md:pt-0 md:pl-10">
              <h2 className="font-display text-2xl text-ink">Shade card</h2>
              <p className="mt-3 text-ink-2">Download the chenille dyed yarn shade card to choose colours before you enquire.</p>
              <a
                href={shadeCard.href}
                download
                className="mt-5 inline-flex min-h-11 items-center gap-2 font-medium text-brand underline-offset-4 hover:text-brand-strong hover:underline"
              >
                <Download aria-hidden="true" className="size-4" />
                {shadeCard.label}
              </a>
            </div>
          ) : null}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
