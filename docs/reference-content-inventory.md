# Reference Content Inventory — geetexyarn.com

Source of truth for every business fact used on the new site.
Research date: **22 October 2026**. Source platform: Shopify (Horizon theme).
Method: Firecrawl scrape of every page in the site navigation + `sitemap.xml`
(pages, collections, products, blogs, articles) + the blogs' Atom feeds.

> Rule used during the build: wording may be rewritten for clarity, but **no fact,
> figure, name, specification or claim was added** that is not listed below.

---

## 1. Site map of the reference site

| Original URL | Purpose | New site URL |
|---|---|---|
| `/` | Home | `/` |
| `/pages/about-us` | Company story, leadership, vision/mission/purpose | `/pages/about-us` (kept) |
| `/pages/company-at-a-glance` | Stats, differentiators, timeline, sustainability | `/pages/company-at-a-glance` (kept) |
| `/pages/product-range` | 10 product categories with count ranges | `/pages/product-range` (kept) + `/products/<slug>` detail pages (new) |
| `/products/geetex-mercy-plus-yarn-feather-wool-fur-yarn` | Only e‑commerce product | kept, same URL |
| `/collections/handicraft-yarns` | Shopify collection (1 product) | kept, same URL |
| `/collections/all`, `/collections/frontpage` | Shopify system collections | 308 → `/pages/product-range`, `/` |
| `/pages/careers` | Careers | kept |
| `/pages/people-culture` | People & culture (placeholder) | kept |
| `/pages/contact` | Contact details + map | kept, now with enquiry form |
| `/blogs/geetex-blog` (77 articles) | "Fabric & Garment blogs" | kept, all 77 articles migrated at the same URLs |
| `/blogs/decorative-and-handicraft-yarn` (32 articles) | "Decorative Handicraft blogs" | kept, all 32 articles migrated at the same URLs |
| `/blogs/news` | Empty default Shopify blog | 308 → `/blogs/geetex-blog` |
| `/policies/privacy-policy`, `/policies/terms-of-service` | Shopify policy pages | **not migrated** (see §8) |
| — | — | `/pages/manufacturing-quality` (new page; built only from facts below) |

---

## 2. Company identity

| Fact | Value | Source |
|---|---|---|
| Legal name | Goyal Petrofils Yarns Pvt. Ltd. (abbrev. "GPYPL") | about-us |
| Brand | GEETEX Knitting Yarns / "GeeTex" | company-at-a-glance |
| Founded | 1977 | home, about-us, glance |
| Location | Ludhiana, Punjab, India | all pages |
| Employees | 500+ | home, about-us, glance, careers |
| States shipped to | 16+ | home, about-us, glance |
| Countries exported to | 7+ ("exports to over seven countries") | home, about-us, glance |
| Positive testimonials | 97% | company-at-a-glance only |
| Tagline quote | "Four decades of craftsmanship in every cone we spin — built on quality, integrity, and long-term relationships." | home, about-us, glance |
| Logo | Blue "G" with green arrows, "GEE TEX — Knitting Yarns" | header image |

### Positioning copy (verbatim source text, rewritten on the new site)
- "Premium Polyester & Handicraft Yarns, Manufactured in Ludhiana Since 1977" (home H1)
- "Trusted by manufacturers across India and 7+ countries for consistent quality, reliable supply, and yarn engineered to run cleanly on your machines." (home)
- "Goyal Petrofils Yarns Pvt. Ltd. stands today as a trusted name in the yarn manufacturing industry — known for quality products, ethical business conduct, and consistent customer focus. With modern infrastructure and deep technical expertise…" (home, glance)
- "…a textile manufacturing and supplying company that specializes in producing high-quality yarns that serve a wide range of textile applications across the globe. At GPYPL, we are deeply committed to blending traditional craftsmanship with modern textile technology…" (about-us)
- "…operates from a modern and well-equipped infrastructural facility that enables efficient production and stringent quality control." (about-us)

