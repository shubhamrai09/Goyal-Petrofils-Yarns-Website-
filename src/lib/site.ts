/**
 * Verified company facts. Every value here is taken from geetexyarn.com
 * (see docs/reference-content-inventory.md). Do not add facts that are not in the inventory.
 */

export const SITE_URL = "https://geetexyarn.com";

export const company = {
  legalName: "Goyal Petrofils Yarns Pvt. Ltd.",
  shortName: "GPYPL",
  brand: "GeeTex",
  brandFull: "GEETEX Knitting Yarns",
  founded: 1977,
  city: "Ludhiana",
  region: "Punjab",
  country: "India",
} as const;

export const stats = [
  { value: "1977", label: "Founded" },
  { value: "500+", label: "Employees" },
  { value: "16+", label: "States shipped to" },
  { value: "7+", label: "Countries exported to" },
] as const;

export const contact = {
  phones: [
    { display: "+91 98554 04440", href: "tel:+919855404440" },
    { display: "+91 98144 04440", href: "tel:+919814404440" },
  ],
  telephones: [
    { display: "+91 161 269 0004", href: "tel:+911612690004" },
    { display: "+91 97812 75444", href: "tel:+919781275444" },
  ],
  email: "goyalpetrofilsyarns@hotmail.com",
  whatsappNumber: "919814404440",
  whatsappDisplay: "+91 98144 04440",
  instagram: "https://instagram.com/geetexyarns",
  facebook: "https://facebook.com/geetexyarns",
  units: [
    {
      name: "Unit I",
      lines: ["Rahon Road, Village Meharban", "Ludhiana, Punjab, India"],
    },
    {
      name: "Unit II",
      lines: ["Rahon Road, Village Khawajke", "Ludhiana, Punjab, India"],
    },
  ],
  // From the company's Google Maps listing shown on the reference contact page.
  mapsListing: "Rahon Rd, Meharban, Punjab 141007, India",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Goyal+Petrofils+Yarns+Pvt.+Ltd.+(GEETEX)+Rahon+Rd+Meharban+Punjab+141007",
} as const;

