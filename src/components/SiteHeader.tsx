"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ScrollProgress } from "./motion";
import { ThemePicker } from "./ThemePicker";
import { nav } from "@/lib/site";
import { buttonClass } from "./ui";

type NavItem = (typeof nav)[number];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));

  // Close menus on navigation. Adjusting state during render (React docs pattern) instead of in an effect.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setOpenMenu(null);
  }

  // Desktop dropdowns: close on outside click / Escape.
  useEffect(() => {
    if (!openMenu) return;
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  // Mobile drawer: lock scroll, move focus in, keep Tab inside, Escape closes and returns focus.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const drawer = drawerRef.current;
    document.body.style.overflow = "hidden";
    drawer?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !drawer) return;
      const items = Array.from(drawer.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  // No backdrop-filter on the header: it would make it the containing block for the fixed mobile drawer.
  return (
    <header
      className={`sticky top-0 z-50 border-b bg-paper transition-[box-shadow,border-color] duration-300 ${
        scrolled ? "border-transparent shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)]" : "border-line"
      }`}
    >
      <ScrollProgress />
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Goyal Petrofils Yarns Pvt. Ltd., home">
          <Image src="/brand/geetex-logo.png" alt="" width={449} height={525} className="h-11 w-auto md:h-12" preload />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-lg uppercase text-ink">Goyal Petrofils Yarns</span>
            <span className="text-[0.72rem] uppercase tracking-wide text-muted">Pvt. Ltd.</span>
          </span>
        </Link>

        <nav ref={navRef} aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <DesktopItem
                key={item.label}
                item={item}
                pathname={pathname}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
              />
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemePicker />
          <Link href="/pages/contact#enquiry" className={buttonClass("primary", "hidden md:inline-flex")}>
            Request a quote
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-xs text-ink hover:bg-sand lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          ref={drawerRef}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-paper md:top-[4.5rem] lg:hidden"
        >
          <nav aria-label="Mobile" className="container-page py-6">
            <ul className="divide-y divide-line border-y border-line">
              {nav.map((item) =>
                "children" in item ? (
                  <li key={item.label} className="py-4">
                    <p className="eyebrow text-muted">{item.label}</p>
                    <ul className="mt-2">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            aria-current={isActive(pathname, c.href) ? "page" : undefined}
                            className="flex min-h-11 items-center text-lg text-ink aria-[current=page]:text-brand"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      className="flex min-h-14 items-center text-lg text-ink aria-[current=page]:text-brand"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
              <li>
                <Link
                  href="/pages/contact"
                  aria-current={pathname === "/pages/contact" ? "page" : undefined}
                  className="flex min-h-14 items-center text-lg text-ink aria-[current=page]:text-brand"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <Link href="/pages/contact#enquiry" className={buttonClass("primary", "mt-6 w-full")}>
              Request a quote
            </Link>
          </nav>
        </motion.div>
      ) : null}
      </AnimatePresence>
    </header>
  );
}

function DesktopItem({
  item,
  pathname,
  openMenu,
  setOpenMenu,
}: {
  item: NavItem;
  pathname: string;
  openMenu: string | null;
  setOpenMenu: (v: string | null) => void;
}) {
  const panelId = useId();
  const linkCls =
    "inline-flex min-h-11 items-center gap-1 rounded-xs px-3 text-[0.95rem] text-ink-2 transition-colors hover:text-ink";

  if (!("children" in item)) {
    const active = isActive(pathname, item.href);
    return (
      <li>
        <Link
          href={item.href}
          aria-current={active ? "page" : undefined}
          className={`${linkCls} aria-[current=page]:text-ink aria-[current=page]:underline aria-[current=page]:decoration-brand aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[10px]`}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  const expanded = openMenu === item.label;
  const active = item.children.some((c) => isActive(pathname, c.href));
  return (
    <li className="relative">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setOpenMenu(expanded ? null : item.label)}
        className={`${linkCls} ${active ? "text-ink" : ""}`}
      >
        {item.label}
        <ChevronDown
          aria-hidden="true"
          className={`size-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
      {expanded ? (
      <motion.div
        id={panelId}
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 6, scale: 0.98 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "top left" }}
        className="absolute left-0 top-full z-50 mt-2 w-80 rounded-sm border border-line bg-surface p-2 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.3)]"
      >
        <ul>
          {item.children.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                aria-current={isActive(pathname, c.href) ? "page" : undefined}
                className="block rounded-xs px-3 py-3 transition-colors hover:bg-sand aria-[current=page]:bg-brand-tint"
              >
                <span className="block text-[0.95rem] font-medium text-ink">{c.label}</span>
                <span className="mt-0.5 block text-sm text-muted">{c.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
      ) : null}
      </AnimatePresence>
    </li>
  );
}
