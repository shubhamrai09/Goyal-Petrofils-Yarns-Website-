import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { CtaBand, Timeline, icons } from "@/components/blocks";
import { SectionHeading, StatStrip } from "@/components/ui";
import { photos } from "@/lib/images";
import { differentiators, stats, sustainability, timeline } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Company at a Glance",
  description:
    "Goyal Petrofils Yarns Pvt. Ltd. (GeeTex) at a glance — founded 1977, 500+ employees, shipping to 16+ states and 7+ countries from two manufacturing units in Ludhiana, with rainwater harvesting and a 700 kW solar installation.",
  path: "/pages/company-at-a-glance",
  image: photos.factoryTeal.src,
});

export default function GlancePage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "About us", href: "/pages/about-us" },
          { name: "Company at a glance", href: "/pages/company-at-a-glance" },
        ]}
        eyebrow="GeeTex Knitting Yarns"
        title="The company at a glance"
        photo={photos.factoryTeal}
        intro={
          <p>
            We go by the brand name GEETEX Knitting Yarns. Goyal Petrofils Yarns Pvt. Ltd. is known for quality products, ethical
            business conduct and consistent customer focus — a dependable partner to textile manufacturers in India and beyond.
          </p>
        }
      />

      <section aria-label="Key figures" className="container-page py-12 md:py-16">
        <StatStrip items={stats} />
      </section>

      <section aria-labelledby="apart-title" className="section-y border-t border-line">
        <div className="container-page">
          <SectionHeading index="01" eyebrow="What sets us apart" title={<span id="apart-title">Five things we hold ourselves to.</span>} />
          <ol className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-5">
            {differentiators.map((d, i) => {
              const Icon = icons[d.icon];
              return (
                <li key={d.title} className="flex flex-col bg-surface p-6" data-reveal>
                  <div className="flex items-center justify-between">
                    <Icon aria-hidden="true" className="size-6 text-brand" strokeWidth={1.5} />
                    <span className="spec text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-6 font-display text-xl text-ink">{d.title}</h3>
                  <p className="mt-2 text-[0.95rem] text-ink-2">{d.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section aria-labelledby="journey-title" className="section-y border-t border-line bg-sand">
        <div className="container-page">
          <SectionHeading index="02" eyebrow="Our journey" title={<span id="journey-title">From 1977 to today</span>} />
          <div className="mt-12">
            <Timeline items={timeline} />
          </div>
        </div>
      </section>

      <section aria-labelledby="sus-title" className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading index="03" eyebrow="Sustainability" title={<span id="sus-title">Water, energy and people.</span>} />
            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-xs bg-sand">
              <Image src={photos.factoryFloor.src} alt={photos.factoryFloor.alt} fill placeholder="blur" sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>
          <ul className="space-y-10 lg:col-span-6 lg:col-start-7">
            {sustainability.map((s) => {
              const Icon = icons[s.icon];
              return (
                <li key={s.figure} className="flex gap-5 border-t border-ink pt-6" data-reveal>
                  <Icon aria-hidden="true" className="mt-1 size-7 shrink-0 text-brand" strokeWidth={1.5} />
                  <div>
                    <p className="font-display text-3xl text-ink">{s.figure}</p>
                    <p className="mt-2 text-lg text-ink-2">{s.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
