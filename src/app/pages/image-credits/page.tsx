import { PageHero } from "@/components/PageHero";
import { pageMeta } from "@/lib/seo";

export const metadata = {
  ...pageMeta({
    title: "Image Credits",
    description: "Photography credits for the GeeTex website. All photos are used under the Unsplash License.",
    path: "/pages/image-credits",
  }),
  robots: { index: false, follow: true },
};

const credits = [
  ["Georg Eiermann", "_ICLqOzuQHQ"],
  ["Georg Eiermann", "wHbbc2Iy_iM"],
  ["Huy Phan", "-ftkUdYB6VQ"],
  ["Héctor J. Rivas", "Nh6NsnqYVsI"],
  ["T", "P2OTSZtU6jE"],
  ["Maranda Vandergriff", "o-d37kiKqqc"],
  ["Darya Tryfanava", "8T6Zy1q339o"],
  ["Prince Prabhakaran", "pM2kkL8Vu9E"],
  ["Lalit Kumar", "HpPmiduLDC0"],
  ["Lalit Kumar", "uDoezY1cPLY"],
  ["Kevin Limbri", "mBXQCNKbq7E"],
  ["CR", "v0UOs2bK1pA"],
  ["CR", "vLYs3MeloVY"],
  ["Bergstrand Consultancy", "SH5YIbACAuk"],
  ["Margarida Afonso", "ahMCpXdUjv0"],
  ["Tasha Kostyuk", "kSTu58jwnSY"],
  ["Cary Bates", "Mpe47D2gzWY"],
  ["Nicole Almendrada", "EdZMHCmKQZA"],
  ["Elist Nguyen", "BVUWUDQuHWE"],
  ["Mick Haupt", "LZrx0NWxvQY"],
  ["Jazz Bainbridge", "u3ClBGVz0NA"],
  ["Anastasia Zhenina", "mahjS9zuKRE"],
] as const;

export default function ImageCreditsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Image credits", href: "/pages/image-credits" }]}
        eyebrow="Credits"
        title="Image credits"
        intro={
          <p>
            Photographs on this website are representative images used under the{" "}
            <a href="https://unsplash.com/license" className="text-brand underline underline-offset-4" target="_blank" rel="noopener noreferrer">
              Unsplash License
            </a>
            . They do not show GeeTex facilities or products. Thank you to the photographers below.
          </p>
        }
      />
      <section className="container-page py-12 md:py-16">
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {credits.map(([name, id]) => (
            <li key={id} className="border-t border-line pt-3">
              <a
                href={`https://unsplash.com/photos/${id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-brand-strong hover:underline underline-offset-4"
              >
                Photo by {name} on Unsplash
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
