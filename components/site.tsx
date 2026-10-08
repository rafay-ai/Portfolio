"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { profile, type Artwork } from "@/lib/portfolio";

const navItems = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Drawings", href: "/#drawings" },
  { label: "Contact", href: "/#contact" },
];

type Theme = "light" | "dark";

function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem("portfolio-theme", next);
    } catch {
      // Storage can be blocked; the toggle still works for this visit.
    }
  };

  return { theme, toggle };
}

export function SiteHeader() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="site-header">
        <Link href="/" className="wordmark" aria-label="Abdul Rafay, home">
          Abdul Rafay
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <div className="header-tools">
          <button type="button" className="text-button" onClick={toggle} aria-label="Switch colour theme">
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <Link href="/sketchbook" className="header-sketchbook">Sketchbook</Link>
          <button type="button" className="text-button menu-button" onClick={() => setOpen(true)} aria-expanded={open}>
            Menu
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <button type="button" className="text-button mobile-nav__close" onClick={() => setOpen(false)}>
              Close
            </button>
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
            ))}
            <Link href="/sketchbook" onClick={() => setOpen(false)}>Sketchbook</Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer shell">
      <span>&copy; {new Date().getFullYear()} {profile.name}. Code, words and drawings are my own.</span>
      <nav aria-label="Footer">
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <a href={`mailto:${profile.email}`}>Email</a>
        <a href="#top">Back to top</a>
      </nav>
    </footer>
  );
}

/**
 * A drawing that shows a paper-toned placeholder until the photo has loaded.
 * `sizes` should describe how wide the image renders so the browser picks a sensible file.
 */
export function ArtImage({
  art,
  sizes,
  priority = false,
  className = "",
}: {
  art: Artwork;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  // A cached image can finish loading before React attaches onLoad, so check on mount too.
  const checkComplete = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <span
      className={`art-image ${loaded ? "is-loaded" : "is-loading"} ${className}`}
      style={{ aspectRatio: `${art.width} / ${art.height}` }}
    >
      {loaded ? null : <span className="art-image__skeleton" aria-hidden="true">loading drawing</span>}
      <Image
        ref={checkComplete}
        src={art.src}
        alt={art.alt}
        width={art.width}
        height={art.height}
        sizes={sizes}
        priority={priority}
        onLoad={() => setLoaded(true)}
      />
    </span>
  );
}
