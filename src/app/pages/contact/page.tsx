import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { EnquiryForm } from "@/components/EnquiryForm";
import { JsonLd } from "@/components/ui";
import { products } from "@/lib/products";
import { SITE_URL, company, contact, whatsappLink } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact Us — Business Enquiries",
  description:
    "Contact Goyal Petrofils Yarns Pvt. Ltd. (GeeTex Knitting Yarns), Rahon Road, Ludhiana, Punjab: phone +91-9855404440, email goyalpetrofilsyarns@hotmail.com, WhatsApp, and an online enquiry form.",
  path: "/pages/contact",
});

export default function ContactPage() {
  const productOptions = products.map((p) => ({ value: p.slug, label: p.name }));
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: `${SITE_URL}/pages/contact`,
          about: { "@id": `${SITE_URL}/#organization` },
        }}
      />
      <PageHero
        crumbs={[{ name: "Contact", href: "/pages/contact" }]}
        eyebrow="Get in touch"
        title="Contact us"
        intro={
          <p>
            For product enquiries, samples, shade cards and orders, reach us by phone, email or WhatsApp — or send the enquiry
            form below.
          </p>
        }
      />

      <section className="container-page grid gap-14 py-14 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="font-display text-2xl text-ink">{company.legalName}</h2>
          <p className="mt-1 text-muted">GEETEX Knitting Yarns</p>

          <address className="mt-8 space-y-7 not-italic">
            <div className="flex gap-4">
              <Phone aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand" />
              <div>
                <h3 className="eyebrow text-muted">Phone</h3>
                <ul className="mt-1">
                  {contact.phones.map((p) => (
                    <li key={p.href}>
                      <a href={p.href} className="inline-flex min-h-10 items-center text-lg text-ink hover:text-brand-strong hover:underline underline-offset-4">
                        {p.display}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand" />
              <div>
                <h3 className="eyebrow text-muted">Telephone</h3>
                <ul className="mt-1">
                  {contact.telephones.map((p) => (
                    <li key={p.href}>
                      <a href={p.href} className="inline-flex min-h-10 items-center text-lg text-ink hover:text-brand-strong hover:underline underline-offset-4">
                        {p.display}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand" />
              <div>
                <h3 className="eyebrow text-muted">Email</h3>
                <a href={`mailto:${contact.email}`} className="mt-1 inline-flex min-h-10 items-center [overflow-wrap:anywhere] text-lg text-ink hover:text-brand-strong hover:underline underline-offset-4">
                  {contact.email}
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <MessageCircle aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand" />
              <div>
                <h3 className="eyebrow text-muted">WhatsApp</h3>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-10 items-center text-lg text-ink hover:text-brand-strong hover:underline underline-offset-4">
                  {contact.whatsappDisplay}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
            {contact.units.map((u) => (
              <div key={u.name} className="flex gap-4">
                <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand" />
                <div>
                  <h3 className="eyebrow text-muted">{u.name}</h3>
                  {u.lines.map((l) => (
                    <p key={l} className="text-lg text-ink">{l}</p>
                  ))}
                </div>
              </div>
            ))}
          </address>

          <a
            href={contact.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-11 items-center gap-1.5 font-medium text-brand underline-offset-4 hover:text-brand-strong hover:underline"
          >
            Open in Google Maps <ArrowUpRight aria-hidden="true" className="size-4" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <p className="mt-1 text-sm text-muted">{contact.mapsListing}</p>

          <ul className="mt-8 flex gap-6 border-t border-line pt-6">
            <li>
              <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-ink hover:text-brand-strong">
                Instagram <ArrowUpRight aria-hidden="true" className="size-3.5" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-ink hover:text-brand-strong">
                Facebook <ArrowUpRight aria-hidden="true" className="size-3.5" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>

        <section id="enquiry" aria-labelledby="enquiry-title" className="scroll-mt-28 border border-line bg-surface p-6 md:p-10 lg:col-span-8">
          <p className="eyebrow text-brand">Business enquiry</p>
          <h2 id="enquiry-title" className="mt-3 font-display text-h2 font-normal text-ink">
            Request a quote or sample
          </h2>
          <p className="mt-3 mb-8 max-w-2xl text-ink-2">
            Tell us the product, count, blend, shade and quantity you need. The more detail you share, the faster we can help.
          </p>
          <EnquiryForm productOptions={productOptions} email={contact.email} whatsappNumber={contact.whatsappNumber} />
        </section>
      </section>
    </>
  );
}
