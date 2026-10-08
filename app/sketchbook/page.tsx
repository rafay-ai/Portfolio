"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { ArtImage, SiteFooter, SiteHeader } from "@/components/site";
import { artworks, profile } from "@/lib/portfolio";

// Page 0 is the cover, pages 1..n are drawings, the last page is the back cover.
const lastPage = artworks.length + 1;

export default function Sketchbook() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(lastPage, next));
      setDirection(clamped >= page ? 1 : -1);
      setPage(clamped);
    },
    [page],
  );

  // Links from the home page arrive as /sketchbook?page=2.
  useEffect(() => {
    const requested = Number(new URLSearchParams(window.location.search).get("page"));
    if (Number.isInteger(requested) && requested > 0) setPage(Math.min(lastPage, requested));
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goTo(page + 1);
      if (event.key === "ArrowLeft") goTo(page - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page, goTo]);

  const art = page >= 1 && page <= artworks.length ? artworks[page - 1] : null;

  return (
    <main id="top" className="sketchbook-page">
      <SiteHeader />

      <section className="shell sketchbook-intro">
        <p className="label">Drawings, {artworks.length} pages so far</p>
        <h1>Sketchbook</h1>
        <p>
          Ballpoint drawings made outside of work. Turn pages with the buttons, the contents list, or your arrow keys.
        </p>
      </section>

      <section className="shell desk" aria-label="Sketchbook viewer">
        <div className="book" aria-live="polite">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={page}
              className={`book__spread ${page === 0 || page === lastPage ? "book__spread--cover" : ""}`}
              custom={direction}
              initial={{ opacity: 0, rotateY: direction * -14, x: direction * 24 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              exit={{ opacity: 0, rotateY: direction * 14, x: direction * -24 }}
              transition={{ duration: 0.32, ease: [0.3, 0.1, 0.3, 1] }}
            >
              {page === 0 ? (
                <button type="button" className="cover" onClick={() => goTo(1)}>
                  <span className="cover__label hand">
                    Sketches
                    <small>{profile.name}</small>
                  </span>
                  <span className="cover__open">Open the book</span>
                </button>
              ) : null}

              {art ? (
                <>
                  <div className="book__left">
                    <ArtImage art={art} sizes="(max-width: 860px) 90vw, 46vw" priority={page === 1} />
                  </div>
                  <div className="book__right">
                    <p className="book__folio">p. {page}</p>
                    <h2 className="hand">{art.title}</h2>
                    <p className="label">{art.medium}</p>
                    <p className="book__note">{art.note}</p>
                    <Link href="/#drawings" className="book__back">See it on the wall</Link>
                  </div>
                </>
              ) : null}

              {page === lastPage ? (
                <div className="back-cover">
                  <p className="hand">That&apos;s every page for now. More get added as they get drawn.</p>
                  <div className="back-cover__actions">
                    <button type="button" className="button" onClick={() => goTo(1)}>Start again</button>
                    <Link href="/#contact" className="button button--solid">Say hello</Link>
                  </div>
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="book-controls">
          <button type="button" className="button" onClick={() => goTo(page - 1)} disabled={page === 0}>
            Previous page
          </button>
          <span className="book-controls__count">
            {page === 0 ? "Cover" : page === lastPage ? "Back cover" : `${page} of ${artworks.length}`}
          </span>
          <button type="button" className="button" onClick={() => goTo(page + 1)} disabled={page === lastPage}>
            Next page
          </button>
        </div>

        <nav className="contents" aria-label="Contents">
          <p className="label">Contents</p>
          <ol>
            {artworks.map((item, index) => (
              <li key={item.slug}>
                <button
                  type="button"
                  className={page === index + 1 ? "is-active" : ""}
                  aria-current={page === index + 1 ? "page" : undefined}
                  onClick={() => goTo(index + 1)}
                >
                  <span className="contents__title">{item.title}</span>
                  <span className="contents__dots" aria-hidden="true" />
                  <span>p. {index + 1}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      <SiteFooter />
    </main>
  );
}