### Vision / Mission / Purpose (home, about-us)
- **Vision:** To become a trusted yarn manufacturing brand known across India and key global markets for consistency, reliability, and long-term partnerships.
- **Mission:** To build long-term partnerships by being responsive, transparent, and dependable in every supply commitment.
- **Purpose:** To empower weavers & knitters with yarn they can confidently build their products on.

### Leadership (about-us)
- **Mr. Vinod Goyal — Chairman.** "Guiding the company's manufacturing standards and long-term growth strategy with decades of industry expertise."
- **Mr. Ritesh Goyal — Managing Director.** "Leading day-to-day operations, customer relationships, and the company's continued focus on quality and delivery."
- No photographs published (initials "VG", "RG" only).

### Journey / timeline (about-us, glance)
| Year | Milestone |
|---|---|
| 1977 | Founding year |
| 1987 | Yarn dealership |
| 1997 | 1st manufacturing unit |
| 2006 | 2nd manufacturing unit |
| 2013 | Ring spinning plant |
| 2016 | Worsted spinning plant |
| Today | Pan-India + 7 countries |

### What sets us apart (glance)
1. **Consistent Quality** — Reliable yarn quality with controlled count, shade, strength and running performance.
2. **Technical Expertise** — Over 20 years understanding fibre behaviour, yarn structure, and dyeing science.
3. **Flexible Manufacturing** — Customised solutions across blends, counts, textures, twist, ply, and shades.
4. **Customer-Centric** — Standing with the customer at every step, from development to technical support.
5. **Ludhiana Advantage** — Fast raw material access, strong logistics, and skilled manpower.

### Sustainability (glance)
- Rainwater harvested from 1,00,000 sq. ft. of rooftop area recharges over 2.5–3 million litres annually.
- 700 kW solar installation reduces approximately 800 tonnes of CO₂ emissions every year.
- Actively promotes gender diversity and inclusive leadership, with equal opportunity and merit-based growth.

---

## 3. Product range (`/pages/product-range`)

Count notation is reproduced exactly as published (Nm = metric count; Ne/"s" = English count).

| # | Category | Published description | Count range | Other published specs |
|---|---|---|---|---|
| 1 | Acrylic Worsted Dyed Yarn | Made from premium acrylic fibers using advanced worsted spinning techniques for a smooth, uniform, durable yarn with excellent color retention. | 4 Nm – 48 Nm | 2–4 ply |
| 2 | Acrylic/Nylon Worsted Blended Dyed Yarn | A carefully balanced blend of acrylic and nylon fibers, combining softness with enhanced strength and durability. | 12 Nm – 42 Nm | — |
| 3 | Acrylic/Polyester Blended Dyed Yarn | A balanced blend of acrylic and polyester fibers offering a smooth, even texture and excellent color depth. | 4 Nm – 48 Nm | — |
| 4 | Crochet Yarn | A wide variety of specialty yarns designed to add texture, softness, and visual appeal to handmade creations. | 1 Nm – 12 Nm | Types: Fur, Loop, Tape, Brush, Flag, Diamond, Tail, Feather, Glory, Babysoft, Hair Yarn |
| 5 | Spun Virgin Yarn (Ring Spun) | Manufactured from high-quality virgin fibers using the ring spinning process for superior strength, uniformity, and a smooth finish. | 8 Ne – 30 Ne | — |
| 6 | Carpet Yarn | Engineered for durability and performance in high-traffic, heavy-use applications. | 4 Nm – 16 Nm | — |
| 7 | Hand Knitting Yarn | Designed for comfort, ease of use, and beautiful stitch definition. | 2 Nm – 16 Nm | Qualities: G.Smart, Dazzling, Cherry, Charmis, Crazy Blue, Khali, Arman, Signature, Blanke, Makhmali, Nikon, Parker, Juice |
| 8 | Fancy Yarn | Specially developed to add character, texture, and visual interest to fabrics and knitwear. | 2 Nm – 15 Nm | Types: Ring, Tespa, Slub, Grindle, Yespee, Nap, Boucle Yarn |
| 9 | Mélanges & Dyed | Crafted using premium polyester and acrylic fibers for rich color effects and consistent quality. | 8s – 30s | — |
| 10 | Chenille Dyed Yarn | A rich, velvety texture with a soft and luxurious feel, carefully dyed for deep, consistent, and long-lasting colors. | 2 Nm – 12 Nm | Shade card PDF (CHENILLE_13NM.pdf, 4 pages) — copied to `public/downloads/` |

