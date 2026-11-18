import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Eye,
  FileText,
  Gem,
  Leaf,
  Quote,
  Target,
  type LucideIcon,
} from "lucide-react";
import { ButtonLink, SectionHeading } from "@/components/ui";
import { Timeline, icons } from "@/components/blocks";
import { FadeIn, ParallaxFrame, Stagger, StaggerItem } from "@/components/motion";
import { EnquiryForm } from "@/components/EnquiryForm";
import { photos, type Photo } from "@/lib/images";
import { formatCount, getProduct, products } from "@/lib/products";
import {
  books,
  certifications,
  contact,
  coreValues,
  directorMessages,
  leaders,
  sustainability,
  testimonials,
  timeline,
  vmp,
  whatsappLink,
} from "@/lib/site";
import type { ArticleSummary } from "@/components/ArticleCard";

/** Marks content that the company still has to supply. Visible, so nobody mistakes it for real content. */
function Pending({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-sm border border-dashed border-line-strong/60 bg-surface px-6 py-12 text-center">
      <Icon aria-hidden="true" className="size-9 text-muted" strokeWidth={1.25} />
      <p className="eyebrow text-muted">{title}</p>
      <p className="max-w-md text-[0.95rem] text-ink-2">{children}</p>
    </div>
  );
}

/* ── 1. Our Story ─────────────────────────────────────────────────────────────── */

export function StorySection() {
  return (
    <section aria-labelledby="story-title" className="section-y">
      <div className="container-page">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <ParallaxFrame className="relative aspect-[4/5] overflow-hidden rounded-sm bg-line">
              <Image src={photos.spinning.src} alt={photos.spinning.alt} fill placeholder="blur" sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </ParallaxFrame>
          </div>
          <div className="lg:col-span-7 lg:pl-6">
            <h2 id="story-title" className="font-display text-[clamp(3.5rem,2.5rem+6vw,8rem)] font-normal leading-[0.95] tracking-[-0.03em] text-ink">
              Our Story
            </h2>
            <p className="mt-5 font-display text-2xl italic leading-snug text-brand md:text-3xl">Built on Quality. Driven by Possibility.</p>
            <div className="mt-6 max-w-2xl space-y-5 text-lg leading-relaxed text-ink-2">
              <p>
                At Goyal Petrofils Yarns Pvt. Ltd., we believe that quality yarn is the foundation of creativity, craftsmanship, and
                textile excellence. Our focus is on providing dependable yarn solutions for diverse applications, from hosiery and
                knitting to handicrafts and carpet manufacturing. We aim to support our customers with consistent quality and a
                commitment to their requirements.
              </p>
              <p>
                The company was founded in 1977 and became a yarn dealer in 1987. In 1997 it opened its first manufacturing unit in
                Ludhiana, followed by a second unit in 2006, a ring spinning plant in 2013 and a worsted spinning plant in 2016. Today
                a team of 500+ people works across two units on Rahon Road.
              </p>
              <p>
                Over 20 years of working with fibre behaviour, yarn structure and dyeing science shape how we make yarn: controlled
                count, shade, strength and running performance, with the flexibility to customise blends, counts, textures, twist, ply
                and shades for each customer.
              </p>
              <p>
                That approach has taken GeeTex yarn to manufacturers across 16+ Indian states and to 7+ countries. We stand with the
                customer at every step, from development to technical support, because long-term relationships are the point of the
                business.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
              <ButtonLink href="/pages/about-us" variant="ghost">
                Discover Our Story
              </ButtonLink>
              <ButtonLink href="/pages/manufacturing-quality" variant="ghost">
                Manufacturing &amp; quality
              </ButtonLink>
            </div>
          </div>
        </div>
        <FadeIn className="mt-16 md:mt-20">
          <p className="eyebrow mb-6 text-muted">Our journey</p>
          <Timeline items={timeline} />
        </FadeIn>
      </div>
    </section>
  );
}

/* ── 2. Director's Message ────────────────────────────────────────────────────── */

