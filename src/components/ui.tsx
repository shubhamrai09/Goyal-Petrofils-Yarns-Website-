import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CountUp } from "./motion";

type Variant = "primary" | "secondary" | "ghost" | "light" | "inverse";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xs px-5 py-2.5 text-[0.95rem] font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";
const variants: Record<Variant, string> = {
  primary: "bg-brand text-on-brand hover:bg-brand-strong",
  secondary: "border border-ink text-ink hover:bg-ink hover:text-paper",
  ghost: "px-0 text-brand underline-offset-4 hover:text-brand-strong hover:underline",
  light: "border border-on-dark/50 text-on-dark hover:bg-on-dark hover:text-ink",
  inverse: "bg-on-dark text-ink hover:bg-white",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `${base} ${variants[variant]} ${extra}`;
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  icon?: "arrow" | "external" | "none";
};

/** Internal links use next/link; absolute URLs open in a new tab with an accessible hint. */
export function ButtonLink({ variant = "primary", icon = "arrow", className = "", children, href, ...rest }: ButtonLinkProps) {
  const external = typeof href === "string" && /^(https?:|mailto:|tel:)/.test(href);
  const Icon = icon === "none" ? null : icon === "external" ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      {children}
      {Icon ? <Icon aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.75} /> : null}
    </>
  );
  if (external) {
    const newTab = /^https?:/.test(href as string);
    return (
      <a
        href={href as string}
        className={buttonClass(variant, className)}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(rest as ComponentProps<"a">)}
      >
        {content}
        {newTab ? <span className="sr-only"> (opens in a new tab)</span> : null}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, className)} {...rest}>
      {content}
    </Link>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  dark = false,
  as: Tag = "h2",
  className = "",
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <p className={`eyebrow flex items-center gap-3 ${dark ? "text-on-dark-muted" : "text-muted"}`}>
        {index ? <span className={dark ? "text-brand-on-dark" : "text-brand"}>{index}</span> : null}
        {index ? <span aria-hidden="true" className={`h-px w-8 ${dark ? "bg-on-dark-muted/50" : "bg-line-strong/60"}`} /> : null}
        <span>{eyebrow}</span>
      </p>
      <Tag
        className={`mt-4 font-display font-normal tracking-[-0.01em] ${Tag === "h1" ? "text-h1" : "text-h2"} ${dark ? "text-on-dark" : "text-ink"}`}
      >
        {title}
      </Tag>
      {intro ? (
        <div className={`mt-5 max-w-2xl text-lg leading-relaxed ${dark ? "text-on-dark-muted" : "text-ink-2"}`}>{intro}</div>
      ) : null}
    </div>
  );
}

export function StatStrip({
  items,
  dark = false,
}: {
  items: readonly { value: string; label: string }[];
  dark?: boolean;
}) {
  return (
    // Hairline grid: the 1px gaps show the background colour as rules between cells.
    <dl
      className={`grid grid-cols-2 gap-px border-y md:grid-cols-4 ${
        dark ? "border-on-dark/20 bg-on-dark/20" : "border-line bg-line"
      }`}
    >
      {items.map((s) => (
        <div key={s.label} className={`flex flex-col-reverse px-4 py-6 md:px-6 ${dark ? "bg-ink" : "bg-paper"}`}>
          <dt className={`eyebrow mt-2 ${dark ? "text-on-dark-muted" : "text-muted"}`}>{s.label}</dt>
          <dd className={`spec font-display text-4xl md:text-5xl ${dark ? "text-on-dark" : "text-ink"}`}>
            <CountUp value={s.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD built from our own static data; `<` is escaped to keep it inert inside the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