Note: the page lists **10** categories (the home page shows only 3 tiles: Handicraft Yarns, Hand Knitting Yarn, Dyed & Blended Yarns).

### E-commerce product (`/products/geetex-mercy-plus-yarn-feather-wool-fur-yarn`)
- **GEETEX Mercy Plus** (feather wool / fur yarn).
- Sold in 2 kg bundles, priced per kg. **₹350/kg incl. GST (Ex Mill, Ludhiana)** → Rs. 700.00 per 2 kg bundle.
- 70+ shade options (variants are named "Shade 1", "Shade 2", …).
- Transport / shipping charges: to be paid to the transporter, as per actual.
- Collection: Handicraft Yarns — "GeeTex polyester and poly-cotton blend yarns for crochet and knitting artisans."

---

## 4. Contact details (identical on every page footer + `/pages/contact`)

| Field | Value |
|---|---|
| Phone | +91-9855404440, 9814404440 |
| Telephone | +91-161-2690004, 9781275444 |
| Email | goyalpetrofilsyarns@hotmail.com |
| Website | www.geetexyarn.com |
| Unit-I | Rahon Road, Village Meharban, Ludhiana, Punjab (INDIA) |
| Unit-II | Rahon Road, Village Khawajke, Ludhiana, Punjab (INDIA) |
| Google Maps listing | "Goyal Petrofils Yarns Pvt. Ltd. (GEETEX), Rahon Rd, Meharban, Punjab 141007, India" (4.1★, 34 reviews at time of research) |
| WhatsApp | https://wa.me/919814404440 (pre-filled text: "Hi, I found you through your website. I'd like to inquire about a product.") |
| Instagram | https://instagram.com/geetexyarns |
| Facebook | https://facebook.com/geetexyarns |
| CTAs used | "Shop Yarns", "Request a Sample" (→ WhatsApp), "Learn Our Story", "Get the Shade Card", "Chat on WhatsApp" |

---

## 5. Careers & People

- Careers: "Goyal Petrofils Yarns Pvt. Ltd. is always looking to grow our team of 500+ employees across our Ludhiana manufacturing units." No openings, no application method published.
- People & Culture: "Behind every cone of yarn we manufacture is a team of over 500 people who make it happen…" Spotlights "will appear here soon" (placeholder).

---

## 6. Blogs

- `geetex-blog` ("Fabric & Garment blogs"): **77** articles. `decorative-and-handicraft-yarn`: **32** articles. Author on all: Ritesh Goyal.
- All 109 articles migrated to `src/content/articles.json` (title, date, author, summary, body HTML) by
  `scripts/build_articles.py` (see README for how to re-run it). Body HTML is sanitised to an
  allowlist (`p, h2–h4, ul/ol/li, strong/em, a, blockquote, table…`). **Article images were not migrated**
  (they belong to the reference site); the new site uses its own cover imagery per blog.
- Statistics quoted inside articles are the company's own published content and cite external sources; they were carried over unchanged and are **not** used anywhere else on the site.

---

## 7. Existing SEO metadata (for continuity)

