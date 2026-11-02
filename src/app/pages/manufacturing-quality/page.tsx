import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/blocks";
import { SectionHeading } from "@/components/ui";
import { photos } from "@/lib/images";
import { contact, timeline } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Manufacturing & Quality — Worsted and Ring Spinning in Ludhiana",
  description:
    "GeeTex manufactures yarn at two units on Rahon Road, Ludhiana, with a ring spinning plant (2013) and a worsted spinning plant (2016). Quality focus: controlled count, shade, strength and running performance.",
  path: "/pages/manufacturing-quality",
  image: photos.windingMachines.src,
});

// Product ↔ process mapping uses only the process named in each published product description.
const processes = [
  {
    name: "Worsted spinning",
    since: "Worsted spinning plant commissioned in 2016",
    products: [
      { name: "Acrylic Worsted Dyed Yarn", slug: "acrylic-worsted-dyed-yarn" },
      { name: "Acrylic/Nylon Worsted Blended Dyed Yarn", slug: "acrylic-nylon-worsted-blended-dyed-yarn" },
    ],
    photo: photos.windingMachines,
  },
  {
    name: "Ring spinning",
    since: "Ring spinning plant commissioned in 2013",
    products: [{ name: "Spun Virgin Yarn (Ring Spun)", slug: "spun-virgin-yarn-ring-spun" }],
    photo: photos.spinning,
  },
  {
    name: "Dyeing & blending",
    since: "Dyed and blended yarns across the range",
    products: [
      { name: "Acrylic/Polyester Blended Dyed Yarn", slug: "acrylic-polyester-blended-dyed-yarn" },
      { name: "Mélanges & Dyed", slug: "melanges-and-dyed" },
      { name: "Chenille Dyed Yarn", slug: "chenille-dyed-yarn" },
    ],
    photo: photos.dyedRack,
  },
];

const controls = [
  { k: "Count", v: "Controlled yarn count, product after product." },
  { k: "Shade", v: "Controlled shade, drawing on our understanding of dyeing science." },
  { k: "Strength", v: "Controlled yarn strength." },
  { k: "Running performance", v: "Yarn engineered to run cleanly on your machines." },
];

const custom = ["Blends", "Counts", "Textures", "Twist", "Ply", "Shades"];

export default function ManufacturingPage() {
  const plants = timeline.filter((t) => ["1997", "2006", "2013", "2016"].includes(t.year));
  return (
    <>
      <PageHero
        crumbs={[
          { name: "About us", href: "/pages/about-us" },
          { name: "Manufacturing & quality", href: "/pages/manufacturing-quality" },
        ]}
        eyebrow="Manufacturing & quality"
        title="Spinning, dyeing and quality control in Ludhiana"
        photo={photos.windingMachines}
        intro={
          <p>
            Two manufacturing units on Rahon Road, a ring spinning plant and a worsted spinning plant — operated from a modern,
            well-equipped facility that enables efficient production and stringent quality control.
          </p>
        }
      />

      <section aria-labelledby="units-title" className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <SectionHeading
            className="lg:col-span-5"
            index="01"
            eyebrow="Facilities"
            title={<span id="units-title">Two units, built in stages.</span>}
          />
          <div className="lg:col-span-7">
            <ol className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
              {plants.map((p) => (
                <li key={p.year} className="bg-surface p-4">
                  <p className="spec font-display text-3xl text-ink">{p.year}</p>
                  <p className="mt-1 text-sm text-ink-2">{p.title}</p>
                </li>
              ))}
            </ol>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {contact.units.map((u) => (
                <li key={u.name} className="flex gap-4 border-t border-ink pt-5">
                  <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand" />
                  <div>
                    <h3 className="font-display text-xl text-ink">{u.name}</h3>
                    {u.lines.map((l) => (
                      <p key={l} className="text-ink-2">{l}</p>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="process-title" className="section-y border-t border-line bg-sand">
        <div className="container-page">
          <SectionHeading
            index="02"
            eyebrow="Processes"
            title={<span id="process-title">Processes behind the product range.</span>}
            intro="Each product description names the process used to make it."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {processes.map((pr) => (
              <article key={pr.name} className="flex flex-col border border-line bg-surface" data-reveal>
                <div className="relative aspect-[16/10] overflow-hidden bg-line">
                  <Image src={pr.photo.src} alt={pr.photo.alt} fill placeholder="blur" sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl text-ink">{pr.name}</h3>
                  <p className="mt-1 text-sm text-muted">{pr.since}</p>
                  <ul className="mt-5 divide-y divide-line border-t border-line">
                    {pr.products.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/products/${p.slug}`} className="flex min-h-11 items-center py-2 text-ink hover:text-brand-strong hover:underline underline-offset-4">
                          {p.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="quality-title" className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              index="03"
              eyebrow="Quality"
              title={<span id="quality-title">Consistency you can run on.</span>}
              intro="Reliable yarn quality is built on over 20 years of understanding fibre behaviour, yarn structure and dyeing science."
            />
          </div>
          <dl className="divide-y divide-line border-y border-line lg:col-span-7">
            {controls.map((c) => (
              <div key={c.k} className="grid gap-2 py-6 sm:grid-cols-3 sm:gap-6" data-reveal>
                <dt className="font-display text-2xl text-ink">{c.k}</dt>
                <dd className="text-ink-2 sm:col-span-2 sm:pt-1.5">{c.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="custom-title" className="on-dark section-y bg-ink text-on-dark">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SectionHeading
              dark
              index="04"
              eyebrow="Flexible manufacturing"
              title={<span id="custom-title">Customised to your specification.</span>}
              intro="We offer customised solutions across six dimensions and stand with you from development to technical support."
            />
          </div>
          <ul className="grid grid-cols-2 gap-px border border-on-dark/20 bg-on-dark/20 sm:grid-cols-3 lg:col-span-6">
            {custom.map((c, i) => (
              <li key={c} className="bg-ink p-6">
                <span className="spec text-sm text-on-dark-muted">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 font-display text-2xl">{c}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="ludhiana-title" className="section-y">
        <div className="container-page grid gap-10 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[3/2] overflow-hidden rounded-xs bg-sand">
            <Image src={photos.millAisle.src} alt={photos.millAisle.alt} fill placeholder="blur" sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="eyebrow text-brand">05 · Location</p>
            <h2 id="ludhiana-title" className="mt-4 font-display text-h2 font-normal text-ink">
              The Ludhiana advantage
            </h2>
            <p className="mt-4 text-lg text-ink-2">
              Being based in Ludhiana gives us fast access to raw materials, strong logistics and skilled manpower. Our
              rainwater harvesting and 700 kW solar installation are part of how we run our sites.
            </p>
            <Link href="/pages/company-at-a-glance" className="mt-6 inline-flex min-h-11 items-center font-medium text-brand underline-offset-4 hover:underline">
              Read about our sustainability work
            </Link>
          </div>
        </div>
      </section>

      <CtaBand title="Have a technical requirement?" text="Tell us the blend, count, twist, ply and shade you need, and our team will get in touch." />
    </>
  );
}
