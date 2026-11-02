import Image from "next/image";
import { notFound } from "next/navigation";
import { Download, MessageCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand, ProductCard } from "@/components/blocks";
import { ButtonLink, JsonLd } from "@/components/ui";
import { countSystemNote, familyName, formatCount, getProduct, products } from "@/lib/products";
import { SITE_URL, company, whatsappLink } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const count = formatCount(p);
  return pageMeta({
    title: p.retail ? `${p.name} — Feather Wool / Fur Yarn, ₹${p.retail.pricePerKg}/kg` : `${p.name}${count ? ` (${count})` : ""}`,
    description: `${p.description} ${count ? `Count range ${count}. ` : ""}Manufactured by ${company.legalName} (GeeTex), Ludhiana.`,
    path: `/products/${p.slug}`,
    image: p.photo.src,
  });
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const count = formatCount(p);
  const related = products.filter((x) => x.family === p.family && x.slug !== p.slug).slice(0, 3);
  const enquiryHref = `/pages/contact?product=${encodeURIComponent(p.slug)}#enquiry`;
  const waText = `Hi, I'd like to enquire about ${p.name}.`;

  return (
    <>
      {p.retail ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            description: p.description,
            brand: { "@type": "Brand", name: "GeeTex" },
            manufacturer: { "@id": `${SITE_URL}/#organization` },
            url: `${SITE_URL}/products/${p.slug}`,
            image: `${SITE_URL}${p.photo.src.src}`,
            offers: {
              "@type": "Offer",
              price: p.retail.bundlePrice.toFixed(2),
              priceCurrency: "INR",
              url: `${SITE_URL}/products/${p.slug}`,
              description: `${p.retail.bundleKg} kg bundle — ₹${p.retail.pricePerKg}/kg incl. GST, ex-mill Ludhiana`,
              seller: { "@id": `${SITE_URL}/#organization` },
            },
          }}
        />
      ) : null}

      <div className="container-page pt-8">
        <Breadcrumbs
          items={[
            { name: "Product range", href: "/pages/product-range" },
            { name: p.name, href: `/products/${p.slug}` },
          ]}
        />
      </div>

      <section className="container-page grid gap-10 pt-10 pb-16 lg:grid-cols-12 lg:gap-14 lg:pb-24">
        <div className="lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xs bg-sand lg:sticky lg:top-28 lg:aspect-[4/5]">
            <Image
              src={p.photo.src}
              alt={p.photo.alt}
              fill
              preload
              placeholder="blur"
              sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <p className="mt-3 text-sm text-muted">Representative image — not the actual product. Ask us for a physical sample.</p>
        </div>

        <div className="lg:col-span-6">
          <p className="eyebrow text-brand">{familyName(p.family)}</p>
          <h1 className="mt-3 font-display text-h1 font-normal tracking-[-0.015em] text-ink">{p.name}</h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-2">{p.description}</p>

          {p.retail ? (
            <div className="mt-8 border border-ink p-6">
              <p className="eyebrow text-muted">Price (as listed)</p>
              <p className="spec mt-2 font-display text-4xl text-ink">
                ₹{p.retail.bundlePrice}
                <span className="ml-2 font-sans text-base text-ink-2">per {p.retail.bundleKg} kg bundle</span>
              </p>
              <ul className="mt-4 space-y-1.5 text-ink-2">
                {p.retail.terms.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-brand" />
                    {t}
                  </li>
                ))}
                <li className="flex gap-2">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-brand" />
                  {p.retail.shades}
                </li>
              </ul>
              <p className="mt-4 text-sm text-muted">Please confirm the current price and shade availability when you order.</p>
            </div>
          ) : null}

          <dl className="spec mt-8 divide-y divide-line border-y border-line">
            {count && p.count ? (
              <div className="grid grid-cols-3 gap-4 py-4">
                <dt className="text-muted">Count range</dt>
                <dd className="col-span-2 font-medium text-ink">
                  {count}
                  <span className="mt-1 block font-normal text-sm text-muted">{countSystemNote[p.count.system]}</span>
                </dd>
              </div>
            ) : null}
            {p.ply ? (
              <div className="grid grid-cols-3 gap-4 py-4">
                <dt className="text-muted">Ply</dt>
                <dd className="col-span-2 font-medium text-ink">{p.ply}</dd>
              </div>
            ) : null}
            {p.use ? (
              <div className="grid grid-cols-3 gap-4 py-4">
                <dt className="text-muted">Made for</dt>
                <dd className="col-span-2 font-medium text-ink">{p.use}</dd>
              </div>
            ) : null}
            <div className="grid grid-cols-3 gap-4 py-4">
              <dt className="text-muted">Manufacturer</dt>
              <dd className="col-span-2 font-medium text-ink">
                {company.legalName}, Ludhiana, Punjab
              </dd>
            </div>
          </dl>

          {p.variants ? (
            <div className="mt-8">
              <h2 className="eyebrow text-muted">
                {p.variants.label} ({p.variants.items.length})
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {p.variants.items.map((v) => (
                  <li key={v} className="rounded-full border border-line-strong/40 bg-surface px-3.5 py-1.5 text-sm text-ink">
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {p.shadeCard ? (
            <a
              href={p.shadeCard.href}
              download
              className="mt-8 inline-flex min-h-11 items-center gap-2 font-medium text-brand underline-offset-4 hover:text-brand-strong hover:underline"
            >
              <Download aria-hidden="true" className="size-4" />
              Download the {p.shadeCard.label}
            </a>
          ) : null}

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={enquiryHref}>{p.retail ? "Enquire / place an order" : "Enquire about this yarn"}</ButtonLink>
            <a
              href={whatsappLink(waText)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xs border border-ink px-5 py-2.5 text-[0.95rem] font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              <MessageCircle aria-hidden="true" className="size-4" />
              {p.retail ? "Order on WhatsApp" : "Ask on WhatsApp"}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>

      {related.length ? (
        <section aria-labelledby="related-title" className="border-t border-line bg-sand py-16 md:py-20">
          <div className="container-page">
            <h2 id="related-title" className="font-display text-h2 font-normal text-ink">
              More in {familyName(p.family).toLowerCase()}
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ProductCard key={r.slug} product={r} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand title={`Interested in ${p.name}?`} />
    </>
  );
}