| Page | Title | Meta description |
|---|---|---|
| Home | Goyal Petrofils Yarns Pvt. Ltd. | *(none set)* |
| About | About Us \| Goyal Petrofils Yarns Pvt. Ltd. (GeeTex) | Learn about Goyal Petrofils Yarns Pvt. Ltd., the company behind GeeTex Knitting Yarns — manufacturing premium yarn in Ludhiana since 1977. |
| Glance | Company at a Glance \| Goyal Petrofils Yarns Pvt. Ltd. | …founded 1977, 500+ employees, shipping to 16+ states and 7+ countries from our Ludhiana manufacturing units. |
| Product range | Product Range \| GeeTex Knitting Yarns by Goyal Petrofils Yarns | Explore GeeTex's full yarn product range — polyester, acrylic, blended, and handicraft yarns… |
| Contact | Contact Us \| Goyal Petrofils Yarns Pvt. Ltd. (GeeTex) | Get in touch… phone, email, WhatsApp, and location details. |
| Careers | Careers \| Goyal Petrofils Yarns Pvt. Ltd. (GeeTex) | Join the team… 500+ employees strong, manufacturing in Ludhiana since 1977. |

The reference home page had no meta description and a default Shopify OG image — both fixed on the new site.

---

## 8. Missing information (not invented — needs owner input)

1. Names of the 7+ export countries and 16+ states.
2. Machinery make/model, installed capacity (spindles, tonnes/month), plant areas.
3. Quality certifications (ISO, OEKO-TEX, GRS, etc.) — **none published**, so none are claimed.
4. Lab/testing equipment and QC procedure details beyond "stringent quality control" and "controlled count, shade, strength and running performance".
5. Minimum order quantities, lead times, packaging (except Mercy Plus 2 kg bundles).
6. Leadership photographs and longer biographies.
7. Real factory photography (all imagery on the new site is licensed stock — see `docs/image-credits.md`).
8. Privacy policy / terms text for the new site (the Shopify policies are platform-generated and were not copied).
9. Careers: open roles and how to apply.
10. GST number / CIN (not published).
11. Product photos per category (the reference site uses AI-generated images; the new site uses representative stock photos).

## 9. Conflicting or unclear information (flagged, not silently resolved)

| # | Conflict | Where | How the new site handles it |
|---|---|---|---|
| C1 | **"Four decades of craftsmanship"** vs **"Two Decades of Yarn Manufacturing Expertise"** / "two decades of expertise" / "Over 20 years understanding fibre behaviour" — and founded **1977** (≈49 years). | home quote & H2; glance intro & differentiator | Uses only the dated facts ("Since 1977", "manufacturing since 1997"). The "four/two decades" phrasing is **not** repeated. The "Technical Expertise — over 20 years" differentiator is kept as published because it is a specific, scoped claim. **Owner to confirm preferred wording.** |
| C2 | Founded **1977**, but "What started as a **yarn dealership in 1987**…" — 1977–1987 activity not described. | about-us | Timeline shown exactly as published (1977 founding year, 1987 yarn dealership). No narrative added for 1977–1987. |
| C3 | Handicraft collection says "polyester and **poly-cotton** blend yarns", but no poly-cotton product exists in the product range. | collections/handicraft-yarns | Poly-cotton is **not** mentioned on the new site. |
| C4 | "Telephone" line lists **9781275444**, which is a mobile-format number. | all pages | Shown exactly as published, under "Telephone". |
| C5 | **97% Positive Testimonials** — no testimonials or source published anywhere on the site. | glance | **Omitted** on the new site until a source is provided (no fake testimonials rule). |
| C6 | Home H1 says "Premium **Polyester** & Handicraft Yarns" but the product range is mostly **acrylic** and blends; polyester appears in blends, Mélanges and Mercy Plus. | home vs product-range | New hero copy names acrylic, polyester and blended yarns together; no single fibre is over-claimed. |
| C7 | Home H1 says "Manufactured in Ludhiana **Since 1977**", but the timeline gives 1977 = founding, 1987 = yarn dealership, **1997 = first manufacturing unit**. | home vs about-us / glance | New site copy says "Established 1977" / "Est. 1977" and dates manufacturing from 1997. Migrated blog articles that say "since 1977" were left as published. **Owner to confirm.** |
