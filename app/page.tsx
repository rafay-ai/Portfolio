"use client";

import { AnimatePresence, motion, useInView, useScroll, useSpring } from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronRight,
  Clipboard,
  Download,
  Code2,
  ContactRound,
  Mail,
  MapPin,
  Menu,
  Moon,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  experience,
  metrics,
  profile,
  projects,
  skillGroups,
  type Project,
  type ProjectCategory,
} from "@/lib/portfolio";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Contact", href: "#contact" },
];

function AnimatedMetric({
  value,
  suffix,
  label,
  decimals,
}: {
  value: number;
  suffix: string;
  label: string;
  decimals: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1100;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <div className="metric" ref={ref}>
      <strong>
        {displayValue.toFixed(decimals)}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      className="section-heading"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.55 }}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </motion.div>
  );
}

function ProjectCard({ project, onOpen, index }: { project: Project; onOpen: () => void; index: number }) {
  const Icon = project.icon;
  return (
    <motion.button
      type="button"
      className={`project-card project-card--${project.accent}`}
      onClick={onOpen}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.24) }}
      whileHover={{ y: -6 }}
      aria-label={`Open ${project.title} case study`}
    >
      <div className="project-card__top">
        <span className="project-icon"><Icon size={22} /></span>
        <span className="project-category">{project.category}</span>
      </div>
      <div>
        <span className="project-eyebrow">{project.eyebrow}</span>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
      </div>
      <div className="project-card__footer">
        <div className="tech-preview">
          {project.technologies.slice(0, 3).map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
        <span className="case-link">Case study <ArrowUpRight size={16} /></span>
      </div>
    </motion.button>
  );
}

