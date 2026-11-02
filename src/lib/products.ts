import { photos, type Photo } from "./images";

/**
 * Product data — copied from https://geetexyarn.com/pages/product-range and the Mercy Plus product page.
 * Descriptions are the published wording (lightly edited for grammar). Count ranges are exactly as published.
 * Families are a presentation grouping for browsing; they are not a claim made by the source site.
 */

export type FamilyId = "dyed-blended" | "hand-knitting" | "handicraft" | "spun-carpet";

export const families: { id: FamilyId; name: string; blurb: string }[] = [
  { id: "dyed-blended", name: "Dyed & blended yarns", blurb: "Worsted acrylic, acrylic blends, mélanges and chenille." },
  { id: "hand-knitting", name: "Hand knitting yarn", blurb: "Thirteen named qualities for hand knitters." },
  { id: "handicraft", name: "Handicraft & fancy yarns", blurb: "Crochet, fancy and feather/fur yarns for makers." },
  { id: "spun-carpet", name: "Spun & carpet yarns", blurb: "Ring-spun virgin yarn and durable carpet yarn." },
];

export type CountSystem = "Nm" | "Ne" | "s";

export type Product = {
  slug: string;
  name: string;
  family: FamilyId;
  description: string;
  /** Count range as published. Not published for Mercy Plus. */
  count?: { from: number; to: number; system: CountSystem };
  ply?: string;
  variants?: { label: "Types" | "Qualities"; items: string[] };
  /** Published usage wording only. */
  use?: string;
  photo: Photo;
  shadeCard?: { href: string; label: string };
  /** Retail listing from the e-commerce product page. */
  retail?: {
    pricePerKg: number;
    bundleKg: number;
    bundlePrice: number;
    terms: string[];
    shades: string;
  };
  keywords: string[];
};

