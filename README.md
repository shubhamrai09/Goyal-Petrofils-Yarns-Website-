# GeeTex Knitting Yarns — website

New website for **Goyal Petrofils Yarns Pvt. Ltd. (GeeTex)**, rebuilt from the content of
https://geetexyarn.com with a new design, new imagery and technical SEO.

- Stack: **Next.js 16.4 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · lucide-react**
- Design system: generated with the **UI/UX Pro Max** skill → `docs/design-system.md`, `design-system/geetex-yarns/MASTER.md`
- Content source of truth: `docs/reference-content-inventory.md` (incl. missing info and conflicts C1–C7)
- Image licences: `docs/image-credits.md`

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000 (development)

# or the production build
npm run build
npm run start        # http://localhost:3000
```

Node 20+ required (tested on Node 24.22, npm 11.19, Windows 11).

## Project structure

```
src/
  app/                       routes (URLs match the old Shopify site)
    page.tsx                 /
    pages/{about-us,company-at-a-glance,manufacturing-quality,product-range,
           contact,careers,people-culture,image-credits}/page.tsx
    products/[slug]/         10 product pages incl. /products/geetex-mercy-plus-yarn-feather-wool-fur-yarn
    collections/handicraft-yarns/
    blogs/[blog]/            2 blog indexes (with client-side search)
    blogs/[blog]/[handle]/   109 migrated articles at their original URLs
    api/enquiry/route.ts     enquiry endpoint (see below)
    sitemap.ts, robots.ts, not-found.tsx, icon.png, apple-icon.png
  components/                header, footer, cards, form, breadcrumbs (+JSON-LD)
  lib/                       site facts, products, articles, images, SEO helper, enquiry validation
  content/articles.json      migrated blog content (sanitised HTML)
  assets/images/             licensed Unsplash photos (optimised by next/image)
public/brand/geetex-logo.png company logo · public/downloads/ chenille shade card · public/og-default.jpg
scripts/build_articles.py    re-imports blog articles from the live Shopify blog
scripts/check-links.mjs      crawls the running site for broken links/images/anchors
```

To change company facts, edit `src/lib/site.ts`; products live in `src/lib/products.ts`.

## Connecting the enquiry form

The form validates on the client **and** on the server, but **delivery is not configured** —
by default `/api/enquiry` returns `503 not_configured` and the form tells the visitor plainly
that nothing was sent, then offers **Send via WhatsApp** / **Send via email** with all their details pre-filled.

To deliver enquiries, set a server-side environment variable (never commit it):

```bash
# .env.local  (or your host's environment settings)
ENQUIRY_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/XXXX/YYYY   # any HTTPS endpoint accepting JSON POST
ENQUIRY_WEBHOOK_SECRET=some-long-random-string                       # optional, sent as X-Webhook-Secret
```

Payload: `{ name, company, email, phone, product, quantity, message, source, submittedAt }`.
Good options: Zapier/Make/n8n webhook → email or Google Sheet; a Google Apps Script web app; or
replace the `fetch` in `src/app/api/enquiry/route.ts` with an email API (Resend, SES, SendGrid).
The API route needs a Node server (`next start`, Vercel, etc.) — it does not work on a purely static export.

## Saving enquiries to Google Sheets

Every enquiry / sample request can be appended to the Google Sheet as a backup:

1. Open the Sheet → **Extensions → Apps Script**. Paste in `scripts/google-sheets-webhook.gs` and save.
2. **Deploy → New deployment → Web app**. Execute as: **Me**. Who has access: **Anyone**. Deploy and authorise.
3. Copy the web app URL (`https://script.google.com/macros/s/…/exec`) into `.env.local` **and** the host's
   environment settings (e.g. Vercel → Settings → Environment Variables):
   ```bash
   ENQUIRY_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
   ```
4. Restart the dev server / redeploy. Submit the form once to check a row appears.

If you edit the script later, use **Deploy → Manage deployments → Edit → New version** so the URL stays the same.

## Re-importing blog articles

```bash
python scripts/build_articles.py <feeds-dir> src/content/articles.json
```
`<feeds-dir>` must contain `geetex-blog-1.atom`, `decorative-and-handicraft-yarn-1.atom` and
`sm-sitemap_articles_1.xml` downloaded from geetexyarn.com (see the script header). Article HTML is reduced to an
allowlist of safe tags and article images are dropped.

## Testing done (22 Oct 2026)

| Check | Result |
|---|---|
| `npm run build` | ✅ 139 routes/files generated (all pages static or pre-rendered; only `/api/enquiry` is dynamic), no errors |
| `npx eslint .` / TypeScript | ✅ no errors or warnings |
| `node scripts/check-links.mjs` | ✅ 132 pages, 5,932 internal links, 22 assets, 0 problems |
| Old Shopify URLs | ✅ all page/product/collection/blog/article URLs kept; `/collections/all`, `/collections/frontpage`, `/blogs/news`, `/cart`, `/account/*` redirect |
| Unknown URLs | ✅ real 404 page |
| Horizontal overflow, 16 pages × 320/375/768/1024 px | ✅ none |
| Console errors / broken images (Chrome) | ✅ none |
| Keyboard | ✅ skip link, visible focus, dropdown opens with Enter/closes with Esc, mobile drawer traps focus |
| Enquiry form | ✅ inline + summary errors (summary receives focus), product preselected from product pages, honeypot, 400/503 handling, WhatsApp/email fallback; webhook delivery verified against a local test receiver |
| SEO | ✅ unique title/description, canonical, OG image per page, one h1 per page, sitemap (131 URLs), robots.txt, JSON-LD: Organization, WebSite, BreadcrumbList, ItemList, Product (Mercy Plus only — the one product with a verified price), BlogPosting |

Mobile layouts were checked inside same-origin iframes at fixed widths because the test browser window could not be resized.

## Known limitations / to do before launch

1. **Enquiry delivery** is not connected — set `ENQUIRY_WEBHOOK_URL` (above).
2. **Photography is representative stock**, not GeeTex's plant or products. Replace with real photos when available.
3. **No privacy policy / terms** page — needed before collecting enquiries in production (not copied from Shopify).
4. **E-commerce checkout is not rebuilt.** Mercy Plus is shown with its published price and is ordered via WhatsApp/enquiry. If online payment is needed, keep Shopify for checkout or add a payment provider.
5. **Content conflicts C1–C7** (e.g. "two vs four decades", manufacturing "since 1977" vs first unit in 1997, uncited "97% positive testimonials") need owner confirmation — see the inventory.
6. Missing facts (export countries, capacities, certifications, MOQs, lead times) are listed in the inventory §8 and are not claimed anywhere.
7. No analytics, cookie banner or search-console verification are set up.
8. Nothing has been deployed; the live geetexyarn.com is untouched.
