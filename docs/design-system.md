# GeeTex design system

Generated with the **UI/UX Pro Max** skill (v2.15.0), then adapted for the brand.
The skill's raw output is persisted in `design-system/geetex-yarns/MASTER.md`; this file records
what was actually built and **why it differs** from the generator where it does.

## How it was generated

| Step | Command (skill `scripts/search.py`) | Result | Decision |
|---|---|---|---|
| 1 | `"B2B industrial manufacturer textile yarn premium" --design-system --variance 6 --motion 3 --density 4` | Style **Liquid Glass**, Cormorant/Montserrat, stone + gold palette | Style rejected: Apple-platform glass material; brief forbids glassmorphism. **Palette structure kept** (warm stone neutrals). |
| 2 (retry, per skill rule) | `"manufacturing industrial supplier" --design-system …` | Style **Minimalism**, pattern **Hero + Features + CTA**, Outfit/Work Sans, "industrial slate" palette | Style + pattern adopted. Persisted with `--persist`. |
| 3 | `"industrial editorial swiss" --domain style` | Minimalism & Swiss Style; Editorial Grid / Magazine | Swiss grid + editorial accents (serif display, rules, numbered sections). |
| 4 | `"industrial professional editorial" --domain typography` | News Editorial (Newsreader / Roboto) | **Newsreader** for display; body kept as **Work Sans** from step 2. |
| 5 | `"form validation error inline" --domain ux`, `"mobile menu navigation drawer" --domain ux` | Focusable error summary, validate on blur, `aria-describedby`, sticky nav padding, `inputmode` | Implemented in `EnquiryForm` and `SiteHeader`. |
| 6 | `"image optimization metadata" --stack nextjs` | `next/image`, Metadata API, `generateMetadata` | Followed everywhere. |

## Style
**Minimalism & Swiss Style with editorial accents.** Grid-based, high contrast, hairline rules
instead of shadows, square-ish corners (2px), one accent colour, large photography, serif display
headlines over a neutral sans body. Spec values (counts, ply) are set like a technical data sheet.

Avoided (skill anti-patterns + brief): glassmorphism, gradients, giant empty heroes, heavily rounded
cards, emoji icons, decorative motion, gray-on-gray text.

## Colour tokens (`src/app/globals.css`)

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `--color-paper` | `#FAFAF9` | Page background | — |
| `--color-surface` | `#FFFFFF` | Cards, form fields | — |
| `--color-sand` | `#F5F5F4` | Alternate section band | — |
| `--color-ink` | `#1C1917` | Primary text, dark bands | 16.7:1 on paper |
| `--color-ink-2` | `#44403C` | Secondary text | 9.8:1 on paper |
| `--color-muted` | `#57534E` | Meta text, captions | 7.3:1 on paper |
| `--color-line` | `#D6D3D1` | Rules, borders (decorative) | — |
| `--color-line-strong` | `#78716C` | Form field borders | 4.8:1 non-text on surface |
| `--color-brand` | `#0060B0` | Accent / CTA / links (sampled from the logo) | 6.4:1 on white |
| `--color-brand-strong` | `#004A8A` | Hover / pressed | 9.0:1 on white |
| `--color-brand-tint` | `#E8F1FA` | Selected chip, highlight | — |
| `--color-leaf` | `#00A048` | Logo green — decorative markers only, never text | — |
| `--color-on-dark` | `#FAFAF9` | Text on ink bands | 16.7:1 |
| `--color-on-dark-muted` | `#A8A29E` | Secondary text on ink | 6.9:1 |
| `--color-brand-on-dark` | `#8CC4F2` | Links/accents on ink | 9.4:1 |
| `--color-danger` | `#B91C1C` | Errors | 6.5:1 on white |
| `--color-success` | `#15803D` | Success | 5.0:1 on white |

**Override vs MASTER.md:** the generator's accent (#059669 green, or #A16207 gold in run 1) was
replaced with the **logo blue `#0060B0`** so the site matches the company's existing identity.
Light theme only: a B2B catalogue with product photography; dark mode is not required by the brief.

## Typography
- Display: **Newsreader** (variable, optical sizes) — weights 400–600. Headlines, big numbers, pull quotes.
- Body/UI: **Work Sans** — 400/500/600. Base 16px (`1rem`), line-height 1.6, measure ≤ 70ch.
- Spec values: Work Sans with `tabular-nums`, uppercase micro-labels at 12px/600, +0.08em tracking.
- Scale (fluid `clamp`): display 2.75→5rem, h1 2.25→3.5rem, h2 1.875→2.75rem, h3 1.25→1.5rem.
- Loaded via `next/font/google` (self-hosted at build time, `display: swap`, no layout shift).

## Spacing & layout
- Density 4/10 → 4px base; section padding `clamp(4rem, 8vw, 7rem)`.
- Container max 1280px; side gutter 16px (mobile) → 32px (≥768px).
- 12-column grid on ≥1024px; asymmetric 5/7 and 7/5 splits for editorial rhythm.
- Breakpoints tested: **375, 768, 1024, 1440**.

## Components
Header (sticky, 64px, skip link, accessible mobile drawer) · Footer · Button (primary / secondary / ghost; min 44px tall) ·
SectionHeading (numbered eyebrow + serif title) · StatStrip · ProductCard (spec-sheet style) · Timeline ·
Breadcrumbs (+ JSON-LD) · EnquiryForm (inline + summary errors, honest submission states) · ArticleCard · Reveal (scroll fade).

## Motion
Subtle tier (motion 3/10): hover/focus transitions 150–200ms; scroll reveal 350ms, `translateY(12px)` → 0,
ease-out, once. Content is visible without JavaScript; all motion is disabled under `prefers-reduced-motion`.

## Accessibility rules applied
Visible focus ring (2px brand outline + offset) on every interactive element; skip-to-content link;
semantic landmarks; one `h1` per page; alt text on every content image; 44×44px touch targets;
labels on all form fields; errors linked with `aria-describedby`; error summary receives focus on failed submit;
live region for submission status.
