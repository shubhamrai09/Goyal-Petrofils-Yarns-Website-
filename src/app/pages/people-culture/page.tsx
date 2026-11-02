import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/blocks";
import { ButtonLink, SectionHeading } from "@/components/ui";
import { photos } from "@/lib/images";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "People & Culture",
  description:
    "Behind every cone of GeeTex yarn is a team of over 500 people at Goyal Petrofils Yarns Pvt. Ltd., Ludhiana — with equal opportunity, inclusive leadership and merit-based growth.",
  path: "/pages/people-culture",
  image: photos.handThread.src,
});

export default function PeopleCulturePage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "About us", href: "/pages/about-us" },
          { name: "People & culture", href: "/pages/people-culture" },
        ]}
        eyebrow="GeeTex Knitting Yarns"
        title="People & culture"
        photo={photos.handThread}
        intro={
          <p>
            Behind every cone of yarn we manufacture is a team of over 500 people who make it happen — across our manufacturing
            units in Ludhiana.
          </p>
        }
      />

      <section aria-labelledby="culture-title" className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <SectionHeading
            className="lg:col-span-5"
            index="01"
            eyebrow="How we work"
            title={<span id="culture-title">Equal opportunity, merit-based growth.</span>}
          />
          <div className="space-y-8 lg:col-span-7">
            <div className="border-t border-ink pt-6">
              <p className="spec font-display text-5xl text-ink">500+</p>
              <p className="mt-2 text-lg text-ink-2">people across our Ludhiana manufacturing units.</p>
            </div>
            <div className="border-t border-ink pt-6">
              <h3 className="font-display text-2xl text-ink">Diversity and inclusion</h3>
              <p className="mt-2 text-lg text-ink-2">
                We actively promote gender diversity and inclusive leadership, with equal opportunity and merit-based growth.
              </p>
            </div>
            <div className="border-t border-ink pt-6">
              <h3 className="font-display text-2xl text-ink">Skilled manpower</h3>
              <p className="mt-2 text-lg text-ink-2">
                Access to skilled manpower is part of the Ludhiana advantage that our operations are built on.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <ButtonLink href="/pages/careers">Careers at GeeTex</ButtonLink>
              <ButtonLink href="/pages/about-us" variant="secondary">
                Our story
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