export const products: Product[] = [
  {
    slug: "acrylic-worsted-dyed-yarn",
    name: "Acrylic Worsted Dyed Yarn",
    family: "dyed-blended",
    description:
      "Made from premium acrylic fibres using advanced worsted spinning techniques for a smooth, uniform, durable yarn with excellent colour retention.",
    count: { from: 4, to: 48, system: "Nm" },
    ply: "2–4 ply",
    photo: photos.dyedRack,
    keywords: ["acrylic worsted yarn", "dyed acrylic yarn", "worsted dyed yarn manufacturer"],
  },
  {
    slug: "acrylic-nylon-worsted-blended-dyed-yarn",
    name: "Acrylic/Nylon Worsted Blended Dyed Yarn",
    family: "dyed-blended",
    description:
      "A carefully balanced blend of acrylic and nylon fibres, combining softness with enhanced strength and durability.",
    count: { from: 12, to: 42, system: "Nm" },
    photo: photos.hosiery,
    keywords: ["acrylic nylon blended yarn", "worsted blended dyed yarn"],
  },
  {
    slug: "acrylic-polyester-blended-dyed-yarn",
    name: "Acrylic/Polyester Blended Dyed Yarn",
    family: "dyed-blended",
    description:
      "A balanced blend of acrylic and polyester fibres offering a smooth, even texture and excellent colour depth.",
    count: { from: 4, to: 48, system: "Nm" },
    photo: photos.blended,
    keywords: ["acrylic polyester blended yarn", "dyed blended yarn"],
  },
  {
    slug: "melanges-and-dyed",
    name: "Mélanges & Dyed",
    family: "dyed-blended",
    description:
      "Crafted using premium polyester and acrylic fibres for rich colour effects and consistent quality.",
    count: { from: 8, to: 30, system: "s" },
    photo: photos.pastelCones,
    keywords: ["melange yarn", "polyester acrylic melange", "dyed yarn"],
  },
  {
    slug: "chenille-dyed-yarn",
    name: "Chenille Dyed Yarn",
    family: "dyed-blended",
    description:
      "A rich, velvety texture with a soft and luxurious feel, carefully dyed for deep, consistent and long-lasting colours.",
    count: { from: 2, to: 12, system: "Nm" },
    photo: photos.cream,
    shadeCard: { href: "/downloads/geetex-chenille-13nm-shade-card.pdf", label: "Chenille shade card (PDF, 4 pages)" },
    keywords: ["chenille yarn", "dyed chenille yarn", "chenille yarn manufacturer"],
  },
  {
    slug: "hand-knitting-yarn",
    name: "Hand Knitting Yarn",
    family: "hand-knitting",
    description: "Designed for comfort, ease of use and beautiful stitch definition.",
    count: { from: 2, to: 16, system: "Nm" },
    variants: {
      label: "Qualities",
      items: ["G.Smart", "Dazzling", "Cherry", "Charmis", "Crazy Blue", "Khali", "Arman", "Signature", "Blanke", "Makhmali", "Nikon", "Parker", "Juice"],
    },
    photo: photos.handKnitting,
    keywords: ["hand knitting yarn", "knitting wool yarn"],
  },
  {
    slug: "crochet-yarn",
    name: "Crochet Yarn",
    family: "handicraft",
    description:
      "A wide variety of speciality yarns designed to add texture, softness and visual appeal to handmade creations.",
    use: "Handmade creations",
    count: { from: 1, to: 12, system: "Nm" },
    variants: {
      label: "Types",
      items: ["Fur", "Loop", "Tape", "Brush", "Flag", "Diamond", "Tail", "Feather", "Glory", "Babysoft", "Hair Yarn"],
    },
    photo: photos.crochet,
    keywords: ["crochet yarn", "handicraft yarn", "decorative yarn", "fur yarn", "diamond yarn"],
  },
  {
    slug: "fancy-yarn",
    name: "Fancy Yarn",
    family: "handicraft",
    description:
      "Specially developed to add character, texture and visual interest to fabrics and knitwear.",
    use: "Fabrics and knitwear",
    count: { from: 2, to: 15, system: "Nm" },
    variants: { label: "Types", items: ["Ring", "Tespa", "Slub", "Grindle", "Yespee", "Nap", "Boucle Yarn"] },
    photo: photos.chunky,
    keywords: ["fancy yarn", "slub yarn", "boucle yarn"],
  },
  {
    slug: "geetex-mercy-plus-yarn-feather-wool-fur-yarn",
    name: "GEETEX Mercy Plus",
    family: "handicraft",
    description:
      "Feather wool / fur yarn from GeeTex, available in 70+ shades and sold in 2 kg bundles.",
    photo: photos.tassels,
    retail: {
      pricePerKg: 350,
      bundleKg: 2,
      bundlePrice: 700,
      shades: "70+ shade options",
      terms: [
        "₹350/kg including GST, ex-mill Ludhiana",
        "Sold in 2 kg bundles (₹700 per bundle)",
        "Transport / shipping charges are paid to the transporter, as per actual",
      ],
    },
    keywords: ["Mercy Plus yarn", "feather wool yarn", "fur yarn", "handicraft yarn"],
  },
  {
    slug: "spun-virgin-yarn-ring-spun",
    name: "Spun Virgin Yarn (Ring Spun)",
    family: "spun-carpet",
    description:
      "Manufactured from high-quality virgin fibres using the ring spinning process for superior strength, uniformity and a smooth finish.",
    count: { from: 8, to: 30, system: "Ne" },
    photo: photos.whiteSpools,
    keywords: ["ring spun yarn", "virgin spun yarn", "spun yarn manufacturer"],
  },
  {
    slug: "carpet-yarn",
    name: "Carpet Yarn",
    family: "spun-carpet",
    description: "Engineered for durability and performance in high-traffic, heavy-use applications.",
    use: "High-traffic, heavy-use applications",
    count: { from: 4, to: 16, system: "Nm" },
    photo: photos.woven,
    keywords: ["carpet yarn", "carpet yarn manufacturer India"],
  },
];

export const MERCY_PLUS_SLUG = "geetex-mercy-plus-yarn-feather-wool-fur-yarn";

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatCount(p: Product): string | null {
  if (!p.count) return null;
  const { from, to, system } = p.count;
  if (system === "s") return `${from}s – ${to}s`;
  return `${from} ${system} – ${to} ${system}`;
}

export const countSystemNote: Record<CountSystem, string> = {
  Nm: "Nm — metric count (metres of yarn per gram). Higher Nm = finer yarn.",
  Ne: "Ne — English cotton count (840-yard hanks per pound). Higher Ne = finer yarn.",
  s: "“s” — English count notation, as published by GeeTex. Higher = finer yarn.",
};

export function familyName(id: FamilyId) {
  return families.find((f) => f.id === id)?.name ?? "";
}