export function whatsappLink(message?: string) {
  const text =
    message ?? "Hi, I found you through your website. I'd like to inquire about a product.";
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const vmp = [
  {
    key: "Vision",
    text: "To become a trusted yarn manufacturing brand known across India and key global markets for consistency, reliability, and long-term partnerships.",
  },
  {
    key: "Mission",
    text: "To build long-term partnerships by being responsive, transparent, and dependable in every supply commitment.",
  },
  {
    key: "Purpose",
    text: "To empower weavers and knitters with yarn they can confidently build their products on.",
  },
] as const;

export const leaders = [
  {
    name: "Mr. Vinod Goyal",
    initials: "VG",
    role: "Chairman",
    bio: "Guides the company's manufacturing standards and long-term growth strategy with decades of industry expertise.",
  },
  {
    name: "Mr. Ritesh Goyal",
    initials: "RG",
    role: "Managing Director",
    bio: "Leads day-to-day operations, customer relationships and the company's continued focus on quality and delivery.",
  },
] as const;

export const timeline = [
  { year: "1977", title: "Founding year" },
  { year: "1987", title: "Yarn dealership" },
  { year: "1997", title: "First manufacturing unit" },
  { year: "2006", title: "Second manufacturing unit" },
  { year: "2013", title: "Ring spinning plant" },
  { year: "2016", title: "Worsted spinning plant" },
  { year: "Today", title: "Supplying pan-India and 7+ countries" },
] as const;

export const differentiators = [
  {
    title: "Consistent quality",
    text: "Reliable yarn quality with controlled count, shade, strength and running performance.",
    icon: "ruler",
  },
  {
    title: "Technical expertise",
    text: "Over 20 years of understanding fibre behaviour, yarn structure and dyeing science.",
    icon: "layers",
  },
  {
    title: "Flexible manufacturing",
    text: "Customised solutions across blends, counts, textures, twist, ply and shades.",
    icon: "palette",
  },
  {
    title: "Customer-centric",
    text: "Standing with the customer at every step, from development to technical support.",
    icon: "handshake",
  },
  {
    title: "The Ludhiana advantage",
    text: "Fast raw-material access, strong logistics and skilled manpower.",
    icon: "truck",
  },
] as const;

export const sustainability = [
  {
    figure: "2.5–3 million litres",
    text: "of rainwater recharged every year, harvested from 1,00,000 sq. ft. of rooftop area.",
    icon: "droplets",
  },
  {
    figure: "700 kW solar",
    text: "installation that reduces approximately 800 tonnes of CO₂ emissions every year.",
    icon: "sun",
  },
  {
    figure: "Equal opportunity",
    text: "We actively promote gender diversity and inclusive leadership, with merit-based growth.",
    icon: "users",
  },
] as const;

export const nav = [
  {
    label: "Company",
    children: [
      { label: "About us", href: "/pages/about-us", description: "Our story since 1977, leadership and values" },
      { label: "Company at a glance", href: "/pages/company-at-a-glance", description: "Key facts, milestones and sustainability" },
      { label: "Manufacturing & quality", href: "/pages/manufacturing-quality", description: "Spinning, dyeing and quality focus" },
      { label: "People & culture", href: "/pages/people-culture", description: "The 500+ people behind every cone" },
    ],
  },
  { label: "Products", href: "/pages/product-range" },
  { label: "Handicraft yarns", href: "/collections/handicraft-yarns" },
  {
    label: "Insights",
    children: [
      { label: "Fabric & garment", href: "/blogs/geetex-blog", description: "Guides for knitwear and hosiery manufacturers" },
      { label: "Decorative & handicraft", href: "/blogs/decorative-and-handicraft-yarn", description: "Guides for decorative and craft yarn buyers" },
    ],
  },
  { label: "Careers", href: "/pages/careers" },
] as const;

/**
 * Core values — each one is a word taken from the published Vision / Mission / differentiators
 * (docs/reference-content-inventory.md §2). No value is added that the company has not stated.
 */
export const coreValues = [
  { title: "Consistency", text: "Controlled count, shade, strength and running performance, cone after cone." },
  { title: "Responsiveness", text: "Standing with the customer at every step, from development to technical support." },
  { title: "Transparency", text: "Clear communication on what we can supply and how we will deliver it." },
  { title: "Dependability", text: "Reliable supply and long-term partnerships over one-off orders." },
] as const;

/* ── Homepage content that still needs company input ─────────────────────────────
   Each list below is intentionally empty: nothing here has been published by the company yet
   (see docs/reference-content-inventory.md §8 and C5). The homepage sections render a clearly
   marked placeholder until an entry is added — fill these in; no component changes needed. */

export type ImageRef = { src: string; width: number; height: number; alt: string };

/** Books. Put each cover in /public/book/. */
export type Book = { title: string; description: string; cover: ImageRef | null; href: string | null };
export const books: Book[] = [
  {
    title: "7 Hidden Costs That Quietly Kill Profit in Garment Manufacturing",
    description:
      "Many garment manufacturers work hard, fill their order books and still wonder where the margin went. This book looks at seven hidden costs that quietly drain profit, and shows how to spot them, stop the leaks and build a stronger, more profitable business.",
    cover: {
      src: "/book/7-hidden-costs-garment-manufacturing.jpg",
      width: 1021,
      height: 952,
      alt: "Ritesh Goyal beside his book, The 7 Hidden Costs That Quietly Kill Profit in Garment Manufacturing",
    },
    href: null,
  },
];

/** Messages from the Chairman and Managing Director, in their own words. */
export const directorMessages: { author: string; role: string; paragraphs: string[] }[] = [
  {
    author: "Mr. Vinod Goyal",
    role: "Chairman",
    paragraphs: [
      "Trends may change and industries may evolve, but our commitment to quality, trust, and integrity remains constant. Since 1977, we have built our journey on strong values, lasting relationships, and the belief that true success comes from growing together with our customers. At GEETEX, our legacy inspires us to move forward while staying true to the principles that define us.",
    ],
  },
  {
    author: "Mr. Ritesh Goyal",
    role: "Managing Director",
    paragraphs: [
      "In an evolving textile industry, understanding our customers and delivering consistent quality will always be our priority. We strive to combine manufacturing expertise with continuous improvement to create yarn solutions that inspire creativity and support our customers' growth. Our vision is to build lasting partnerships, embrace new opportunities, and deliver value through every thread we make.",
    ],
  },
];

/** Verified customer feedback only. `company` and `role` are optional. */
export type Testimonial = { quote: string; name: string; company?: string; role?: string };
export const testimonials: Testimonial[] = [];

/** Real certificates / awards only. Put images in /public/certifications/. */
export type Certification = { name: string; issuer?: string; detail?: string; image: ImageRef | null; documentHref?: string };
export const certifications: Certification[] = [];
