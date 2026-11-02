import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { CtaBand, LeaderCard, Timeline } from "@/components/blocks";
import { ButtonLink, SectionHeading, StatStrip } from "@/components/ui";
import { photos } from "@/lib/images";
import { company, leaders, stats, timeline, vmp } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About Us — Our Story since 1977",
  description:
    "Learn about Goyal Petrofils Yarns Pvt. Ltd., the company behind GeeTex Knitting Yarns: founded in 1977, manufacturing yarn in Ludhiana since 1997, led by Chairman Vinod Goyal and Managing Director Ritesh Goyal.",
  path: "/pages/about-us",
  image: photos.millAisle.src,
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About us", href: "/pages/about-us" }]}
        eyebrow={`Since ${company.founded}`}
        title="Our story"
        photo={photos.millAisle}
        intro={
          <p>
            Founded in 1977, we set out to build a trusted name in the yarn industry through quality, integrity and long-term
            relationships.
          </p>
        }
      />

      <section aria-labelledby="story-title" className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <SectionHeading
            className="lg:col-span-5"
            index="01"
            eyebrow="How we grew"
            title={<span id="story-title">From a yarn dealership to an integrated manufacturer.</span>}
          />
          <div className="space-y-6 text-lg leading-relaxed text-ink-2 lg:col-span-7">
            <p>
              What started as a yarn dealership in 1987 steadily evolved into a fully integrated manufacturing enterprise with
              the launch of our first manufacturing unit in 1997, followed by a second in 2006. As we grew, we continued to invest
              in capability and innovation, commissioning a ring spinning plant in 2013 and a worsted spinning plant in 2016.
            </p>
            <p>
              Today, with a strong presence across India and exports to more than seven countries, our story reflects decades of
              consistent growth, technical expertise and an unwavering commitment to excellence.
            </p>
            <p>
              {company.legalName} is a textile manufacturing and supply company that specialises in high-quality yarns for a wide
              range of textile applications. We are committed to blending traditional craftsmanship with modern textile technology
              to deliver products that meet the creative and functional needs of our customers.
            </p>
            <p>
              Based in Ludhiana, Punjab, we operate from a modern, well-equipped facility that enables efficient production and
              stringent quality control. We go by the brand name <strong className="font-semibold text-ink">GEETEX Knitting Yarns</strong>.
            </p>
          </div>
        </div>
        <div className="container-page mt-16">
          <StatStrip items={stats} />
        </div>
      </section>

      {/* Cultural heritage split section */}
      <section aria-labelledby="heritage-title" className="section-y border-t border-line">
        <div className="container-page grid items-center gap-10 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            <figure className="relative aspect-[3/4] overflow-hidden rounded-sm bg-sand shadow-[0_24px_48px_-20px_rgba(0,0,0,0.35)]">
              <Image
                src={photos.rangolicDiya.src}
                alt={photos.rangolicDiya.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </figure>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow text-brand">Rooted in Punjab</p>
            <h2 id="heritage-title" className="mt-3 font-display text-h2 font-normal text-ink">
              Craft, colour and community.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-2">
              Ludhiana has been the heartbeat of India&rsquo;s textile industry for generations. Our yarns are woven into that tradition — supplying the makers who bring colour and craft to every season, every celebration and every home. From everyday knitwear to festival handicrafts, we are proud to be part of what gets made.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="journey-title" className="section-y border-t border-line bg-sand">
        <div className="container-page">
          <SectionHeading index="02" eyebrow="Our journey" title={<span id="journey-title">Milestones</span>} />
          <div className="mt-12">
            <Timeline items={timeline} />
          </div>
        </div>
      </section>

      <section aria-labelledby="leaders-title" className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <SectionHeading
            className="lg:col-span-5"
            index="03"
            eyebrow="Leadership"
            title={<span id="leaders-title">The people accountable for every commitment.</span>}
          />
          <div className="grid gap-8 lg:col-span-7">
            {leaders.map((l) => (
              <LeaderCard key={l.name} leader={l} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="vmp-title" className="on-dark section-y bg-ink text-on-dark">
        <div className="container-page">
          <SectionHeading dark index="04" eyebrow="What we do" title={<span id="vmp-title">Vision, mission and purpose</span>} />
          <dl className="mt-12 grid gap-px border-y border-on-dark/20 bg-on-dark/20 md:grid-cols-3">
            {vmp.map((v) => (
              <div key={v.key} className="bg-ink py-8 md:px-8 md:first:pl-0">
                <dt className="eyebrow text-brand-on-dark">{v.key}</dt>
                <dd className="mt-4 font-display text-xl leading-snug md:text-2xl">{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="next-title" className="section-y">
        <div className="container-page grid items-center gap-10 md:grid-cols-2">
          <div className="relative aspect-[3/2] overflow-hidden rounded-xs bg-sand">
            <Image src={photos.factoryTeal.src} alt={photos.factoryTeal.alt} fill placeholder="blur" sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <h2 id="next-title" className="font-display text-h2 font-normal text-ink">
              See the company at a glance
            </h2>
            <p className="mt-4 text-lg text-ink-2">What sets us apart, our milestones and our sustainability work, on one page.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/pages/company-at-a-glance">Company at a glance</ButtonLink>
              <ButtonLink href="/pages/manufacturing-quality" variant="secondary">
                Manufacturing &amp; quality
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
