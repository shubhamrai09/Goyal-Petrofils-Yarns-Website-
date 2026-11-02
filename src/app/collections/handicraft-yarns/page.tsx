import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { CtaBand, ProductCard } from "@/components/blocks";
import { ButtonLink } from "@/components/ui";
import { photos } from "@/lib/images";
import { MERCY_PLUS_SLUG, getProduct, products } from "@/lib/products";
import { whatsappLink } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Handicraft Yarns — Mercy Plus Feather/Fur Yarn, Crochet & Fancy Yarns",
  description:
    "GeeTex handicraft yarns for crochet and knitting artisans: GEETEX Mercy Plus feather wool / fur yarn (₹350/kg incl. GST, 70+ shades), crochet, fancy, chenille and hand knitting yarns from Ludhiana.",
  path: "/collections/handicraft-yarns",
  image: photos.tassels.src,
});

export default function HandicraftCollectionPage() {
  const mercy = getProduct(MERCY_PLUS_SLUG)!;
  const others = products.filter(
    (p) => p.slug !== MERCY_PLUS_SLUG && ["crochet-yarn", "fancy-yarn", "hand-knitting-yarn", "chenille-dyed-yarn"].includes(p.slug),
  );

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Product range", href: "/pages/product-range" },
          { name: "Handicraft yarns", href: "/collections/handicraft-yarns" },
        ]}
        eyebrow="Collection"
        title="Handicraft yarns"
        intro={<p>GeeTex yarns for crochet and knitting artisans — available to order directly.</p>}
      />

      <section aria-labelledby="mercy-title" className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xs bg-sand lg:col-span-6">
            <Image src={mercy.photo.src} alt={mercy.photo.alt} fill preload placeholder="blur" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="lg:col-span-6">
            <p className="eyebrow text-brand">Featured · Order direct</p>
            <h2 id="mercy-title" className="mt-3 font-display text-h2 font-normal text-ink">
              {mercy.name}
            </h2>
            <p className="mt-2 text-lg text-ink-2">Feather wool / fur yarn in 70+ shades.</p>
            <p className="spec mt-6 font-display text-4xl text-ink">
              ₹{mercy.retail!.pricePerKg}
              <span className="ml-2 font-sans text-base text-ink-2">per kg incl. GST · ex-mill Ludhiana</span>
            </p>
            <p className="mt-2 text-ink-2">
              Sold in {mercy.retail!.bundleKg} kg bundles (₹{mercy.retail!.bundlePrice} per bundle). Transport charges are paid to
              the transporter, as per actual.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={`/products/${mercy.slug}`}>View details &amp; order</ButtonLink>
              <ButtonLink href={whatsappLink("Hi, I'd like to order GEETEX Mercy Plus. Please share the shade options.")} variant="secondary" icon="external">
                Order on WhatsApp
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="more-title" className="section-y border-t border-line bg-sand">
        <div className="container-page">
          <h2 id="more-title" className="font-display text-h2 font-normal text-ink">
            More yarns for makers
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-ink-2">Crochet, fancy, chenille and hand knitting yarns from the GeeTex range — available on enquiry.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Craft inspiration split section */}
      <section aria-labelledby="craft-title" className="section-y border-t border-line">
        <div className="container-page grid items-center gap-10 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <p className="eyebrow text-brand">Made by hand</p>
            <h2 id="craft-title" className="mt-3 font-display text-h2 font-normal text-ink">
              Yarn that inspires what you make next.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-2">
              Soft pastels, rich textures and vibrant shades — our handicraft yarns are crafted for artisans who care about every stitch. Whether you&rsquo;re knitting baby garments, crocheting home décor or gifting handmade pieces, GeeTex yarn delivers the feel and colour you need.
            </p>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
            <figure className="relative aspect-[3/4] overflow-hidden rounded-sm bg-sand shadow-[0_24px_48px_-20px_rgba(0,0,0,0.35)]">
              <Image
                src={photos.pastelYarnTable.src}
                alt={photos.pastelYarnTable.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
