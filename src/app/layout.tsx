import type { Metadata, Viewport } from "next";
import { Montserrat, Newsreader, Work_Sans } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { RevealObserver } from "@/components/Reveal";
import { MotionProvider } from "@/components/motion";
import { themeInitScript } from "@/lib/theme";
import { JsonLd } from "@/components/ui";
import { SITE_URL, company, contact } from "@/lib/site";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
});

// Heavy geometric caps for the hero wordmark, matching the GEE TEX logo lettering.
const wordmark = Montserrat({
  variable: "--font-wordmark",
  subsets: ["latin"],
  weight: "800",
  display: "swap",
});

const description =
  "Goyal Petrofils Yarns Pvt. Ltd. (GeeTex Knitting Yarns) manufactures acrylic worsted, blended, dyed, chenille, hand knitting and handicraft yarns in Ludhiana, Punjab. Established 1977.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GeeTex Knitting Yarns | Yarn Manufacturer in Ludhiana, Est. 1977 — Goyal Petrofils Yarns",
    template: "%s | GeeTex — Goyal Petrofils Yarns Pvt. Ltd.",
  },
  description,
  applicationName: "GeeTex Knitting Yarns",
  // Canonical + og:url are set per page via pageMeta() so they are never inherited incorrectly.
  openGraph: {
    type: "website",
    siteName: "GeeTex Knitting Yarns — Goyal Petrofils Yarns Pvt. Ltd.",
    locale: "en_IN",
    title: "GeeTex Knitting Yarns — Goyal Petrofils Yarns Pvt. Ltd.",
    description,
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#fafaf9",
  width: "device-width",
  initialScale: 1,
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: company.legalName,
  alternateName: ["GeeTex", "GEETEX Knitting Yarns", "GPYPL"],
  url: SITE_URL,
  logo: `${SITE_URL}/brand/geetex-logo.png`,
  foundingDate: String(company.founded),
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 500 },
  email: contact.email,
  telephone: "+91-9855404440",
  address: contact.units.map((u) => ({
    "@type": "PostalAddress",
    name: u.name,
    streetAddress: u.lines[0],
    addressLocality: "Ludhiana",
    addressRegion: "Punjab",
    addressCountry: "IN",
  })),
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+91-9814404440",
      email: contact.email,
    },
  ],
  sameAs: [contact.instagram, contact.facebook],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${newsreader.variable} ${workSans.variable} ${wordmark.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available so scroll-reveal styles apply; without JS all content stays visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');" + themeInitScript }} />
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-xs focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
        >
          Skip to main content
        </a>
        <MotionProvider>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        <WhatsAppButton />
        </MotionProvider>
        <RevealObserver />
        <JsonLd data={organizationLd} />
      </body>
    </html>
  );
}