export function DirectorMessageSection() {
  const hasMessage = directorMessages.length > 0;
  return (
    <section aria-labelledby="director-title" className="section-y border-y border-line bg-sand">
      <div className="container-page grid gap-12">
        <SectionHeading
          eyebrow="Leadership"
          title={<span id="director-title">A message from our leadership.</span>}
          intro="Trust, quality and long-term commitment guide how the company is run."
        />
        <div>
          {hasMessage ? (
            <div className="space-y-8">
              {directorMessages.map((m, i) => {
                const leader = leaders[i];
                return (
                  <FadeIn
                    as="figure"
                    key={m.author}
                    className="group relative overflow-hidden rounded-sm border border-line bg-surface shadow-[0_18px_50px_-30px_rgba(0,0,0,0.35)]"
                  >
                    <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-brand via-brand-strong to-leaf" />
                    <Quote
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-4 -top-4 size-40 rotate-6 text-brand/[0.07] transition-transform duration-700 group-hover:rotate-0"
                      strokeWidth={1}
                    />
                    <div className="relative p-6 pl-8 md:p-10 md:pl-14">
                      <div className="flex items-center gap-4 md:gap-5">
                        <span
                          aria-hidden="true"
                          className="flex size-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-strong font-display text-2xl text-on-brand ring-4 ring-brand-tint md:size-20 md:text-3xl"
                        >
                          {leader?.initials}
                        </span>
                        <div>
                          <p className="eyebrow text-brand">{m.role}</p>
                          <h3 className="mt-1 font-display text-3xl leading-tight text-ink md:text-4xl">{m.author}</h3>
                        </div>
                      </div>
                      <div aria-hidden="true" className="my-6 flex items-center gap-3">
                        <span className="h-px w-16 bg-brand" />
                        <span className="size-1.5 rotate-45 bg-leaf" />
                        <span className="h-px flex-1 bg-line" />
                      </div>
                      <blockquote className="space-y-4 font-display text-lg italic leading-relaxed text-ink-2 md:text-[1.4rem] md:leading-[1.65]">
                        {m.paragraphs.map((p) => (
                          <p key={p}>
                            <span className="mr-1 text-3xl leading-none text-brand">“</span>
                            {p}
                            <span className="ml-1 text-3xl leading-none text-brand">”</span>
                          </p>
                        ))}
                      </blockquote>
                      <figcaption className="mt-6 text-sm text-muted">— {m.author}, {m.role}</figcaption>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          ) : (
            <Pending icon={Quote} title="Director’s message">
              The message from our leadership will appear here once it has been provided.
            </Pending>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── 3. Vision, Mission & Values ──────────────────────────────────────────────── */

export function VisionMissionValuesSection() {
  const vision = vmp.find((v) => v.key === "Vision")!;
  const mission = vmp.find((v) => v.key === "Mission")!;
  const purpose = vmp.find((v) => v.key === "Purpose")!;
  return (
    <section aria-labelledby="vmv-title" className="on-dark relative isolate overflow-hidden section-y bg-ink text-on-dark">
      <div aria-hidden="true" className="glow-blob -right-40 -top-40 -z-10 size-[30rem] bg-glow-1" />
      <div className="container-page">
        <SectionHeading
          dark
          eyebrow="Vision, mission & values"
          title={<span id="vmv-title">Where we are headed, and how we get there.</span>}
          intro={purpose.text}
        />
        <Stagger as="ul" className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            { Icon: Eye, label: "Vision", body: <p>{vision.text}</p> },
            { Icon: Target, label: "Mission", body: <p>{mission.text}</p> },
            {
              Icon: Gem,
              label: "Core values",
              body: (
                <ul className="space-y-3 text-[0.95rem]">
                  {coreValues.map((v) => (
                    <li key={v.title}>
                      <span className="font-medium text-on-dark">{v.title}.</span> <span className="text-on-dark-muted">{v.text}</span>
                    </li>
                  ))}
                </ul>
              ),
            },
          ].map(({ Icon, label, body }) => (
            <StaggerItem
              as="li"
              key={label}
              className="rounded-sm border border-on-dark/20 bg-on-dark/[0.04] p-7 transition-colors duration-300 hover:border-brand-on-dark/60 md:p-8"
            >
              <Icon aria-hidden="true" className="size-7 text-brand-on-dark" strokeWidth={1.5} />
              <h3 className="eyebrow mt-5 text-brand-on-dark">{label}</h3>
              <div className="mt-4 font-display text-xl leading-snug text-on-dark [&_p]:text-xl [&_p]:leading-snug">{body}</div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ── 4. Books ─────────────────────────────────────────────────────────────────── */

export function BooksSection() {
  return (
    <section aria-labelledby="books-title" className="section-y">
      <div className="container-page">
        <SectionHeading
          eyebrow="The library"
          title={<span id="books-title">OUR BOOK</span>}
          intro="Reading from the people who make the yarn."
        />
        {books.length > 0 ? (
          <Stagger as="ul" className="mt-14 grid gap-y-14">
            {books.map((b) => (
              <StaggerItem as="li" key={b.title} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
                {/* Cover standing on a shelf board — picture on the left */}
                <div className="relative flex items-end justify-center border-b-[10px] border-line-strong/30 bg-gradient-to-t from-sand to-transparent px-6 pt-6 md:col-span-5">
                  {b.cover ? (
                    <Image
                      src={b.cover.src}
                      alt={b.cover.alt}
                      width={b.cover.width}
                      height={b.cover.height}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 80vw"
                      className="h-auto max-h-[28rem] w-auto max-w-full rounded-xs shadow-[0_24px_40px_-18px_rgba(0,0,0,0.5)]"
                    />
                  ) : (
                    <div role="img" aria-label="Book cover placeholder" className="flex aspect-[2/3] w-44 items-center justify-center rounded-xs border border-dashed border-line-strong/50 bg-surface text-muted">
                      <BookOpen aria-hidden="true" className="size-9" strokeWidth={1.25} />
                    </div>
                  )}
                </div>
                {/* Written content — right side */}
                <div className="md:col-span-7">
                  <p className="eyebrow text-brand">By Ritesh Goyal</p>
                  <h3 className="mt-3 font-display text-3xl leading-snug text-ink md:text-4xl">{b.title}</h3>
                  <p className="mt-4 max-w-xl text-lg text-ink-2">{b.description}</p>
                  {b.href ? (
                    <ButtonLink href={b.href} variant="ghost" className="mt-6 self-start">
                      Explore the book
                    </ButtonLink>
                  ) : null}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <FadeIn className="mt-14 grid items-center gap-10 border-b-[10px] border-line-strong/30 bg-gradient-to-t from-sand to-transparent px-4 pb-0 pt-6 md:grid-cols-12 md:px-10">
            <div className="flex justify-center md:col-span-4">
              <div
                role="img"
                aria-label="Book cover placeholder"
                className="flex aspect-[2/3] w-44 flex-col items-center justify-center gap-3 rounded-xs border border-dashed border-line-strong/50 bg-surface text-muted shadow-[0_24px_40px_-24px_rgba(0,0,0,0.35)]"
              >
                <BookOpen aria-hidden="true" className="size-9" strokeWidth={1.25} />
                <span className="eyebrow">Book cover</span>
              </div>
            </div>
            <div className="pb-8 md:col-span-8">
              <p className="eyebrow text-brand">Coming soon</p>
              <h3 className="mt-3 font-display text-3xl text-ink">Book title to be announced</h3>
              <p className="mt-3 max-w-xl text-lg text-ink-2">
                The title, description and cover of our book will be shown here once they are published.
              </p>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

/* ── 5. Blogs (latest three) ──────────────────────────────────────────────────── */

export type BlogCardData = ArticleSummary & { photo: Photo };

export function BlogsSection({ latest }: { latest: BlogCardData[] }) {
  return (
    <section aria-labelledby="blogs-title" className="section-y border-y border-line bg-sand">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Insights"
            title={<span id="blogs-title">Latest from the blog.</span>}
            intro="Practical guides on yarn quality, procurement and production for knitwear, hosiery and handicraft manufacturers."
          />
          <ButtonLink href="/blogs/geetex-blog" className="shrink-0 self-start md:self-auto">
            View All Blogs
          </ButtonLink>
        </div>
        <Stagger as="ul" className="mt-12 grid gap-8 md:grid-cols-3">
          {latest.map((a) => (
            <StaggerItem as="li" key={a.href} lift className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-line bg-surface transition-shadow duration-300 hover:shadow-[0_22px_44px_-26px_rgba(0,0,0,0.35)]">
                <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                  <Image
                    src={a.photo.src}
                    alt=""
                    fill
                    placeholder="blur"
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="eyebrow flex flex-wrap gap-x-3 gap-y-1 text-muted">
                    <span className="text-brand">{a.blogLabel}</span>
                    <time dateTime={a.dateIso}>{a.date}</time>
                  </p>
                  <h3 className="mt-3 font-display text-[1.375rem] leading-snug text-ink">
                    <Link href={a.href} className="after:absolute after:inset-0 group-hover:text-brand-strong focus-visible:outline-none">
                      {a.title}
                    </Link>
                  </h3>
                  <p className="mt-3 line-clamp-3 text-[0.95rem] text-ink-2">{a.summary}</p>
                  <span aria-hidden="true" className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-brand">
                    Read More <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </div>
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 hidden outline-2 -outline-offset-2 outline-brand group-has-[a:focus-visible]:block" />
              </article>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-8 text-ink-2">
          Also read:{" "}
          <Link href="/blogs/decorative-and-handicraft-yarn" className="font-medium text-brand underline-offset-4 hover:underline">
            Decorative &amp; Handicraft Yarn Insights
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ── 6. Sustainability ────────────────────────────────────────────────────────── */

export function SustainabilitySection() {
  return (
    <section
      aria-labelledby="sus-title"
      className="section-y relative isolate overflow-hidden bg-[color-mix(in_srgb,var(--color-leaf)_7%,var(--color-paper))]"
    >
      <Leaf aria-hidden="true" className="absolute -bottom-10 -right-10 -z-10 size-96 text-leaf/10" strokeWidth={0.75} />
      <div className="container-page">
        <SectionHeading
          eyebrow="Sustainability"
          title={<span id="sus-title">Responsible by design.</span>}
          intro="Water, energy and people: the practices at our Ludhiana units that we can put a number on."
        />
        <Stagger as="ul" className="mt-12 grid gap-6 md:grid-cols-3">
          {sustainability.map((s) => {
            const Icon = icons[s.icon];
            return (
              <StaggerItem as="li" key={s.figure} className="rounded-sm border border-leaf/30 bg-surface p-7">
                <span aria-hidden="true" className="flex size-12 items-center justify-center rounded-full bg-leaf/10 text-leaf">
                  <Icon className="size-6" strokeWidth={1.5} />
                </span>
                <p className="mt-5 font-display text-2xl text-ink">{s.figure}</p>
                <p className="mt-2 text-[0.95rem] text-ink-2">{s.text}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
        <ButtonLink href="/pages/company-at-a-glance" variant="ghost" className="mt-10">
          Company at a glance
        </ButtonLink>
      </div>
    </section>
  );
}

/* ── 7. Testimonials ──────────────────────────────────────────────────────────── */

export function TestimonialsSection() {
  return (
    <section aria-labelledby="testi-title" className="section-y">
      <div className="container-page">
        <SectionHeading
          eyebrow="Testimonials"
          title={<span id="testi-title">What our customers say.</span>}
          intro="Feedback from the manufacturers and makers we supply."
        />
        {testimonials.length > 0 ? (
          <Stagger as="ul" className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <StaggerItem as="li" key={`${t.name}-${t.quote.slice(0, 20)}`} className="flex h-full">
                <figure className="flex h-full flex-col rounded-sm border border-line bg-surface p-7">
                  <Quote aria-hidden="true" className="size-7 text-brand/50" strokeWidth={1.25} />
                  <blockquote className="mt-4 flex-1 font-display text-xl leading-snug text-ink">{t.quote}</blockquote>
                  <figcaption className="mt-6 border-t border-line pt-4">
                    <span className="block font-medium text-ink">{t.name}</span>
                    {t.role || t.company ? (
                      <span className="text-sm text-muted">{[t.role, t.company].filter(Boolean).join(", ")}</span>
                    ) : null}
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <FadeIn className="mt-12">
            <Pending icon={Quote} title="Customer testimonials">
              Verified customer feedback will be shown here. We only publish testimonials that customers have approved.
            </Pending>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

/* ── 8. Certifications ────────────────────────────────────────────────────────── */

export function CertificationsSection() {
  return (
    <section aria-labelledby="cert-title" className="section-y border-y border-line bg-sand">
      <div className="container-page">
        <SectionHeading
          eyebrow="Certifications"
          title={<span id="cert-title">Credentials and recognition.</span>}
          intro="Certificates, awards and industry credentials held by the company."
        />
        {certifications.length > 0 ? (
          <Stagger as="ul" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((c) => (
              <StaggerItem as="li" key={c.name} className="flex h-full">
                <figure className="flex h-full w-full flex-col rounded-sm border border-line bg-surface p-5">
                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-paper">
                    {c.image ? (
                      <Image src={c.image.src} alt={c.image.alt} width={c.image.width} height={c.image.height} className="h-full w-full object-contain p-3" />
                    ) : (
                      <Award aria-hidden="true" className="size-10 text-muted" strokeWidth={1.25} />
                    )}
                  </div>
                  <figcaption className="mt-4 flex-1">
                    <span className="block font-display text-lg leading-snug text-ink">{c.name}</span>
                    {c.issuer ? <span className="mt-1 block text-sm text-muted">{c.issuer}</span> : null}
                    {c.detail ? <span className="mt-2 block text-[0.95rem] text-ink-2">{c.detail}</span> : null}
                  </figcaption>
                  {c.documentHref ? (
                    <a
                      href={c.documentHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-brand hover:text-brand-strong hover:underline underline-offset-4"
                    >
                      <FileText aria-hidden="true" className="size-4" /> View certificate
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : null}
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <FadeIn className="mt-12">
            <Pending icon={Award} title="Certifications">
              Certificates and awards will be displayed here once the documents are supplied. No certification is claimed until then.
            </Pending>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

/* ── 9. Made for People ───────────────────────────────────────────────────────── */

/** Segment names and links match the Segment section above; copy and numbers come from the product catalogue. */
function range(slug: string) {
  const p = getProduct(slug);
  return p ? formatCount(p) : null;
}

const peopleSegments = [
  {
    name: "Hosiery Yarns",
    href: "/products/acrylic-nylon-worsted-blended-dyed-yarn",
    photo: photos.hosiery,
    usedFor: "Fabrics & knitwear",
    text: "Hosiery and knitwear makers need yarn that stays soft but does not give up on strength. Our acrylic/nylon worsted blend combines softness with enhanced strength and durability.",
    fact: `Acrylic/nylon worsted blended dyed yarn, ${range("acrylic-nylon-worsted-blended-dyed-yarn")}`,
  },
  {
    name: "Knitting Yarns",
    href: "/pages/product-range#dyed-blended",
    photo: photos.dyedRack,
    usedFor: "Weaving & knitting",
    text: "For manufacturers who build on colour, we spin acrylic worsted, acrylic/polyester blends, mélanges and chenille. What they share is a smooth, even yarn with good colour depth and colour retention.",
    fact: `Acrylic worsted dyed yarn, ${range("acrylic-worsted-dyed-yarn")}, 2–4 ply`,
  },
  {
    name: "Hand Knitting Yarns",
    href: "/products/hand-knitting-yarn",
    photo: photos.yarnBallsNeedles,
    usedFor: "Hand knitting",
    text: "Hand knitters judge yarn with their fingers first. Ours is designed for comfort, ease of use and clear stitch definition, and is offered in thirteen named qualities, from G.Smart and Dazzling to Signature and Juice.",
    fact: `Hand knitting yarn, ${range("hand-knitting-yarn")}, 13 qualities`,
  },
  {
    name: "Handicraft Yarns",
    href: "/collections/handicraft-yarns",
    photo: photos.crochet,
    usedFor: "Handmade & decorative crafts",
    text: "Crochet and fancy yarns bring texture, softness and visual interest to handmade work and decorative pieces. The range covers fur, loop, tape, feather and many more crochet types, plus slub, boucle and other fancy types, and Mercy Plus feather/fur yarn in 70+ shades.",
    fact: `Crochet yarn, ${range("crochet-yarn")}, 11 types`,
  },
  {
    name: "Carpet Yarns",
    href: "/products/carpet-yarn",
    photo: photos.carpet,
    usedFor: "Carpets",
    text: "Our carpet yarn is engineered for durability and performance in high-traffic, heavy-use applications.",
    fact: `Carpet yarn, ${range("carpet-yarn")}`,
  },
] as const;

export function MadeForPeopleSection() {
  return (
    <section aria-labelledby="people-title" className="section-y">
      <div className="container-page">
        <SectionHeading
          eyebrow="Made for people"
          title={<span id="people-title">Made for the people who make things.</span>}
          intro="Our purpose is to empower weavers and knitters with yarn they can confidently build their products on. Here is how each of our segments serves the people behind it."
        />
        <ol className="mt-14 space-y-16 md:space-y-24">
          {peopleSegments.map((s, i) => (
            <li key={s.name}>
              <FadeIn className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
                <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Link href={s.href} className="group block overflow-hidden rounded-sm bg-sand">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={s.photo.src}
                        alt={s.photo.alt}
                        fill
                        placeholder="blur"
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
                      />
                    </div>
                  </Link>
                </div>
                <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <p className="eyebrow flex items-center gap-3 text-muted">
                    <span className="text-brand">{String(i + 1).padStart(2, "0")}</span>
                    <span aria-hidden="true" className="h-px w-8 bg-line-strong/60" />
                    <span>{s.usedFor}</span>
                  </p>
                  <h3 className="mt-4 font-display text-3xl leading-tight text-ink md:text-4xl">{s.name}</h3>
                  <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-2">{s.text}</p>
                  <p className="spec mt-5 border-l-2 border-brand pl-4 text-[0.95rem] text-muted">{s.fact}</p>
                  <ButtonLink href={s.href} variant="ghost" className="mt-5">
                    Explore {s.name.toLowerCase()}
                  </ButtonLink>
                </div>
              </FadeIn>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── 10. Business Inquiry ─────────────────────────────────────────────────────── */

export function BusinessInquirySection() {
  const productOptions = products.map((p) => ({ value: p.slug, label: p.name }));
  return (
    <section id="enquiry" aria-labelledby="inquiry-title" className="section-y border-t border-line bg-sand">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Business inquiry"
            title={<span id="inquiry-title">Discuss Your Business Requirements</span>}
            intro="Manufacturers, distributors and business partners: tell us the product, count, shade and quantity you need, and our team will get back to you."
          />
          <ul className="mt-8 space-y-2 text-ink-2">
            <li>
              <ButtonLink href={whatsappLink("Hi, I'd like to discuss a business requirement.")} variant="secondary" icon="external">
                Chat on WhatsApp
              </ButtonLink>
            </li>
            <li>
              <a href={contact.phones[0].href} className="inline-flex min-h-11 items-center hover:text-brand-strong hover:underline underline-offset-4">
                Call {contact.phones[0].display}
              </a>
            </li>
          </ul>
        </div>
        <div className="rounded-sm border border-line bg-surface p-6 shadow-[0_24px_48px_-32px_rgba(0,0,0,0.3)] md:p-8 lg:col-span-7">
          <EnquiryForm productOptions={productOptions} email={contact.email} whatsappNumber={contact.whatsappNumber} />
        </div>
      </div>
    </section>
  );
}

/* ── Instagram ────────────────────────────────────────────────────────────────── */

/** Instagram glyph (lucide no longer ships brand icons). */
function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

const instagramTiles: Photo[] = [
  photos.dyedRack,
  photos.handKnitting,
  photos.crochetSquares,
  photos.millAisle,
  photos.pastelYarnTable,
  photos.skeins,
];

/** Reels shown in the Instagram Page section (shortcode from instagram.com/reel/<code>/). */
const instagramReels = [
  { code: "DUK07EMEfcw", title: "GeeTex Instagram reel 1" },
  { code: "DShFVyZDbH_", title: "GeeTex Instagram reel 2" },
];

export function InstagramSection() {
  const handle = contact.instagram.replace(/\/+$/, "").split("/").pop();
  return (
    <section aria-labelledby="insta-title" className="section-y border-t border-line">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Instagram Page"
            title={<span id="insta-title">Instagram Page</span>}
            intro={
              <>
                New shades, mill updates and what makers create with our yarn, on{" "}
                <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="font-medium text-brand underline-offset-4 hover:underline">
                  @{handle}
                </a>
                .
              </>
            }
          />
          <ButtonLink href={contact.instagram} icon="external" className="shrink-0 self-start md:self-auto">
            Follow @{handle}
          </ButtonLink>
        </div>
        <ul className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2">
          {instagramReels.map((r) => (
            <li key={r.code} className="@container mx-auto w-full max-w-[400px]">
              <iframe
                src={`https://www.instagram.com/reel/${r.code}/embed/`}
                title={r.title}
                loading="lazy"
                allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
                allowFullScreen
                className="block h-[calc(125cqw+215px)] w-full rounded-sm border border-line bg-surface"
              />
            </li>
          ))}
        </ul>
        <Stagger as="ul" className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {instagramTiles.map((p) => (
            <StaggerItem as="li" key={p.alt}>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.alt} — view @${handle} on Instagram`}
                className="group relative block aspect-square overflow-hidden rounded-sm bg-sand"
              >
                <Image
                  src={p.src}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 16vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.06] motion-reduce:transition-none"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center bg-black/0 text-on-dark opacity-0 transition duration-300 group-hover:bg-black/40 group-hover:opacity-100 group-focus-visible:bg-black/40 group-focus-visible:opacity-100"
                >
                  <InstagramIcon className="size-8" />
                </span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
