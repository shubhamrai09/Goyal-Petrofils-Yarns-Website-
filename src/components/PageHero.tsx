import Image from "next/image";
import type { ReactNode } from "react";
import type { Photo } from "@/lib/images";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { HeroGlow, ParallaxFrame, Stagger, StaggerItem } from "./motion";

/**
 * Inner-page hero: breadcrumbs, numbered eyebrow, serif H1 and an optional framed photo.
 * Text-first (no full-bleed image) so the H1 is always the first thing read.
 */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  photo,
  children,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  photo?: Photo;
  children?: ReactNode;
}) {
  return (
    <header className="relative isolate overflow-hidden border-b border-line bg-paper">
      <HeroGlow />
      <div className="container-page pt-8 pb-12 md:pt-10 md:pb-16">
        <Breadcrumbs items={crumbs} />
        <div className={`mt-10 grid gap-10 md:mt-14 ${photo ? "lg:grid-cols-12 lg:items-end" : ""}`}>
          <Stagger onMount className={photo ? "lg:col-span-7" : "max-w-4xl"}>
            <StaggerItem as="p" className="eyebrow text-brand">{eyebrow}</StaggerItem>
            <StaggerItem>
              <h1 className="mt-4 font-display text-h1 font-normal tracking-[-0.015em] text-ink">{title}</h1>
            </StaggerItem>
            {intro ? <StaggerItem className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">{intro}</StaggerItem> : null}
            {children ? <StaggerItem className="mt-8">{children}</StaggerItem> : null}
          </Stagger>
          {photo ? (
            <div className="lg:col-span-5">
              <ParallaxFrame className="relative aspect-[4/3] overflow-hidden rounded-sm bg-sand shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  preload
                  placeholder="blur"
                  sizes="(min-width: 1280px) 500px, (min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </ParallaxFrame>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
