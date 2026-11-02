"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { formatCount, getProduct, type Product } from "@/lib/products";

const segments: { id: string; label: string; blurb: string; slugs: string[] }[] = [
  {
    id: "hosiery",
    label: "Hosiery",
    blurb: "Smooth, strong blended and spun yarns for socks, hosiery and fine-gauge knit goods.",
    slugs: [
      "acrylic-nylon-worsted-blended-dyed-yarn",
      "acrylic-polyester-blended-dyed-yarn",
      "melanges-and-dyed",
      "spun-virgin-yarn-ring-spun",
    ],
  },
  {
    id: "knitting",
    label: "Knitting Yarn",
    blurb: "Dyed worsted, blended, chenille and fancy yarns for knitwear and fabric manufacturers.",
    slugs: [
      "acrylic-worsted-dyed-yarn",
      "acrylic-nylon-worsted-blended-dyed-yarn",
      "acrylic-polyester-blended-dyed-yarn",
      "melanges-and-dyed",
      "chenille-dyed-yarn",
      "fancy-yarn",
    ],
  },
  {
    id: "hand-knitting",
    label: "Hand Knitting Yarn",
    blurb: "Thirteen named qualities designed for comfort and stitch definition.",
    slugs: ["hand-knitting-yarn"],
  },
  {
    id: "handicraft",
    label: "Handicraft Knitting Yarn",
    blurb: "Crochet, fancy and feather/fur yarns that add texture to handmade creations.",
    slugs: ["crochet-yarn", "fancy-yarn", "geetex-mercy-plus-yarn-feather-wool-fur-yarn"],
  },
  {
    id: "carpet",
    label: "Carpet Yarns",
    blurb: "Durable carpet and ring-spun yarns for high-traffic, heavy-use applications.",
    slugs: ["carpet-yarn", "spun-virgin-yarn-ring-spun"],
  },
];

function SegmentCard({ product }: { product: Product }) {
  const count = formatCount(product) ?? (product.retail ? `₹${product.retail.pricePerKg}/kg` : null);
  return (
    <li className="card-lift group relative flex flex-col overflow-hidden rounded-sm border border-line bg-surface">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <Image
          src={product.photo.src}
          alt={product.photo.alt}
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-xl leading-snug text-ink">
          <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0 hover:text-brand-strong focus-visible:outline-none">
            {product.name}
          </Link>
        </h3>
        {count ? <p className="spec mt-auto pt-3 text-sm text-muted">{count}</p> : null}
      </div>
    </li>
  );
}

/** Segment filter for the landing page: pick an industry segment to see its yarns. */
export function SegmentBrowser() {
  const [active, setActive] = useState(segments[0].id);
  const segment = segments.find((s) => s.id === active) ?? segments[0];
  const items = segment.slugs.map(getProduct).filter((p): p is Product => Boolean(p));

  return (
    <section id="segments" aria-labelledby="segments-title" className="border-b border-line bg-paper py-12 md:py-16">
      <div className="container-page">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-brand">Shop by segment</p>
            <h2 id="segments-title" className="mt-2 font-display text-h2 font-normal text-ink">
              Find yarn for your industry.
            </h2>
          </div>
          <Link href="/pages/product-range" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-brand hover:text-brand-strong">
            View full product range <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div role="group" aria-label="Yarn segments" className="mt-8 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] md:flex-wrap">
          {segments.map((s) => {
            const on = s.id === active;
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(s.id)}
                className={`inline-flex min-h-11 shrink-0 items-center rounded-full border px-5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                  on ? "border-ink bg-ink text-on-dark" : "border-line-strong/40 bg-surface text-ink hover:border-ink"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        <div aria-live="polite" className="mt-8">
          <p className="max-w-2xl text-ink-2">
            <span className="font-medium text-ink">{items.length} {items.length === 1 ? "product" : "products"}.</span> {segment.blurb}
          </p>
          <ul key={segment.id} className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p) => (
              <SegmentCard key={p.slug} product={p} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
