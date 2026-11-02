"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Palette } from "lucide-react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

export const themes = [
  { id: "classic", label: "Classic Blue", swatch: ["#0060b0", "#00a048", "#fafaf9"] },
  { id: "saffron", label: "Saffron Silk", swatch: ["#b4401a", "#f2b33d", "#fbf7f0"] },
  { id: "emerald", label: "Emerald Mill", swatch: ["#047857", "#14b8c4", "#f5faf7"] },
  { id: "midnight", label: "Midnight Loom", swatch: ["#7cb4ff", "#9b5cff", "#0a0f1d"] },
] as const;

type ThemeId = (typeof themes)[number]["id"];
const STORAGE_KEY = THEME_STORAGE_KEY;

function applyTheme(id: ThemeId) {
  const root = document.documentElement;
  if (id === "classic") delete root.dataset.theme;
  else root.dataset.theme = id;
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {}
}

export function ThemePicker() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<ThemeId>("classic");
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <motion.button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => {
          setCurrent((document.documentElement.dataset.theme as ThemeId | undefined) ?? "classic");
          setOpen((v) => !v);
        }}
        whileTap={{ scale: 0.92 }}
        className="inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-sand"
      >
        <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
          <Palette aria-hidden="true" className="size-5" />
        </motion.span>
        <span className="sr-only">Change colour theme</span>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top right" }}
            className="absolute right-0 top-full z-50 mt-2 w-60 rounded-sm border border-line bg-surface p-2 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.35)]"
          >
            <p className="eyebrow px-2 pt-1 pb-2 text-muted">Theme</p>
            <ul>
              {themes.map((t, i) => (
                <motion.li
                  key={t.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <button
                    type="button"
                    aria-pressed={current === t.id}
                    onClick={() => {
                      applyTheme(t.id);
                      setCurrent(t.id);
                      setOpen(false);
                    }}
                    className="flex min-h-11 w-full items-center gap-3 rounded-xs px-2 text-left text-[0.95rem] text-ink transition-colors hover:bg-sand aria-pressed:bg-brand-tint"
                  >
                    <span aria-hidden="true" className="flex -space-x-1.5">
                      {t.swatch.map((c) => (
                        <span key={c} className="size-5 rounded-full border-2 border-surface" style={{ background: c }} />
                      ))}
                    </span>
                    <span className="flex-1">{t.label}</span>
                    {current === t.id ? <Check aria-hidden="true" className="size-4 text-brand" /> : null}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