function ProjectDrawer({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="drawer-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) onClose();
          }}
        >
          <motion.aside
            className={`project-drawer project-card--${project.accent}`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 34, stiffness: 310 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-drawer-title"
          >
            <button className="icon-button drawer-close" type="button" onClick={onClose} aria-label="Close case study">
              <X size={20} />
            </button>
            <span className="eyebrow">{project.eyebrow}</span>
            <h2 id="project-drawer-title">{project.title}</h2>
            <p className="drawer-summary">{project.summary}</p>

            <div className="result-panel">
              <span>Outcome</span>
              <strong>{project.result}</strong>
            </div>

            <div className="drawer-section">
              <h3>The challenge</h3>
              <p>{project.challenge}</p>
            </div>

            <div className="drawer-section">
              <h3>Engineering approach</h3>
              <ol>
                {project.approach.map((item, index) => (
                  <li key={item}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{item}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="drawer-section">
              <h3>Technology</h3>
              <div className="tech-list">
                {project.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </div>

            <p className="confidential-note">
              Detailed implementation material can be shared where project confidentiality permits.
            </p>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<"All" | ProjectCategory>("All");
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.3 });

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-theme") as "dark" | "light" | null;
    const preferred = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    const nextTheme = saved ?? preferred;
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
  };

  const filteredProjects = useMemo(
    () => (filter === "All" ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  );

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      <header className="site-header">
        <a href="#top" className="brand" aria-label="Go to top">
          <span>AR</span>
          <strong>Abdul Rafay</strong>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-button" type="button" onClick={toggleTheme} aria-label="Toggle color theme">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a className="header-contact" href={`mailto:${profile.email}`}>Let&apos;s talk <ArrowUpRight size={16} /></a>
          <button className="icon-button mobile-menu-button" type="button" onClick={() => setMobileOpen(true)} aria-label="Open navigation">
            <Menu size={20} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div className="mobile-nav" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="icon-button" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={20} /></button>
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {item.label}<ChevronRight size={20} />
              </motion.a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <section className="hero shell" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="availability"><span /> {profile.availability}</div>
          <p className="hero-kicker">Deep Learning Engineer · Karachi</p>
          <h1>
            Building AI systems that move from <em>research</em> to reliable reality.
          </h1>
          <p className="hero-intro">{profile.introduction}</p>
          <div className="hero-actions">
            <a className="button button--primary" href="#work">Explore selected work <ArrowDown size={17} /></a>
            <a className="button button--secondary" href={profile.resumePath} download>
              Résumé <Download size={17} />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="system-card"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18 }}
        >
          <div className="system-card__header">
            <div className="window-dots"><span /><span /><span /></div>
            <span>rafay.ai / capabilities</span>
          </div>
          <div className="system-visual">
            <div className="orbit orbit--one"><span /></div>
            <div className="orbit orbit--two"><span /></div>
            <div className="core"><Sparkles size={25} /></div>
            <span className="node node--vision">VISION</span>
            <span className="node node--language">LANGUAGE</span>
            <span className="node node--deploy">DEPLOY</span>
          </div>
          <div className="terminal-lines">
            <p><span>01</span> multimodal_ocr <b>ready</b></p>
            <p><span>02</span> authenticity_engine <b>ready</b></p>
            <p><span>03</span> llm_pipeline <b>ready</b></p>
            <p><span>04</span> production_api <b>ready</b></p>
          </div>
        </motion.div>

        <motion.a
          className="scroll-hint"
          href="#impact"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          Scroll to inspect <ArrowDown size={15} />
        </motion.a>
      </section>

      <section className="impact shell" id="impact">
        <div className="impact-label">
          <span>Selected impact</span>
          <p>Measured outcomes, not decorative buzzwords.</p>
        </div>
        <div className="metrics-grid">
          {metrics.map((metric) => <AnimatedMetric key={metric.label} {...metric} />)}
        </div>
      </section>

      <section className="section shell" id="work">
        <SectionHeading
          eyebrow="01 · Selected work"
          title="Systems built for messy, real-world inputs."
          description="Case studies spanning computer vision, multimodal document intelligence, and language systems. Select a project to inspect the engineering decisions behind it."
        />
        <div className="filter-row" role="group" aria-label="Filter projects">
          {(["All", "Computer Vision", "Multimodal AI", "Language AI"] as const).map((item) => (
            <button
              type="button"
              key={item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <motion.div layout className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div layout key={project.slug} exit={{ opacity: 0, scale: 0.96 }}>
                <ProjectCard project={project} index={index} onOpen={() => setSelectedProject(project)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="section shell" id="experience">
        <SectionHeading
          eyebrow="02 · Experience"
          title="A fast climb from experimentation to ownership."
          description="My work sits across research, model training, evaluation, integration, and production delivery."
        />
        <div className="timeline">
          {experience.map((item, index) => (
            <motion.article
              className="timeline-item"
              key={item.period}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="timeline-rail"><span>{String(index + 1).padStart(2, "0")}</span></div>
              <div className="timeline-meta">
                <span>{item.period}</span>
                <h3>{item.role}</h3>
                <p>{item.company}</p>
              </div>
              <div className="timeline-body">
                <p>{item.description}</p>
                <ul>
                  {item.highlights.map((highlight) => <li key={highlight}><Check size={15} />{highlight}</li>)}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section shell" id="capabilities">
        <SectionHeading
          eyebrow="03 · Capabilities"
          title="A practical toolkit for intelligent products."
          description="Broad enough to connect the pipeline, focused enough to care about the failure cases."
        />
        <div className="capability-grid">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <motion.article
                className="capability-card"
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <span className="capability-icon"><Icon size={22} /></span>
                <h3>{group.title}</h3>
                <div>
                  {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="contact shell" id="contact">
        <motion.div
          className="contact-card"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55 }}
        >
          <div>
            <span className="eyebrow">04 · Contact</span>
            <h2>Have an AI problem that needs to survive outside a notebook?</h2>
            <p>Let&apos;s discuss the system, the constraints, and the path to production.</p>
          </div>
          <div className="contact-actions">
            <a className="button button--primary" href={`mailto:${profile.email}`}><Mail size={17} /> Send an email</a>
            <button className="button button--secondary" type="button" onClick={copyEmail}>
              {copied ? <Check size={17} /> : <Clipboard size={17} />}
              {copied ? "Email copied" : "Copy email"}
            </button>
          </div>
          <div className="contact-footer">
            <span><MapPin size={15} /> {profile.location}</span>
            <div className="social-links">
              {profile.github ? <a href={profile.github} target="_blank" rel="noreferrer"><Code2 size={17} /> GitHub</a> : null}
              {profile.linkedin ? <a href={profile.linkedin} target="_blank" rel="noreferrer"><ContactRound size={17} /> LinkedIn</a> : null}
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="site-footer shell">
        <span>© {new Date().getFullYear()} Abdul Rafay</span>
        <span>Designed with restraint. Engineered with intent.</span>
        <a href="#top">Back to top <ArrowUpRight size={14} /></a>
      </footer>

      <ProjectDrawer project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  );
}
