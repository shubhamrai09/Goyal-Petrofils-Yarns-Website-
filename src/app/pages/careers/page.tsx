import { Mail, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/ui";
import { photos } from "@/lib/images";
import { contact, sustainability } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Careers",
  description:
    "Join the team at Goyal Petrofils Yarns Pvt. Ltd. (GeeTex Knitting Yarns) — 500+ employees strong, manufacturing yarn in Ludhiana, Punjab.",
  path: "/pages/careers",
  image: photos.millAisle.src,
});

export default function CareersPage() {
  const inclusion = sustainability.find((s) => s.icon === "users");
  return (
    <>
      <PageHero
        crumbs={[{ name: "Careers", href: "/pages/careers" }]}
        eyebrow="Join us"
        title="Careers at GeeTex"
        photo={photos.millAisle}
        intro={
          <p>
            Goyal Petrofils Yarns Pvt. Ltd. is always looking to grow our team of 500+ employees across our Ludhiana
            manufacturing units.
          </p>
        }
      />

      <section aria-labelledby="apply-title" className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <SectionHeading
            className="lg:col-span-5"
            index="01"
            eyebrow="Get in touch"
            title={<span id="apply-title">Ask us about current opportunities.</span>}
            intro={inclusion ? <p>{inclusion.text}</p> : undefined}
          />
          <ul className="space-y-6 lg:col-span-6 lg:col-start-7">
            <li className="flex gap-4 border-t border-ink pt-6">
              <Mail aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand" />
              <div>
                <h3 className="eyebrow text-muted">Email</h3>
                <a href={`mailto:${contact.email}?subject=${encodeURIComponent("Careers enquiry")}`} className="mt-1 inline-block [overflow-wrap:anywhere] text-xl text-ink hover:text-brand-strong hover:underline underline-offset-4">
                  {contact.email}
                </a>
                <p className="mt-1 text-sm text-muted">Use the subject line “Careers enquiry” and mention the role you are interested in.</p>
              </div>
            </li>
            <li className="flex gap-4 border-t border-ink pt-6">
              <Phone aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand" />
              <div>
                <h3 className="eyebrow text-muted">Telephone</h3>
                <a href={contact.telephones[0].href} className="mt-1 inline-block text-xl text-ink hover:text-brand-strong hover:underline underline-offset-4">
                  {contact.telephones[0].display}
                </a>
              </div>
            </li>
            <li className="border-t border-ink pt-6">
              <h3 className="eyebrow text-muted">Where we work</h3>
              <ul className="mt-2 space-y-3 text-ink-2">
                {contact.units.map((u) => (
                  <li key={u.name}>
                    <span className="font-medium text-ink">{u.name}:</span> {u.lines.join(", ")}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
