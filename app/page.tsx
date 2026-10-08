"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArtImage, SiteFooter, SiteHeader } from "@/components/site";
import {
  artworks,
  experience,
  profile,
  projects,
  skillGroups,
  type Artwork,
  type Project,
  type ProjectCategory,
} from "@/lib/portfolio";

const filters = ["All", "Computer Vision", "Multimodal AI", "Language AI"] as const;

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

function useModal(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);
}

function SectionHead({ index, title, children }: { index: string; title: string; children?: React.ReactNode }) {
  return (
    <motion.div className="section-head" {...reveal}>
      <span className="section-head__index">{index}</span>
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </motion.div>
  );
}

function ProjectDrawer({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useModal(Boolean(project), onClose);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) onClose();
          }}
        >
          <motion.aside
            className="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 36, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
          >
            <button className="text-button drawer__close" type="button" onClick={onClose}>
              Close
            </button>
            <p className="label">{project.category}</p>
            <h2 id="drawer-title">{project.title}</h2>
            <p className="drawer__summary">{project.summary}</p>

            <dl className="drawer__facts">
              <dt>Outcome</dt>
              <dd>{project.result}</dd>
              <dt>Problem</dt>
              <dd>{project.challenge}</dd>
              <dt>Approach</dt>
              <dd>
                <ol>
                  {project.approach.map((step) => <li key={step}>{step}</li>)}
                </ol>
              </dd>
              <dt>Tools</dt>
              <dd>{project.technologies.join(", ")}</dd>
            </dl>

            <p className="drawer__note">
              These systems run inside client workflows, so code and data stay private. I can walk through the
              architecture and results on a call.
            </p>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ArtLightbox({ art, onClose }: { art: Artwork | null; onClose: () => void }) {
  useModal(Boolean(art), onClose);
  const page = art ? artworks.findIndex((item) => item.slug === art.slug) + 1 : 0;

  return (
    <AnimatePresence>
      {art ? (
        <motion.div
          className="overlay overlay--dark"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
        >
          <div className="lightbox">
            <ArtImage art={art} sizes="(max-width: 900px) 92vw, 60vw" className="lightbox__image" />
            <div className="lightbox__caption">
              <h3 id="lightbox-title" className="hand">{art.title}</h3>
              <p className="label">{art.medium}</p>
              <p>{art.note}</p>
              <div className="lightbox__actions">
                <Link href={`/sketchbook?page=${page}`}>Open it in the sketchbook</Link>
                <button type="button" className="text-button" onClick={onClose}>Close</button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function Home() {
  const [filter, setFilter] = useState<"All" | ProjectCategory>("All");
  const [project, setProject] = useState<Project | null>(null);
  const [art, setArt] = useState<Artwork | null>(null);
  const [copied, setCopied] = useState(false);

  const visibleProjects = useMemo(
    () => (filter === "All" ? projects : projects.filter((item) => item.category === filter)),
    [filter],
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const closeProject = useCallback(() => setProject(null), []);
  const closeArt = useCallback(() => setArt(null), []);

  const [heroArt] = artworks;

  return (
    <main id="top">
      <SiteHeader />

      {/* Hero */}
      <section className="hero shell">
        <motion.div
          className="hero__copy"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="label">{profile.role}, {profile.location}</p>
          <h1>
            I train models that read documents, check identities and make sense of <em>Urdu</em> text.
          </h1>
          <p className="hero__intro">{profile.introduction}</p>
          <div className="hero__actions">
            <a className="button button--solid" href="#work">See the work</a>
            <a className="button" href={profile.resumePath} download>Download CV (PDF)</a>
          </div>
          <p className="hero__status">{profile.availability}.</p>
        </motion.div>

        <motion.figure
          className="hero__margin"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <Link href="/sketchbook" className="pinned pinned--hero" aria-label="Open my sketchbook">
            <span className="tape tape--left" aria-hidden="true" />
            <span className="tape tape--right" aria-hidden="true" />
            <ArtImage art={heroArt} sizes="(max-width: 900px) 80vw, 420px" priority />
          </Link>
          <figcaption className="hand margin-note">
            After hours I draw with a ballpoint pen.{" "}
            <Link href="/sketchbook">Flip through the sketchbook</Link>, or{" "}
            <a href="#drawings">see them pinned below</a>.
          </figcaption>
        </motion.figure>
      </section>

      {/* Work */}
      <section className="section shell" id="work">
        <SectionHead index="01" title="Selected work">
          AI systems for computer vision, document intelligence and language. Open any entry for the problem,
          the approach and the tools.
        </SectionHead>

        <div className="tabs" role="group" aria-label="Filter projects">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              className={filter === item ? "is-active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <ol className="work-list">
          {visibleProjects.map((item) => (
            <li key={item.slug}>
              <button type="button" className="work-row" onClick={() => setProject(item)}>
                <span className="work-row__num">{String(projects.indexOf(item) + 1).padStart(2, "0")}</span>
                <span className="work-row__main">
                  <span className="work-row__title">{item.title}</span>
                  <span className="work-row__summary">{item.summary}</span>
                </span>
                <span className="work-row__meta">
                  <span>{item.category}</span>
                  <span className="work-row__open">Read more</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </section>

      {/* Experience */}
      <section className="section shell" id="experience">
        <SectionHead index="02" title="Experience">
          Intern to engineer in seven months, at the same company, working on the same kind of hard documents.
        </SectionHead>
        <div className="ledger">
          {experience.map((item) => (
            <motion.article className="ledger__row" key={item.period} {...reveal}>
              <p className="ledger__period">{item.period}</p>
              <div>
                <h3>{item.role}</h3>
                <p className="ledger__company">{item.company}</p>
                <p>{item.description}</p>
                <ul className="plain-list">
                  {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="section shell" id="skills">
        <SectionHead index="03" title="Skills" />
        <dl className="skills">
          {skillGroups.map((group) => (
            <div key={group.title} className="skills__row">
              <dt>{group.title}</dt>
              <dd>{group.skills.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Drawings */}
      <section className="drawings" id="drawings">
        <div className="shell">
          <SectionHead index="04" title="Off the clock">
            Outside of work I draw, mostly faces and figures in ballpoint pen. These hang on my wall; the titles
            are the sticky notes pinned next to them. Click one to look closer.
          </SectionHead>

          <div className="wall">
            {artworks.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                className={`pinned pinned--${index + 1}`}
                onClick={() => setArt(item)}
                aria-label={`Look closer at ${item.title}`}
              >
                <span className="tape tape--left" aria-hidden="true" />
                <span className="tape tape--right" aria-hidden="true" />
                <ArtImage art={item} sizes="(max-width: 700px) 90vw, 33vw" />
                <span className={`sticky sticky--${item.tag} hand`}>{item.title}</span>
              </button>
            ))}
          </div>

          <div className="drawings__cta">
            <p>
              Want them one at a time, with notes? The sketchbook has every page, and you can turn pages with your
              arrow keys.
            </p>
            <Link href="/sketchbook" className="button button--solid">Open the sketchbook</Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section shell contact" id="contact">
        <SectionHead index="05" title="Get in touch">
          New AI system, a pipeline that needs fixing, or a conversation about drawing. Email is the fastest way
          to reach me.
        </SectionHead>
        <a className="contact__email" href={`mailto:${profile.email}`}>{profile.email}</a>
        <div className="contact__row">
          <button type="button" className="button" onClick={copyEmail} aria-live="polite">
            {copied ? "Copied to clipboard" : "Copy address"}
          </button>
          <span className="contact__links">
            {profile.github ? <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a> : null}
            {profile.linkedin ? <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> : null}
            <span>{profile.location}</span>
          </span>
        </div>
      </section>

      <SiteFooter />

      <ProjectDrawer project={project} onClose={closeProject} />
      <ArtLightbox art={art} onClose={closeArt} />
    </main>
  );
}
