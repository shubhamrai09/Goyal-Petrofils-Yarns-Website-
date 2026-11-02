import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company, contact, whatsappLink } from "@/lib/site";
import { products } from "@/lib/products";

const companyLinks = [
  { label: "About us", href: "/pages/about-us" },
  { label: "Company at a glance", href: "/pages/company-at-a-glance" },
  { label: "Manufacturing & quality", href: "/pages/manufacturing-quality" },
  { label: "People & culture", href: "/pages/people-culture" },
  { label: "Careers", href: "/pages/careers" },
  { label: "Contact", href: "/pages/contact" },
];

const insightLinks = [
  { label: "Fabric & garment insights", href: "/blogs/geetex-blog" },
  { label: "Decorative & handicraft insights", href: "/blogs/decorative-and-handicraft-yarn" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark bg-ink text-on-dark">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-3">
          <div className="inline-flex items-center gap-3 rounded-xs bg-surface px-3 py-2">
            <Image src="/brand/geetex-logo.png" alt="" width={449} height={525} className="h-12 w-auto" />
            <span className="font-display text-lg leading-tight text-ink">
              Goyal Petrofils Yarns
              <span className="block text-xs text-muted">Pvt. Ltd.</span>
            </span>
          </div>
          <p className="mt-6 max-w-sm text-on-dark-muted">
            {company.legalName} — makers of dyed, blended and handicraft yarns in {company.city}, {company.region}.
            Established {company.founded}.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li>
              <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-on-dark hover:text-brand-on-dark">
                Instagram <ArrowUpRight aria-hidden="true" className="size-3.5" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-on-dark hover:text-brand-on-dark">
                Facebook <ArrowUpRight aria-hidden="true" className="size-3.5" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Products" className="lg:col-span-3">
          <h2 className="eyebrow text-on-dark-muted">Products</h2>
          <ul className="mt-4 space-y-1 text-[0.95rem]">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="inline-block py-1 text-on-dark hover:text-brand-on-dark hover:underline underline-offset-4">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company" className="lg:col-span-2">
          <h2 className="eyebrow text-on-dark-muted">Company</h2>
          <ul className="mt-4 space-y-1 text-[0.95rem]">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block py-1 text-on-dark hover:text-brand-on-dark hover:underline underline-offset-4">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="eyebrow mt-8 text-on-dark-muted">Insights</h2>
          <ul className="mt-4 space-y-1 text-[0.95rem]">
            {insightLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block py-1 text-on-dark hover:text-brand-on-dark hover:underline underline-offset-4">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <h2 className="eyebrow text-on-dark-muted">Contact</h2>
          <address className="mt-4 space-y-4 text-[0.95rem] not-italic">
            <p className="flex gap-3">
              <Phone aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-on-dark" />
              <span>
                {contact.phones.map((p) => (
                  <a key={p.href} href={p.href} className="block hover:text-brand-on-dark hover:underline underline-offset-4">
                    {p.display}
                  </a>
                ))}
              </span>
            </p>
            <p className="flex gap-3">
              <Mail aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-on-dark" />
              <a href={`mailto:${contact.email}`} className="[overflow-wrap:anywhere] hover:text-brand-on-dark hover:underline underline-offset-4">
                {contact.email}
              </a>
            </p>
            <p className="flex gap-3">
              <MessageCircle aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-on-dark" />
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-brand-on-dark hover:underline underline-offset-4">
                WhatsApp {contact.whatsappDisplay}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
            {contact.units.map((u) => (
              <p key={u.name} className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-on-dark" />
                <span>
                  <span className="font-medium">{u.name}</span>
                  {u.lines.map((l) => (
                    <span key={l} className="block text-on-dark-muted">{l}</span>
                  ))}
                </span>
              </p>
            ))}
          </address>
        </div>
      </div>
      <div className="border-t border-on-dark/15">
        <div className="container-page flex flex-col gap-2 py-6 pr-20 text-sm text-on-dark-muted md:flex-row md:items-center md:justify-between">
          <p>© {year} {company.legalName}. All rights reserved.</p>
          <p>
            Photography: <Link href="/pages/image-credits" className="underline underline-offset-4 hover:text-on-dark">Unsplash contributors</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
