import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE_URL } from "@/lib/site";
import { JsonLd } from "./ui";

export type Crumb = { name: string; href: string };

/** Visible breadcrumb trail + BreadcrumbList structured data. The last crumb is the current page. */
export function Breadcrumbs({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className={`flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm ${dark ? "text-on-dark-muted" : "text-muted"}`}>
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className={`line-clamp-1 ${dark ? "text-on-dark" : "text-ink"}`}>
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={c.href}
                      className={`underline-offset-4 hover:underline ${dark ? "hover:text-on-dark" : "hover:text-ink"}`}
                    >
                      {c.name}
                    </Link>
                    <ChevronRight aria-hidden="true" className="size-3.5" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: `${SITE_URL}${c.href === "/" ? "" : c.href}`,
          })),
        }}
      />
    </>
  );
}
