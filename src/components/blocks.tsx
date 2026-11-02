import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Droplets,
  Handshake,
  Layers,
  Mail,
  MessageCircle,
  Palette,
  Phone,
  Ruler,
  Sun,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { familyName, formatCount, type Product } from "@/lib/products";
import { contact, whatsappLink } from "@/lib/site";
import { ButtonLink } from "./ui";

export const icons: Record<string, LucideIcon> = {
  ruler: Ruler,
  layers: Layers,
  palette: Palette,
  handshake: Handshake,
  truck: Truck,
  droplets: Droplets,
  sun: Sun,
  users: Users,
};

/** Spec-sheet style product card: photo, family, name, published count range. */
export function ProductCard({ product, headingLevel = "h3" }: { product: Product; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const count = formatCount(product);
  return (
    <article className="card-lift group relative flex h-full flex-col rounded-sm border border-line bg-surface transition-transform duration-300 hover:-translate-y-1.5 motion-reduce:hover:translate-y-0">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <Image
          src={product.photo.src}
          alt={product.photo.alt}
          fill
          placeholder="blur"
          sizes="(min-width: 1280px) 300px, (min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-muted">{familyName(product.family)}</p>
        <H className="mt-2 font-display text-[1.375rem] leading-snug text-ink">
          <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {product.name}
          </Link>
        </H>
        <dl className="spec mt-auto grid grid-cols-2 gap-x-4 border-t border-line pt-4 text-sm">
          {count ? (
            <div>
              <dt className="text-muted">Count range</dt>
              <dd className="mt-0.5 font-medium text-ink">{count}</dd>
            </div>
          ) : null}
          {product.ply ? (
            <div>
              <dt className="text-muted">Ply</dt>
              <dd className="mt-0.5 font-medium text-ink">{product.ply}</dd>
            </div>
          ) : null}
          {product.variants ? (
            <div>
              <dt className="text-muted">{product.variants.label}</dt>
              <dd className="mt-0.5 font-medium text-ink">{product.variants.items.length} options</dd>
            </div>
          ) : null}
          {product.retail ? (
            <>
              <div>
                <dt className="text-muted">Price</dt>
                <dd className="mt-0.5 font-medium text-ink">₹{product.retail.pricePerKg}/kg incl. GST</dd>
              </div>
              <div>
                <dt className="text-muted">Shades</dt>
                <dd className="mt-0.5 font-medium text-ink">70+</dd>
              </div>
            </>
          ) : null}
        </dl>
        <span aria-hidden="true" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
          View specifications <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
      {/* Keyboard focus ring for the stretched link */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 hidden outline-2 outline-offset-2 outline-brand group-has-[a:focus-visible]:block" />
    </article>
  );
}

export function Timeline({ items, dark = false }: { items: readonly { year: string; title: string }[]; dark?: boolean }) {
  return (
    <ol className="grid gap-px sm:grid-cols-2 lg:grid-cols-7">
      {items.map((t, i) => (
        <li
          key={t.year}
          className={`relative border-t-2 pt-5 pr-4 pb-6 ${
            i === items.length - 1 ? "border-brand" : dark ? "border-on-dark/30" : "border-ink"
          }`}
        >
          <span
            aria-hidden="true"
            className={`absolute -top-[7px] left-0 size-3 rounded-full ${i === items.length - 1 ? "bg-brand" : dark ? "bg-on-dark" : "bg-ink"}`}
          />
          <p className={`spec font-display text-3xl ${dark ? "text-on-dark" : "text-ink"}`}>{t.year}</p>
          <p className={`mt-2 text-[0.95rem] ${dark ? "text-on-dark-muted" : "text-ink-2"}`}>{t.title}</p>
        </li>
      ))}
    </ol>
  );
}

/** Closing call-to-action used across pages. */
export function CtaBand({
  title = "Tell us the count, blend and shade you need.",
  text = "Share your requirement — product, count, shade and quantity — and our team will get in touch.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="on-dark bg-brand-strong text-on-dark">
      <div className="container-page grid gap-10 py-16 md:py-20 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="eyebrow text-brand-on-dark">Business enquiries</p>
          <h2 id="cta-title" className="mt-4 font-display text-h2 font-normal">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-lg text-on-dark/85">{text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/pages/contact#enquiry" variant="inverse">
              Send an enquiry
            </ButtonLink>
            <ButtonLink href={whatsappLink("Hi, I'd like to request a yarn sample.")} variant="light" icon="external">
              Request a sample on WhatsApp
            </ButtonLink>
          </div>
        </div>
        <ul className="space-y-4 text-on-dark lg:col-span-4 lg:col-start-9">
          <li className="flex items-start gap-3">
            <Phone aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand-on-dark" />
            <span>
              <span className="block text-sm text-on-dark/75">Call</span>
              <a href={contact.phones[0].href} className="text-lg hover:underline underline-offset-4">
                {contact.phones[0].display}
              </a>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Mail aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand-on-dark" />
            <span>
              <span className="block text-sm text-on-dark/75">Email</span>
              <a href={`mailto:${contact.email}`} className="[overflow-wrap:anywhere] text-lg hover:underline underline-offset-4">
                {contact.email}
              </a>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <MessageCircle aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand-on-dark" />
            <span>
              <span className="block text-sm text-on-dark/75">WhatsApp</span>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-lg hover:underline underline-offset-4">
                {contact.whatsappDisplay}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}

export function LeaderCard({ leader }: { leader: { name: string; initials: string; role: string; bio: string } }) {
  return (
    <article className="flex gap-5 border-t border-line pt-6">
      <span
        aria-hidden="true"
        className="flex size-16 shrink-0 items-center justify-center rounded-full border border-ink font-display text-xl text-ink"
      >
        {leader.initials}
      </span>
      <div>
        <h3 className="font-display text-2xl text-ink">{leader.name}</h3>
        <p className="eyebrow mt-1 text-brand">{leader.role}</p>
        <p className="mt-3 text-ink-2">{leader.bio}</p>
      </div>
    </article>
  );
}
