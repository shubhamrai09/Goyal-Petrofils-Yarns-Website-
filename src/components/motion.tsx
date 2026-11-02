"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  MotionConfig,
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Respects the visitor's "reduce motion" setting for every animation below. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Fades and slides content up when it scrolls into view (once). */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "article" | "figure";
}) {
  const Tag = motion[as];
  return (
    <Tag
      data-motion
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </Tag>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const staggerChild: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

/** Parent for a list whose children animate in one after another. */
export function Stagger({
  children,
  className,
  as = "div",
  onMount = false,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "dl";
  /** Animate immediately (hero) instead of on scroll. */
  onMount?: boolean;
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={staggerParent}
      initial="hidden"
      {...(onMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } })}
    >
      {children}
    </Tag>
  );
}

/** Child of <Stagger>; lifts slightly on hover when `lift` is set. */
export function StaggerItem({
  children,
  className,
  as = "div",
  lift = false,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article" | "p";
  lift?: boolean;
}) {
  const Tag = motion[as];
  return (
    <Tag
      data-motion
      className={className}
      variants={staggerChild}
      {...(lift ? { whileHover: { y: -6, transition: { duration: 0.3, ease } } } : {})}
    >
      {children}
    </Tag>
  );
}

/** Image frame that unveils with a wipe, then drifts gently while scrolling. */
export function ParallaxFrame({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);
  return (
    <motion.div
      ref={ref}
      data-motion
      className={className}
      initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease }}
    >
      <motion.div style={{ y, scale: 1.14 }} className="absolute inset-0">
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Counts a stat like "500+" or "1977" up from a lower number when it appears. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const match = /^(\d+)(.*)$/.exec(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match || reduce || !inView) return;
    const target = Number(match[1]);
    const from = target > 1000 ? target - 60 : 0;
    const controls = animate(from, target, {
      duration: 1.6,
      ease,
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${match[2]}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, match]);

  // Server HTML carries the real value, so crawlers and no-JS visitors see it.
  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

/** Thin bar under the header that fills as the page is scrolled. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="absolute inset-x-0 -bottom-px h-0.5 bg-gradient-to-r from-brand to-glow-2"
    />
  );
}

/** Two slowly drifting colour blobs behind the hero. */
export function HeroGlow() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="glow-blob left-[-10%] top-[-20%] size-[28rem] bg-glow-1"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="glow-blob right-[-8%] bottom-[-25%] size-[24rem] bg-glow-2"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/** Full-bleed video behind the hero. Clips are preloaded and stacked, then cross-fade one after another in a loop; the frame drifts slightly as the page scrolls. */
export function HeroVideo({ clips, className = "" }: { clips: string[]; className?: string }) {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], reduce ? [0, 0] : [0, 100]);

  // Play the active clip from the start; park the others once their fade-out has finished.
  useEffect(() => {
    refs.current.forEach((v, i) => {
      if (!v) return;
      if (i === index) {
        v.currentTime = 0;
        if (!reduce) void v.play().catch(() => {});
      } else {
        window.setTimeout(() => v.pause(), 900);
      }
    });
  }, [index, reduce]);

  const next = () => {
    if (clips.length > 1) setIndex((i) => (i + 1) % clips.length);
    else {
      const v = refs.current[0];
      if (v) {
        v.currentTime = 0;
        void v.play();
      }
    }
  };

  return (
    <motion.div
      aria-hidden="true"
      data-motion
      className={`absolute inset-0 -z-10 overflow-hidden bg-ink ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease }}
    >
      <motion.div style={{ y }} className="absolute -inset-x-0 -top-[7%] h-[114%] will-change-transform">
        {clips.map((src, i) => (
          <video
            key={src}
            ref={(el) => {
              refs.current[i] = el;
            }}
            autoPlay={i === 0}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            onEnded={i === index ? next : undefined}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={src} type="video/mp4" />
          </video>
        ))}
      </motion.div>
    </motion.div>
  );
}

/** Wraps hero copy so it eases up and fades out as the visitor scrolls past it. */
export function HeroFade({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 450], reduce ? [1, 1] : [1, 0]);
  const y = useTransform(scrollY, [0, 450], reduce ? [0, 0] : [0, -60]);
  return (
    <motion.div style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}
