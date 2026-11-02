import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const links = [
  { label: "Product range", href: "/pages/product-range" },
  { label: "Handicraft yarns", href: "/collections/handicraft-yarns" },
  { label: "About us", href: "/pages/about-us" },
  { label: "Fabric & garment insights", href: "/blogs/geetex-blog" },
  { label: "Contact", href: "/pages/contact" },
];

export default function NotFound() {
  return (
    <section className="container-page py-20 md:py-28">
      <p className="eyebrow text-brand">Error 404</p>
      <h1 className="mt-4 max-w-3xl font-display text-h1 font-normal text-ink">We couldn’t find that page.</h1>
      <p className="mt-6 max-w-2xl text-lg text-ink-2">
        The link may be out of date — our website has recently moved to a new design. Try one of these instead:
      </p>
      <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-flex min-h-11 items-center font-medium text-brand underline-offset-4 hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      <ButtonLink href="/" className="mt-10">
        Back to home
      </ButtonLink>
    </section>
  );
}
