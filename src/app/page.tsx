import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink, JsonLd, StatStrip } from "@/components/ui";
import { CtaBand } from "@/components/blocks";
import {
  BlogsSection,
  BooksSection,
  BusinessInquirySection,
  CertificationsSection,
  DirectorMessageSection,
  MadeForPeopleSection,
  StorySection,
  SustainabilitySection,
  TestimonialsSection,
  VisionMissionValuesSection,
} from "@/components/home-sections";
import { photos } from "@/lib/images";
import { products } from "@/lib/products";
import { SITE_URL, company, stats, whatsappLink } from "@/lib/site";
import { blogs, getArticles } from "@/lib/articles";
import { toSummary } from "@/lib/article-summary";
import { pageMeta } from "@/lib/seo";
import { HeroFade, HeroVideo, Stagger, StaggerItem } from "@/components/motion";

export const metadata = pageMeta({
  title: "Goyal Petrofils Yarns Pvt. Ltd. | Acrylic, Blended, Dyed & Handicraft Yarn Manufacturer in Ludhiana, Est. 1977",
  absoluteTitle: true,
  description:
    "Goyal Petrofils Yarns Pvt. Ltd. manufactures acrylic worsted, blended, dyed, chenille, hand knitting, crochet and carpet yarns in Ludhiana, Punjab. Established 1977; supplying 16+ Indian states and 7+ countries.",
  path: "/",
  image: photos.hero.src,
});

/** Each segment links to an existing page; no new routes. */
const segments = [
  { name: "Hosiery Yarns", photo: photos.hosiery, href: "/products/acrylic-nylon-worsted-blended-dyed-yarn" },
  { name: "Knitting Yarns", photo: photos.yarnConesShelf, href: "/pages/product-range#dyed-blended" },
  { name: "Hand Knitting Yarns", photo: photos.handKnitting, href: "/products/hand-knitting-yarn" },
  { name: "Handicraft Yarns", photo: photos.crochetSquares, href: "/collections/handicraft-yarns" },
  { name: "Carpet Yarns", photo: photos.carpet, href: "/products/carpet-yarn" },
];

export default function HomePage() {
  // Three most recent published articles across both blogs; cards use the blog's cover photo (articles carry no images).
  const latest = getArticles()
    .slice(0, 3)
    .map((a) => ({ ...toSummary(a), photo: blogs[a.blog].photo }));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: company.legalName,
          url: SITE_URL,
          publisher: { "@id": `${SITE_URL}/#organization` },
        }}
      />

      {/* Hero — looping video background with the company name on top */}
      <section aria-labelledby="hero-title" className="relative isolate overflow-hidden border-b border-line bg-ink text-on-dark">
        <HeroVideo clips={["/hero-third.mp4", "/hero-second-smooth.mp4"]} />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <HeroFade className="container-page flex min-h-[calc(100svh-4.5rem)] flex-col justify-center py-16 md:py-24">
          <Stagger onMount className="flex flex-col items-start">
            <StaggerItem as="p" className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-on-dark/80">
              <span>{company.legalName}</span>
              <span aria-hidden="true" className="h-px w-6 bg-on-dark/50" />
              <span>Est. {company.founded}</span>
            </StaggerItem>
            <StaggerItem>
              <h1 id="hero-title" className="mt-6">
                <Image
                  src="/brand/geetex-wordmark.svg"
                  alt="GEE TEX Knitting Yarns"
                  width={4170}
                  height={1404}
                  unoptimized
                  preload
                  className="h-auto w-[clamp(16rem,8rem+32vw,36rem)] [filter:drop-shadow(0_4px_18px_rgba(0,0,0,0.55))]"
                />
              </h1>
            </StaggerItem>
            <StaggerItem as="p" className="mt-6 max-w-2xl font-display text-2xl italic leading-snug text-on-dark md:text-3xl">
              Yarn engineered to run cleanly on your machines.
            </StaggerItem>
            <StaggerItem as="p" className="mt-4 max-w-2xl text-base leading-relaxed text-on-dark/85 md:text-lg">
              {company.legalName} manufactures acrylic worsted, blended, dyed and handicraft yarns in Ludhiana — trusted by
              manufacturers across India and in 7+ countries for consistent quality and reliable supply.
            </StaggerItem>
            <StaggerItem className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="/pages/product-range">Explore products</ButtonLink>
              <ButtonLink
                href="/pages/contact#enquiry"
                variant="secondary"
                icon="none"
                className="!border-on-dark/70 !bg-transparent !text-on-dark hover:!bg-on-dark/15"
              >
                Request an enquiry
              </ButtonLink>
              <ButtonLink
                href={whatsappLink("Hi, I'd like to request a yarn sample.")}
                variant="ghost"
                icon="external"
                className="ml-1 !text-on-dark hover:!bg-on-dark/15"
              >
                Request a sample on WhatsApp
              </ButtonLink>
            </StaggerItem>
          </Stagger>
        </HeroFade>
        <div className="container-page pb-4">
          <StatStrip items={stats} dark />
        </div>
        <div aria-hidden="true" className="marquee overflow-hidden border-t border-on-dark/20 bg-black/40 py-4 backdrop-blur-sm">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex shrink-0 items-center">
                {products.map((p) => (
                  <li key={p.slug} className="flex items-center gap-6 px-6 font-display text-xl text-on-dark/90 italic">
                    {p.name}
                    <span className="size-1.5 rounded-full bg-brand" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* Yarn segments */}
      <section id="segments" aria-labelledby="segments-title" className="border-b border-line bg-paper py-12 md:py-16">
        <div className="container-page">
          <h2 id="segments-title" className="font-display text-h2 font-normal text-ink">
            Yarn segments
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {segments.map((seg) => (
              <li key={seg.name}>
                <Link href={seg.href} className="card-lift group block overflow-hidden rounded-sm border border-line bg-surface">
                  <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                    <Image
                      src={seg.photo.src}
                      alt={seg.photo.alt}
                      fill
                      placeholder="blur"
                      sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none"
                    />
                  </div>
                  <h3 className="flex items-center justify-between gap-2 p-4 font-display text-lg leading-snug text-ink group-hover:text-brand-strong">
                    {seg.name}
                    <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <StorySection />
      <DirectorMessageSection />
      <VisionMissionValuesSection />
      <BooksSection />
      <BlogsSection latest={latest} />
      <SustainabilitySection />
      <TestimonialsSection />
      <CertificationsSection />
      <MadeForPeopleSection />
      <BusinessInquirySection />

      {/* Closing contact band (unchanged) */}
      <CtaBand />
    </>
  );
}
